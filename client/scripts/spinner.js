class Spinner {
    showSpinner() {
        document.querySelector(".spinner__wrapper").style.display = "block"
        const spinner = document.getElementById("spinner");
        spinner.classList.add('show');
        if (document.querySelector(".wrapper") !== null) {
            document.querySelector(".wrapper").style.display = "none"
        } else {
            document.querySelector(".wrapper").style.display = "none"
        }
    }
    hideSpinner() {
        const spinner = document.getElementById("spinner");
        document.querySelector(".spinner__wrapper").style.display = "none"
        spinner.classList.remove('show');
    }

    showMiniSpinner(){
        document.querySelector(".mini-spinner__wrapper").style.display = "block"
        const spinner = document.getElementById("mini-spinner");
        spinner.classList.add('show');
        if (document.querySelector(".result_block") !== null) {
            document.querySelector(".result_block").style.display = "none"
        } else {
            document.querySelector(".result_block").style.display = "none"
        }
    }
    hideMiniSpinner(){
        const spinner = document.getElementById("mini-spinner");
        document.querySelector(".mini-spinner__wrapper").style.display = "none"
        spinner.classList.remove('show');
        document.querySelector(".result_block").style.display = "block"
    }
}

export default Spinner;