$(document).ready(function () {
   // Funzione che verifica se la finestra è in modalità mobile (larghezza < 768px)
   function isMobile() {
      return window.innerWidth < 768;
   }

   // Funzione che mostra o nasconde le card e il bottone in base alla dimensione dello schermo
   function updateCardVisibility() {
      if (isMobile()) { 
         // Se siamo su dispositivo mobile
         $('.toggleable-card').hide();    // Nascondo tutte le card con classe 'toggleable-card'
         $('#toggleCardsBtn').show();     // Mostro il bottone per mostrare/nascondere le card
         $('#toggleCardsBtn').text('Mostra'); // Imposto il testo del bottone su "Mostra" come stato iniziale
      } else {
         // Se siamo su desktop (schermo grande)
         $('.toggleable-card').show();    // Mostro tutte le card
         $('#toggleCardsBtn').hide();     // Nascondo il bottone perché non serve su desktop
      }
   }

   // Gestione evento click sul bottone con id 'toggleCardsBtn'
   $('#toggleCardsBtn').on('click', function () {
      // Faccio uno slideToggle (animazione di apparizione/scomparsa) delle card
      $('.toggleable-card').slideToggle(300, function() {
         // Dopo che l'animazione è terminata controllo se le card sono visibili
         if ($('.toggleable-card').is(':visible')) {
            $('#toggleCardsBtn').text('Nascondi'); // Se visibili cambio testo bottone in "Nascondi"
         } else {
            $('#toggleCardsBtn').text('Mostra');  // Se nascoste cambio testo bottone in "Mostra"
         }
      });
   });

   // Funzione che controlla il numero di card toggleable e modifica il bottone di conseguenza
   function checkCardsCount() {
      if ($('.toggleable-card').length === 0) {
         // Se non ci sono card toggleable nascondo completamente il bottone perché non serve
         $('#toggleCardsBtn').hide();
      } else if ($('.toggleable-card').length === 1) {
         // Se c'è solo una card toggleable
         $('#toggleCardsBtn').text('Mostra'); // Imposto il testo "Mostra"
         $('#toggleCardsBtn').show();          // Mostro il bottone
         $('.toggleable-card').hide();         // Nascondo di default la card
      }
   }

   // Eseguo la funzione all'avvio per settare visibilità iniziale
   updateCardVisibility();
   checkCardsCount();

   // Quando la finestra viene ridimensionata aggiorno visibilità delle card e bottone
   $(window).on('resize', function () {
      updateCardVisibility();
      checkCardsCount();
   });
});


// Quando il contenuto della pagina è stato completamente caricato
window.addEventListener("DOMContentLoaded", () => {
   loadDarkModePreference();

   //Toggle Hamburger Menu
   const hamburgerBtn = document.getElementById('hamburger-btn');
   const navMenu = document.getElementById('nav-menu');

   hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
   });

   // Chiudi il menu hamburger quando si clicca su un link (mobile)
   document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
         navMenu.classList.remove('open');
      });
   });
   
   //imposta il valore predefinito dell'input datetime alle 9:30 di oggi
   const input = document.getElementById("datetime");
   const now = new Date();
   now.setHours(9, 30, 0, 0);//Imposta ora a 09:30:00.000

   // Funzione per aggiungere uno zero iniziale ai numeri < 10
   const pad = (n) => n.toString().padStart(2, '0');

   // Formatta la data e ora in formato accettato dal campo datetime-local
   const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
   
   // Imposta il valore iniziale del campo datetime
   input.value = formatted;
   
   // Imposta la data minima consentita per l’input
   setMinDateTime("datetime");
   
   //Gestione form della newsletter
   const formRegNew = document.getElementById("myForm");
   const nomeInput = document.getElementById("inp_news_nome");
   const emailInput = document.getElementById("inp_news_mail");
   const errorNome = document.getElementById("error-nome");
   const errorEmail = document.getElementById("error-email");

   //Regex standard
    const nomeRegex = /^[A-Za-zÀ-Ý][a-zà-ÿ]+(?:[ '-][A-ZÀ-Ýa-zà-ÿ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   //Validazione live mentre si scrive
   nomeInput.addEventListener('input', () => validateInput(nomeInput, nomeRegex, errorNome));
   emailInput.addEventListener('input', () => validateInput(emailInput, emailRegex, errorEmail));

   // Funzione di validazione campo
   function validateInput(input, regex, errorElement) {
      if (regex.test(input.value.trim())) {
         input.classList.add('valid');
         input.classList.remove('invalid');

         errorElement.style.display = "none";
         return true;
      } else {
         input.classList.add('invalid');
         input.classList.remove('valid');

         errorElement.style.display = "block";
         return false;
      }
   }

   formRegNew.addEventListener("submit", function (event) {

      const isNomeValid = validateInput(nomeInput, nomeRegex, errorNome);
      const isEmailValid = validateInput(emailInput, emailRegex, errorEmail);

      event.preventDefault(); // Evita il ricaricamento della pagina

      if (!isNomeValid || !isEmailValid) {
        alert('Per favore compila correttamente tutti i campi.');
      } else {
         // Recupera i dati inseriti
         const nome = document.getElementById("inp_news_nome").value;
         const mail = document.getElementById("inp_news_mail").value;

         // Costruisce l'oggetto con i dati
         const formData = {
            name: nome,
            email: mail
         }

         // Mostra i dati in un alert
         alert(`Dati inseriti per la registrazione della Newsletter:\nUsername: ${formData.name}\nEmail: ${formData.email}`);

         // Pulisce i campi del form
         nomeInput.value = "";
         emailInput.value = "";

         // Rimuove le classi di validazione solo se erano valide
         nomeInput.classList.remove('valid');
         emailInput.classList.remove('valid');
      }
      
   });
   
   // Gestione form di registrazione utente
   const formReg = document.getElementById("form_registrazione");

   formReg.addEventListener("submit", (event) => {
      event.preventDefault();

      // Recupera tutti i valori dei campi
      const nome = document.getElementById("nome").value;
      const mail = document.getElementById("mail").value;
      const user = document.getElementById("username").value;
      const pswd = document.getElementById("pswd").value;
      const data = document.getElementById("datetime").value;
      const sesso = document.getElementById("sesso").value;
      // const pr = document.getElementById("cbox").value;
      const pr = document.getElementById("cbox").checked ? "Accettata" : "Non accettata";
      
      // Costruisce l'oggetto con i dati del form
      const formData = {
         fullname: nome,
         email: mail,
         username: user,
         password: pswd,
         date: data,
         gender: sesso,
         privacy: pr
      };
      
       // Mostra un alert con tutti i dati inseriti
      alert(`Dati inseriti per la registrazione:\nNome Completo: ${formData.fullname}\nEmail: ${formData.email}\nUsername: ${formData.username}\nPassword: ${formData.password}\nData: ${formData.date}\nSesso: ${formData.gender}\nPrivacy: ${formData.privacy}`);
      
      // Pulisce i campi del form
      document.getElementById("nome").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("username").value = "";
      document.getElementById("pswd").value = "";
      document.getElementById("datetime").value = "";
      document.getElementById("sesso").value = "";
      document.getElementById("cbox").checked = false;
      
   });
});

