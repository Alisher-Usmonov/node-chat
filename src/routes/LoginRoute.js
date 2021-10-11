const router = require("express").Router();
const fs = require("fs/promises");
const path = require("path")
const jwt = require("jsonwebtoken");
const { generateJWTToken } = require("../modules/jwt");

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login",
    })
});

router.post("/", async (req, res) => {
    try {
        const {username, password} = req.body;

        let dbPath = path.join(__dirname, "..", "db", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let userIndex = db.users.findIndex(user => user.username === username.toLowerCase())
        if(userIndex < 0) {
            throw new Error("User is not registered")
        }

        let isPasswordTrue = db.users[userIndex].password === password;

        if(!isPasswordTrue) {
            throw new Error("Incorrect password")
        }

        let token = generateJWTToken({ 
            id: db.users[userIndex].id,
            full_name: db.users[userIndex].full_name,
            username: db.users[userIndex].username 
        })

        res.cookie("token", token).redirect("/chat/")

    } catch(e) {
        res.render("login", {
            title: "Login",
            error: e + ''
        })
    }
});

module.exports = {
    path: "/login",
    router: router,
};
