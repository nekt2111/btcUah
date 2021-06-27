import Router from "./router.js";
import TemplateProcessor from "./templateProccesor.js";
import Spinner from "./spinner.js"
import Client from "./client.js";
const router = new Router();
const client = new Client()
const templateProcessor = new TemplateProcessor();
const spinner = new Spinner();



function setAnError(err) {
    document.querySelector('.warning_block').innerText = err
}

function getValuesToLogin(){
    let email = document.getElementById("logIn_email").value
    let password = document.getElementById("logIn_password").value
    return {email, password};
}

function getValuesToRegister(){
    let email = document.getElementById("register_email").value
    let password = document.getElementById("register_password").value
    return {email, password};
}

async function registerUser(){
    await client.requestToRegisterUser(getValuesToRegister())
    let status = client.getResponseStatus()
    if(status === 201){
        router.changeLocation('main')
    }
    else if(status === 409){
        setAnError('Користувач з такою поштою вже зареєстрован')
    }
    else {
        setAnError('Виникла помилка. Спробуйте ще раз')
    }
}

async function logInUser(){
    await client.requestToLogInUser(getValuesToLogin())
    let status = client.getResponseStatus()
    if(status === 200){
        router.changeLocation('main')
    }
    else if(status === 401){
        setAnError('Неправильна пошта або пароль')
    }
    else if(status === 404){
        setAnError('Користувач з такою поштою не знайдений')
    }
    else {
        setAnError('Виникла помилка. Спробуйте ще раз')
    }
}

function getValueToConvert(){
    return document.getElementById("main_converter").value;
}

async function convertInputValue(){
    let value = getValueToConvert()
    if(!isNaN(value) && value >= 0){
        let response = await client.getCurrency()
        let result = response * value
        let resultStr = result.toString()
        if(resultStr.includes('.')){
            let splitedStr = result.toString().split('.')
            document.getElementById('result').innerText = splitedStr[0] + "." + splitedStr[1].substr(0, 2)
        }
        else{
            document.getElementById('result').innerText = resultStr
        }
    }
    else{
        document.getElementById('result').innerText = ''
        setAnError('Введіть коректну кількість біткоїнів.')
    }
}


async function addEventListeners(state){
    switch (state){
        case "main":
            await document.querySelector(".form_wrapper").addEventListener('submit',async (e)=>{
                e.preventDefault()
                setAnError('')
                spinner.showMiniSpinner()
                await convertInputValue()
                spinner.hideMiniSpinner()
            })
            await document.querySelector('.exit_link').addEventListener('click',(e)=>{
                e.preventDefault()
                localStorage.removeItem('authToken')
                router.changeLocation('')
            })
           break
        case "registration":
            await document.querySelector(".registration_form_wrapper").addEventListener('submit',async (e)=>{
                await registerUser()
                e.preventDefault()
            })
            await document.querySelector(".logIn_link").addEventListener('click',(e)=>{
                router.changeLocation('')
                e.preventDefault()
            })
            break
        default:
            await document.querySelector(".registration_link").addEventListener('click',(e)=>{
                router.changeLocation('registration')
                e.preventDefault()
            })
            await document.querySelector(".auth_form_wrapper").addEventListener('submit',async (e)=>{
                await logInUser()
                e.preventDefault()
            })
            break;
    }
}


let view
async function change(fileName){
    await import(`./views/${fileName}Page.js`).then((viewModule)=>{
        view = viewModule.default;
    }).then(()=>{
        templateProcessor.render(view)
    })
}

async function load(){
    let fileName;
    spinner.showSpinner()
    let currency;
    if(localStorage.getItem('authToken') !== null) {
        currency = await client.getCurrency()
        fileName = router.getCurrentState(client.getResponseStatus())
    }
    else{
        fileName = router.getCurrentState()
    }
    await change(fileName)
    spinner.hideSpinner()
    if(fileName === 'main'){
        if(currency === undefined){
            setAnError('Виникла помилка. Спробуйте ще раз.')
            document.getElementById('result').innerText = '0'
        }
        else {
            let splitedStr = currency.toString().split('.')
            document.getElementById('result').innerText = splitedStr[0] + "." + splitedStr[1].substr(0, 2)
        }
    }
    await addEventListeners(fileName)
    window.scroll(0,0);
}


window.onhashchange = await load
await load()
