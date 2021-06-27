const view = `
<div class="spinner__wrapper" style="display: none">
                <div id="spinner"></div>
            </div>
<div class="wrapper">
        <form class="form_wrapper">
            <div class="title_block">Конвертор</div>
            <div class="warning_block"></div>
            <div class="input_name_block"><input id="main_converter" type="text" placeholder="Кількість біткоїнів" required  value="1"></div>
            <div class="submit_btn_block"><button id="convertBtn">Конвертувати у гривні</button></div>
            <div class="result_block">Сума у гривнях - <p style="display: inline" id="result">0</p></div>
            <div class="mini-spinner__wrapper" style="display: none">
                <div id="mini-spinner"></div>
            </div>
            <div class="exit_block">Чи хочете ви вийти?<a class="exit_link">Вийти</a></div>
        </form>
    </div>`

export default view;