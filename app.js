const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const newinputNames = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

app.set("view engine", "ejs");


app.get("/", function(req, res){
    
    const day = date.getDate();

    // switch (currentDay) {
    //     case 0:
    //         day= "Sunday";
    //         break;  
    //     case 1:
    //         day= "Monday";
    //         break;
    //     case 2:
    //         day= "Thuesday";
    //         break;
    //     case 3:
    //         day= "Wednesday";
    //         break;
    //     case 4:
    //         day= "Thursday";
    //         break;  
    //     case 5:
    //         day= "Friday";
    //         break;
    //     case 6:
    //         day= "Saturday";
    //         break;
    //     default:
    //         console.log("Error: current day is equal to: " + currentDay);
    // }

    res.render("list", {listTitle: day, inputName: newinputNames});

});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", inputName: workItems});
});

app.get("/about", function(req,res){
    res.render("about");
});

app.post("work", function(req,res){
    const item = req.body.inputName;
    workItems.push(item);
    res.redirect("/work");
});



app.post("/", function(req, res){

    const newinputName = req.body.inputName;

    if(req.body.list === "Work"){
        workItems.push(newinputName);
        res.redirect("/work");
    }else{
        newinputNames.push(newinputName);
        res.redirect("/");
    }

});



app.listen(3000, function(){
    console.log("Server started on port 3000");
});