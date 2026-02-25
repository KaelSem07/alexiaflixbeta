// Base de données générée dynamiquement à partir de l'arborescence brute
window.alexiaData = {
    films: [],
    series: {},
    bonus: [],
    apps: [],
    themes: {}
};

// -----------------------------------------------------------------------------
// CONFIGURATION CRITIQUE
// -----------------------------------------------------------------------------
const ROOT_PATH = "./functions/";

// Ton arborescence brute
const rawList = String.raw`
I:\public\AlexiaFlix\functions\A contre-sens 3.mp4
I:\public\AlexiaFlix\functions\AHS
I:\public\AlexiaFlix\functions\Anastasia.mp4
I:\public\AlexiaFlix\functions\Baaria.mp4
I:\public\AlexiaFlix\functions\Bonus
I:\public\AlexiaFlix\functions\Calmos.mp4
I:\public\AlexiaFlix\functions\Cesar et Rosalie.mp4
I:\public\AlexiaFlix\functions\Coexister.mp4
I:\public\AlexiaFlix\functions\Comte Monte Cristo.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao
I:\public\AlexiaFlix\functions\Jack et la mécanique du coeur.mp4
I:\public\AlexiaFlix\functions\James Bond
I:\public\AlexiaFlix\functions\Jeux
I:\public\AlexiaFlix\functions\Le Petit Prince.mp4
I:\public\AlexiaFlix\functions\Le PrEnom.mp4
I:\public\AlexiaFlix\functions\Le diner de con.mp4
I:\public\AlexiaFlix\functions\MI
I:\public\AlexiaFlix\functions\MalEna.mp4
I:\public\AlexiaFlix\functions\Palmiers dans la neige.mp4
I:\public\AlexiaFlix\functions\Pocahontas.mp4
I:\public\AlexiaFlix\functions\TWD
I:\public\AlexiaFlix\functions\The Words.mp4
I:\public\AlexiaFlix\functions\Un monstre a Paris.mp4
I:\public\AlexiaFlix\functions\Van helsing.mp4
I:\public\AlexiaFlix\functions\Web
I:\public\AlexiaFlix\functions\desktop.ini
I:\public\AlexiaFlix\functions\AHS\S1
I:\public\AlexiaFlix\functions\AHS\S10
I:\public\AlexiaFlix\functions\AHS\S11
I:\public\AlexiaFlix\functions\AHS\S12
I:\public\AlexiaFlix\functions\AHS\S2
I:\public\AlexiaFlix\functions\AHS\S3
I:\public\AlexiaFlix\functions\AHS\S4
I:\public\AlexiaFlix\functions\AHS\S5
I:\public\AlexiaFlix\functions\AHS\S6
I:\public\AlexiaFlix\functions\AHS\S7
I:\public\AlexiaFlix\functions\AHS\S8
I:\public\AlexiaFlix\functions\AHS\S9
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep11.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep12.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S1\Ahs - S1 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S10\Ahs - S10 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S11\Ahs - S11 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S12\Ahs - S12 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep11.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep13.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S2\Ahs - S2 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep11.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep12.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep13.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S3\Ahs - S3 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep11.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep12.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep13.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S4\Ahs - S4 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S2 - Ep12.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep11.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep12.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S5\Ahs - S5 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S6\Ahs - S6 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep11.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S7\Ahs - S7 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep10.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S8\Ahs - S8 - Ep9.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep1.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep2.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep3.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep4.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep5.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep6.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep7.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep8.mp4
I:\public\AlexiaFlix\functions\AHS\S9\Ahs - S9 - Ep9.mp4
I:\public\AlexiaFlix\functions\Bonus\1762945136623.jpg
I:\public\AlexiaFlix\functions\Bonus\1763388442165(1).png
I:\public\AlexiaFlix\functions\Bonus\20251002_190859(1).jpg
I:\public\AlexiaFlix\functions\Bonus\Adopt Me!
I:\public\AlexiaFlix\functions\Bonus\Alexia Queen Of Univers
I:\public\AlexiaFlix\functions\Bonus\Images et Vidéos IA
I:\public\AlexiaFlix\functions\Bonus\Kitten Save World
I:\public\AlexiaFlix\functions\Bonus\Projets Pour Toi
I:\public\AlexiaFlix\functions\Bonus\Screenshot_20250731_151248_Instagram.jpg
I:\public\AlexiaFlix\functions\Bonus\Tortues
I:\public\AlexiaFlix\functions\Bonus\desktop.ini
I:\public\AlexiaFlix\functions\Bonus\Adopt Me!\Investir dans les maisons Adopt Me!.pdf
I:\public\AlexiaFlix\functions\Bonus\Adopt Me!\Obtenir Frost Dragon Adopt Me 2025.pdf
I:\public\AlexiaFlix\functions\Bonus\Alexia Queen Of Univers\1761679688294(1).jpg
I:\public\AlexiaFlix\functions\Bonus\Images et Vidéos IA\Alexia Prime - Shop Now.jpg
I:\public\AlexiaFlix\functions\Bonus\Kitten Save World\Twitter_Patrick-Rodenbush_2013-10-29_10_01.jpg
I:\public\AlexiaFlix\functions\Bonus\Projets Pour Toi\Le Monde Merveilleux du Numérique
I:\public\AlexiaFlix\functions\Bonus\Projets Pour Toi\Le Monde Merveilleux du Numérique\Kingdom.png
I:\public\AlexiaFlix\functions\Bonus\Projets Pour Toi\Le Monde Merveilleux du Numérique\Le Monde Merveilleux du Numérique.html
I:\public\AlexiaFlix\functions\Bonus\Projets Pour Toi\Le Monde Merveilleux du Numérique\Les BFF et le monde merveilleux du Numérique.pdf
I:\public\AlexiaFlix\functions\Bonus\Projets Pour Toi\Le Monde Merveilleux du Numérique\Parchemin.png
I:\public\AlexiaFlix\functions\Bonus\Tortues\Oliver Jaloux.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep10.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep11.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep12.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep13.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep14.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep15.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep16.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep24.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep25.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep26.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep29.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep30.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep5.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep7.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1  - Ep8.mp4
I:\public\AlexiaFlix\functions\Hilda Furacao\S1\Hilda FuracAo - S1 - Ep1.mp4
I:\public\AlexiaFlix\functions\James Bond\Casino Royal.mp4
I:\public\AlexiaFlix\functions\James Bond\Mourir Peut Attendre.mp4
I:\public\AlexiaFlix\functions\James Bond\Quantum Of Salace.mp4
I:\public\AlexiaFlix\functions\James Bond\SkyFall.mp4
I:\public\AlexiaFlix\functions\James Bond\Spectre.mp4
I:\public\AlexiaFlix\functions\Jeux\Chess
I:\public\AlexiaFlix\functions\Jeux\desktop.ini
I:\public\AlexiaFlix\functions\Jeux\Chess\Chess - Logo.png
I:\public\AlexiaFlix\functions\Jeux\Chess\Chess.html
I:\public\AlexiaFlix\functions\Jeux\Chess\desktop.ini
I:\public\AlexiaFlix\functions\MI\MI - Dead Reckoning.mp4
I:\public\AlexiaFlix\functions\MI\MI - Final Reckoning.mp4
I:\public\AlexiaFlix\functions\MI\Mission Impossible 1.mp4
I:\public\AlexiaFlix\functions\MI\Mission Impossible 2.mp4
I:\public\AlexiaFlix\functions\MI\Mission Impossible 3.mp4
I:\public\AlexiaFlix\functions\MI\Mission Impossible 4.mp4
I:\public\AlexiaFlix\functions\MI\Mission Impossible 5.mp4
I:\public\AlexiaFlix\functions\MI\Mission Impossible 6.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon
I:\public\AlexiaFlix\functions\TWD\Dead City
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live
I:\public\AlexiaFlix\functions\TWD\World Beyond
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S3
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1\Twd - daryl dixon - S1  - Ep5.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1\Twd - daryl dixon - S1 - Ep1.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1\Twd - daryl dixon - S1 - Ep2.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1\Twd - daryl dixon - S1 - Ep3.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1\Twd - daryl dixon - S1 - Ep4.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S1\Twd - daryl dixon - S1 - Ep6.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2\TWD - Daryl Dixon - S2 - Ep1.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2\TWD - Daryl Dixon - S2 - Ep2.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2\TWD - Daryl Dixon - S2 - Ep3.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2\TWD - Daryl Dixon - S2 - Ep4.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2\TWD - Daryl Dixon - S2 - Ep5.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S2\TWD - Daryl Dixon - S2 - Ep6.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S3\TWD - Daryl Dixon - S3 - Ep1.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S3\TWD - Daryl Dixon - S3 - Ep2.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S3\TWD - Daryl Dixon - S3 - Ep3.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S3\TWD - Daryl Dixon - S3 - Ep4.mp4
I:\public\AlexiaFlix\functions\TWD\Dayrl Dixon\S3\TWD - Daryl Dixon - S3 - Ep5.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S1
I:\public\AlexiaFlix\functions\TWD\Dead City\S2
I:\public\AlexiaFlix\functions\TWD\Dead City\S1\TWD - Dead City - S1 - Ep1.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S1\TWD - Dead City - S1 - Ep2.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S1\TWD - Dead City - S1 - Ep3.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S1\TWD - Dead City - S1 - Ep4.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S1\TWD - Dead City - S1 - Ep5.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S1\TWD - Dead City - S1 - Ep6.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 1.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 2.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 3.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 4.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 5.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 6.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 7.mp4
I:\public\AlexiaFlix\functions\TWD\Dead City\S2\TWD Dead City - S2 EP 8.mp4
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead\TWD - Tales Of Walking Dead - S1 EP 1.mp4
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead\TWD - Tales Of Walking Dead - S1 EP 2.mp4
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead\TWD - Tales Of Walking Dead - S1 EP 3.mp4
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead\TWD - Tales Of Walking Dead - S1 EP 4.mp4
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead\TWD - Tales Of Walking Dead - S1 EP 5.mp4
I:\public\AlexiaFlix\functions\TWD\Tales Of Walking Dead\TWD - Tales Of Walking Dead - S1 EP 6.mp4
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1\TWD The Ones Who Live - S1 - Ep1.mp4
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1\TWD The Ones Who Live - S1 - Ep2.mp4
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1\TWD The Ones Who Live - S1 - Ep3.mp4
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1\TWD The Ones Who Live - S1 - Ep4.mp4
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1\TWD The Ones Who Live - S1 - Ep5.mp4
I:\public\AlexiaFlix\functions\TWD\The Ones Who Live\S1\TWD The Ones Who Live - S1- Ep6.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP1.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP10.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP2.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP3.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP4.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP5.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP6.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP7.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP8.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S1\TWD - World Beyond - S1 - EP9.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 1.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 10.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 2.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 3.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 4.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 5.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 6.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 7.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 8.mp4
I:\public\AlexiaFlix\functions\TWD\World Beyond\S2\TWD - World Beyond - S2 EP 9.mp4
I:\public\AlexiaFlix\functions\Web\Images
I:\public\AlexiaFlix\functions\Web\Univers
I:\public\AlexiaFlix\functions\Web\Images\A contre sens 3
I:\public\AlexiaFlix\functions\Web\Images\AHS
I:\public\AlexiaFlix\functions\Web\Images\Anastasia
I:\public\AlexiaFlix\functions\Web\Images\Baaria
I:\public\AlexiaFlix\functions\Web\Images\Coexister
I:\public\AlexiaFlix\functions\Web\Images\Cristo
I:\public\AlexiaFlix\functions\Web\Images\Jack et la Mécanique du Coeur
I:\public\AlexiaFlix\functions\Web\Images\James Bond
I:\public\AlexiaFlix\functions\Web\Images\La Flèche et le Flambeau
I:\public\AlexiaFlix\functions\Web\Images\La Petite Voleuse
I:\public\AlexiaFlix\functions\Web\Images\Le Petit Prince
I:\public\AlexiaFlix\functions\Web\Images\Le dîner de con
I:\public\AlexiaFlix\functions\Web\Images\Le prénom
I:\public\AlexiaFlix\functions\Web\Images\MI - Dead Reckoning
I:\public\AlexiaFlix\functions\Web\Images\MI - Fallout
I:\public\AlexiaFlix\functions\Web\Images\MI - Final Reckoning
I:\public\AlexiaFlix\functions\Web\Images\MI - Ghost Protocol
I:\public\AlexiaFlix\functions\Web\Images\MI - Rogue Nation
I:\public\AlexiaFlix\functions\Web\Images\MI1
I:\public\AlexiaFlix\functions\Web\Images\MI2
I:\public\AlexiaFlix\functions\Web\Images\MI3
I:\public\AlexiaFlix\functions\Web\Images\Malèna
I:\public\AlexiaFlix\functions\Web\Images\MonstreParis
I:\public\AlexiaFlix\functions\Web\Images\Palmiers dans la neige
I:\public\AlexiaFlix\functions\Web\Images\Pocahontas
I:\public\AlexiaFlix\functions\Web\Images\Scarface
I:\public\AlexiaFlix\functions\Web\Images\TWD
I:\public\AlexiaFlix\functions\Web\Images\Van Helsing
I:\public\AlexiaFlix\functions\Web\Images\hildafuracao
I:\public\AlexiaFlix\functions\Web\Images\A contre sens 3\A contre sens 3 - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\A contre sens 3\A contre sens 3 - poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\A contre sens 3\À CONTRE-SENS 3 - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\AHS\AHS - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\AHS\AHS - Landscape.jpeg
I:\public\AlexiaFlix\functions\Web\Images\AHS\AHS - Poster.jpeg
I:\public\AlexiaFlix\functions\Web\Images\Anastasia\Anastasia - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Anastasia\Anastasia - Landscape.webp
I:\public\AlexiaFlix\functions\Web\Images\Anastasia\Anastasia - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Baaria\Baaria - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Baaria\Baaria - Landscape.webp
I:\public\AlexiaFlix\functions\Web\Images\Baaria\Baaria - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Coexister\Coexister - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Coexister\Coexister - Landscape.webp
I:\public\AlexiaFlix\functions\Web\Images\Coexister\Coexister - Poster.webp
I:\public\AlexiaFlix\functions\Web\Images\Cristo\Cristo - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Cristo\Cristo - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Cristo\Cristo - Poster.png
I:\public\AlexiaFlix\functions\Web\Images\Jack et la Mécanique du Coeur\Jack et la Mécanique du Coeur - Landscape.webp
I:\public\AlexiaFlix\functions\Web\Images\Jack et la Mécanique du Coeur\Jack et la mécanique du coeur - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Jack et la Mécanique du Coeur\Jack et la mécanique du coeur - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\James Bond\James Bond - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\James Bond\James Bond - Landscape.png
I:\public\AlexiaFlix\functions\Web\Images\James Bond\James Bond - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\La Flèche et le Flambeau\La Flèche et le Flambeau - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\La Flèche et le Flambeau\La Flèche et le Flambeau - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\La Flèche et le Flambeau\La Flèche et le Flambeau - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\La Petite Voleuse\La Petite Voleuse - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\La Petite Voleuse\La Petite Voleuse - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\La Petite Voleuse\La Petite Voleuse - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Le Petit Prince\Le Petit Prince - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Le Petit Prince\Le Petit Prince - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Le Petit Prince\Le Petit Prince - Poster.webp
I:\public\AlexiaFlix\functions\Web\Images\Le dîner de con\Le diner de con - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Le dîner de con\Le diner de con - Poster.png
I:\public\AlexiaFlix\functions\Web\Images\Le dîner de con\Le dîner de con - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Le prénom\Le prénom - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Le prénom\Le prénom - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Le prénom\Le prénom - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Dead Reckoning\MI Dead Reckoning - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI - Dead Reckoning\MI Dead Reckoning - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Dead Reckoning\MI Dead Reckoning - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Fallout\MI Fallout - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI - Fallout\MI Fallout - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Fallout\MI Fallout - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Final Reckoning\MI Final Reckoning - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI - Final Reckoning\MI Final Reckoning - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Final Reckoning\MI Final Reckoning - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Ghost Protocol\MI Ghost Protocol - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI - Ghost Protocol\MI Ghost Protocol - Landscape.webp
I:\public\AlexiaFlix\functions\Web\Images\MI - Ghost Protocol\MI Ghost Protocol - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Rogue Nation\MI Rogue Nation - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI - Rogue Nation\MI Rogue Nation - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI - Rogue Nation\MI Rogue Nation - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI1\MI1 - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI1\MI1 - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI1\MI1 - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI2\MI2 - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI2\MI2 - Landscape.jpeg
I:\public\AlexiaFlix\functions\Web\Images\MI2\MI2 - Poster.webp
I:\public\AlexiaFlix\functions\Web\Images\MI3\MI3 - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MI3\MI3 - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MI3\MI3 - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Malèna\Malèna - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Malèna\Malèna - Landscape.png
I:\public\AlexiaFlix\functions\Web\Images\Malèna\Malèna - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\MonstreParis\Monstre Paris - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\MonstreParis\Monstre Paris - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\MonstreParis\Monstre Paris - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Palmiers dans la neige\Palmiers dans la neige - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Palmiers dans la neige\Palmiers dans la neige - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Palmiers dans la neige\Palmiers dans la neige - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Pocahontas\Pocahontas - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Pocahontas\Pocahontas - Landscape.webp
I:\public\AlexiaFlix\functions\Web\Images\Pocahontas\Pocahontas - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\Scarface\Scarface - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Scarface\Scarface - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Scarface\Scarface - poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Daryl Dixon
I:\public\AlexiaFlix\functions\Web\Images\TWD\Dead City
I:\public\AlexiaFlix\functions\Web\Images\TWD\Tales Of The Walking Dead
I:\public\AlexiaFlix\functions\Web\Images\TWD\The One Who Live
I:\public\AlexiaFlix\functions\Web\Images\TWD\World Beyond
I:\public\AlexiaFlix\functions\Web\Images\TWD\Daryl Dixon\Daryl Dixon - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\TWD\Daryl Dixon\Daryl Dixon - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Daryl Dixon\Daryl Dixon - poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Dead City\Dead City - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\TWD\Dead City\Dead City - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Dead City\Dead City - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Tales Of The Walking Dead\Tales Of The Walking Dead Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Tales Of The Walking Dead\Tales Of the Walking Dead - Landscape.jpeg
I:\public\AlexiaFlix\functions\Web\Images\TWD\Tales Of The Walking Dead\Tales of TWD - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\TWD\The One Who Live\TWD The Ones Who Live - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\TWD\The One Who Live\The One Who Live - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\The One Who Live\The One Who Live - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\World Beyond\TWD World Beyond - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\TWD\World Beyond\World Beyond - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\TWD\World Beyond\World Beyond - Poster.jpeg
I:\public\AlexiaFlix\functions\Web\Images\Van Helsing\Van Helsing - Extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\Van Helsing\Van Helsing - Landscape.jpg
I:\public\AlexiaFlix\functions\Web\Images\Van Helsing\Van Helsing - Poster.jpg
I:\public\AlexiaFlix\functions\Web\Images\hildafuracao\hildafuracao - extrait.mp4
I:\public\AlexiaFlix\functions\Web\Images\hildafuracao\hildafuracao - landscape.jpeg
I:\public\AlexiaFlix\functions\Web\Images\hildafuracao\hildafuracao - poster.jpg
I:\public\AlexiaFlix\functions\Web\Univers\AHS
I:\public\AlexiaFlix\functions\Web\Univers\Disney
I:\public\AlexiaFlix\functions\Web\Univers\Hello Kitty - Main
I:\public\AlexiaFlix\functions\Web\Univers\James Bond
I:\public\AlexiaFlix\functions\Web\Univers\MI
I:\public\AlexiaFlix\functions\Web\Univers\Netflix
I:\public\AlexiaFlix\functions\Web\Univers\Open site.mp3
I:\public\AlexiaFlix\functions\Web\Univers\TWD
I:\public\AlexiaFlix\functions\Web\Univers\Tottaly Spies
I:\public\AlexiaFlix\functions\Web\Univers\Hello Kitty - Main\HK - Click.mp3
I:\public\AlexiaFlix\functions\Web\Univers\Hello Kitty - Main\HK - Interface.png
I:\public\AlexiaFlix\functions\Web\Univers\Hello Kitty - Main\HK - Logo.png
I:\public\AlexiaFlix\functions\Web\Univers\Hello Kitty - Main\HK - Notif.mp3
I:\public\AlexiaFlix\functions\Web\Univers\Hello Kitty - Main\HK - Play Media.mp3
I:\public\AlexiaFlix\functions\Web\Univers\Netflix\Logo.ico
I:\public\AlexiaFlix\functions\Web\Univers\Netflix\Logo.png
`;

