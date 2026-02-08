import { initAuth, signIn, signOutUser } from './auth.js';
import * as UI from './ui.js';
import * as Player from './player.js';
import * as Modal from './modal.js';
import * as Search from './search.js';
import * as Navigation from './navigation.js'; // AJOUT CRUCIAL

let isAppInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation Auth
    initAuth();
    
    // 2. Init Modules
    Player.initPlayer();
    Search.initSearch();
    Navigation.initNavigation(); // DÉMARRAGE NAVIGATION

    // Event de restauration UI
    document.addEventListener('restoreUI', () => {
        UI.renderCategories();
    });

    // 3. Gestionnaire Bouton Connexion Google
    const googleBtn = document.getElementById('googleSignInBtn');
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            try {
                googleBtn.style.opacity = '0.7';
                googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
                await signIn();
            } catch (error) {
                console.error("Erreur login:", error);
                const errorMsg = document.getElementById('loginError');
                if (errorMsg) {
                    errorMsg.textContent = "Erreur de connexion. Veuillez réessayer.";
                    errorMsg.style.display = 'block';
                }
                googleBtn.style.opacity = '1';
                googleBtn.innerHTML = 'Se connecter avec Google';
            }
        });
    }

    // 4. Gestionnaire Bouton Déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await signOutUser();
            window.location.reload(); 
        });
    }

    // 5. Écouteur global de l'état Auth
    window.addEventListener('authStateChanged', (e) => {
        const user = e.detail.user;
        const authOverlay = document.getElementById('auth-overlay');
        const app = document.getElementById('app');

        if (user) {
            console.log("✅ Utilisateur connecté");
            
            if (authOverlay) {
                authOverlay.style.opacity = '0';
                setTimeout(() => {
                    authOverlay.style.display = 'none';
                    authOverlay.classList.remove('active');
                }, 400);
            }

            if (app) app.style.display = 'block';
            
            if (!isAppInitialized) {
                initializeApp();
                isAppInitialized = true;
            }

        } else {
            console.log("🔒 Utilisateur déconnecté");
            if (authOverlay) {
                authOverlay.style.display = 'flex';
                setTimeout(() => authOverlay.style.opacity = '1', 10);
                authOverlay.classList.add('active');
            }
            if (app) app.style.display = 'none';
        }
    });
});

function initializeApp() {
    console.log("🚀 Lancement de l'application...");
    UI.renderHero();
    UI.renderCategories();
    document.addEventListener('click', handleGlobalClicks);
}

function handleGlobalClicks(e) {
    const target = e.target;

    // --- PLAY ---
    const playBtn = target.closest('.play-btn');
    if (playBtn) {
        e.preventDefault();
        const id = playBtn.dataset.id;
        const episode = playBtn.dataset.episode || null;
        const sagaIndex = playBtn.dataset.sagaIndex || null;

        Player.openPlayer(id, episode, sagaIndex);
        return;
    }

    // --- OPEN MODAL ---
    const card = target.closest('.content-card') || target.closest('.hero-info-btn');
    if (card) {
        e.preventDefault();
        Modal.openModal(card.dataset.id);
        return;
    }

    // --- CLOSE MODAL ---
    if (target.closest('.close-modal') || target.classList.contains('modal')) {
        Modal.closeModal();
    }
}