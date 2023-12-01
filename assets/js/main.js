/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 150,
//     reset: true
});
var typingEffect = new Typed(".multiText",{
    strings : ["SNACKS","MEALS","DESSERTS"],
    loop : true,
    typeSpeed : 80,
    backSpeed : 50,
})

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
/*===== dark mode =====*/
const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const link1 = document.getElementById('name');
const link2 = document.getElementById('id01');

const moon= document.getElementsByClassName('')

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        toggle.style.color='black';
        body.style.background = 'white';
        body.style.color = 'rgb(17,16,16)';
        document.getElementById("id01").style.backgroundColor = "white";

        
    }else{
        body.style.background = 'rgb(17,16,16)';
        toggle.style.color='yellow';
        body.style.color = 'white';
        document.getElementById("id01").style.backgroundColor = "transparent";
    
        body.style.transition = '0.8s';
        
    }
});

// Random Food Generator
async function fetchRandomFood() {
    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
      const meal = response.data.meals[0];
  
      // Display meal image and name
      document.getElementById("randomDishImg").src = meal.strMealThumb;
      document.getElementById("randomDishName").innerText = meal.strMeal;
  
      // Display ingredients and tutorial link
      const ingredientsList = document.getElementById("ingredients");
      ingredientsList.innerHTML = "";
      const tutorialLink = meal.strYoutube;
      document.getElementById("tutorial").href = tutorialLink;
  
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal["strIngredient" + i];
        if (ingredient) {
          ingredientsList.innerHTML += `<li>${ingredient}</li>`;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Fetch random food when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    fetchRandomFood();
  });
  
 // Function to fetch default categories
async function fetchDefaultCategories(url = "https://www.themealdb.com/api/json/v1/1/categories.php") {
  try {
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    const response = await axios.get(url);
    loader.style.display = "none";

    const data = response.data.categories;
    let card = "";

    for (let i = 0; i < data.length; i++) {
      card += `<div class="result" onclick="getCat(this)">
                <img src="${data[i]["strCategoryThumb"]}" alt="" class="resultImg">
                <h2 class="resultTitle">${data[i]["strCategory"]}</h2>
              </div>`;
    }

    const resultsDiv = document.querySelector(".results");
    resultsDiv.innerHTML = "";
    resultsDiv.innerHTML = card;
  } catch (error) {
    console.error(error);
  }
}

// Fetch default categories when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchDefaultCategories();
});

  // Category Search Result
  
  async function searchResults(query) {
    inputValue = query;
    navigator();
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
    let card = "";
    let loader = document.getElementById("loader");
    loader.style.display = "block";
    closeButton.style.display = "inline";
  
    let response = await axios
      .get(url)
      .then((res) => {
        loader.style.display = "none";
        $("#categoryHeading").html(inputValue);
  
        data = res.data.meals;
        for (let i = 0; i < data.length; i++) {
          card += `<div class="Meal" onclick="document.getElementById('id01').style.display='block'" onclick="getDish(this)">
                  <img src="${data[i]["strMealThumb"]}" alt="" class="mealImg" >
                  <h2 class="mealTitle">${data[i]["strMeal"]}</h2>
              </div>`;
        }
  
        $(".results").html("");
        $(".results").append(card);
      })
      .catch((err) => console.error(err));
  }
  
  // Input Function
  
  var searchInput = document.getElementById("search");
  var inputValue = "";
  var searchButton = document.getElementById("searchIcon");
  var closeButton = document.getElementById("closeButton");
  
  // Using search button
  searchButton.onclick = () => {
    if (searchInput.value == "") {
      results();
      alert("Please enter a category!");
    } else {
      inputValue = searchInput.value;
      $("#categoryHeading").html(inputValue);
      closeButton.style.display = "inline";
      searchResults(searchInput.value);
      console.log(searchInput.value);
    }
  };
  searchInput.addEventListener("input", function (event) {
    inputValue = event.target.value;
  
    if (searchInput.value == "") {
      closeButton.style.display = "none";
    } else {
      searchResults(searchInput.value);
      closeButton.style.display = "inline";
    }
  });
  
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
  
      searchResults(inputValue);
    }
  });
  
  // Click function in available categories
  function getCat(element) {
    let catTitle = element.querySelector(".resultTitle").innerText;
    inputValue = catTitle;
    searchResults(inputValue);
    closeButton.style.display = "inline";
  }
  
  // To get the particual dish
  function getDish(element) {
    
    document.getElementById("id01").style.display = "show";
    let mealTitle = element.querySelector(".mealTitle").innerText;
    displayDish(mealTitle);
    closeButton.style.display = "inline";
    
  }
  
  // Close Function
  
  function closeCategory() {
    try {
      results(); // Display available categories
      closeButton.style.display = "none"; // Hide the close button
      inputValue = "";
      $("#categoryHeading").html("AVAILABLE CATEGORIES"); // Reset the heading
    } catch (error) {
      console.error(error);
    }
  }
  
  // Modal for each Dishes
// Modal for each Dishes

async function displayDish(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  
    try {
      const response = await axios.get(url);
      const neededData = response.data.meals[0];
  
      // Adding the Image and name to HTML
      let dishName = neededData["strMeal"];
      let dishImage = neededData["strMealThumb"];
      console.log(dishName);
  
      // Adding ingredients and tutorial to youtube
      let ingredients = document.getElementById("ingredients");
      document.getElementById("dishName").innerHTML = `Dish Name  : ${dishName}`;
      ingredients.innerHTML = "";
  
      let tutorial = neededData["strYoutube"];
      document.getElementById("tutorial").href = tutorial;
      console.log(tutorial);
  
      for (let i = 1; i < 21; i++) {
        const ingredient = neededData["strIngredient" + i];
        if (ingredient !== "") {
          ingredients.innerHTML += `<li>${ingredient}</li>`;
        }
      }
      console.log(ingredients);
  
    } catch (error) {
      console.error(error);
    }
  }
  
  
  // Smooth Navigation
  
  function navigator() {
    let resultDiv = document.getElementById("resultsDiv");
    resultDiv.scrollIntoView({ behavior: "smooth" });
  }
  
  // Extras
  
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 200);
  });
  // reload
  function reload() {
    fetchRandomFood()
   
  }

document.getElementById("reloadButton").addEventListener("click", reload);
// search cross
function reload1() {
    fetchDefaultCategories()
    var headingElement = document.getElementById("categoryHeading");
    headingElement.innerHTML = "";
    var inputElement = document.getElementById("search");
    inputElement.value = ""; 
    
}

document.getElementById("closeButton").addEventListener("click", reload1);

function d1() {
    console.log("doooo")
    
}

document.getElementById("Meal").addEventListener("click", getDish);
function closeModal() {
    document.getElementById("id01").style.display = "none";
  }

