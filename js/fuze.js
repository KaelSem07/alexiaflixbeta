/**
 * js/fuze.js - Moteur Algorithmique "Sniper"
 * Performance Maximale (Tri Probabiliste) + Politesse Adaptative (Dynamic Backoff)
 */

import { contentData } from './data.js';

// --- RECHERCHE TEXTUELLE ---
export function searchContent(query) {
    if (!query || query.length < 2) return [];
    const term = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const allItems = [...contentData.series, ...contentData.movies, ...contentData.sagas];
    return allItems.filter(item => {
        const title = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return title.includes(term) || (item.description || "").toLowerCase().includes(term);
    });
}

// --- MOTEUR DE RÉSOLUTION D'URL ---

export async function findPlayableUrl(item, episodeNum = null, sagaIndex = null) {
    console.log(`⚡ [Fuze] Cible : ${item.title}`);
    
    let candidates = [];

    if (item.type === 'series' && episodeNum) {
        candidates = generateSeriesVariations(item, episodeNum);
    } 
    else if (item.type === 'saga' && sagaIndex !== null) {
        const movie = item.movies[sagaIndex];
        if (movie) candidates = generateMovieVariations(item.folder, movie.fileName);
    } 
    else {
        candidates = generateMovieVariations('', item.fileName);
    }

    // Suppression des doublons
    candidates = [...new Set(candidates)];
    
    console.log(`⚡ [Fuze] ${candidates.length} vecteurs identifiés. Activation du Sniper Adaptatif...`);
    
    // Lancement du gestionnaire de concurrence
    return await processWithConcurrencyPool(candidates);
}

