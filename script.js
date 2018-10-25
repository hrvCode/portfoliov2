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
    width[index].textContent = skill.name;
    codebars[index].style.width = skill.wdt;
    codebars[index].style.opacity = num;
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
  if(distance < 500 && distance > -200){
    func(1);
  }else{
    func(0);
  }
}
// get distance to top of element
function checkDistance(element){
  return element.getBoundingClientRect().top;
}
