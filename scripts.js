const searchInput=document.getElementById('Input');
var displaySearchList=document.getElementsByTagName('ul')




const key='12f03579'



// ---------> from this we are fetching our single movie and appending it to the page
async function singleMovie(){
    // it is for taking the id from url of the movie 
    var urlQueryParams=new URLSearchParams(window.location.search);
    var id=urlQueryParams.get('id')
    console.log(id);
    const url=`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`
    const res=await fetch(`${url}`);
    const data=await res.json();
    console.log(data);
    //  for the category of the movie 
  

    // for the total time of the movie
    var t=data.Runtime ;
    var time=t.split(' ')
    t=Number(time[0]);
    var hour=Math.trunc(t/60);
    var min=t%60;
// making the output html by string interpolition
    var output=`
        <div class="details">

            <div class="movie-img">

                <img src="${data.Poster}">

            </div>

            <div class="article">

               <h2>${data.Title}</h2>
               <h3>Actor : ${data.Actors} </h3>
               <h4>${data.Plot}</h4>
               <h3>Director: ${data.Director}</h3>
               <h3>Running time : ${data.Runtime}</h3>
               <h3>Year : ${data.Year}</h3>
               <h3>Language : ${data.Language}</h3>
               <h3>Country : ${data.Country} </h3>

            </div>

        </div>

        <div class="key-point">

           <span> Revenue : ${data.BoxOffice}</span>&nbsp;&nbsp;&nbsp;
           <span> IMDB-Rating : ${data.imdbRating}</span>&nbsp;&nbsp;&nbsp;
           <span> Awards : ${data.Awards}

        </div>

    
    `
// appending the output to the class
    document.querySelector('.movie-display').innerHTML=output
   

    
  


}

// -----------> here we are adding the given id movie to favorites through localstorage
async function addTofavorites(id){
    console.log("fav-item",id);


    localStorage.setItem(Math.random().toString(36).slice(2, 7),id);// math.random for the unique key and value pair
   
}

// ----------->this is for removing the movie from the favorites list  and also from the localstorage
async function removeFromfavorites(id){
    console.log(id);
    for(i in localStorage){
        // if the id which is passed as argument latch with value associated with key the removing it 
        if(localStorage[i]==id){
            localStorage.removeItem(i)
            break ;
        }
    }
    // from this we are refreshing our html page so that updated list is displayed
    window.location.replace('favorites.html')
}

// ----------->this we are displaying the movie list on the search page according to the user list
async function displayMovieList(movies){
    var output='';
    // we are traversing over the movies list which is passed as an argument to our function
    for (i of movies){
       
        var img=''
        if(i.Poster){
            img=i.Poster

        }
        
        else{img=i.Title}
        var id=i.imdbID;
        
        // we are appending the output through string interpolition
        output+=`
       
        <div style="color:white;" class="movie-component">
  
               <a href='singleMovie.html?id=${id}'> 
                    <div class="movieImg">
                    <img src="${img}">
                    </div>
                    <div class="movie-detail">
                        <h3>${i.Title}</h3>
                        <h3>Year:&nbsp;&nbsp;${i.Year}</h3>                     


             
                    </div>
                </a>
           
            <button style="background-color:none;border:none;float:right; cursor:pointer;" onClick=addTofavorites('${id}')><img src="https://cdn-icons-png.flaticon.com/512/7245/7245022.png" style="height:40px;width:40px;"></button>

                  
               
            
        </div>

       `

        
    }
//    now appending this to the movie-display class of our html page
    document.querySelector('.movie-display').innerHTML=output
    // window.location.replace('search.html')

    console.log("here is movie list ..",movies);
} 

// -------------->in this when the user is searching for the movie then a list of the related movie will be displayed and that list is fetched
async function findMovies(){
    const url=`http://www.omdbapi.com/?s=${(searchInput.value).trim()}&page=1&apikey=${key}`
    const res=await fetch(`${url}`);
    const data=await res.json();
    // console.log(data.Search);

    if(data.Search){
        // here we are calling the function to display list of the movies related to the user search
        displayMovieList(data.Search)
    }


}

// --------------->in this the favorites movies is loaded on to the fav page from localstorage

async function favoritesMovieLoader(){

    var output=''
    // traversing over all the movies in the localstorage
    for(i in localStorage){
        var id=localStorage.getItem(i);
        if(id!=null){
            // fetching the movie through id 
            const url=`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`
            const res=await fetch(`${url}`);
            const data=await res.json();
            console.log(data);

             
        var img=''
        if(data.Poster){
            img=data.Poster

        }
        else{img=data.Title}
        var Id=data.imdbID;
        // now aading all the movie html in the output using interpolition
        output+=`
       
        <div style="color:white;" class="movie-component">
  
               <a href='singleMovie.html?id=${id}'> 
                    <div class="movieImg">
                    <img src="${img}">
                    </div>
                    <div class="movie-detail">
                        <h3>${data.Title}</h3>
                        <h3>Year:&nbsp;&nbsp;${data.Year}</h3>                     


             
                    </div>
                </a>

            <button style="background-color:none;border:none;float:right; cursor:pointer;" onClick=removeFromfavorites('${Id}')><img src="https://cdn-icons-png.flaticon.com/512/2742/2742221.png" style="height:40px;width:40px;"></button>

                  
               
            
        </div>

       `

        
    }

  
    // window.location.replace('search.html')

    }
    // appending the html to the movie-display class in favorites page 

    document.querySelector('.movie-display').innerHTML=output
}











// it is the intiator when any key is pressed by the user for searching any movie 
searchInput.addEventListener('keyup',findMovies);


