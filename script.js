const apiKey = 'b20c74e87efa4e89b14c6db7fc70e6b6';

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = document.getElementById("my-search-box").value;
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.error("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    try {

        articles.forEach((article) =>{
            let titleCheck = (article.title !== "[Removed]");
            let imageCheck = (article.urlToImage !== null);
            console.log(titleCheck, imageCheck)
            if(titleCheck && imageCheck) {
                console.log(article.title);
                const blogCard = document.createElement("div");
                blogCard.classList.add("blog-card");
                const img = document.createElement("img");
                img.src = article.urlToImage;
                img.alt = article.title;
                const title = document.createElement("h2");
                const shortTitle = 
                    article.title.length > 40
                    ? article.title.slice(0, 40) + "..." 
                    : article.title; 
                title.textContent = shortTitle;
                const description = document.createElement("p"); 
                let shortDescription = article.description;
                if(shortDescription === null){
                    shortDescription = "No description found";
                } else if(shortDescription.length > 100) {
                    shortDescription.slice(0, 100) + "...";
                }
                description.textContent = shortDescription;

                blogCard.appendChild(img);
                blogCard.appendChild(title);
                blogCard.appendChild(description);
                blogCard.addEventListener('click', ()=> {
                    window.open(article.url, "_blank")
                });
                blogContainer.appendChild(blogCard);
            }
    });
    } catch(error){
        console.error("Error fetching random news", error);
    }
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