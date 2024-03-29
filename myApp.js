let express = require('express');
let app = express();
let dotenv = require('dotenv');
let bodyParser = require("body-parser");

dotenv.config();

// console.log("Hello World");   

app.use(bodyParser.urlencoded({extended:false}));

// app.post("/", (req,res)=>{
//     const first=req.body.first;
//     const last=req.body.last;

//     res.send("firstname :${first} , lastname: ${last} ");
// });

app.use(bodyParser.json());

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

app.post("/name",(req,res)=>{
    const first=req.body.first;
    const last=req.body.last;

    res.send({"name": first + " " + last});
})






















 module.exports = app;
