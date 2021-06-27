const view = `
<div class="spinner__wrapper" style="display: none">
                <div id="spinner"></div>
            </div>
        <div class="wrapper">
        <form class="auth_form_wrapper">
            <div class="title_block">Увійти</div>
            <div class="warning_block"></div>
            <div class="input_login_block"><input type="text" id="logIn_email" placeholder="Пошта" required pattern="([A-Za-z]|[0-9]){4,20}[@]{1}[a-z]{3,10}[.]{1}[a-z]{2,5}"></div>
            <div class="input_password_block"><input type="password" id="logIn_password" placeholder="Пароль" required pattern="([A-Za-z]|[0-9]){6,15}"></div>
            <div class="submit_btn_block"><button id="logInBtn" type="submit">Увійти</button></div>
            <div class="registration_link_block">Чи хочете ви зареєструватись?<a class="registration_link">Натисніть сюди</a></div>
        </form>
        </div>
  
`
export default view;

