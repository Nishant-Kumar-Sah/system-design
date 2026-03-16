const { urlRepository } = require("../repository");
const { fetchByShortCode } = require("../repository/urlRepository");
const {encode} = require("../utils")

const shortenService = async(longURL) => {
    const existingURL = await urlRepository.findByLongUrl(longURL)
    if(existingURL) {
        return existingURL;
    }

    const save = await urlRepository.save(longURL)
    const shortCode = encode(save.id)
    const update = await urlRepository.update(save.id, shortCode)

    return shortCode;
}

const redirectService = async(shortCode) => {
    console.log("Fetching longURL ")
    try {
        const result = await fetchByShortCode(shortCode);
        if(!result) {
            throw new Error("URL not found or expired")
        }
        return result.longURL;
    }catch(err) {
        console.error("Error Occurred while fetching longURL for redirection", err)
        throw err;
    }
}

module.exports = {shortenService, redirectService}