// ALGORITHME DE DÉTECTION DE RACINE
let rawLines = rawList.split('\n').map(l => l.trim()).filter(l => l.length > 0);
rawLines = rawLines.map(l => l.replace(/\\+/g, '/').replace(/\/+/g, '/'));

let commonPrefix = rawLines[0].split('/');
commonPrefix.pop(); 
for (let i = 1; i < rawLines.length; i++) {
    let parts = rawLines[i].split('/');
    for (let j = 0; j < commonPrefix.length; j++) {
        if (commonPrefix[j] !== parts[j]) {
            commonPrefix = commonPrefix.slice(0, j);
            break;
        }
    }
}
let baseDir = commonPrefix.join('/') + (commonPrefix.length > 0 ? '/' : '');
const paths = rawLines.map(p => p.startsWith(baseDir) ? p.substring(baseDir.length) : p);

const encodePath = (p) => encodeURI(p).replace(/'/g, "%27").replace(/#/g, "%23").replace(/\+/g, "%2B");
const cleanStr = (s) => s ? s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-_]/g, " ") : '';

const getMeta = (folderKw) => {
    let meta = { poster: null, landscape: null, extrait: null };
    if(!folderKw) return meta;
    let kw = cleanStr(folderKw);
    let related = paths.filter(p => cleanStr(p).startsWith('web/images/') && cleanStr(p).includes(kw));
    let p = related.find(x => cleanStr(x).includes('poster'));
    let l = related.find(x => cleanStr(x).includes('landscape'));
    let e = related.find(x => cleanStr(x).includes('extrait') && x.toLowerCase().endsWith('.mp4'));
    if(p) meta.poster = ROOT_PATH + encodePath(p);
    if(l) meta.landscape = ROOT_PATH + encodePath(l);
    if(e) meta.extrait = ROOT_PATH + encodePath(e);
    return meta;
};

