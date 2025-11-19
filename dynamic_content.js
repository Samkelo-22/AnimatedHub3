// SAMPLE DATA - In production, this would come from an API
const productsData = [
    {
        id: 1,
        name: "Responsive Web Design",
        category: "design",
        price: 1299,
        description: "Modern, mobile-first website design that adapts to all devices",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
        keywords: ["responsive", "mobile", "design", "modern", "adaptive"],
    },
    {
        id: 2,
        name: "E-Commerce Development",
        category: "development",
        price: 2499,
        description: "Full-featured online store with payment integration",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
        keywords: ["ecommerce", "shop", "store", "payment", "cart"],
    },
    {
        id: 3,
        name: "SEO Optimization",
        category: "marketing",
        price: 899,
        description: "Comprehensive SEO services to improve search rankings",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        keywords: ["seo", "search", "ranking", "google", "optimization"],
    },
    {
        id: 4,
        name: "Brand Identity Design",
        category: "design",
        price: 1799,
        description: "Complete brand identity including logo and style guide",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        keywords: ["brand", "logo", "identity", "design", "corporate"],
    },
    {
        id: 5,
        name: "Custom Web Application",
        category: "development",
        price: 3999,
        description: "Tailored web application built to your specifications",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
        keywords: ["custom", "application", "webapp", "software", "development"],
    },
    {
        id: 6,
        name: "Social Media Marketing",
        category: "marketing",
        price: 699,
        description: "Strategic social media campaigns across all platforms",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
        keywords: ["social", "media", "marketing", "facebook", "instagram"],
    },
];

// DYNAMIC CONTENT LOADING
let allProducts = [];
let filteredProducts = [];

function loadProducts() {
    setTimeout(() => {
        allProducts = productsData;
        filteredProducts = allProducts;
        renderProducts(filteredProducts);
    }, 1000);
}

function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No products found matching your criteria.</p>';
        return;
    }

    container.innerHTML = `
        <div class="products-grid">
            ${products.map((product, index) => `
                <div class="product-card" style="animation-delay: ${index * 0.1}s">
                    <img src="${product.image}" 
                         alt="${product.name} - ${product.description}"
                         loading="lazy"
                         onclick="openLightbox('${product.image}', '${product.name}')">
                    <div class="product-info">
                        <span class="category">${product.category}</span>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price">R${product.price}</div>
                        <button class="cta-button">Learn More</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Animate cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '1';
            card.classList.add('animate-scale');
        });
    }, 100);

    updateSearchStats(products.length);
}

// Global function for lightbox
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const captionEl = document.getElementById('lightboxCaption');
    
    if (lightbox && img && captionEl) {
        img.src = src;
        img.alt = caption;
        captionEl.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}