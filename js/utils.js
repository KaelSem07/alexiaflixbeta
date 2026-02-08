// js/utils.js - Fonctions helpers

export const CONSTANTS = {
    // Note: Pas de slash au début pour être relatif à la racine actuelle
    IMG_BASE_PATH: 'functions/Web/Images/',
    VIDEO_BASE_PATH: 'functions/'
};

/* --- THEME SYSTEM --- */
export const THEMES = {
    default: {
        name: 'Netflix (Défaut)',
        type: 'dark',
        variables: {
            '--bg-color': '#141414',
            '--card-bg': '#1f1f1f',
            '--primary': '#e50914',
            '--text-main': '#ffffff',
            '--text-secondary': '#b3b3b3',
            '--header-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
            '--hero-gradient': 'linear-gradient(77deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 85%)',
            '--body-bg-image': 'none' // Pas d'image de fond par défaut
        },
        assets: {
             logo: 'functions/Web/Univers/AlexiaFlix - Logo/Logo.png',
             fallbackImage: 'functions/Web/Univers/AlexiaFlix - Logo/Logo.png',
             clickSound: null,
             playSound: null,
             notifSound: null
        },
        hideHero: false // Afficher le Hero
    },
    hello_kitty: {
        name: 'Hello Kitty',
        type: 'light',
        variables: {
            // Fond sombre imposé (noir teinté rose très sombre) pour éviter l'agression visuelle
            '--bg-color': '#2a1a1f', 
            '--card-bg': 'rgba(255, 105, 180, 0.1)', // Légère teinte rose
            '--primary': '#ff69b4',
            '--text-main': '#ffe6ea',
            '--text-secondary': '#ffb6c1',
            '--header-gradient': 'linear-gradient(180deg, rgba(42,26,31,0.9) 0%, rgba(42,26,31,0.6) 40%, transparent 100%)',
            '--hero-gradient': 'none',
            '--body-bg-image': 'url("functions/Web/Univers/Hello Kitty - Main/HK - Interface.png")' // Image de fond
        },
        assets: {
             logo: 'functions/Web/Univers/Hello Kitty - Main/HK - Logo.png',
             fallbackImage: 'functions/Web/Univers/Hello Kitty - Main/HK - Interface.png',
             interface: 'functions/Web/Univers/Hello Kitty - Main/HK - Interface.png',
             clickSound: 'functions/Web/Univers/Hello Kitty - Main/HK - Click.mp3',
             playSound: 'functions/Web/Univers/Hello Kitty - Main/HK - Play Media.mp3',
             notifSound: 'functions/Web/Univers/Hello Kitty - Main/HK - Notif.mp3'
        },
        hideHero: true // Masquer le Hero pour ce thème
    }
};

export function initTheme() {
    // Par défaut Hello Kitty comme demandé
    const saved = localStorage.getItem('appTheme') || 'hello_kitty'; 
    applyTheme(saved);
}

export function applyTheme(themeKey) {
    const theme = THEMES[themeKey] || THEMES['default'];
    const root = document.documentElement;
    
    // Apply CSS Variables
    for (const [key, value] of Object.entries(theme.variables)) {
        root.style.setProperty(key, value);
    }
    
    // Update Logo if present in DOM (Header & Auth)
    const logos = document.querySelectorAll('.logo, .auth-logo');
    logos.forEach(img => {
        if(theme.assets.logo) img.src = theme.assets.logo;
    });
    
    // Dispatch event pour que l'UI se mette à jour (masquage Hero)
    const event = new CustomEvent('themeChanged', { detail: { themeKey, hideHero: theme.hideHero } });
    document.dispatchEvent(event);

    // Save preference
    localStorage.setItem('appTheme', themeKey);

    // --- SERVICE WORKER CACHING ---
    // On demande au SW de mettre en cache les assets du thème choisi
    // pour garantir qu'ils soient disponibles offline au prochain démarrage
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        const assetsToCache = Object.values(theme.assets).filter(url => url);
        
        // Ajouter l'image de fond si elle existe dans les variables CSS
        if (theme.variables['--body-bg-image'] && theme.variables['--body-bg-image'].includes('url(')) {
            const match = theme.variables['--body-bg-image'].match(/url\("?(.+?)"?\)/);
            if (match && match[1]) assetsToCache.push(match[1]);
        }

        navigator.serviceWorker.controller.postMessage({
            type: 'CACHE_THEME_ASSETS',
            payload: assetsToCache
        });
        console.log("📤 Demande de mise en cache du thème envoyée au SW");
    }
}

export function getThemeAssets() {
    const key = localStorage.getItem('appTheme') || 'hello_kitty';
    return (THEMES[key] || THEMES['default']).assets;
}

export function playSound(type) {
    const assets = getThemeAssets();
    let soundFile = null;

    if (type === 'click') soundFile = assets.clickSound;
    if (type === 'play') soundFile = assets.playSound;
    if (type === 'notif') soundFile = assets.notifSound;

    if (soundFile) {
        const audio = new Audio(soundFile);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play prevented:", e));
    }
}

/* --- EXISTING HELPERS --- */

/**
 * Génère le chemin d'une image
 */
export function getImagePath(item, type) {
    if (!item.imgFolder) return '';
    const filename = item[type];
    if (!filename) return '';
    
    // On encode chaque partie du dossier pour gérer les espaces
    const folder = item.imgFolder.split('/').map(part => encodeURIComponent(part)).join('/');
    const file = encodeURIComponent(filename);

    return `${CONSTANTS.IMG_BASE_PATH}${folder}/${file}`;
}

/**
 * Génère le chemin d'une vidéo (Films simples)
 */
export function getVideoPath(item) {
    if (!item.fileName) return '';

    if(item.type === 'movie') {
        const encodedFile = encodeURIComponent(item.fileName);
        return `${CONSTANTS.VIDEO_BASE_PATH}${encodedFile}`;
    }
    return '';
}

/**
 * Génère le chemin d'un épisode (Séries)
 */
export function buildEpisodePath(seriesObj, season, episodeNum) {
    if (!seriesObj.folder || !seriesObj.prefix) {
        console.error("Données série incomplètes:", seriesObj.title);
        return '';
    }

    const encodedFolder = seriesObj.folder.split('/').map(p => encodeURIComponent(p)).join('/');
    const fileName = `${seriesObj.prefix} - S${season} - Ep${episodeNum}.mp4`;
    const encodedFileName = encodeURIComponent(fileName);
    
    return `${CONSTANTS.VIDEO_BASE_PATH}${encodedFolder}/S${season}/${encodedFileName}`;
}

/**
 * Génère le chemin d'un film de Saga (NOUVEAU)
 */
export function getSagaVideoPath(sagaItem, movieIndex) {
    if (!sagaItem.movies || !sagaItem.movies[movieIndex]) {
        console.error("Film de saga introuvable à l'index:", movieIndex);
        return '';
    }

    const movie = sagaItem.movies[movieIndex];
    // Gestion robuste des dossiers avec espaces (ex: "James Bond")
    const folder = sagaItem.folder || '';
    const encodedFolder = folder.split('/').map(p => encodeURIComponent(p)).join('/');
    const encodedFile = encodeURIComponent(movie.fileName);

    return `${CONSTANTS.VIDEO_BASE_PATH}${encodedFolder}/${encodedFile}`;
}