// --- OUTILS DE FORMATAGE ---
function toCapitalize(str) { // "ahs" -> "Ahs"
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function toTitleCase(str) { // "hilda furacao" -> "Hilda Furacao"
    if (!str) return str;
    return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
function encodeURIPath(path) {
    return path.split('/').map(part => encodeURIComponent(part)).join('/');
}

// --- GÉNÉRATEURS DE VARIANTES ---

function generateSeriesVariations(item, epNum) {
    const paths = [];

    // On prépare les ingrédients, mais l'ordre d'assemblage compte pour la performance !
    
    // 1. DOSSIERS (Le plus probable en premier)
    const folderVariants = [
        `functions/${item.folder}`,                    // Donnée brute (AHS)
        `functions/${toTitleCase(item.folder)}`,       // Title Case (Ahs)
        `functions/${item.folder.toUpperCase()}`,      // UPPER (AHS)
        `functions/${item.folder.toLowerCase()}`       // lower (ahs)
    ];

    const seasonVariants = [`S1`, `s1`, `Saison 1`, ``]; 

    // 2. PRÉFIXES FICHIERS (Le plus probable en premier)
    const basePrefix = item.prefix.trim();
    const prefixVariants = [
        toCapitalize(basePrefix),           // Ahs (Souvent le gagnant sur Linux)
        toTitleCase(basePrefix),            // Hilda Furacao
        basePrefix,                         // AHS (Donnée brute)
        basePrefix.toUpperCase(),           // AHS
        basePrefix.toLowerCase()            // ahs
    ];

    // Ajout des espaces insécables dans les séparateurs
    const separators = [' - ', '  - ', ' ', '-', '\u00A0- ', ' - \u00A0']; 
    const epFormats = [`Ep${epNum}`, `Ep ${epNum}`, `E${epNum}`, `${epNum}`];

    // GÉNÉRATION
    folderVariants.forEach(folder => {
        seasonVariants.forEach(season => {
            prefixVariants.forEach(pre => {
                separators.forEach(sep => {
                    epFormats.forEach(ep => {
                        // Logique standard: "Nom - S1 - Ep1.mp4"
                        let fileName = "";
                        if (season) {
                            fileName = `${pre}${sep}${season}${sep}${ep}.mp4`;
                            paths.push(`${folder}/${season}/${fileName}`);
                            paths.push(encodeURIPath(`${folder}/${season}/${fileName}`));
                        } else {
                            fileName = `${pre}${sep}${ep}.mp4`;
                            paths.push(`${folder}/${fileName}`);
                            paths.push(encodeURIPath(`${folder}/${fileName}`));
                        }
                    });
                });
            });
        });
    });

    return paths;
}

function generateMovieVariations(folder, fileName) {
    const paths = [];
    const folderBase = folder ? `functions/${folder}` : `functions`;
    const cleanName = fileName.replace('.mp4', '');
    
    // On priorise la version TitleCase et Capitalize
    const folders = [
        folderBase,
        toTitleCase(folderBase),
        folderBase.toLowerCase()
    ];

    const nameVariants = [
        fileName, // Brut
        toTitleCase(cleanName) + '.mp4', // Casino Royale.mp4
        toCapitalize(cleanName) + '.mp4', // Casino royale.mp4
        fileName.toLowerCase()
    ];

    folders.forEach(f => {
        nameVariants.forEach(n => {
            paths.push(`${f}/${n}`);
            paths.push(encodeURIPath(`${f}/${n}`));
        });
    });

    return paths;
}

// --- GESTIONNAIRE DE CONCURRENCE "RADICALEMENT POLI" ---

async function processWithConcurrencyPool(urls) {
    const MAX_CONCURRENT = 3; // Limite stricte de 3 connexions simultanées
    const TIMEOUT_MS = 5000;  // 5 secondes de patience pour la réponse serveur
    
    // BACKOFF DYNAMIQUE : On commence rapide, on ralentit si on échoue
    let currentDelayMs = 200; 

    let activeCount = 0;
    let foundUrl = null;
    let currentIndex = 0;

    return new Promise((resolve) => {
        
        // Fonction pour lancer la prochaine requête
        const next = () => {
            // Si trouvé ou fini, on arrête tout
            if (foundUrl || (currentIndex >= urls.length && activeCount === 0)) {
                if (!foundUrl) resolve(null);
                return;
            }

            // Tant qu'on a de la place dans le pool et des URLs à tester
            while (activeCount < MAX_CONCURRENT && currentIndex < urls.length && !foundUrl) {
                const url = urls[currentIndex++];
                activeCount++;
                
                // On lance la vérification
                checkUrl(url, TIMEOUT_MS).then((result) => {
                    activeCount--;
                    if (result.valid && !foundUrl) {
                        foundUrl = result.url;
                        console.log(`✅ [Fuze] BINGO : ${result.url}`);
                        resolve(result.url); // Victoire immédiate
                    } else {
                        // Échec (404 ou Timeout)
                        // On augmente le délai pour la suite ("Calmons-nous, le serveur souffre")
                        currentDelayMs = Math.min(currentDelayMs + 50, 1000); 
                        next(); 
                    }
                });
            }
        };

        // Amorçage initial avec délai progressif
        const startStaggered = async () => {
            while (activeCount < MAX_CONCURRENT && currentIndex < urls.length && !foundUrl) {
                next(); // Lance une requête
                if (foundUrl) break;
                // Attente dynamique entre chaque tir
                await new Promise(r => setTimeout(r, currentDelayMs)); 
            }
        };

        startStaggered();
    });
}

/**
 * Vérificateur unitaire
 */
function checkUrl(url, timeoutMs) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        
        const timer = setTimeout(() => {
            video.src = "";
            resolve({ valid: false, url: url });
        }, timeoutMs);

        video.onloadedmetadata = () => {
            clearTimeout(timer);
            if (video.duration > 0 || video.videoWidth > 0) {
                resolve({ valid: true, url: url });
            } else {
                resolve({ valid: false, url: url });
            }
        };
        
        video.onerror = () => {
            clearTimeout(timer);
            resolve({ valid: false, url: url });
        };
        
        video.src = url;
    });
}