const characters = document.getElementsByClassName("characters")[0];
const comics = document.getElementsByClassName("comics")[0];
const descriptions = document.getElementsByClassName("description")[0];
const showcase = document.getElementsByClassName("showcase")[0];
const search = document.getElementsByClassName("search")[0];
const characterInput = document.getElementById("character-input");
const comicIDInput = document.getElementById("comics-id-input");
const comicTitleInput = document.getElementById("comics-title-input");
const upcInput = document.getElementById("upc-input");
const isbnInput = document.getElementById("isbn-input");
const imageArray = ["img3.jpg","img1.jpg","img2.jpg", "img0.jpg", "img4.jpg"];

// INITIALIZE THE API AND HASH VARIABLES WITH YOUR OWN CREDENTIALS
// ALSO UNDISABLE THE BUTTONS FROM THE HTML FILE
const apikey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const hash = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

var imageIndex = 0;
var index = 0;

document.querySelector("#requestCharacterBtn").addEventListener("click", () => {
  requestCharacter();
});

characterInput.addEventListener("keydown", (event) => {
  if(event.key == "Enter")
    requestCharacter();
});

document.querySelector("#requestComicTitleBtn").addEventListener("click", () => {
  requestComicsTitle();
});

comicTitleInput.addEventListener("keydown", (event) => {
  if(event.key == "Enter")
    requestComicsTitle();
});

document.querySelector("#requestComicsIDBtn").addEventListener("click", () => {
  requestComicsID();
});

comicIDInput.addEventListener("keydown", (event) => {
  if(event.key == "Enter")
    requestComicsID();
});

document.querySelector("#requestDescriptionUPCBtn").addEventListener("click", () => {
  requestDescriptionUPC();
});

upcInput.addEventListener("keydown", (event) => {
  if(event.key == "Enter")
    requestDescriptionUPC();
});

document.querySelector("#requestDescriptionISBNBtn").addEventListener("click", () => {
  requestDescriptionISBN();
});

isbnInput.addEventListener("keydown", (event) => {
  if(event.key == "Enter")
    requestDescriptionISBN();
});

imageSlider = () => {
  showcase.style.backgroundImage = 'url('+imageArray[imageIndex]+')';
  imageIndex++;
  if(imageIndex > imageArray.length - 1)
    imageIndex = 0;
  setTimeout(imageSlider, 10000);
}

window.addEventListener('load', imageSlider);

requestCharacter = () => {
  removePreviousCharacters();
  // returns a character picture by name
  const url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${characterInput.value}&limit=15&ts=1&apikey=${apikey}&hash=${hash}`;

  fetch(url)

  .then(response => {
      if(response.ok)
        return response.json();
      else
        alert(response.status);
  })

  .then(data => { 
    loadCharacter(data);
  });    
}

loadCharacter = (data) => {
  characters.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.6),black), url(comicss.jpg)';
  for(let i = 0;i < data.data.results.length;i++){
    if(!data.data.results[i].thumbnail.path.includes("image_not_available")){
      var image_path = data.data.results[i].thumbnail.path + '/portrait_uncanny.jpg';
      var divCharacter = document.createElement("div");
      var divImg = document.createElement("div");
      var divDetails = document.createElement("div");
      var h2 = document.createElement("p");
      var p = document.createElement('p');
      divCharacter.className = "character";
      divImg.className = "img-0";
      divDetails.className = "details";
      h2.innerHTML = data.data.results[i].name;
      p.innerHTML = "ID: " + data.data.results[i].id;
      divImg.style.backgroundImage = 'linear-gradient(to bottom, transparent 55%, black), url('+image_path+')';

      divDetails.appendChild(h2);
      divDetails.appendChild(p);

      divCharacter.appendChild(divImg);
      divCharacter.appendChild(divDetails);
      characters.appendChild(divCharacter);
    }
  }
}

requestComicsTitle = () => {
  removePreviousComics();
  //returns comics by character name with id
  const url = `http://gateway.marvel.com/v1/public/comics?titleStartsWith=${comicTitleInput.value}&limit=100&ts=1&apikey=${apikey}&hash=${hash}`;

  fetch(url)

  .then(response => {
      if(response.ok)
        return response.json();
      else
        alert(response.status);
  })

  .then(data => { 
    comicTitleInput.value = '';
    loadComics(data);
  });    
}

