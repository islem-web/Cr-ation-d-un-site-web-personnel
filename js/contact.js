document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const submitBtn = document.getElementById('submit-btn');
    
    // Compteur de caractères pour le message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength}/1000`;
            
            // Changement de couleur selon la longueur
            if (currentLength > 900) {
                charCount.classList.add('text-danger');
                charCount.classList.remove('text-warning');
            } else if (currentLength > 700) {
                charCount.classList.add('text-warning');
                charCount.classList.remove('text-danger');
            } else {
                charCount.classList.remove('text-danger', 'text-warning');
            }
        });
        
        // Initialiser le compteur
        messageTextarea.dispatchEvent(new Event('input'));
    }
    
    // Validation et envoi du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Validation Bootstrap
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }
            
            // Désactiver le bouton d'envoi
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
            
            // Simuler l'envoi du formulaire (dans un cas réel, utiliser fetch ou XMLHttpRequest)
            simulateFormSubmission();
        });
    }
    
    // Réinitialisation du formulaire
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            contactForm.classList.remove('was-validated');
            confirmationMessage.classList.add('d-none');
            charCount.textContent = '0/1000';
            charCount.classList.remove('text-danger', 'text-warning');
        });
    }
    
    // Simulation d'envoi de formulaire
    function simulateFormSubmission() {
        // Dans un cas réel, vous utiliseriez :
        // fetch('votre-script-de-traitement.php', { method: 'POST', body: new FormData(contactForm) })
        
        // Simulation avec délai
        setTimeout(function() {
            // Afficher le message de confirmation
            confirmationMessage.classList.remove('d-none');
            
            // Faire défiler jusqu'au message de confirmation
            confirmationMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Réinitialiser le formulaire
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Envoyer le message';
            
            // Cacher le message après 10 secondes
            setTimeout(function() {
                confirmationMessage.classList.add('d-none');
            }, 10000);
            
            // Animation de succès
            animateSuccess();
            
        }, 1500); // Simuler un délai d'envoi de 1.5 secondes
    }
    
    // Animation de succès
    function animateSuccess() {
        const successIcon = confirmationMessage.querySelector('.fa-check-circle');
        if (successIcon) {
            successIcon.classList.add('animate__animated', 'animate__bounceIn');
            setTimeout(() => {
                successIcon.classList.remove('animate__animated', 'animate__bounceIn');
            }, 1000);
        }
    }
    
    // Validation en temps réel
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
            }
        });
    });
    
    // Validation du fichier
    const fileInput = document.getElementById('fichier');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Vérifier la taille (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Le fichier est trop volumineux (max 5MB)');
                    this.value = '';
                    return;
                }
                
                // Vérifier l'extension
                const validExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!validExtensions.includes(fileExtension)) {
                    alert('Format de fichier non supporté. Formats acceptés: PDF, DOC, DOCX, JPG, PNG');
                    this.value = '';
                }
            }
        });
    }
    
    // Fonction pour envoyer l'email (version réelle avec EmailJS ou autre service)
    function sendEmail(formData) {
        // Exemple avec EmailJS (vous devez créer un compte sur https://www.emailjs.com/)
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.nom,
            from_email: formData.email,
            subject: formData.sujet,
            message: formData.message
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage();
        });
        */
    }
    
    // Fonction pour afficher un message d'erreur
    function showErrorMessage() {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger alert-dismissible fade show mt-3';
        errorAlert.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            <strong>Erreur d'envoi!</strong> Veuillez réessayer ou me contacter directement par email.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        contactForm.parentNode.insertBefore(errorAlert, contactForm.nextSibling);
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Envoyer le message';
    }
});