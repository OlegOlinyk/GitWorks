var menu = (function () {
    var hamburger = document.getElementById('hamburger');
    hamburger.onclick = function () {
        this.classList.toggle('open');
    };
}());

$(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});