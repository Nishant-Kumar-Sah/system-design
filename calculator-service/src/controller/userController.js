const {users, transactions} = require("../data/store")

const register = async (req, res) => {
    
    if(!req.body.username || ! req.body.password) {
        res.status(400).json({"error": "Username and password is required for registration"})
        return 
    }
    let username = req.body.username;
    let password = req.body.password;
    if(users[username]){
        res.status(400).json({"error": "Username already exist"})
        return
    }
    
    users[username] = { "password": password, "credits":100}
    res.status(200).json({"message":"User Registered Successfully"})
}

const login = async (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({"error": "Username and Password is required for Login"})
        return
    }
    let username = req.body.username;
    let password = req.body.password;
    
    if(!users[username] || users[username].password != password){
        res.status(401).json({"error": "Invalid Credentials"})
        return
    }
    res.status(200).json({"message":"User Logged in Successfully"})
}



module.exports={
    register, login
}