// CONSTRUCTION FILMS ET SERIES (Code précédent conservé car fonctionnel)
const filmOverrides = { "A contre-sens 3.mp4": "A contre sens 3", "Comte Monte Cristo.mp4": "Cristo", "Le PrEnom.mp4": "Le prénom", "Le diner de con.mp4": "Le dîner de con", "MalEna.mp4": "Malèna", "Un monstre a Paris.mp4": "MonstreParis", "Mission Impossible 1.mp4": "MI1", "Mission Impossible 2.mp4": "MI2", "Mission Impossible 3.mp4": "MI3", "Mission Impossible 4.mp4": "MI - Ghost Protocol", "Mission Impossible 5.mp4": "MI - Rogue Nation", "Mission Impossible 6.mp4": "MI - Fallout", "MI - Dead Reckoning.mp4": "MI - Dead Reckoning", "MI - Final Reckoning.mp4": "MI - Final Reckoning" };
const filmPaths = paths.filter(p => !p.startsWith('Bonus/') && !p.startsWith('Jeux/') && !p.startsWith('Web/') && !p.endsWith('.ini') && !p.startsWith('AHS/') && !p.startsWith('Hilda Furacao/') && !p.startsWith('TWD/') && p.toLowerCase().endsWith('.mp4'));
filmPaths.forEach(f => {
    const filename = f.split('/').pop();
    let title = filename.replace('.mp4', '');
    if(title === "Le PrEnom") title = "Le Prénom";
    if(title === "MalEna") title = "Malèna";
    if(title === "Un monstre a Paris") title = "Un monstre à Paris";
    if(f.startsWith('James Bond/')) title = "James Bond - " + title;
    const searchFolder = filmOverrides[filename] || title;
    const meta = getMeta(searchFolder);
    window.alexiaData.films.push({ title, path: ROOT_PATH + encodePath(f), ...meta });
});

