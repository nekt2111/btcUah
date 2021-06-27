const view = `
<div class="spinner__wrapper" style="display: none">
                <div id="spinner"></div>
            </div>
<div class="wrapper">
            <form class="registration_form_wrapper">
                <div class="title_block">Реєстрація</div>
                 <div class="warning_block" style="color: red"></div>
                <div class="input_login_block"><input type="text" id="register_email" placeholder="Пошта" required pattern="([A-Za-z]|[0-9]){4,20}[@]{1}[a-z]{3,10}[.]{1}[a-z]{2,5}"></div>
                <div class="input_password_block"><input type="text" id="register_password" placeholder="Пароль" required pattern="([A-Za-z]|[0-9]){6,15}"></div>
                <div class="submit_btn_block"><button id="registerBtn">Зареєструватись</button></div>
                <div class="go_back_to_login">Вже є аккаунт?<a class="logIn_link">Увійти</a></div>
            </form>
        </div>`

export default view;