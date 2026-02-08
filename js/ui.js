import { contentData } from './data.js';
import { getImagePath } from './utils.js';

// Sélecteurs DOM
const heroSection = document.getElementById('hero');
const mainContent = document.getElementById('mainContent');

// Image de secours (Le logo, car on est sûr qu'il existe)
const FALLBACK_IMAGE = 'functions/Web/Univers/AlexiaFlix - Logo/Logo.png';

// Écouteur pour le changement de thème (Masquage du Hero)
document.addEventListener('themeChanged', (e) => {
    const { hideHero } = e.detail;
    if (heroSection) {
        if (hideHero) {
            heroSection.style.display = 'none';
            heroSection.classList.add('hidden-by-theme');
        } else {
            heroSection.style.display = 'block';
            heroSection.classList.remove('hidden-by-theme');
            renderHero(); // Relancer le rendu si on le réaffiche
        }
    }
});

/**
 * Affiche un contenu aléatoire dans la section Hero
 */
export function renderHero() {
    if (!heroSection) return;

    // Vérifier si le thème actuel interdit le hero
    const currentTheme = localStorage.getItem('appTheme') || 'hello_kitty'; // Hello Kitty par défaut
    // Note: On pourrait aussi checker une classe CSS sur le body, mais ici on check le stockage
    // Pour être plus robuste, on va se fier à la classe 'hidden-by-theme' gérée par l'event listener
    if (heroSection.classList.contains('hidden-by-theme')) {
        heroSection.style.display = 'none';
        return;
    }

    // Assurer que le hero est visible (sauf si paramètres ouverts)
    heroSection.style.display = 'block';

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
 * Affiche la page de paramètres
 */
export function renderSettings() {
    if (!mainContent) return;
    
    // Masquer le hero temporairement (sans classe 'hidden-by-theme' pour pouvoir le restaurer)
    if (heroSection) heroSection.style.display = 'none';

    const currentTheme = localStorage.getItem('appTheme') || 'hello_kitty';

    mainContent.innerHTML = `
        <div class="settings-container" style="padding: 100px 4% 40px; color: white; max-width: 800px; margin: 0 auto;">
            <h1 style="margin-bottom: 30px; border-bottom: 1px solid #333; padding-bottom: 10px;">Paramètres</h1>
            
            <div class="settings-section" style="margin-bottom: 40px;">
                <h3 style="color: #ccc; margin-bottom: 15px;">Apparence</h3>
                <div style="background: var(--card-bg); padding: 20px; border-radius: 4px;">
                    <label style="display: block; margin-bottom: 10px; color: var(--text-main);">Thème de l'interface</label>
                    <select id="themeSelect" class="btn" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid #444; border-radius: 4px; cursor: pointer;">
                        <option value="default" ${currentTheme === 'default' ? 'selected' : ''}>Netflix (Défaut)</option>
                        <option value="hello_kitty" ${currentTheme === 'hello_kitty' ? 'selected' : ''}>Hello Kitty</option>
                    </select>
                    <p style="margin-top: 10px; font-size: 0.8rem; color: var(--text-secondary);">D'autres thèmes arriveront bientôt !</p>
                </div>
            </div>

            <div class="settings-section">
                <h3 style="color: #ccc; margin-bottom: 15px;">Mon Compte</h3>
                <div style="background: var(--card-bg); padding: 20px; border-radius: 4px;">
                    <p style="margin-bottom: 20px; color: var(--text-main);">Vous êtes connecté.</p>
                    <button id="settingsLogoutBtn" class="btn" style="background-color: #e50914; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-sign-out-alt"></i> Se déconnecter
                    </button>
                </div>
            </div>
            
            <div class="settings-section" style="margin-top: 40px;">
                <h3 style="color: #ccc; margin-bottom: 15px;">À propos</h3>
                <p style="color: #666;">Version Beta 1.0.0</p>
                <p style="color: #666; font-size: 0.8rem; margin-top: 5px;">AlexiaFlix Inc.</p>
            </div>
        </div>
    `;
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
