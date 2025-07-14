document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.getElementById('main-image');
    const imageCaption = document.getElementById('image-caption');
    
    thumbnails.forEach(function(thumbnail) {
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('role', 'button');
        thumbnail.setAttribute('aria-label', 'View larger image: ' + thumbnail.getAttribute('alt'));
        
        thumbnail.addEventListener('click', function() {
            selectImage(this);
        });
        
        thumbnail.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectImage(this);
            }
        });
    });
    
    function selectImage(thumbnail) {
        const largeImageSrc = thumbnail.getAttribute('data-large');
        const altText = thumbnail.getAttribute('alt');
        
        mainImage.src = largeImageSrc;
        mainImage.alt = altText;
        imageCaption.textContent = altText;
        
        thumbnails.forEach(function(thumb) {
            thumb.classList.remove('active');
            thumb.setAttribute('aria-pressed', 'false');
        });
        
        thumbnail.classList.add('active');
        thumbnail.setAttribute('aria-pressed', 'true');
        
        mainImage.focus();
    }
});