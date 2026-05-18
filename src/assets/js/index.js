document.addEventListener("DOMContentLoaded", () => {
  // 1. Configuration de l'observateur
  const observerOptions = {
    root: null, // Utilise le viewport du navigateur
    rootMargin: "0px", 
    threshold: 0.15 // Déclenche l'animation quand 15% de l'élément est visible
  };

  // 2. Création de l'observateur
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si l'élément entre dans le viewport
      if (entry.isIntersecting) {
        // On lui ajoute la classe qui lance l'animation
        entry.target.classList.add('is-visible');
        
        // Une fois animé, on arrête de l'observer (l'animation reste acquise)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 3. Cibler tous les éléments qui possèdent une de tes classes d'animation
  const elementsToAnimate = document.querySelectorAll(
    '.animate-oblique-left, .animate-oblique-right, .animate-oblique-left-to-right, .animate-oblique-right-to-left, .animate-fade-up, .animate-to-top'
  );

  // 4. Lancer l'observation sur chaque élément détecté
  elementsToAnimate.forEach(element => {
    animationObserver.observe(element);
  });
});

// choix langue
const selector = document.getElementById('languageSelector');
  const list = document.getElementById('languageList');

  // Ouvrir/Fermer le menu
  selector.addEventListener('click', () => {
    list.classList.toggle('hidden');
  });

  // Changer la langue
  function changeLang(lang, flagUrl) {
    document.getElementById('selectedText').innerText = lang;
    document.getElementById('selectedFlag').src = flagUrl;
    list.classList.add('hidden'); // Fermer après sélection
    console.log("Langue changée en : " + lang);
  }

  // Fermer si on clique ailleurs
  window.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) list.classList.add('hidden');
  });

  // choix pays
  const selectorCountry = document.getElementById('countrySelector');
  const listCountry = document.getElementById('countryList');

  // Ouvrir/Fermer le menu
  selectorCountry.addEventListener('click', () => {
    listCountry.classList.toggle('hidden');
  });

  // Choisir le pays
  function changeCountry(country, flagZUrl) {
    document.getElementById('selectedCountryText').innerText = country;
    document.getElementById('selectedCountryFlag').src = flagZUrl;
    listCountry.classList.add('hidden'); // Fermer après sélection
    console.log("Pays changé en : " + country);
  }

  // Fermer si on clique ailleurs
  window.addEventListener('click', (e) => {
    if (!selectorCountry.contains(e.target)) listCountry.classList.add('hidden');
  });




  // --- SECTION SLIDER ---
  const track = document.getElementById('sliderTrack');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  
  // On vérifie si les boutons du slider existent avant de lancer le code du slider
  if (nextBtn && track) {
    let currentPos = 0;
  
    const getStep = () => {
      const card = document.querySelector('.partner-card');
      return card ? card.clientWidth + 32 : 0; 
    };

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth <= 1100) {
        const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
        if (Math.abs(currentPos) < maxScroll) {
          currentPos -= getStep();
          track.style.transform = `translateX(${currentPos}px)`;
        }
      }
    });
    // N'oublie pas de protéger prevBtn aussi s'il est là
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
       // Ton code pour prevBtn ici...
       e.preventDefault();
       if (window.innerWidth <= 1100 && currentPos < 0) {
         currentPos += getStep();
         track.style.transform = `translateX(${currentPos}px)`;
       }
    });
  }
  // Reset immédiat si on repasse sur un écran large
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
      currentPos = 0;
      track.style.transform = `translateX(0px)`;
    }
  });
}

  // --- SECTION MENU MOBILE ---
  const menuBtn = document.getElementById('menu_open');
  const mobileMenu = document.getElementById('mobile_menu');
  const menuIcon = document.getElementById('menu_icon');
  
  // On vérifie si le menu existe avant de lancer le code du menu
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.style.maxHeight !== '0px' && mobileMenu.style.maxHeight !== '';
         
      if (!isOpen) {
        mobileMenu.style.maxHeight = '600px'; 
        if (menuIcon) {
          menuIcon.classList.replace('fa-bars', 'fa-xmark');
        }
      } else {
        mobileMenu.style.maxHeight = '0px';
        if (menuIcon) {
          menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  }
  // bouton back to top
  const backToTopBtn = document.getElementById('backToTop');

  // 1. Afficher le bouton uniquement après 300px de scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('hidden');
      backToTopBtn.classList.add('flex');
    } else {
      backToTopBtn.classList.remove('flex');
      backToTopBtn.classList.add('hidden');
    }
  });

  // 2. Remonter en haut de page lors du clic
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Pour un défilement fluide
    });
  });
  
 

  // 1. Isolation totale du code dans une IIFE (Expression de fonction injectée immédiatement)
  // Cela empêche vos variables (btn, menu, arrow) de créer des conflits avec d'autres scripts.
  (() => {
    
    // 2. Utilisation de l'événement 'DOMContentLoaded' de manière sécurisée
    document.addEventListener('DOMContentLoaded', () => {
      
      // 3. Condition de vérification de l'existence des éléments du DOM
      const btn = document.getElementById('dropdown-btn');
      const menu = document.getElementById('dropdown-menu');
      const arrow = document.getElementById('dropdown-arrow');
  
      // SI le bouton ou le menu n'existe pas sur la page actuelle, on arrête immédiatement l'exécution.
      // Cela évite l'erreur classique : "Cannot read properties of null (reading 'addEventListener')"
      if (!btn || !menu) return;
  
      // Fonction de bascule (Toggle)
      function toggleDropdown() {
        const isHidden = menu.classList.contains('hidden');
        
        if (isHidden) {
          menu.classList.remove('hidden');
          setTimeout(() => {
            menu.classList.remove('opacity-0', 'scale-95');
            menu.classList.add('opacity-100', 'scale-100');
            if (arrow) arrow.classList.add('rotate-180');
          }, 10);
        } else {
          closeDropdown();
        }
      }
  
      // Fonction de fermeture isolée
      function closeDropdown() {
        if (menu.classList.contains('hidden')) return; // Déjà fermé, rien à faire
        
        menu.classList.remove('opacity-100', 'scale-100');
        menu.classList.add('opacity-0', 'scale-95');
        if (arrow) arrow.classList.remove('rotate-180');
        
        setTimeout(() => {
          menu.classList.add('hidden');
        }, 200);
      }
  
      // Écouteur sur le bouton principal avec blocage de propagation
      btn.addEventListener('click', (e) => {
        // e.stopImmediatePropagation() garantit que SEUL cet écouteur s'exécute si d'autres 
        // scripts ciblent aussi ce même bouton.
        e.stopImmediatePropagation();
        e.stopPropagation(); 
        toggleDropdown();
      });
  
      // Écouteur global sur le document pour fermer si on clique ailleurs
      document.addEventListener('click', (e) => {
        // On vérifie si le clic s'est produit à l'EXTÉRIEUR du menu et du bouton
        if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
          closeDropdown();
        }
      });
  
      // Optionnel : Fermer le menu si on appuie sur la touche 'Echap' (Accessibilité)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDropdown();
        }
      });
  
    });
  
  })();

  

  (() => {
    document.addEventListener('DOMContentLoaded', () => {
      // Récupère le nom de la page actuelle (ex: "accueil.html")
      const currentPath = window.location.pathname.split('/').pop() || 'acceuil.html';
      
      // Sélectionne tous nos liens de navigation
      const navLinks = document.querySelectorAll('.nav-link');
  
      navLinks.forEach(link => {
        // Récupère le href du lien (ex: "./accueil.html" devient "accueil.html")
        const linkPath = link.getAttribute('href').split('/').pop();
  
        // Si le lien correspond à la page ouverte
        if (currentPath === linkPath) {
          // 1. On change la couleur du texte pour le rendre actif
          link.classList.remove('text-[#7B7BA7]');
          link.classList.add('text-[#1E1E2F]', 'font-semibold');
          
          // 2. On trouve la span de la ligne en dessous et on la fige à 100% de largeur
          const indicator = link.querySelector('.line-indicator');
          if (indicator) {
            indicator.classList.remove('w-0', 'group-hover:w-full');
            indicator.classList.add('w-full');
          }
        }
      });
    });
  })();

  document.getElementById('load-more-btn').addEventListener('click', function() {
    // 1. Récupère uniquement les éléments encore masqués
    const hiddenBoxes = document.querySelectorAll('.box-item.hidden');
    
    // 2. Nombre d'éléments à afficher par clic (ici 3 pour remplir une ligne complète)
    const itemsToShow = 3;
    
    // 3. Retire la classe 'hidden' sur les 3 prochains éléments
    for (let i = 0; i < itemsToShow && i < hiddenBoxes.length; i++) {
      hiddenBoxes[i].classList.remove('hidden');
    }
    
    // 4. Si toutes les box sont désormais visibles, on cache le bouton
    if (document.querySelectorAll('.box-item.hidden').length === 0) {
      this.parentElement.classList.add('hidden');
    }
  });
  



