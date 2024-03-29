let express = require('express');
let app = express();
let dotenv = require('dotenv')

dotenv.config();

// console.log("Hello World");   

app.use(function(req,res,next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

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


const CurrentTime= function(req,res,next){
    req.time= new Date().toString();
    next();
};

app.get("/now",CurrentTime, function(req,res){
    res.send({time:req.time});
});

app.get("/:word/echo", (req,res)=>{
    res.send({echo:req.params.word});
} );

app.get("/name", (req,res)=>{
    res.send({"name":req.query.first + " " + req.query.last});
});


























 module.exports = app;
