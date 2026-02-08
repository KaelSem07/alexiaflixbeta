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
            '--hero-gradient': 'linear-gradient(77deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 85%)'
        },
        assets: {
             logo: 'functions/Web/Univers/AlexiaFlix - Logo/Logo.png',
             fallbackImage: 'functions/Web/Univers/AlexiaFlix - Logo/Logo.png',
             clickSound: null,
             playSound: null,
             notifSound: null
        }
    },
    hello_kitty: {
        name: 'Hello Kitty',
        type: 'light',
        variables: {
            '--bg-color': '#ffe6ea',
            '--card-bg': '#fff0f5',
            '--primary': '#ff69b4',
            '--text-main': '#5c0029',
            '--text-secondary': '#8b4b6d',
            '--header-gradient': 'linear-gradient(180deg, rgba(255,105,180,0.9) 0%, rgba(255,105,180,0.6) 40%, transparent 100%)',
            '--hero-gradient': 'linear-gradient(77deg, rgba(255,182,193,.6) 0%, rgba(255,182,193,0) 85%)'
        },
        assets: {
             logo: 'functions/Web/Univers/Hello Kitty - Main/HK - Logo.png',
             fallbackImage: 'functions/Web/Univers/Hello Kitty - Main/HK - Interface.png',
             interface: 'functions/Web/Univers/Hello Kitty - Main/HK - Interface.png',
             clickSound: 'functions/Web/Univers/Hello Kitty - Main/HK - Click.mp3',
             playSound: 'functions/Web/Univers/Hello Kitty - Main/HK - Play Media.mp3',
             notifSound: 'functions/Web/Univers/Hello Kitty - Main/HK - Notif.mp3'
        }
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

    localStorage.setItem('appTheme', themeKey);
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