const seriesMap = { "AHS": { path: "AHS", meta: "AHS" }, "Hilda Furacao": { path: "Hilda Furacao", meta: "hildafuracao" }, "TWD - Daryl Dixon": { path: "TWD/Dayrl Dixon", meta: "Daryl Dixon" }, "TWD - Dead City": { path: "TWD/Dead City", meta: "Dead City" }, "TWD - Tales Of The Walking Dead": { path: "TWD/Tales Of Walking Dead", meta: "Tales Of The Walking Dead" }, "TWD - The Ones Who Live": { path: "TWD/The Ones Who Live", meta: "The One Who Live" }, "TWD - World Beyond": { path: "TWD/World Beyond", meta: "World Beyond" } };
Object.keys(seriesMap).forEach(key => {
    const conf = seriesMap[key];
    window.alexiaData.series[key] = { title: key, ...getMeta(conf.meta), episodes: [] };
    paths.filter(p => p.startsWith(conf.path + '/') && p.toLowerCase().endsWith('.mp4')).forEach(ep => {
        const file = ep.split('/').pop();
        const sMatch = file.match(/[sS](\d+)/), eMatch = file.match(/[eE][pP]?\s*(\d+)/);
        window.alexiaData.series[key].episodes.push({ title: `S${sMatch?parseInt(sMatch[1]):1} - Épisode ${eMatch?parseInt(eMatch[1]):0}`, path: ROOT_PATH + encodePath(ep), saisonNum: sMatch?parseInt(sMatch[1]):1, epNum: eMatch?parseInt(eMatch[1]):0 });
    });
});

