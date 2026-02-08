import { contentData } from './data.js'; 
import * as Fuze from './fuze.js'; // Import du moteur puissant

const playerOverlay = document.getElementById('playerOverlay');
const videoElement = document.getElementById('mainVideo');
const closeBtn = document.getElementById('closePlayerBtn');

export function initPlayer() {
    if (closeBtn) closeBtn.addEventListener('click', closePlayer);
}

/**
 * Ouvre le lecteur en utilisant le moteur Fuze pour trouver le fichier
 */
export async function openPlayer(id, episodeNum = null, sagaIndex = null) {
    const item = findItemById(id);
    if (!item) return;

    // UI : Afficher le player en mode "Chargement"
    if (playerOverlay && videoElement) {
        playerOverlay.classList.add('active');
        // Reset src pour éviter d'afficher la dernière image
        videoElement.src = '';
        // Optionnel : Afficher un spinner de chargement ici
    }

    console.log(`🤖 [Player] Demande à Fuze de trouver : ${item.title}`);
    
    // APPEL DU FUZZER
    const validUrl = await Fuze.findPlayableUrl(item, episodeNum, sagaIndex);

    if (validUrl) {
        console.log(`🎯 [Player] Lecture confirmée : ${validUrl}`);
        videoElement.src = validUrl;
        videoElement.play().catch(e => console.log("Autoplay bloqué:", e));
    } else {
        console.error("☠️ [Player] Échec fatal. Aucun fichier trouvé.");
        alert("Désolé, impossible de localiser le fichier vidéo sur le serveur.");
        closePlayer();
    }
}

export function closePlayer() {
    if (playerOverlay && videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src'); 
        videoElement.load();
        playerOverlay.classList.remove('active');
    }
}

function findItemById(id) {
    if (!contentData) return null;
    const all = [...(contentData.series || []), ...(contentData.movies || []), ...(contentData.sagas || [])];
    return all.find(i => i.id === id);
}