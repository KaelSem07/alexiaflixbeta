// js/utils.js - Fonctions helpers

export const CONSTANTS = {
    // Note: Pas de slash au début pour être relatif à la racine actuelle
    IMG_BASE_PATH: 'functions/Web/Images/',
    VIDEO_BASE_PATH: 'functions/'
};

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