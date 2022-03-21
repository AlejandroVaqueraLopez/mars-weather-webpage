const express = require("express");
const path = require("path");
require("dotenv").config();//configuring dotenv package
const API = process.env.API;
const app = express();
const axios = require("axios");
const fetchFile = require("./views/utils/fetchData.js");
//const templateFile = require("./views/utils/template.js");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"views")));

app.get("/",(req,res)=>{
	res.render(path.join(__dirname,"views/index.ejs"));
})

//fetchData
app.get("/mars", async (req,res) =>{
	try{
		//const response = await fetchFile.fetchData(API);
		//console.log(response.data);
		fetchFile.fetchData(API);
		var name = "holaaa";

		res.render(path.join(__dirname,"views/mars.ejs"),{name:name});
	}catch(error){
		console.log(error);
	}
})

app.listen(2500,()=>{
	console.log("Server ready")
});
