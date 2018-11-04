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
    name: '40%',
    wdt: '40%',
  },
  {
    name: '60%',
    wdt: '60%',
  },
  {
    name: '80%',
    wdt: '80%',
  }
]

function codeTable(num){
  let hidden = "0%";
  let width = document.querySelectorAll('.codebar span');
  let codebars = document.querySelectorAll('.codebar');
  if(num === 0){
    skills.forEach((skill, index)=>{
      codebars[index].style.opacity = num;
      codebars[index].style.width = hidden;
    })
  }
  else{
    skills.forEach((skill, index)=>{
      width[index].textContent = skill.name;
      codebars[index].style.width = skill.wdt;
      codebars[index].style.opacity = num;
    })
  }

}

var flexTable = document.querySelector('.flex-table');
var container = document.querySelector('.container');
container.onscroll = () => {
  fireScript(codeTable, checkDistance(flexTable));
}
window.onload = () => {
  fireScript(codeTable, checkDistance(flexTable));
}
window.onscroll = () =>{
  fireScript(codeTable, checkDistance(flexTable));
}

// fire script tages a function to fire and the distance to top
function fireScript(func, distance){
  if(distance < 400 && distance > -150){
    func(1);
  }else{
    func(0);
  }
}
// get distance to top of element
function checkDistance(element){
  return element.getBoundingClientRect().top;
}
 // Visualising loading when sending a message
(function loaderOnClick(){
  let formName = document.querySelector("input[name='name']")
  let formEmail = document.querySelector("input[type='email']")
  let formMessage = document.querySelector("textarea");
  let loadElement = document.querySelector(".loader-init");
  let btn = document.querySelector('button[type="submit"]');

  btn.addEventListener("click", () => {
    // condition for form
    if(formName.value !== "" & formEmail.value !== ""
    && formEmail.value.includes("@") & formMessage.value !== ""){
      loadElement.classList.add("loader-active");
    }
  })
})();
