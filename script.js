
// COPIED CODE FROM
// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        console.log(e);
        e.preventDefault();
        console.log(e)
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: "start"
        });
    });
});
