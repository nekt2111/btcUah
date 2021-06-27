class Client {

    response
    async requestToRegisterUser(user){
        let response = await this.request('/user/create','POST',user)
        if(this.getResponseStatus() === 201){
            localStorage.setItem('authToken',response.token)
        }
    }

    getResponseStatus(){
        return this.response
    }
    setResponseStatus(value){
        this.response = value
    }

    async requestToLogInUser(user){
        let response = await this.request('/user/login','POST',user)
        if(this.getResponseStatus() === 200){
            localStorage.setItem('authToken',response.token)
        }
    }

    async requestToGetCurrency(){
        let response = await this.request('/btcRate','GET')
        return response.currency
    }

    async getCurrency(){
        return await this.requestToGetCurrency()
    }

    async request(url, method = 'GET', data = null) {
        try {
            const headers = {}
            let body

            if(localStorage.getItem('authToken') !== null){
                headers['token'] = localStorage.getItem('authToken')
            }
            if (data) {
                headers['Content-Type'] = 'application/json'
                body = JSON.stringify(data)
            }
            const response = await fetch(url, {
                method,
                headers,
                body
            })
            await this.setResponseStatus(response.status)
            return await response.json()

        } catch (e) {
            console.warn("Error:", e.message)
        }
    }
}

export default Client;