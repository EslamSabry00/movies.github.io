// NAV
navin()
function navin(){
    let boxWidth =$('.optionBox').outerWidth();
    $('.parentOption').css('left',`-${boxWidth}px`)
    $('#togglerBtn').removeClass('fa-times')
}
$('#togglerBtn').click(function(){
    let boxWidth =$('.optionBox').outerWidth();
    let leftValue =$('.parentOption').css('left');
    if(leftValue == '0px'){
        $('.parentOption').css('left',`-${boxWidth}px`)
        $('#togglerBtn').removeClass('fa-times')
        $('.parentOption li').addClass('navlinks');
    }else{
        $('.parentOption').css('left',`0px`)
        $('#togglerBtn').addClass('fa-times')
        $('.parentOption li').removeClass('navlinks');
    }
})
//CONTACT US

    //NAME VALIDATION
    nameInput = $('#nameInput')
    $('#submitBtn').click(function(){
        let regex = /^\S*$/
        if(regex.test(nameInput.val())==true && nameInput.val() !=""){
            $('#nameInput').addClass('is-valid')
            $('#namealert').addClass('d-none');
        }else{
            $('#namealert').removeClass('d-none')
        }
    })

    //EMAIL VALIDATION
    emailInput = $('#emailInput')
    $('#submitBtn').click(function(){
        let regex = /(@[a-z]{5,10})(\.com)$/
        if(regex.test(emailInput.val())==true && emailInput.val() !=""){
            $('#emailInput').addClass('is-valid');
            $('#emailalert').addClass('d-none');
        }else{
            $('#emailalert').removeClass('d-none');
            
        }
    })

    //PHONE VALIDATION
    phoneInput =$('#phoneInput')
    $('#submitBtn').click(function(){
        let regex = /^(01)([0125])(\d{8})$/
        if(regex.test(phoneInput.val())==true && phoneInput.val() !=""){
            $('#phoneInput').addClass('is-valid');
            $('#phonealert').addClass('d-none');
        }else{
            $('#phonealert').removeClass('d-none');
            $('#phoneInput').removeClass('is-valid');
        }
    })

    //AGE VALIDATION
    ageInput = $('#ageInput')
    $('#submitBtn').click(function(){
        let regex = /^([1-9][0-9])$/
        if(regex.test(ageInput.val())==true && ageInput.val() !=""){
            $('#ageInput').addClass('is-valid');
            $('#agealert').addClass('d-none');
        }else{
            $('#agealert').removeClass('d-none');
            $('#ageInput').removeClass('is-valid');
        }
    })

    //PASSWORD VALIDATION
    passwordInput = $('#passwordInput')
    $('#submitBtn').click(function(){
        let regex = /([a-zA-Z]{7,}\d{1,})/
        if(regex.test(passwordInput.val())==true && passwordInput.val() !=""){
            $('#passwordInput').addClass('is-valid');
            $('#passwordalert').addClass('d-none');
        }else{
            $('#passwordalert').removeClass('d-none');
            $('#passwordInput').removeClass('is-valid');
        }
    })

    //REPASSWORD VALIDATION
    repasswordInput = $('#repasswordInput')
    $('#submitBtn').click(function(){
        if(repasswordInput.val()==passwordInput.val() && repasswordInput.val() !=""){
            $('#repasswordInput').addClass('is-valid');
            $('#repasswordalert').addClass('d-none');
        }else{
            $('#repasswordalert').removeClass('d-none');
            $('#repasswordInput').removeClass('is-valid');
        }
    })

    //api
    let allMovies =[];
    
    
    async function getMovies(moviesCategory){
        let moviesResponse = await fetch(`https://api.themoviedb.org/3/${moviesCategory}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1l-Nnu6YhrSU0jgQgO5s9SBqC7CLmBs4iIhOLHSH_Xbfc2-fK20UR3-TE`)
        moviesResponse = await moviesResponse.json();
        allMovies = moviesResponse.results;
        // console.log(allMovies)
        displayMovies()
    }


    getMovies('movie/now_playing')
    //NOW PLAYING
    $('#nowPlaying').click(async function(){
        await getMovies('movie/now_playing')
        $('#moviesHeading').text('NOW PLAYING')
    })
    //PUPULAR
    $('#popular').click(function(){
    getMovies('movie/popular')
    $('#moviesHeading').text('PUPULAR')
    })
    //TOP RATED
    $('#topRated').click(function(){
        getMovies('movie/top_rated')
        $('#moviesHeading').text('TOP RATED')
        })
    //TRENDING
    $('#trending').click(function(){
        getMovies('trending/all/day')
        $('#moviesHeading').text('TRENDING')
        })
    //UPCOMING
    $('#upcoming').click(function(){
        getMovies('movie/upcoming')
        $('#moviesHeading').text('UPCOMING')
        })
    //DISPLAY DATA   
    moviesContainer = document.getElementById('movies-container')
    let imgPath ='https://image.tmdb.org/t/p/w500'
    function displayMovies(){
        let moviesDisplay = "";
        for(let i=0 ; i<allMovies.length ; i++)
        {
            moviesDisplay+=`<div class="col-xl-4 col-md-6">
                            <div class="movie-item my-3">
                                <img class="img-fluid" src="${imgPath+allMovies[i].poster_path}" alt="">
                                <div class="layer">
                                    <h2>${allMovies[i].title}</h2>
                                    <p>${allMovies[i].overview}</p>
                                    <p>${allMovies[i].vote_average}</p>
                                    <p>${allMovies[i].release_date}</p>
                                </div>
                            </div>
                        </div>`;
        }
        moviesContainer.innerHTML = moviesDisplay;
    }
    //SEARCH IN API
    async function searchMoviesAPI(searchValueApi){
        if(searchValueApi==''){
            moviesDisplayapiSearch = "";
            $('#searchResult').html(moviesDisplayapiSearch)
        return false;       
        }else{
            let searchResult =[]
            let moviesSearchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${searchValueApi}&page=1&include_adult=false`)
            // https://api.themoviedb.org/3/${moviesCategory}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1l-Nnu6YhrSU0jgQgO5s9SBqC7CLmBs4iIhOLHSH_Xbfc2-fK20UR3-TE

            moviesSearchResponse = await moviesSearchResponse.json();
            searchResult = moviesSearchResponse.results;
            // console.log(searchResult)
            let moviesDisplayapiSearch = "";
            for(let i=0 ; i<searchResult.length ; i++)
            {
                if(searchResult[i].title.toLowerCase().includes(searchValueApi.toLowerCase())){
                    moviesDisplayapiSearch+=`<div class="col-xl-4 col-md-6">
                                <div class="movie-item my-3">
                                    <img class="img-fluid" src="${imgPath+searchResult[i].poster_path}" alt="">
                                    <div class="layer">
                                        <h2>${searchResult[i].title}</h2>
                                        <p>${searchResult[i].overview}</p>
                                        <p>${searchResult[i].vote_average}</p>
                                        <p>${searchResult[i].release_date}</p>
                                    </div>
                                </div>
                            </div>`;
                        }
            }
            // console.log(moviesDisplayapiSearch)
            console.log('ana wasalt')
            $('#searchResult').html(moviesDisplayapiSearch)
        }
        // The Shawshank Redemption
    }
    //SEARCH IN PAGE
    function searchMovie(searchValueInPage){
        if(searchValueInPage==''){
            moviesDisplayInPageSearch = "";
            $('#searchResult').html(moviesDisplayInPageSearch)
        return false;       
        }else{
            let moviesDisplayInPageSearch = "";
            for(let i=0 ; i<allMovies.length ; i++)
            {
                if(allMovies[i].title.toLowerCase().includes(searchValueInPage.toLowerCase())){
                    moviesDisplayInPageSearch+=`<div class="col-xl-4 col-md-6">
                                <div class="movie-item my-3">
                                    <img class="img-fluid" src="${imgPath+allMovies[i].poster_path}" alt="">
                                    <div class="layer">
                                        <h2>${allMovies[i].title}</h2>
                                        <p>${allMovies[i].overview}</p>
                                        <p>${allMovies[i].vote_average}</p>
                                        <p>${allMovies[i].release_date}</p>
                                    </div>
                                </div>
                            </div>`;
                        }
            }
            $('#searchResult').html(moviesDisplayInPageSearch)
            console.log(moviesDisplayInPageSearch)
        }
    }
    searchValueInPage= document.getElementById('searchInPage')
    searchValueInAPI = document.getElementById('searchInAPI')
    $('#searchInPage').keyup(function(){
        searchMovie(searchValueInPage.value)
    })
     $('#searchInAPI').keyup(function(){
        searchMoviesAPI(searchValueInAPI.value)
    })
    $('#contactUslink').click(function(){
        let myoffset =$('#contactUs').offset().top;
        $('body, html').animate({scrollTop:myoffset},2000,'linear');
    })