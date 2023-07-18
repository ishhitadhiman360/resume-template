// for smooth scroll
var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");// to get all anchor tags from navbar

for(var i=0; i<navMenuAnchorTags.length; i++)//for all anchor tags
{
    navMenuAnchorTags[i].addEventListener("click", function(event){
        event.preventDefault();//cancels the original action of jumping to section directly
        var targetSectionID = this.textContent.trim().toLowerCase();//gets id of sections and removes spaces, converts it to lower case
        var targetSection= document.getElementById(targetSectionID);
        var interval = setInterval(function(){
            var targetSectionCoordinates = targetSection.getBoundingClientRect();//get coordinates of section
            if(targetSectionCoordinates.top<=0)//section is reached 
            {
                clearInterval(interval);//stops scrolling
                return;
            }
            window.scrollBy(0,50);
        },20);
    });
}

// for auto fill of skills 
var progressBars = document.querySelectorAll('.skill-progress > div');
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll', checkScroll);
var animationDone = false;

function initialiseBars(){
    for( let bar of progressBars){
        bar.style.width = 0 + '%';
    }
}

initialiseBars();

function fillBars(){
    for(let bar of progressBars){
        let targetWidth= bar.getAttribute('data-bar-width');
        let currentWidth = 0;
        let interval= setInterval(function(){
            if(currentWidth> targetWidth ){
                clearInterval(interval);
                return;
            }
            currentWidth++;
            bar.style.width=currentWidth + '%';
        },8);
    }
}
function checkScroll(){
    //check whether skill container is visible
    var coordinates =  skillsContainer.getBoundingClientRect();
    if(!animationDone && coordinates.top < window.innerHeight){
        animationDone=true;
        fillBars();
    }
    else if(coordinates.top > window.innerHeight){
        animationDone=false;
        initialiseBars();
    }
}