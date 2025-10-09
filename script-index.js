// -------- Script du pop-up de consentement --------
(function(){
  const PRIVACY_URL = "https://poke-cut.github.io/rgpd.html"; // <-- mets ici ton vrai lien
  const EXPULSION_URL = "https://www.google.com/"; // <-- mets ici où tu veux rediriger les refusés
  const STORAGE_KEY = "consent_privacy_v1";

  const overlay = document.getElementById('consent-overlay');
  const btnAccept = document.getElementById('btn-accept');
  const btnRefuse = document.getElementById('btn-refuse');
  const btnRead = document.getElementById('btn-read');
  const privacyLink = document.getElementById('privacy-link');

  privacyLink.href = PRIVACY_URL;

  function hasConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "accepted";
    } catch(e) { return false; }
  }

  function showConsent() {
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add('consent-locked');
    btnRead.focus();
  }

  function hideConsent() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove('consent-locked');
  }

  // événements
  btnAccept.addEventListener('click', function(){
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch(e){}
    hideConsent();
  });

  btnRefuse.addEventListener('click', function(){
    try { localStorage.setItem(STORAGE_KEY, "refused"); } catch(e){}
    window.location.replace(EXPULSION_URL);
  });

  btnRead.addEventListener('click', function(){
    window.open(PRIVACY_URL, '_blank', 'noopener');
  });

  overlay.addEventListener('click', function(e){
    if(e.target === overlay) e.stopPropagation(); // ne ferme pas sur clic extérieur
  });

  document.addEventListener('keydown', function(e){
    if (overlay.style.display !== "none") {
      if (e.key === 'Tab') {
        e.preventDefault();
        const focusable = [btnRead, btnRefuse, btnAccept];
        const current = document.activeElement;
        let idx = focusable.indexOf(current);
        if (idx === -1) idx = 0;
        if (e.shiftKey) idx = (idx - 1 + focusable.length) % focusable.length;
        else idx = (idx + 1) % focusable.length;
        focusable[idx].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault(); // empêche fermeture avec échap
      }
    }
  });

  // Affiche le pop-up si pas encore accepté
  if (!hasConsent()) {
    window.addEventListener('load', function(){
      setTimeout(showConsent, 150);
    });
  } else {
    hideConsent();
  }
})();
