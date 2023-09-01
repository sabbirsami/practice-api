function loadCategory() {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then((res) => res.json())
        .then((data) => {
            let categories = data.data;
            createCategory(categories);
        });
}
function loadVideos(category = 1000) {
    fetch(
        `https://openapi.programming-hero.com/api/videos/category/${category}`
    )
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
       <button onclick="loadVideos('${category.category_id}')" id="${category.category_id}" class="btn bg-secondary-subtle py-2 px-3">
                        ${category.category}
                    </button>
       `;
        categoriesDiv.appendChild(categoryButtonDiv);
    });
};
const sortByView = (category) => {
    videos.sort(
        (a, b) =>
            parseFloat(b.others.views.replace("k", "")) -
            parseFloat(a.others.views.replace("k", ""))
    );
};

const createVideos = (videos) => {
    const videosDiv = document.getElementById("videos-section");
    videosDiv.innerHTML = "";
    if (videos.length === 0) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add(
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "mt-lg-5",
            "pt-lg-5"
        );
        errorDiv.innerHTML = `
                        <div class="text-center py-5">
                            <img src="./image/Icon.png" alt="" />
                            <h2 class="py-4">
                                Oops!! Sorry, <br />
                                There is no content here
                            </h2>
                        </div>
        `;
        videosDiv.appendChild(errorDiv);
    } else {
        videos.forEach((video) => {
            const convertTime = (totalSeconds) => {
                const totalMinutes = Math.floor(totalSeconds / 60);
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;

                return `${hours}hrs ${minutes}min ago`;
            };
            console.log(convertTime(video.others.posted_date));
            const card = document.createElement("div");
            card.classList.add("col-lg-3", "mt-4");
            card.innerHTML = `
                            <div class="card">
                                <div class="position-relative">
                                    <img
                                    style="height: 200px; width: 100%;"
                                        class="rounded-top"
                                        src="${video?.thumbnail}"
                                        alt=""
                                    />
                                    <p class="position-absolute bottom-0 end-0 px-2 me-1 rounded mb-1 text-white bg-dark"><small>${
                                        video.others.posted_date
                                            ? convertTime(
                                                  video.others.posted_date
                                              )
                                            : ""
                                    }</small></p>
                                </div>
                                <div class="d-flex p-3">
                                    <div class="author-image">
                                        <img
                                            style="width: 45px; height: 45px"
                                            class="img-fluid rounded-circle border"
                                            src="${
                                                video?.authors[0]
                                                    .profile_picture
                                            }"
                                            alt=""
                                        />
                                    </div>
                                    <div class="ps-3">
                                        <p class="mb-1 fw-semibold">
                                           ${video?.title}
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
                                            <small>${
                                                video?.others?.views
                                            } views</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
           `;
            videosDiv.appendChild(card);
        });
    }
};

loadCategory();
loadVideos();
