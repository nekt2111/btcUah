const bcrypt = require('bcrypt')
const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const database = require('./database').prototype
const keys = require('./config/keys')
const app = express()




app.use(express.json())
app.use(express.static(path.resolve(__dirname,'client')))

function getUsers(){
    return database.getDatabase()
}

function createUser(user){
    database.addNewUserToDatabase(user)
}


app.get('/btcRate',async (req,res)=>{
    let currency = await requestToBtcCurrencyAPI()
    try{
        jwt.verify(req.headers.token,keys.jwt)
        res.status(200).json({currency})
    }
    catch (e){
        res.status(401).json({currency:undefined})
    }

})

app.post('/user/create',(req,res)=>{
    let candidate = req.body
    if(getUsers().find(c => c.email === candidate.email) === undefined){
        let salt = bcrypt.genSaltSync()
        let password = req.body.password
        let user = {email:candidate.email,password:bcrypt.hashSync(password,salt)}
        createUser(user)
        const authTokenForNewUser = getJwtToken(candidate)
        res.status(201).json({message:"user created",token:authTokenForNewUser})
    }
    else{
        res.status(409).json({message:"user already exists"})
    }
})

app.post('/user/login',(req,res)=>{
    let candidate = req.body
    let potentialUser = getUsers().find(c => c.email === candidate.email)
    if(potentialUser !== undefined){
        if(bcrypt.compareSync(candidate.password,potentialUser.password)){
            const token = getJwtToken(potentialUser)
            res.status(200).json({token:token})
        }
        else{
            res.status(401).json({message:"wrong password"})
        }
    }
    else{
        res.status(404).json({message:"user does not exist"})
    }


})

function getJwtToken(user){
    return jwt.sign({email: user.email},keys.jwt,{expiresIn: 60*60})
}

async function requestToBtcCurrencyAPI() {
    let currency = 0;
    const rp = require('request-promise');
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
            'start':'1',
            'limit': '1',
            'convert_id':2824
        },
        headers: {
            'X-CMC_PRO_API_KEY': keys.currencyAPI
        },
        json: true,
        gzip: true
    };

    await rp(requestOptions).then(async(response) => {
        currency = await response.data[0].quote['2824'].price
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
    return currency;
}



app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','index.html'))
})



app.listen(3000,() => console.log('Server has been started on port 3000...'))