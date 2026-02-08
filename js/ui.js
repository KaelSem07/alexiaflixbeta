import { contentData } from './data.js';
import { getImagePath } from './utils.js';

// Sélecteurs DOM
const heroSection = document.getElementById('hero');
const mainContent = document.getElementById('mainContent');

// Image de secours (Le logo, car on est sûr qu'il existe)
const FALLBACK_IMAGE = 'functions/Web/Images/AlexiaFlix - Logo/AlexiaFlix - Logo 2.png';

/**
 * Affiche un contenu aléatoire dans la section Hero
 */
export function renderHero() {
    if (!heroSection) return;

    const allContent = [...contentData.series, ...contentData.movies, ...contentData.sagas];
    if (allContent.length === 0) return;

    const randomItem = allContent[Math.floor(Math.random() * allContent.length)];
    const bgImage = getImagePath(randomItem, 'landscape') || getImagePath(randomItem, 'poster');

    const html = `
        <div class="hero-bg">
            <img src="${bgImage}" alt="${randomItem.title}" 
                 style="width: 100%; height: 100%; object-fit: cover;"
                 onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}'; this.style.objectFit='contain';">
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <h1 class="hero-title">${randomItem.title}</h1>
            <p class="hero-desc">${randomItem.description}</p>
            <div class="hero-btns">
                <button class="btn btn-primary play-btn" data-id="${randomItem.id}" data-episode="1">
                    <i class="fas fa-play"></i> Lecture
                </button>
                <button class="btn btn-secondary hero-info-btn" data-id="${randomItem.id}">
                    <i class="fas fa-info-circle"></i> Plus d'infos
                </button>
            </div>
        </div>
    `;

    heroSection.innerHTML = html;
}

/**
 * Affiche les catégories (Séries, Films, Sagas)
 */
export function renderCategories() {
    if (!mainContent) return;
    mainContent.innerHTML = ''; // Reset

    createRow('Séries à ne pas manquer', contentData.series);
    createRow('Films cultes', contentData.movies);
    createRow('Sagas Intégrales', contentData.sagas);
}

/**
 * Helper pour créer une rangée horizontale
 */
function createRow(title, items) {
    if (!items || items.length === 0) return;

    const section = document.createElement('div');
    section.className = 'category-section';

    const titleEl = document.createElement('h3');
    titleEl.className = 'category-title';
    titleEl.textContent = title;

    const rowContainer = document.createElement('div');
    rowContainer.className = 'row-container drag-scroll-container';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card content-card';
        card.dataset.id = item.id;

        const posterPath = getImagePath(item, 'poster');
        
        // CORRECTION IMPORTANTE : Gestion onerror sécurisée
        card.innerHTML = `
            <img src="${posterPath}" alt="${item.title}" class="card-img" 
                 onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}'; this.style.padding='20px'; this.style.objectFit='contain';">
            <div class="card-info-overlay">
                <h4 class="card-title">${item.title}</h4>
            </div>
        `;
        rowContainer.appendChild(card);
    });

    section.appendChild(titleEl);
    section.appendChild(rowContainer);
    mainContent.appendChild(section);
}