
class Router {
       getCurrentState(status) {
        let fileName;
        let location = window.location.hash.split("#")[1];
        if(status !== 200) {
            switch (location) {
                case "":
                    fileName = "index"
                    break
                case "registration":
                    fileName = "registration"
                    break
                default:
                    this.changeLocation('')
                    fileName = "index"
                    break
            }
        }
                else {
                this.changeLocation('main')
                fileName = "main"
                }

        return fileName
    }

    changeLocation(location){
         window.location.hash = "#" + location
    }
}

export default Router;