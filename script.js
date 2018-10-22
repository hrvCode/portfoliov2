// COPIED CODE FROM
// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: "start"
        });
    });
});


// Showing rest of Portfolio sites,
// When hovering over a picture, Height of the current box will increase and more snaps will show.
let navBtn = document.querySelector(".navigator-btn");
navBtn.addEventListener("click", function(){
  this.classList.toggle("navigator-btn-active")
})

const skills = [{
    name: '70%',
    wdt: '70%',
  },
  {
    name: '80%',
    wdt: '80%',
  },
  {
    name: '100%',
    wdt: '100%',
  }
]


function codeTable(num){
let width = document.querySelectorAll('.codebar span');
let codebars = document.querySelectorAll('.codebar');
  skills.forEach((skill, index)=>{
    console.log(index)
    width[index].textContent = skill.name;
    codebars[index].style.width = skill.wdt;
    codebars[index].style.opacity = num;
    console.log(codebars[index])
  })
}

var flexTable = document.querySelector('.flex-table');


window.onload = () => {
    fireScript(codeTable, checkDistance(flexTable));
}
window.onscroll = () =>{
  fireScript(codeTable, checkDistance(flexTable));
}
// fire script tages a function to fire and the distance to top
function fireScript(func, distance){
  if(distance < 400 && distance > -100){
    func(1);
  }else{
    func(0);
  }
  console.log(func)
  console.log(distance)
}
// get distance to top of element
function checkDistance(element){
  return element.getBoundingClientRect().top;
}