paths.filter(p => p.startsWith('Bonus/') && p.includes('.')).forEach(b => {
    const title = b.split('/').pop().replace(/\.[^/.]+$/, "");
    window.alexiaData.bonus.push({ title, path: ROOT_PATH + encodePath(b), poster: (b.toLowerCase().endsWith('.jpg') || b.toLowerCase().endsWith('.png')) ? ROOT_PATH + encodePath(b) : null, episodes: [{ title: "Accéder au Bonus", path: ROOT_PATH + encodePath(b), saisonNum: 1, epNum: 1 }] });
});

paths.filter(p => p.startsWith('Jeux/') && p.toLowerCase().endsWith('.html')).forEach(a => {
    const title = a.split('/').pop().replace('.html', '');
    const iconPath = paths.find(p => p.startsWith('Jeux/') && p.includes(title) && (p.toLowerCase().endsWith('.png') || p.toLowerCase().endsWith('.jpg')));
    window.alexiaData.apps.push({ title, path: ROOT_PATH + encodePath(a), icon: iconPath ? ROOT_PATH + encodePath(iconPath) : null });
});

// --- CORRECTION DE L'INDEX DES THÈMES ---
// Détection automatique des dossiers dans Web/Univers
const themeFolders = [...new Set(paths
    .filter(p => p.startsWith('Web/Univers/') && p.split('/').length >= 3)
    .map(p => p.split('/')[2])
    .filter(name => name && !name.includes('.')) 
)];

themeFolders.forEach(t => {
    const tPaths = paths.filter(p => p.startsWith(`Web/Univers/${t}/`));
    const getT = (kw) => { 
        const f = tPaths.find(p => cleanStr(p).includes(cleanStr(kw))); 
        return f ? ROOT_PATH + encodePath(f) : null; 
    };
    
    window.alexiaData.themes[t] = {
        logo: getT('logo.png') || getT('logo.jpg') || getT('logo.ico') || getT('Interface.png'),
        sounds: {
            click: getT('click.mp3') || getT('click.wav'),
            notif: getT('notif.mp3') || getT('notif.wav'),
            open: getT('play media.mp3') || getT('open site.mp3') || getT('open.mp3')
        }
    };
});

console.log("🔥 Cluster Thèmes Synchro :", Object.keys(window.alexiaData.themes));