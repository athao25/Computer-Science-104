document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const formMessage = document.getElementById('form-message');
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        const answer = question.parentElement.querySelector('.faq-answer');
        const questionId = 'faq-' + Math.random().toString(36).substr(2, 9);
        question.setAttribute('aria-controls', questionId);
        answer.setAttribute('id', questionId);
        
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
        
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleFAQ(this);
            }
        });
    });
    
    function toggleFAQ(question) {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const toggle = question.querySelector('.faq-toggle');
        
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggle.textContent = '+';
            question.setAttribute('aria-expanded', 'false');
        } else {
            answer.style.display = 'block';
            toggle.textContent = '-';
            question.setAttribute('aria-expanded', 'true');
        }
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        
        let errors = [];
        
        if (name === '') {
            errors.push('Please enter your name');
        }
        
        if (email === '') {
            errors.push('Please enter your email');
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (service === '') {
            errors.push('Please select a service');
        }
        
        if (errors.length > 0) {
            showMessage(errors.join('. '), 'error');
        } else {
            showMessage('Thank you! Your message has been sent. We will get back to you soon!', 'success');
            form.reset();
        }
    });
    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    }
});