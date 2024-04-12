const apiKey = "b20c74e87efa4e89b14c6db7fc70e6b6";

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b20c74e87efa4e89b14c6db7fc70e6b6`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) =>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const shortTitle = 
            article.title.length > 30
            ? article.title.slice(0, 30) + "..." 
            : article.title; 
        title.textContent = shortTitle;
        const description = document.createElement("p"); 
        const shortDescription = 
            article.description.length > 40
            ? article.description.slice(0, 40) + 
            "..." 
            : article.description; 
        description.textContent = shortDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=> {
            window.open(article.url, "_blank")
        });
        blogContainer.appendChild(blogCard);

    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
})();