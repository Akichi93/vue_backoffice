export const calculerNombreJours = ({ debut, fin }) => {

    // Convertir les chaînes de date en objets Date
    const dateDebut = new Date(debut);
    const dateFin = new Date(fin);

    // Calculer la différence entre les dates en millisecondes
    const differenceEnMillisec = dateFin - dateDebut;

    // Convertir la différence en jours
    const differenceEnJours = differenceEnMillisec / (1000 * 3600 * 24);

    // Retourner le nombre de jours arrondi à l'entier le plus proche
    return Math.round(differenceEnJours);
}