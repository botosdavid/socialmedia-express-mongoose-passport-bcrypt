document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = sessionStorage.getItem('scrollpossearchindex');
    if (scrollpos) {
        window.scrollTo(0, scrollpos);
        sessionStorage.removeItem('scrollpossearchindex');
    }
});

window.addEventListener("beforeunload", function (e) {
    sessionStorage.setItem('scrollpossearchindex', window.scrollY);
});