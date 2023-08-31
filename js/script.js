function loadCategory() {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then((res) => res.json())
        .then((data) => {
            let categories = data.data;
            createCategory(categories);
        });
}
const createCategory = (categories) => {
    const categoriesDiv = document.getElementById("categories-div");
    categories.forEach((category) => {
        console.log(category);
        const categoryButtonDiv = document.createElement("span");
        categoryButtonDiv.innerHTML = `
       <button class="btn bg-secondary-subtle py-2 px-3">
                        ${category.category}
                    </button>
       `;
        categoriesDiv.appendChild(categoryButtonDiv);
    });
};

loadCategory();
