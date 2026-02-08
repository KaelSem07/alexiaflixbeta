/** 
 * @module navigation
 * @description Gestion de la navigation spatiale (Clavier/Manette) et de l'API Gamepad.
 * @author Architecte AlexiaFlix
 */

import { openModal, closeModal } from './modal.js';

let lastMoveTime = 0;
const MOVE_THRESHOLD = 200; // ms entre chaque mouvement pour éviter le scroll trop rapide
let isGamepadConnected = false;

/**
 * Initialise le système de navigation
 */
export function initNavigation() {
    console.log("🎮 Init Navigation (TV/Console/Gamepad)");
    
    // Écouteurs Clavier (Flèches)
    document.addEventListener('keydown', handleKeyboardNav);

    // Écouteurs Gamepad
    window.addEventListener("gamepadconnected", () => {
        isGamepadConnected = true;
        console.log("🎮 Gamepad connecté");
        gamepadLoop();
    });
    window.addEventListener("gamepaddisconnected", () => {
        isGamepadConnected = false;
        console.log("🎮 Gamepad déconnecté");
    });

    // Style de focus initial pour souris
    document.body.classList.add('mouse-nav');
    document.addEventListener('mousemove', () => document.body.classList.add('mouse-nav'));
    document.addEventListener('keydown', () => document.body.classList.remove('mouse-nav'));
}

/**
 * Gestion des touches clavier
 * @param {KeyboardEvent} e 
 */
function handleKeyboardNav(e) {
    const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (!navKeys.includes(e.key) && e.key !== 'Enter' && e.key !== 'Escape') return;

    document.body.classList.remove('mouse-nav'); // Active le style TV

    if (e.key === 'Escape') {
        closeModal(); 
        return;
    }

    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && focused.click) focused.click();
        return;
    }

    e.preventDefault(); // Empêche le scroll natif navigateur
    moveFocus(e.key);
}

/**
 * Boucle de polling pour le Gamepad
 */
function gamepadLoop() {
    if (!isGamepadConnected) return;

    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0]; // On prend le premier joueur

    if (gp) {
        const now = Date.now();
        if (now - lastMoveTime > MOVE_THRESHOLD) {
            // Axes (Stick Gauche) ou D-Pad
            const axisX = gp.axes[0];
            const axisY = gp.axes[1];

            if (axisY < -0.5) moveFocus('ArrowUp');
            else if (axisY > 0.5) moveFocus('ArrowDown');
            else if (axisX < -0.5) moveFocus('ArrowLeft');
            else if (axisX > 0.5) moveFocus('ArrowRight');

            // Boutons (A/Croix = 0, B/Rond = 1)
            if (gp.buttons[0].pressed) {
                document.activeElement.click();
                lastMoveTime = now + 200; // Debounce click
            }
            if (gp.buttons[1].pressed) {
                closeModal(); // Retour
                lastMoveTime = now + 200;
            }

            if (Math.abs(axisX) > 0.5 || Math.abs(axisY) > 0.5) {
                lastMoveTime = now;
            }
        }
    }

    requestAnimationFrame(gamepadLoop);
}

/**
 * Déplace le focus vers l'élément le plus proche dans la direction donnée
 * @param {string} direction 'ArrowUp'|'ArrowDown'|'ArrowLeft'|'ArrowRight'
 */
function moveFocus(direction) {
    const focusable = Array.from(document.querySelectorAll('a, button, .card, .nav-item, input[type="range"]'))
        .filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && !el.disabled;
        });

    const current = document.activeElement;
    if (!focusable.includes(current)) {
        focusable[0]?.focus();
        return;
    }

    const currentRect = current.getBoundingClientRect();
    let bestCandidate = null;
    let minDistance = Infinity;

    focusable.forEach(el => {
        if (el === current) return;

        const rect = el.getBoundingClientRect();
        
        // Filtrage directionnel strict
        let isValid = false;
        if (direction === 'ArrowRight') isValid = rect.left >= currentRect.right - 10; // Marge tolérance
        if (direction === 'ArrowLeft') isValid = rect.right <= currentRect.left + 10;
        if (direction === 'ArrowDown') isValid = rect.top >= currentRect.bottom - 10;
        if (direction === 'ArrowUp') isValid = rect.bottom <= currentRect.top + 10;

        if (isValid) {
            // Distance Euclidienne
            const dx = (rect.left + rect.width/2) - (currentRect.left + currentRect.width/2);
            const dy = (rect.top + rect.height/2) - (currentRect.top + currentRect.height/2);
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < minDistance) {
                minDistance = dist;
                bestCandidate = el;
            }
        }
    });

    if (bestCandidate) {
        bestCandidate.focus();
        bestCandidate.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
}