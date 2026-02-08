/**
 * js/auth.js - Authentification Google via Firebase
 */

const firebaseConfig = {
    apiKey: "AIzaSyAMOaSsfswRqfPj_DbgjRYvVfU6ntwd9dk",
    authDomain: "alexiaflix-a.firebaseapp.com",
    databaseURL: "https://alexiaflix-a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alexiaflix-a",
    storageBucket: "alexiaflix-a.firebasestorage.app",
    messagingSenderId: "2155057204",
    appId: "1:2155057204:web:f0a21d8885afab1f957a61",
    measurementId: "G-GZCMLMZ5JF"
};

let auth = null;
let currentUser = null;

export async function initAuth() {
    try {
        if (typeof firebase === 'undefined') {
            console.error("SDK Firebase manquant !");
            return;
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        
        // Persistance locale (reste connecté après refresh)
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        // Écouter les changements d'état (connexion/déconnexion)
        auth.onAuthStateChanged((user) => {
            currentUser = user;
            // Dispatch event pour que main.js mette à jour l'UI
            window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
        });

    } catch (error) {
        console.error('Erreur Init Auth:', error);
    }
}

export async function signIn() {
    if (!auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    // Force la sélection du compte pour éviter la connexion auto au mauvais compte
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
        const result = await auth.signInWithPopup(provider);
        return result.user;
    } catch (error) {
        console.error('Erreur SignIn:', error);
        throw error;
    }
}

export async function signOutUser() {
    if (!auth) return;
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Erreur SignOut:', error);
    }
}

export function isAuthenticated() {
    return !!currentUser;
}

export function getCurrentUser() {
    return currentUser;
}