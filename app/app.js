//const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;



let newsBox = document.getElementById("newsBox");
let spinner = document.getElementById("spinner");
let newsheader = document.querySelector(".news-heading");
let videoButton = document.querySelector(".video-btn");
let newsCategory = [
  "national",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

// Create XMLHttpRequest Object
const xhr = new XMLHttpRequest();

function sendCategory(index) {
  newsheader.innerText = (newsCategory[index]).toUpperCase();
  getNews(newsCategory[index]);
}
getNews("all");

function getNews(newsCategoryName) {
  xhr.open(
    "GET",
    `https://inshortsapi.vercel.app/news?category=${newsCategoryName}`,
    true
  );

  xhr.getResponseHeader("Content-type", "application/json");

  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let data = json.data;

      let newsHTML = "";

      function showSpinner() {
        spinner.style.visibility = "hidden";
        newsBox.style.visibility = "visible";
      }

      xhr.onprogress = showSpinner;

      for (key in data) {
        let news = `<div class="newsCard">
        <div class="imageWrapper">
        <img src="${data[key].imageUrl}"
        class="thumnail" alt="Image">
            </div>
            <div class="card-body">
            <div class="card-date">${data[key].date}</div>
                      <h5 class="card-title">${data[key].title}</h5>
                                <h5 class="card-author">Author: ${data[key].author}</h5>
                                <p class="card-text">${data[key].content}</p>
                                <a target="_blank" href="${data[key].readMoreUrl}" class="btn btn-primary">Read more..</a>
                            </div>
                           
                        </div>`;
        newsHTML += news;
      }

      newsBox.innerHTML = newsHTML;

      //videoButton.textContent = "Generate Video";
      videoButton.onclick = function(){
        generateVideo(data);
      };
      //newsBox.appendChild(videoButton);
    } else {
      console.log("Some Error Occurred");
    }
  };

  xhr.send();
}




function generateVideo(data) {
  // Extract image URLs
  let imageUrls = data.map(news => news.imageUrl);
  
  // Sending image URLs to PHP script to generate video
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "generate_video.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (this.status === 200) {
      console.log("Video generated successfully!");
      // Handle success, maybe show a message to the user
    } else {
      console.log("Error generating video!");
      // Handle error
    }
  };
  xhr.send(JSON.stringify({ imageUrls: imageUrls }));
}
