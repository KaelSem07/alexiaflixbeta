// js/data.js - VERSION CORRIGÉE (Sagas & Hilda)

// Données Épisodes Séries
const episodesData = {
    'ahs': { 1: 12, 2: 13, 3: 13, 4: 13, 5: 12, 6: 10, 7: 11, 8: 10, 9: 9, 10: 10, 11: 10, 12: 10 },
    'hilda': { 1: 20 },
    'dixon': { 1: 6, 2: 6, 3: 6 },
    'city': { 1: 6, 2: 6 },
    'tales': { 1: 6 },
    'ones': { 1: 6 },
    'beyond': { 1: 10, 2: 10 }
};

export const contentData = {
    episodesData: episodesData,

    // --- SÉRIES TV ---
    series: [
        {
            id: 'ahs',
            title: 'American Horror Story',
            type: 'series',
            seasons: 12,
            description: 'Une série anthologique horrifique où chaque saison raconte une histoire indépendante.',
            folder: 'AHS',
            prefix: 'AHS',
            imgFolder: 'AHS',
            poster: 'AHS - Poster.jpeg',
            landscape: 'AHS - Landscape.jpeg',
            preview: 'AHS - Extrait.mp4'
        },
        {
            id: 'hilda',
            title: 'Hilda Furacao',
            type: 'series',
            seasons: 1,
            description: 'Le destin d\'une jeune femme au Brésil qui défie les conventions.',
            folder: 'Hilda Furacao',
            prefix: 'Hilda FuracAo',
            // OPTION SPÉCIALE: Active le double espace "  - Ep" dans utils.js
            doubleSpace: true, 
            imgFolder: 'hildafuracao',
            poster: 'hildafuracao - poster.jpg',
            landscape: 'hildafuracao - landscape.jpeg',
            preview: 'hildafuracao - extrait.mp4'
        },
        {
            id: 'dixon',
            title: 'Daryl Dixon',
            type: 'series',
            seasons: 3,
            description: 'Daryl débarque en France et tente de comprendre comment il est arrivé là.',
            folder: 'TWD/Dayrl Dixon',
            prefix: 'TWD - Daryl Dixon',
            imgFolder: 'TWD/Daryl Dixon',
            poster: 'Daryl Dixon - poster.jpg',
            landscape: 'Daryl Dixon - Landscape.jpg',
            preview: 'Daryl Dixon - Extrait.mp4'
        },
        {
            id: 'city',
            title: 'Dead City',
            type: 'series',
            seasons: 2,
            description: 'Maggie et Negan voyagent dans un Manhattan post-apocalyptique.',
            folder: 'TWD/Dead City',
            prefix: 'TWD Dead City',
            imgFolder: 'TWD/Dead City',
            poster: 'Dead City - Poster.jpg',
            landscape: 'Dead City - Landscape.jpg',
            preview: 'Dead City - Extrait.mp4'
        },
        {
            id: 'tales',
            title: 'Tales of the Walking Dead',
            type: 'series',
            seasons: 1,
            description: 'Une anthologie épisodique dans l\'univers de The Walking Dead.',
            folder: 'TWD/Tales Of Walking Dead',
            prefix: 'TWD - Tales Of Walking Dead',
            imgFolder: 'TWD/Tales Of The Walking Dead',
            poster: 'Tales Of The Walking Dead Poster.jpg',
            landscape: 'Tales Of the Walking Dead - Landscape.jpeg',
            preview: 'Tales of TWD - Extrait.mp4'
        },
        {
            id: 'ones',
            title: 'The Ones Who Live',
            type: 'series',
            seasons: 1,
            description: 'L\'histoire d\'amour épique entre Rick et Michonne.',
            folder: 'TWD/The Ones Who Live',
            prefix: 'TWD The Ones Who Live',
            imgFolder: 'TWD/The One Who Live',
            poster: 'The One Who Live - Poster.jpg',
            landscape: 'The One Who Live - Landscape.jpg',
            preview: 'TWD The Ones Who Live - Extrait.mp4'
        },
        {
            id: 'beyond',
            title: 'World Beyond',
            type: 'series',
            seasons: 2,
            description: 'La première génération élevée dans l\'apocalypse zombie.',
            folder: 'TWD/World Beyond',
            prefix: 'TWD - World Beyond',
            imgFolder: 'TWD/World Beyond',
            poster: 'World Beyond - Poster.jpeg',
            landscape: 'World Beyond - Landscape.jpg',
            preview: 'TWD World Beyond - Extrait.mp4'
        }
    ],

    // --- SAGAS (Corrections Dossiers & Noms) ---
    sagas: [
        {
            id: 'bond',
            title: 'Intégrale 007 (Daniel Craig)',
            type: 'saga',
            description: 'Retrouvez toutes les missions de James Bond interprété par Daniel Craig.',
            imgFolder: 'James Bond',
            poster: 'James Bond - Poster.jpg',
            landscape: 'James Bond - Landscape.png',
            preview: 'James Bond - Extrait.mp4',
            folder: 'James Bond', // CORRIGÉ
            movies: [
                // CORRIGÉ : "Royal" au lieu de "Royale" selon votre fichier
                { title: 'Casino Royale', fileName: 'Casino Royal.mp4', year: 2006 }, 
                { title: 'Quantum of Solace', fileName: 'Quantum of Solace.mp4', year: 2008 },
                { title: 'Skyfall', fileName: 'Skyfall.mp4', year: 2012 },
                { title: 'Spectre', fileName: 'Spectre.mp4', year: 2015 },
                { title: 'Mourir peut attendre', fileName: 'Mourir peut attendre.mp4', year: 2021 }
            ]
        },
        {
            id: 'mi',
            title: 'Mission Impossible',
            type: 'saga',
            description: 'Votre mission, si vous l\'acceptez : suivre Ethan Hunt dans ses cascades les plus folles.',
            imgFolder: 'MI - Dead Reckoning',
            poster: 'MI Dead Reckoning - Poster.jpg',
            landscape: 'MI Dead Reckoning - Landscape.jpg',
            preview: 'MI Dead Reckoning - Extrait.mp4',
            folder: 'MI', // CORRIGÉ : Dossier "MI"
            movies: [
                { title: 'Mission Impossible', fileName: 'Mission Impossible 1.mp4', year: 1996 },
                { title: 'Mission Impossible 2', fileName: 'Mission Impossible 2.mp4', year: 2000 },
                { title: 'Mission Impossible 3', fileName: 'Mission Impossible 3.mp4', year: 2006 },
                { title: 'Ghost Protocol', fileName: 'Mission Impossible 4.mp4', year: 2011 },
                { title: 'Rogue Nation', fileName: 'Mission Impossible 5.mp4', year: 2015 },
                { title: 'Fallout', fileName: 'Mission Impossible 6.mp4', year: 2018 },
                { title: 'Dead Reckoning', fileName: 'MI - Dead Reckoning.mp4', year: 2023 },
                { title: 'Final Reckoning', fileName: 'MI - Final Reckoning.mp4', year: 2025 }
            ]
        }
    ],

    // --- FILMS ---
    movies: [
        { id: 'helsing', title: 'Van Helsing', type: 'movie', description: 'Le mal a-t-il enfin trouvé un adversaire à sa hauteur ?', fileName: 'Van Helsing.mp4', imgFolder: 'Van Helsing', poster: 'Van Helsing - Poster.jpg', landscape: 'Van Helsing - Landscape.jpg', preview: 'Van Helsing - Extrait.mp4' },
        { id: 'anastasia', title: 'Anastasia', type: 'movie', description: 'La princesse perdue de Russie.', fileName: 'Anastasia.mp4', imgFolder: 'Anastasia', poster: 'Anastasia - Poster.jpg', landscape: 'Anastasia - Landscape.webp', preview: 'Anastasia - Extrait.mp4' },
        { id: 'baaria', title: 'Baaria', type: 'movie', description: 'Une fresque sicilienne.', fileName: 'Baaria.mp4', imgFolder: 'Baaria', poster: 'Baaria - Poster.jpg', landscape: 'Baaria - Landscape.webp', preview: 'Baaria - Extrait.mp4' },
        { id: 'coexister', title: 'Coexister', type: 'movie', description: 'Une comédie religieuse.', fileName: 'Coexister.mp4', imgFolder: 'Coexister', poster: 'Coexister - Poster.webp', landscape: 'Coexister - Landscape.webp', preview: 'Coexister - Extrait.mp4' },
        { id: 'comte', title: 'Le Comte de Monte-Cristo', type: 'movie', description: 'La vengeance d\'Edmond Dantès.', fileName: 'Comte Monte Cristo.mp4', imgFolder: 'Cristo', poster: 'Cristo - Poster.png', landscape: 'Cristo - Landscape.jpg', preview: 'Cristo - Extrait.mp4' },
        { id: 'jack', title: 'Jack et la mécanique du cœur', type: 'movie', description: 'L\'amour avec un cœur horloge.', fileName: 'Jack et la mEcanique du coeur.mp4', imgFolder: 'Jack et la MEcanique du Coeur', poster: 'Jack et la mEcanique du coeur - Poster.jpg', landscape: 'Jack et la mEcanique du coeur - Landscape.webp', preview: 'Jack et la mEcanique du coeur - Extrait.mp4' },
        { id: 'diner', title: 'Le dîner de cons', type: 'movie', description: 'Un face à face culte.', fileName: 'Le diner de con.mp4', imgFolder: 'Le dîner de con', poster: 'Le diner de con - Poster.png', landscape: 'Le diner de con - Landscape.jpg', preview: 'Le dîner de con - Extrait.mp4' },
        { id: 'petitprince', title: 'Le Petit Prince', type: 'movie', description: 'L\'essentiel est invisible pour les yeux.', fileName: 'Le Petit Prince.mp4', imgFolder: 'Le Petit Prince', poster: 'Le Petit Prince - Poster.webp', landscape: 'Le Petit Prince - Landscape.jpg', preview: 'Le Petit Prince - Extrait.mp4' },
        { id: 'prenom', title: 'Le Prénom', type: 'movie', description: 'Un dîner de famille explosif.', fileName: 'Le PrEnom.mp4', imgFolder: 'Le prEnom', poster: 'Le prEnom - Poster.jpg', landscape: 'Le prEnom - Landscape.jpg', preview: 'Le prEnom - Extrait.mp4' },
        { id: 'malena', title: 'Malena', type: 'movie', description: 'La beauté qui dérange.', fileName: 'MalEna.mp4', imgFolder: 'MalEna', poster: 'MalEna - Poster.jpg', landscape: 'MalEna - Landscape.png', preview: 'MalEna - Extrait.mp4' },
        { id: 'palmiers', title: 'Palmiers dans la neige', type: 'movie', description: 'Une romance coloniale.', fileName: 'Palmiers dans la neige.mp4', imgFolder: 'Palmiers dans la neige', poster: 'Palmiers dans la neige - Poster.jpg', landscape: 'Palmiers dans la neige - Landscape.jpg', preview: 'Palmiers dans la neige - Extrait.mp4' }
    ]
};