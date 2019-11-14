const express = require("express");
const bcrypt = require("bcryptjs");
const users = [
    {id:123, email:"lars@lars.se",password: "$2a$12$3uZBEd4D9BBUop8Orvv5e.tWuJ6006pefdj3BVkz93PhObUyTON82"},
    {id:124, email:"fredrik@fredrik.se",password: "$2a$12$SmJPS/4mMMw0ghttXh92qeV9V53cYkA8geA1W9hwvw6pb.JO841z2"}
];

const app = express();
//Kommer på provet!
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.send("index route...");
});

app.get("/login",function(req,res){
    res.sendfile(__dirname + "/loginform.html")
});

app.post("/login",function(req,res){


    

    let user = users.filter(function(u){
        if(req.body.email == u.email)
        {return true;}
    });

    if(user.length===1)

    {  
        const password = req.body.password;
        const hash = user[0].password
         bcrypt.compare(password,hash,function(err,success){


        if(success)
        {
            res.send("login success");
        }
        else
        {
            res.send("wrong password");
        }
    });       
    }
    else{
        res.send("no such user...")
    }


    /**
     * 1. hämta data som klienten skickat ( Repetition )
     * 2. Leta efter användare i databas/fil/minne
     * 3. Om användare ej finns skicka respons till klient med error
     * 4. Om användare finns gå vidare med att kolla lösenord
     * 5. Om löserord ej är korrekt skicka respons till klient med error
     * 6. Om lösenord är korrekt - Skicka respons/redirect 
     * 7. Nu när användaren är inloggad måste hen förbli så ett ta
     *    Detta löser vi med JWT.
     *    Skapa JWT och lagra i cookie innan din respons/redirect
     * 8. Skapa middleware för att skydda vissa routes.
     *    Här skall vi nu använda våra JWT för att hålla en användare inloggad. 
     * 9. Småfix för att förbättra säkerhet och fixa utloggning. 
     */

    

});

// kollar om systemet har en angiven port, annars 3700...
const port = process.env.PORT || 3700
app.listen(port, function(){console.log("port:" +port)});