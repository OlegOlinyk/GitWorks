// Plate
(function () {

    var plate = document.getElementById("plate_wrapp");
    var button = document.getElementById("aytorization_button");
    var login = document.getElementById("login_block");
    var welcom = document.getElementById("welcom_inf");
    var back = document.getElementById('back_to_main');

    button.addEventListener('click', flip);
    back.addEventListener('click', flip);

    function flip() {

        if (plate.classList.contains("rotate")) {
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
            plate.classList.remove("rotate");
            login.classList.add("rotate_back");
        } else {
            button.style.opacity = "0";
            button.style.pointerEvents = "none";
            plate.classList.add("rotate");
            welcom.classList.add("rotate_back");
        }
    }
})();