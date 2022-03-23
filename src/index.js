const express = require("express");
const path = require("path");
require("dotenv").config();//configuring dotenv package

const API_URL_EVENTS = process.env.API_URL_EVENTS;
const API_KEY_LONGLAT= process.env.API_KEY_LONGLAT;
const API_URL_LONGLAT= process.env.API_URL_LONGLAT;

const API_URL_GEOMAP= process.env.API_URL_GEOMAP;
const API_KEY_GEOMAP= process.env.API_KEY_GEOMAP;

const app = express();
const axios = require("axios");
const fetchFile = require("./views/utils/fetchData.js");
//const templateFile = require("./views/utils/template.js");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"views")));

app.get("/",(req,res)=>{
	res.render(path.join(__dirname,"views/index.ejs"));
})

//using fetchData
app.get("/events", async (req,res) =>{
	try{
		//nasa api request
		//objects with open status
		let data1 = await fetchFile.fetchData(`${API_URL_EVENTS}?status=open`);

		//event object entry
		let eventData1 = data1.data.events[0];
		let eventData2 = data1.data.events[1];
		let eventData3 = data1.data.events[2];
		let eventData4 = data1.data.events[3];
		let eventData5 = data1.data.events[4];

		//longlat api request
		let longlatDetails1 = await fetchFile.longlatDetails(API_URL_LONGLAT,API_KEY_LONGLAT,eventData1.geometries[0].coordinates[1],eventData1.geometries[0].coordinates[0]);
		let longlatDetails2 = await fetchFile.longlatDetails(API_URL_LONGLAT,API_KEY_LONGLAT,eventData2.geometries[0].coordinates[1],eventData2.geometries[0].coordinates[0]);
		let longlatDetails3 = await fetchFile.longlatDetails(API_URL_LONGLAT,API_KEY_LONGLAT,eventData3.geometries[0].coordinates[1],eventData3.geometries[0].coordinates[0]);
		let longlatDetails4 = await fetchFile.longlatDetails(API_URL_LONGLAT,API_KEY_LONGLAT,eventData4.geometries[0].coordinates[1],eventData4.geometries[0].coordinates[0]);
		let longlatDetails5 = await fetchFile.longlatDetails(API_URL_LONGLAT,API_KEY_LONGLAT,eventData5.geometries[0].coordinates[1],eventData5.geometries[0].coordinates[0]);

		//geoapify api request
		let color1 = "9a08ff";
		let color2 = "08ffdc";
		let color3 = "9a08ff";
		let color4 = "9a08ff";
		let color5 = "9a08ff";

	let geoMapMerge = await fetchFile.geoMapMergeFetch(
		API_URL_GEOMAP,
		API_KEY_GEOMAP,
		"3000",
		"3000",
		"158",
		"13",
		eventData1.geometries[0].coordinates[0],
		eventData1.geometries[0].coordinates[1],
		color1,
		eventData2.geometries[0].coordinates[0],
		eventData2.geometries[0].coordinates[1],
		color2,
		eventData3.geometries[0].coordinates[0],
		eventData3.geometries[0].coordinates[1],
		color3,
		eventData4.geometries[0].coordinates[0],
		eventData4.geometries[0].coordinates[1],
		color4,
		eventData5.geometries[0].coordinates[0],
		eventData5.geometries[0].coordinates[1],
		color5,
	);


		//sending the objects to front via ejs
		res.render(path.join(__dirname,"views/events.ejs"),{
			eventSent1:eventData1,
			eventSent2:eventData2,
			eventSent3:eventData3,
			eventSent4:eventData4,
			eventSent5:eventData5,

			longlatSent1:longlatDetails1.data.data[0],
			longlatSent2:longlatDetails2.data.data[0],
			longlatSent3:longlatDetails3.data.data[0],
			longlatSent4:longlatDetails4.data.data[0],
			longlatSent5:longlatDetails5.data.data[0],

			geoMapMergeSent:geoMapMerge
		});
	}catch(error){
		console.log(new Error(`Error from API: ${error}`));
	}
})

app.listen(2500,()=>{
	console.log("Server ready")
});
