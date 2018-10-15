
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