// Funzione per caricare il tema salvato dal localStorage
function loadDarkModePreference() {
   const body = document.body;
   const icon = document.getElementById("dark_icon");
   const progressImgCentre = document.getElementById("progress-img-centre");
   const progressImg = document.getElementById("progress-img");
   const progressImgL = document.getElementById("progress-img-l");
   
   // Recupera la preferenza salvata (default: false se non esiste)
   const isDarkMode = localStorage.getItem('darkMode') === 'true';
   
   if (isDarkMode) {
      // Applica il tema scuro
      body.classList.add("dark-mode");
      if (icon) icon.textContent = "☀️";
      if (progressImgCentre) progressImgCentre.src = "image/duffy_dark_centre.jpeg";
      if (progressImg) progressImg.src = "image/duffy_dark.png";
      if (progressImgL) progressImgL.src = "image/duffy_dark.png";
   } else {
      // Applica il tema chiaro
      body.classList.remove("dark-mode");
      if (icon) icon.textContent = "🌙";
      if (progressImgCentre) progressImgCentre.src = "image/duffy.jpg";
      if (progressImg) progressImg.src = "image/duffy_second.jpg";
      if (progressImgL) progressImgL.src = "image/duffy_second.jpg";
   }
}

// Funzione per attivare/disattivare la modalità scura
function toggleDarkMode() {
   const body = document.body;
   const icon = document.getElementById("dark_icon");
   const progressImgCentre = document.getElementById("progress-img-centre");
   const progressImg = document.getElementById("progress-img");
   const progressImgL = document.getElementById("progress-img-l");
   
   // Attiva/disattiva la classe dark-mode sul body
   body.classList.toggle("dark-mode");
   
   // Salva la preferenza nel localStorage
   const isDarkMode = body.classList.contains("dark-mode");
   localStorage.setItem('darkMode', isDarkMode);
   
   // Cambia l'icona e le immagini a seconda del tema attivo
   if (isDarkMode) {
      if (icon) icon.textContent = "☀️"; // Sole = torna alla modalità chiara
      if (progressImgCentre) progressImgCentre.src = "image/duffy_dark_centre.jpeg";
      if (progressImg) progressImg.src = "image/duffy_dark.png";     
      if (progressImgL) progressImgL.src = "image/duffy_dark.png";
   } else {
      if (icon) icon.textContent = "🌙"; // Luna = passa a dark mode
      if (progressImgCentre) progressImgCentre.src = "image/duffy.jpg";
      if (progressImg) progressImg.src = "image/duffy_second.jpg";   
      if (progressImgL) progressImgL.src = "image/duffy_second.jpg";
   }
}

// // Funzione per attivare/disattivare la modalità scura
// function toggleDarkMode() {
//    const body = document.body;
//    const icon = document.getElementById("dark_icon");
//    const progressImgCentre = document.getElementById("progress-img-centre")
//    const progressImg = document.getElementById("progress-img");
//    const progressImgL = document.getElementById("progress-img-l");
   
//    // Attiva/disattiva la classe dark-mode sul body
//    body.classList.toggle("dark-mode");
   
//    // Cambia l'icona e le immagini a seconda del tema attivo
//    if (body.classList.contains("dark-mode")) {
//       icon.textContent = "☀️"; // Sole = torna alla modalità chiara
//       progressImgCentre.src = "image/duffy_dark_centre.jpeg";
//       progressImg.src = "image/duffy_dark.png";     
//       progressImgL.src = "image/duffy_dark.png";
//    } else {
//       icon.textContent = "🌙"; // Luna = passa a dark mode
//       progressImgCentre.src = "image/duffy.jpg";
//       progressImg.src = "image/duffy_second.jpg";   
//       progressImgL.src = "image/duffy_second.jpg";
//    }
// }

// Imposta una data e ora minima per un input di tipo datetime-local
function setMinDateTime(inputId, hour = 9, minute = 30) {
  const input = document.getElementById(inputId);
  if (!input) return; // Se l'input non esiste, esci

  const now = new Date();
  now.setHours(hour, minute, 0, 0); // Imposta l'orario desiderato

  const pad = n => String(n).padStart(2, '0');
  const formattedMin = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

  input.min = formattedMin; // Imposta il valore minimo
}


