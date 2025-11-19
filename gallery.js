const galleryData = [
    {
        src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
        alt: "Modern office workspace with computers and design tools",
        title: "Creative Workspace",
    },
    {
        src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
        alt: "Team collaboration and brainstorming session",
        title: "Team Collaboration",
    },
    {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        alt: "Professional business meeting with laptops",
        title: "Client Meeting",
    },
    {
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
        alt: "Diverse team working together on projects",
        title: "Teamwork",
    },
    {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
        alt: "Professional using tablet for digital work",
        title: "Digital Solutions",
    },
    {
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
        alt: "Creative design process with sketches and tools",
        title: "Design Process",
    },
];

// GALLERY LIGHTBOX
let currentImageIndex = 0;
let galleryImages = [];

function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    galleryImages = galleryData;
    
    container.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-item" onclick="openLightboxGallery(${index})">
            <img src="${img.src}" 
                 alt="${img.alt}"
                 loading="lazy">
            <div class="gallery-overlay">
                <h3>${img.title}</h3>
            </div>
        </div>
    `).join('');
}

function openLightboxGallery(index) {
    currentImageIndex = index;
    const img = galleryImages[index];
    openLightbox(img.src, img.title);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function navigateLightbox(direction) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    
    const img = galleryImages[currentImageIndex];
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImage && lightboxCaption) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = img.title;
    }
}

// Setup lightbox controls when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('lightbox') || !document.getElementById('lightbox').classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
    
    // Initialize gallery
    loadGallery();
});