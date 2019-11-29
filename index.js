const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./modules/auth");
const login = require("./modules/login");
const loginForm = require("./modules/login-form");




const app = express();
//Kommer på provet!
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.get("/",function(req,res){
    res.send("My login scrypt page");
});
// exempel-route för att hantera inloggade användare
app.get("/secret",auth,function(req,res){
    res.send(req.cookies);
   
});

//två routes för att hantera inloggnings processen 
app.get("/login",loginForm);
app.post("/login",login);

// kollar om systemet har en angiven port, annars 3700...
const port = process.env.PORT || 3700
app.listen(port, function(){console.log("port:" +port)});