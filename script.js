const apikey = 'b20c74e87efa4e89b14c6db7fc70e6b6';

const blogContainer = document.getElementById('blog-container');

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article)) =>{
        constblogCard = document.createElement("div");
        blogCard.classList.add("");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.appendChild(blogCare);




    }
}

async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles)
        console.log(articles);
    } catch(error){
        console.error("Error fetching random news", error);
 
    }
})