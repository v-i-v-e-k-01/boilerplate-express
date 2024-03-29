let express = require('express');
let app = express();
let dotenv = require('dotenv')

dotenv.config();

// console.log("Hello World");                 

const htmlPath= __dirname + "/views/index.html";
app.get("/", (req,res)=>{
    // res.send("Hello Express");
    res.sendFile(htmlPath);
})

const cssPath = __dirname + "/public/"
app.use("/public",express.static(cssPath));

const message= {"message":"Hello json"};
app.get("/json", (req,res)=>{
    // res.json(message);
    if(process.env.MESSAGE_STYLE === "uppercase")
    {
        res.json({"message":"HELLO JSON"});
    }
    else
    {
        res.json({"message":"Hello json"});
    }
});
































 module.exports = app;
