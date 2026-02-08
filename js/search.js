/**
 * js/search.js - Interface de Recherche
 */
import { searchContent } from './fuze.js';
import { getImagePath } from './utils.js';
import * as Modal from './modal.js';

let searchActive = false;
let searchInput = null;

export function initSearch() {
    console.log('🔍 Init Search Module');
    
    // Injecter la barre de recherche si absente
    const headerRight = document.querySelector('.header-right');
    if (headerRight && !document.getElementById('searchInput')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-box';
        searchContainer.style.display = 'none'; // Caché par défaut
        searchContainer.style.marginRight = '10px';
        
        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'searchInput';
        searchInput.placeholder = 'Titres, genres...';
        searchInput.style.padding = '5px 10px';
        searchInput.style.borderRadius = '4px';
        searchInput.style.border = '1px solid #333';
        searchInput.style.backgroundColor = 'rgba(0,0,0,0.8)';
        searchInput.style.color = 'white';

        searchContainer.appendChild(searchInput);
        headerRight.insertBefore(searchContainer, headerRight.firstChild);

        // Events
        const searchIcon = document.querySelector('.fa-search');
        if (searchIcon) {
            searchIcon.parentElement.style.cursor = 'pointer'; // Make icon div clickable if needed
            searchIcon.addEventListener('click', toggleSearch);
        }

        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggleSearch();
        });
    }
}

function toggleSearch() {
    const box = document.querySelector('.search-box');
    searchActive = !searchActive;
    
    if (searchActive) {
        box.style.display = 'block';
        searchInput.focus();
    } else {
        box.style.display = 'none';
        searchInput.value = '';
        restoreOriginalView();
    }
}

function handleSearch(query) {
    const mainContent = document.getElementById('mainContent');
    const hero = document.getElementById('hero');

    if (query.length < 2) {
        restoreOriginalView();
        return;
    }

    // Masquer le hero pendant la recherche
    if (hero) hero.style.display = 'none';

    // Recherche via Fuze
    const results = searchContent(query);

    // Affichage
    mainContent.innerHTML = `<h2 style="padding: 20px 4%;">Résultats pour "${query}"</h2>`;
    
    if (results.length === 0) {
        mainContent.innerHTML += `<p style="padding: 0 4%; color: #999;">Aucun résultat trouvé.</p>`;
        return;
    }

    const grid = document.createElement('div');
    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';
    grid.style.gap = '20px';
    grid.style.padding = '0 4%';

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'content-card'; // Réutiliser les styles existants
        card.dataset.id = item.id;
        card.style.position = 'relative';
        card.style.width = '150px';
        card.style.cursor = 'pointer';
        
        const img = getImagePath(item, 'poster');
        card.innerHTML = `
            <img src="${img}" style="width:100%; border-radius:4px;" onerror="this.style.display='none'">
            <p style="margin-top:5px; font-size:0.9rem;">${item.title}</p>
        `;
        
        // Clic -> Modale
        card.addEventListener('click', () => Modal.openModal(item.id));
        grid.appendChild(card);
    });

    mainContent.appendChild(grid);
}

function restoreOriginalView() {
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = 'flex';
    
    // Pour restaurer le contenu original, le plus simple est de recharger l'UI
    // via l'import UI (circular dependency à éviter) ou dispatch event.
    // Ici on va dispatch un event custom que main.js écoutera.
    document.dispatchEvent(new Event('restoreUI'));
}