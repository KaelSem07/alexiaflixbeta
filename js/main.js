import { initAuth, signIn, signOutUser } from './auth.js';
import * as UI from './ui.js';
import * as Player from './player.js';
import * as Modal from './modal.js';
import * as Search from './search.js';
import * as Navigation from './navigation.js'; 
import { initTheme, applyTheme, playSound } from './utils.js';

let isAppInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialisation Thème
    initTheme();

    // 1. Initialisation Auth
    initAuth();
    
    // 2. Init Modules
    Player.initPlayer();
    Search.initSearch();
    Navigation.initNavigation(); 

    // Event de restauration UI
    document.addEventListener('restoreUI', () => {
        UI.renderCategories();
        UI.renderHero();
    });

    // 3. Gestionnaire Bouton Connexion Google
    const googleBtn = document.getElementById('googleSignInBtn');
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            playSound('click');
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

    // 4. Écouteur global de l'état Auth
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

    // 5. Gestionnaire Changement Thème (Délégué)
    document.addEventListener('change', (e) => {
        if (e.target.id === 'themeSelect') {
            console.log("🎨 Changement de thème:", e.target.value);
            applyTheme(e.target.value);
            playSound('click');
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

    // Son au clic pour les éléments interactifs
    if (target.closest('button') || target.closest('a') || target.closest('.card') || target.closest('.nav-item')) {
        playSound('click');
    }

    // --- OPEN SETTINGS (Nouveau: Via délégation) ---
    const settingsBtn = target.closest('#settingsBtn');
    if (settingsBtn) {
        e.preventDefault();
        console.log("⚙️ Ouverture des paramètres");
        UI.renderSettings();
        return;
    }

    // --- PLAY ---
    const playBtn = target.closest('.play-btn');
    if (playBtn) {
        e.preventDefault();
        const id = playBtn.dataset.id;
        const episode = playBtn.dataset.episode || null;
        const sagaIndex = playBtn.dataset.sagaIndex || null;

        playSound('play'); // Son spécifique play
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

    // --- SETTINGS LOGOUT ---
    const logoutBtn = target.closest('#settingsLogoutBtn');
    if (logoutBtn) {
        e.preventDefault();
        signOutUser().then(() => window.location.reload());
        return;
    }

    // --- NAVIGATION HOME ---
    const navItem = target.closest('.nav-item');
    if (navItem && navItem.dataset.filter === 'all') {
        e.preventDefault();
        UI.renderHero();
        UI.renderCategories();
        
        // Mise à jour de la classe active
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));\n        navItem.classList.add('active');
        return;
    }
}
