const {shortenService, redirectService} = require("../services")
const shorten = async (req, res) => {
    if(!req.body.url){
        res.status(400).json({
            "error": "URL is a mandatory field"
        })
        return
    }
    const url = req.body.url;
    if(typeof url !== 'string') {
        res.status(400).json({
            "error": "URL should be a string"
        })
        return
    }
    try {
        const result = await shortenService(url)
        res.status(200).json({
            "message": "URL successfully shortened",
            "shortend-url-endpoint": result
        })
    }catch(e) {
        console.error("Unexpected Error while shortening the URL", e)
        res.status(500).json("Something went wrong")
    }


}

const redirect = async (req, res) => {
    if(!req.params.shortCode){
        res.status(400).json({
            "error" : "shortend URL code missing in request Paramters"
        })
        return ;
    }
    let shortCode = req.params.shortCode
    try {
        const redirectURL = await redirectService(shortCode)
        res.status(301).redirect(redirectURL)
        console.log(`Successfully Redirected to: ${redirectURL}`)
    }catch(e) {
        console.error("Error while redirecting the URL", e)
        res.status(500).json({"error": "Something went wrong while redirecting the URL"})
    }

}


module.exports = {
    shorten, redirect
}