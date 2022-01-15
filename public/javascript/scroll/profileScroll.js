document.addEventListener("DOMContentLoaded", function (event) {
    console.log('asd');
    var scrollpos = sessionStorage.getItem('scrollposprofile');
    if (scrollpos) {
        window.scrollTo(0, scrollpos);
        sessionStorage.removeItem('scrollposprofile');
    }
});

window.addEventListener("beforeunload", function (e) {
    sessionStorage.setItem('scrollposprofile', window.scrollY);
});