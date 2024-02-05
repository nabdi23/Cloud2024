let totalNotes = 0;
let evaluationsCount = 0;

function soumettreEvaluation() {
    const note = parseFloat(document.getElementById('note').value);
    const commentaire = document.getElementById('commentaire').value;

    // Ajout de  la note à la somme totale et augmenter le nombre d'évaluations
    totalNotes += note;
    evaluationsCount++;

    // Calcul de la moyenne
    const moyenne = totalNotes / evaluationsCount;

    // Mets à jour l'affichage de la moyenne
    document.getElementById('moyenne').textContent = moyenne.toFixed(2);

    
    console.log("Note: " + note);
    console.log("Commentaire: " + commentaire);
}
