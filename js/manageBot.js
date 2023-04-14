// Définition des profils de bot
const botProfiles = [
  {
    name: "Bigard",
    description: "C'est Jean-Marie Bigard ma cou***asse",
    avatar: "https://pbs.twimg.com/profile_images/1251079718230769665/UwS8b60k_400x400.jpg"
  },
  {
    name: "PNJ",
    description: "Je trouve Bigard offensant, en plus d'avoir le meme prenom qu'un facho.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX77Zhm9zgh4fxRFWzgc_-A0BurgLG4HbT1A&usqp=CAU"
  },
  {
    name: "Le mousatchu",
    description: "Tu me connais bien :)",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7bSJBWBMwNSGttlwJipdjoREYWNkGsZAv7w&usqp=CAU"
  }
];

// Sélectionne l'élément HTML où les profils de bot seront affichés
const userProfilesList = document.getElementById("list-participant");

// Sélectionne l'élément HTML où les messages seront affichés
const chatBox = document.getElementById("chat-box");

// Sélectionne l'élément HTML où le message de l'utilisateur sera saisi
const inputMessage = document.getElementById("user-message");

// Sélectionne l'élément HTML du bouton pour envoyer un message
const sendMessageButton = document.getElementById("send-message");

const today = new Date();

/**********************Permet d'afficher le message entré par le user**********************/
function showUserMessage() {
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const insertBefore = document.getElementById("before-that");

  // Récupère le message de l'utilisateur
  const userMessage = inputMessage.value;

  // Création de la 'card' pour afficher le message de l'utilisateur
  const msgLi = document.createElement("li");
  msgLi.classList.add("d-flex", "justify-content-between", "mb-4");

  msgLi.innerHTML = `
    <div class="card w-100">
      <div class="card-header d-flex justify-content-between p-3">
          <p class="fw-bold mb-0">Moi</p>
          <p class="text-muted small mb-0"><i class="far fa-clock"></i>${time}</p>
      </div>
      <div class="card-body">
          <p class="mb-0">
            ${userMessage}
          </p>
      </div>
    </div>
    <img src="https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="avatar"
        class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
  `
  chatBox.insertBefore(msgLi, insertBefore);

  // Réinitialise le champ de saisie de message de l'utilisateur
  inputMessage.value = "";
}
/******************************************************************************************/


/*****************************************************************************/
function botResponse() {

}
/*****************************************************************************/

/**************************Affiche une liste de bot**************************/
botProfiles.forEach((botProfile) => {
  // Crée un élément de div pour chaque profil de bot
  const userProfileLi = document.createElement("li");
  userProfileLi.classList.add("p-2", "d-flex", "justify-content-between");

  // Ajoute les informations de chaque profil de bot à l'élément de div créé
  userProfileLi.innerHTML = `
    <div class="d-flex flex-row">
      <img src="${botProfile.avatar}"
          alt="avatar"
          class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
          width="60">
      <div class="pt-1">
          <p class="fw-bold mb-0">${botProfile.name}</p>
          <p class="small text-muted">${botProfile.description}</p>
      </div>
    </div>
  `;

  // Ajoute l'élément de div avec les informations de profil de bot au conteneur HTML
  userProfilesList.appendChild(userProfileLi);
});
/*****************************************************************************/


// Ajoute un écouteur d'événements "keypress" à l'élément de saisie de message de l'utilisateur
inputMessage.addEventListener("keypress", (event) => {
  // Vérifie si la touche "Entrée" est enfoncée (code de touche 13)
  if (event.key === 'Enter') {
    // Empêche la soumission du formulaire par défaut
    event.preventDefault();

    // Traite le message de l'utilisateur
    showUserMessage();
  }
});