requestComicsID = () => {
  removePreviousComics();
  //returns comics by character name with id
  const url = `http://gateway.marvel.com/v1/public/characters/${comicIDInput.value}/comics?limit=100&ts=1&apikey=${apikey}&hash=${hash}`;

  fetch(url)

  .then(response => {
      if(response.ok)
        return response.json();
      else
        alert(response.status);
  })

  .then(data => { 
    comicIDInput.value = '';
    loadComics(data);
  });    
}

loadComics = (data) => {
  comics.style.justifyContent = "space-evenly";
  for(let i = 0;i < data.data.results.length;i++){
    if(!data.data.results[i].thumbnail.path.includes("image_not_available")){
      var image_path = data.data.results[i].thumbnail.path + '/portrait_uncanny.jpg';
      var divComic = document.createElement("div");
      var divImg = document.createElement("div");
      var divDetails = document.createElement("div");
      var title = document.createElement("p");
      var upc = document.createElement('p');
      var isbn = document.createElement('p');
      divComic.className = "comic";
      divImg.className = "img-0";
      divDetails.className = "details";
      
      
      divImg.style.backgroundImage = 'linear-gradient(to bottom, transparent 55%, black), url('+image_path+')';
      title.innerHTML = data.data.results[i].title;
      upc.innerHTML = "UPC: " + data.data.results[i].upc;
      isbn.innerHTML = "ISBN: " + data.data.results[i].isbn;

      divDetails.appendChild(title);
      if(data.data.results[i].upc != '')
        divDetails.appendChild(upc);
      if(data.data.results[i].isbn != '')
        divDetails.appendChild(isbn);

      divComic.appendChild(divImg);
      divComic.appendChild(divDetails);
      comics.appendChild(divComic);
    }
  }
}

requestDescriptionUPC = () => {
  removePreviousDescriptions();
  // returns a character picture by name
  const url = `http://gateway.marvel.com/v1/public/comics?upc=${upcInput.value}&ts=1&apikey=${apikey}&hash=${hash}`;

  fetch(url)

  .then(response => {
      if(response.ok)
        return response.json();
      else
        alert(response.status);
  })

  .then(data => { 
    upcInput.value = '';
    loadDescription(data);
  });    
}

requestDescriptionISBN = () => {
  removePreviousDescriptions();
  // returns a character picture by name
  const url = `http://gateway.marvel.com/v1/public/comics?isbn=${isbnInput.value}&ts=1&apikey=${apikey}&hash=${hash}`;

  fetch(url)

  .then(response => {
      if(response.ok)
        return response.json();
      else
        alert(response.status);
  })

  .then(data => { 
    isbnInput.value = '';
    loadDescription(data);
  });    
}

loadDescription = (data) => {
  var image_path = data.data.results[0].thumbnail.path + '/portrait_uncanny.jpg';
  if(data.data.results[0].description == null){
  descriptions.innerHTML = '<div>'+
                              '<img src='+image_path+'></img>'+
                            '</div>'+
                          '<div class="description-details">'+
                          '<h2>'+data.data.results[0].title+'</h2>'+
                          '<br>'+
                          '<p>No description available</p>'+
                          '</div>';
  }
  else{
    descriptions.innerHTML = '<div>'+
                              '<img src='+image_path+'></img>'+
                            '</div>'+
                            '<div class="description-details">'+
                            '<h2>'+data.data.results[0].title+'</h2>'+
                            '<br>'+
                            '<p>'+data.data.results[0].description+'</p>'+
                            '</div>';
  }
  
}

removePreviousCharacters = () => { characters.innerHTML = '';}

removePreviousComics = () => { comics.innerHTML = '';}

removePreviousDescriptions = () => { descriptions.innerHTML = '';}

