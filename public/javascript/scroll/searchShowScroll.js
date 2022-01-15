document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = sessionStorage.getItem('scrollpossearchshow');
    if (scrollpos) {
        window.scrollTo(0, scrollpos);
        sessionStorage.removeItem('scrollpossearchshow');
    }
});

window.addEventListener("beforeunload", function (e) {
    sessionStorage.setItem('scrollpossearchshow', window.scrollY);
});