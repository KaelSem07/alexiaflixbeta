import { contentData } from './data.js';
import { getImagePath } from './utils.js';

const modalOverlay = document.getElementById('modal-overlay');
const modalContentInject = document.getElementById('modal-content-inject');

export function openModal(id) {
    const allItems = [...contentData.series, ...contentData.movies, ...contentData.sagas];
    const item = allItems.find(i => i.id === id);

    if (!item || !modalContentInject) return;

    // Image Header
    const bgImage = getImagePath(item, 'landscape') || getImagePath(item, 'poster');

    // Construction HTML
    let buttonsHtml = '';
    let listHtml = '';

    // --- LOGIQUE SÉRIES ---
    if (item.type === 'series') {
        buttonsHtml = `<button class="btn btn-primary play-btn" data-id="${item.id}" data-episode="1"><i class="fas fa-play"></i> Lecture S1:E1</button>`;
        
        const epCount = contentData.episodesData?.[item.id]?.[1] || 0;
        if (epCount > 0) {
            let list = '';
            for(let i=1; i<=epCount; i++) {
                list += `
                    <div class="episode-row play-btn" data-id="${item.id}" data-episode="${i}">
                        <span class="ep-num">${i}</span>
                        <div class="ep-info">
                            <span class="ep-title">Épisode ${i}</span>
                        </div>
                        <i class="fas fa-play-circle" style="margin-left:auto;"></i>
                    </div>
                `;
            }
            listHtml = `<div class="episodes-grid"><h3>Saison 1</h3>${list}</div>`;
        }
    } 
    // --- LOGIQUE SAGAS (NOUVEAU) ---
    else if (item.type === 'saga' && item.movies) {
        // Bouton lecture lance le 1er film
        buttonsHtml = `<button class="btn btn-primary play-btn" data-id="${item.id}" data-saga-index="0"><i class="fas fa-play"></i> Lecture ${item.movies[0].title}</button>`;
        
        let list = '';
        item.movies.forEach((movie, index) => {
            list += `
                <div class="episode-row play-btn" data-id="${item.id}" data-saga-index="${index}">
                    <span class="ep-num">${movie.year}</span>
                    <div class="ep-info">
                        <span class="ep-title">${movie.title}</span>
                    </div>
                    <i class="fas fa-play-circle" style="margin-left:auto;"></i>
                </div>
            `;
        });
        listHtml = `<div class="episodes-grid"><h3>Films de la collection</h3>${list}</div>`;
    }
    // --- LOGIQUE FILMS ---
    else {
        buttonsHtml = `<button class="btn btn-primary play-btn" data-id="${item.id}"><i class="fas fa-play"></i> Lecture</button>`;
    }

    const html = `
        <div class="modal-hero" style="background-image: url('${bgImage}'); background-size: cover; background-position: center;">
            <div class="modal-gradient"></div>
            <button class="close-btn close-modal"><i class="fas fa-times"></i></button>
            <div class="modal-hero-content" style="position: absolute; bottom: 30px; left: 40px; right: 40px; z-index: 10;">
                <h2 class="modal-title">${item.title}</h2>
                <div class="modal-meta">
                    <span class="match-score">98% recommandé</span>
                    <span class="year">${item.movies ? item.movies.length + ' Films' : '2024'}</span>
                    <span class="badge-hd">HD</span>
                </div>
                <div class="modal-actions" style="margin-top: 20px;">
                    ${buttonsHtml}
                </div>
            </div>
        </div>
        <div class="modal-body">
            <p class="modal-desc">${item.description}</p>
            ${listHtml}
        </div>
    `;

    modalContentInject.innerHTML = html;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            if(modalContentInject) modalContentInject.innerHTML = '';
        }, 300);
    }
    document.body.style.overflow = '';
}