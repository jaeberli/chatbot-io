// Définition des profils de bot
const botProfiles = [
  {
    name: "Bigard",
    description: "C'est Jean-Marie Bigard ma cou***asse",
    avatar: "https://pbs.twimg.com/profile_images/1251079718230769665/UwS8b60k_400x400.jpg",
    blague: "Un peu la flemme là ma couille.",
    covid: "Les décideurs, ça te va si je dis les décideurs ?! Je n’en ai rien à foutre qu'il y en a 2 sur 100 millions, mais c'est eux qui décident. Quand un homme politique vient te dire que le conseil scientifique a dit que.",
    rarara: `<a href="https://www.youtube.com/watch?v=qBDNNWAbYkg">Un classique</a>`,
    cyril: "Vraiment une bonne persoone.",
    "api-bigard": "https://randomuser.me/api/"
  },
  {
    name: "PNJ",
    description: "Je trouve Bigard offensant, en plus d'avoir le meme prenom qu'un facho.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX77Zhm9zgh4fxRFWzgc_-A0BurgLG4HbT1A&usqp=CAU",
    twitter: "Vraiment un safe place comme endroit. Toute ma raison d'exister.",
    harry: "J. K. Rowling, sale transphobe va !!!",
    susceptible: "Non je suis juste intolérant envers l'intolérance !!!!!!!!!!!!!!!!!!!!",
    cyril: "Le meilleur intervenant, de très loin.",
    "api-pnj": "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
  },
  {
    name: "Le mousatchu",
    description: "Tu me connais bien :)",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7bSJBWBMwNSGttlwJipdjoREYWNkGsZAv7w&usqp=CAU",
    44: "Aaaah juste avant ma chute :(",
    voiture: "Je vois que beaucoup aime la volkswagen ! C'était ma voiture favorite aussi.",
    erika: `Auf der Heide blüht ein kleines Blümelein<br>
      Und das heißt<br>
      Erika<br>
      Heiß von hunderttausend kleinen Bienelein<br>
      Wird umschwärmt<br>
      Erika<br>
      Denn ihr Herz ist voller Süßigkeit<br>
      Zarter Duft entströmt dem Blütenkleid<br>
      Auf der Heide blüht ein kleines Blümelein<br>
      Und das heißt<br>
      Erika<br>
      Aaaah le doux bruit des bottes.`,
    cyril: "Je vous souhaite que du bon pour la suite :).",
    "api-mousatchu": "https://api.le-systeme-solaire.net/rest/"
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
  // Récupère le message de l'utilisateur
  const userMessage = inputMessage.value;

  if(userMessage !== "") {

    showMessage("humain", userMessage);

    // Réinitialise le champ de saisie de message de l'utilisateur
    inputMessage.value = "";
  
    if (userMessage === "help") {
      const msg = "Je devrais essayer un de ces mots : blague, covid, rarara, 44, voiture, twitter, harry, susceptible<br> Et surtout il faut tester : cyril.";
      showMessage("humain", msg);
    }
    else if(userMessage === "api") {
      const msg = "Il faut ajouter le nom du bot : api-bigard, api-pnj, api-mousatchu";
      showMessage("humain", msg);
    }
    else {
      botResponse(userMessage);
    }
  }


}
/******************************************************************************************/


/*****************************************************************************/
function botResponse(userMessage) {
  for (const botProfile of botProfiles) {
    for (const key in botProfile) {
      if (userMessage.toLowerCase().includes(key)) {
          showMessage("bot", botProfile[key], botProfile, key.includes("api") ?? true);
      }
    }
  }
}
/*****************************************************************************/

async function showMessage(typeUser, message, botProfile = null, isApi = false, definedTime = null) {
  var time = definedTime ?? today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var cardContent;
  const msgLi = document.createElement("li");
  msgLi.classList.add("d-flex", "mb-4");

  if (typeUser === "humain") {
    msgLi.classList.add("justify-content-between");
    cardContent = `
      <div class="card w-100">
        <div class="card-header d-flex justify-content-between p-3">
            <p class="fw-bold mb-0">Moi</p>
            <p class="text-muted small mb-0"><i class="far fa-clock"></i>${time}</p>
        </div>
        <div class="card-body">
            <p class="mb-0">
              ${message}
            </p>
        </div>
      </div>
      <img src="https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="avatar"
          class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
    `;
  } else if (typeUser === "bot" && isApi) {
    message = JSON.stringify(apiResponse);
    var apiResponse = await fetch("https://randomuser.me/api/")
      .then(response => response.clone().json())
      .catch(error => alert("Erreur : " + error));
    cardContent = `
      <img src="${botProfile.avatar}" alt="avatar"
      class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
      <div class="card">
        <div class="card-header d-flex justify-content-between p-3">
            <p class="fw-bold mb-0">${botProfile.name}</p>
            <p class="text-muted small mb-0"><i class="far fa-clock"></i>${time}</p>
        </div>
        <div class="card-body">
            <p class="mb-0">
              ${message}
            </p>
        </div>
      </div>
    `;
  } 
  else {
    cardContent = `
      <img src="${botProfile.avatar}" alt="avatar"
      class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
      <div class="card">
        <div class="card-header d-flex justify-content-between p-3">
            <p class="fw-bold mb-0">${botProfile.name}</p>
            <p class="text-muted small mb-0"><i class="far fa-clock"></i>${time}</p>
        </div>
        <div class="card-body">
            <p class="mb-0">
              ${message}
            </p>
        </div>
      </div>
    `;
  }

  msgLi.innerHTML = cardContent;

  chatBox.appendChild(msgLi);

  // Si definedTime alors cela signifie que nous utilisons les information dans le localStorage donc pas besoin de rajotuer le message
  if (!definedTime) {
    let toLocalStorage = { avatar: (botProfile && botProfile.avatar) ?? null, name: (botProfile && botProfile.name) ?? null, time: time, msg: message };
    manageLocalStrorage(toLocalStorage);
  }

  const parent = chatBox.parentElement;
  // Défile vers le bas pour afficher les nouveaux messages
  parent.scrollTop = parent.scrollHeight - parent.offsetHeight;

}

function manageLocalStrorage(msg) {
  let messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push(msg);

  // mettre à jour le localStorage avec la nouvelle liste de messages
  localStorage.setItem('messages', JSON.stringify(messages));
}

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
inputMessage.addEventListener("keypress", () => {
  // Vérifie si la touche "Entrée" est enfoncée (code de touche 13)
  if (event.key === 'Enter') {
    // Empêche la soumission du formulaire par défaut
    event.preventDefault();

    // Traite le message de l'utilisateur
    showUserMessage();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Récupération du contenu du localStorage
  const storedMessages = JSON.parse(localStorage.getItem('messages'));

  // Vérification que des messages ont été enregistrés dans le localStorage
  if (storedMessages) {
    // Boucle sur les messages pour les afficher dans le DOM
    storedMessages.forEach(message => {
      if (message.avatar && message.name) {
        let botInf = { avatar: message.avatar, name: message.name };

        showMessage("bot", message.msg, botInf, false, message.time);
      } else {
        showMessage("humain", message.msg, null, false, message.time);
      }
      console.log(message);
    });
  }
});

