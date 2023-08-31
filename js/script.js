function loadCategory() {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then((res) => res.json())
        .then((data) => {
            let categories = data.data;
            createCategory(categories);
        });
}
function loadVideos() {
    fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
        .then((res) => res.json())
        .then((data) => {
            let videos = data.data;
            createVideos(videos);
        });
}
const createCategory = (categories) => {
    const categoriesDiv = document.getElementById("categories-div");
    categories.forEach((category) => {
        const categoryButtonDiv = document.createElement("span");
        categoryButtonDiv.innerHTML = `
       <button class="btn bg-secondary-subtle py-2 px-3">
                        ${category.category}
                    </button>
       `;
        categoriesDiv.appendChild(categoryButtonDiv);
    });
};
const createVideos = (videos) => {
    const videosDiv = document.getElementById("videos-section");
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement("div");
        card.classList.add("col-lg-3", "mt-4");
        card.innerHTML = `
       <div class="card">
                            <div>
                                <img
                                style="height: 200px; width: 100%;"
                                    class="rounded-top"
                                    src="${video?.thumbnail}"
                                    alt=""
                                />
                            </div>
                            <div class="d-flex p-3">
                                <div class="author-image">
                                    <img
                                        style="width: 45px; height: 45px"
                                        class="img-fluid rounded-circle border"
                                        src="${
                                            video?.authors[0].profile_picture
                                        }"
                                        alt=""
                                    />
                                </div>
                                <div class="ps-3">
                                    <p class="mb-1 fw-semibold">
                                        Smells Like Teen Spirit
                                    </p>
                                    <p class="mb-1">
                                        <small>${
                                            video?.authors[0]?.profile_name
                                        }</small>
                                        <span>${
                                            video?.authors[0]?.verified
                                                ? '<img src="./image/verify.png"alt=""/>'
                                                : ""
                                        }
                                        </span>
                                    </p>
                                    <p class="mb-1">
                                        <small><span>91</span>K views</small>
                                    </p>
                                </div>
                            </div>
                        </div>
       `;
        videosDiv.appendChild(card);
    });
};

loadCategory();
loadVideos();
