// SEARCH FUNCTIONALITY
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const sortSelect = document.getElementById("sortSelect");

    if (searchInput && filterSelect && sortSelect) {
        searchInput.addEventListener("input", filterAndSort);
        filterSelect.addEventListener("change", filterAndSort);
        sortSelect.addEventListener("change", filterAndSort);
    }
}

function filterAndSort() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("filterSelect").value;
    const sortBy = document.getElementById("sortSelect").value;

    // Filter
    filteredProducts = allProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.keywords.some((kw) => kw.includes(searchTerm));

        const matchesCategory = category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    // Sort
    switch (sortBy) {
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "name":
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    renderProducts(filteredProducts);
}

function updateSearchStats(count) {
    const stats = document.getElementById("searchStats");
    if (stats) {
        stats.textContent = `Showing ${count} of ${allProducts.length} products`;
    }
}