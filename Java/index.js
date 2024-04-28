var results
var resultDetails
var load=document.querySelector("#load")

//function to just display the games in general
async function getGames(platform)
{
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e6ef39492msh5bb83420a60b5eep19d15djsn660345c348fc',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        load.classList.replace("d-none","d-flex")
        const response = await fetch(url, options);
        const result = await response.json();
        results=result
        console.log(results);
    } catch (error) {
        console.error(error);
    }
    displayGames(results)
}
getGames("pc")


/// to hold the nav-link to get the id of the game (category)
$("#links li a").click(async function(e)
{
    const category=$(this).attr('id');
    let data=await   getCategory(category)
    console.log(data);
  
    
})
//function to display the categorywhen click on the links in navbar
 async function getCategory(category)
{
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e6ef39492msh5bb83420a60b5eep19d15djsn660345c348fc',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        load.classList.replace("d-none","d-flex")
        const response = await fetch(url, options);
        const result = await response.json();
        results=result
        console.log("cat=",results);
    } catch (error) {
        console.error(error);
    }
    displayGames(results)

}





$(document).on("click", ".card", async function(e) {
    Light_Box.classList.replace("d-none", "d-flex");
   displayDetailedGame(resultDetails);
});

$(".close" ).click(function(e)
{
    Light_Box.classList.replace("d-flex","d-none")
    console.log(e);
})
$(document).ready(function() {
    $("#showGame").click(function() {
        console.log("Button clicked");
    });
});


 
 
document.addEventListener('keydown',function (e) { 
if(e.key=="Escape")
{
Light_Box.classList.replace("d-flex","d-none")

}
})



//function to display games in html


function displayGames(results) {
    let cartona = ''
    load.classList.replace("d-flex", "d-none")

    for (var i = 0; i < results.length; i++) {
        cartona += `
        <div class="col-md-3 col-sm-6 mb-4 rounded rounded-3">
          <div class="card rounded rounded-3 p-3" data-id=${results[i].id} id="gameCard">
            <img src=${results[i].thumbnail} class="w-100 rounded rounded-3" alt="game-img">
            <div class="d-flex justify-content-between align-items-center mt-1">
                <div>
                    <div class="card-title">
                        <p>${results[i].title}</p>
                    </div>
                </div>
                <div>
                    <button class="btn btn-primary" id="free">Free</button>
                </div>
            </div>
            <div class="text-center short_description">
                ${results[i].short_description.split(" ").splice(0, 8).join(" ")}
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div class="left">
                    <span class="bg-secondary text-white p-1 rounded mb-0 rounded-3">${results[i].genre}</span>
                </div>
                <div class="right">
                    <span class="bg-secondary text-white p-1 rounded mb-0 rounded-3">${results[i].platform}</span>
                </div>
            </div>
          </div>
        </div>
       `;
    }

    $('#myRow').html(cartona);

    // Add event listener to each game card
    const gameCards = document.querySelectorAll("#gameCard");
    gameCards.forEach(card => {
        card.addEventListener("click", function() {
            const gameId = this.getAttribute("data-id");
            getById(gameId);
        });
    });
}

async function getById(id) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e6ef39492msh5bb83420a60b5eep19d15djsn660345c348fc',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("result= ", result);
        displayDetailedGame(result);
    } catch (error) {
        console.error(error);
    }
}

function displayDetailedGame(gameDetails) {
    let cartona = '';
    cartona += ` 
    <div class="col-md-3">
    <img src=${gameDetails.thumbnail} class="w-100" /></div>
              
    <div class="col-md-8  d-flex flex-column ">
   <p >Title: <span class="bg-info rounded rounded-3 p-1 text-black ">${gameDetails.title}</span> </p>
   <p >Category:  <span class="bg-info rounded rounded-3 p-1 text-black ">${gameDetails.genre}</span></p>
   <p >Platform: <span class="bg-info rounded rounded-3 p-1 text-black ">${gameDetails.platform}</span></p> 
   <p >Status: <span class="bg-info rounded rounded-3 p-1 text-black ">Live</span> </p> 
    <p>${gameDetails.description}</p>
    <div className="showGame">
    <button class="btn btn-outline-warning " id="showGame">Show Game</button>
    </div>
   

    </div>
    
    
    `;
    // Add more details if needed
   document.getElementById("myDetails").innerHTML=cartona;
   $("body").css({'overflow':'hidden'}) // for disable the scroll when clicking on card
}

displayGames(results);





  











 