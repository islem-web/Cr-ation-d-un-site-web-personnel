document.addEventListener('DOMContentLoaded', () => {
    var form = document.getElementById('contact-form');
    var msg = document.getElementById('message');
    var charCount = document.getElementById('char-count');
    var confirmMsg = document.getElementById('confirmation-message');
    var submitBtn = document.getElementById('submit-btn');
    
    if (msg && charCount) {
        msg.addEventListener('input', () => {
            var len = msg.value.length;
            charCount.textContent = `${len}/1000`;
            charCount.className = len > 900 ? 'text-danger' : len > 700 ? 'text-warning' : '';
        });
        msg.dispatchEvent(new Event('input'));
    }
    
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi...';
            
            setTimeout(() => {
                confirmMsg.classList.remove('d-none');
                form.reset();
                form.classList.remove('was-validated');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Envoyer';
                confirmMsg.scrollIntoView({behavior:'smooth'});
                
                setTimeout(() => {
                    confirmMsg.classList.add('d-none');
                }, 10000);
            }, 1500);
        });
        
        form.querySelector('button[type="reset"]')?.addEventListener('click', () => {
            form.classList.remove('was-validated');
            confirmMsg.classList.add('d-none');
            charCount.textContent = '0/1000';
            charCount.className = '';
        });
    }
    
    form?.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', () => {
            input.classList.toggle('is-valid', input.checkValidity());
            input.classList.toggle('is-invalid', !input.checkValidity());
        });
        
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
    });
    
    document.getElementById('fichier')?.addEventListener('change', function() {
        var file = this.files[0];
        if (!file) return;
        
        if (file.size > 5e6) {
            alert('Fichier trop gros (max 5MB)');
            this.value = '';
            return;
        }
        
        var ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!['.pdf','.doc','.docx','.jpg','.jpeg','.png'].includes(ext)) {
            alert('Format non supporté');
            this.value = '';
        }
    });
});