const axios = require("axios");

/*Generic fetch function*/
let fetchData = async (API) => {
	try{
		const response = await axios.get(API)
		return response;
	}catch(error){
		console.log(error)
	}
}

/*Longlat api fetch function*/
let longlatDetails = async (API_URL_LONGLAT,API_KEY_LONGLAT,long,lat) => {
	try{
		const response = await axios.get(`${API_URL_LONGLAT}?access_key=${API_KEY_LONGLAT}&query=${long},${lat}`);
		return response;
	}catch(error){
		console.log(error)
	}
}

/*geomap code generator for marks*/
let genMarkCode = (long,lat,color)=>{
	let code = `marker=lonlat:${long},${lat};type:material;color:%23${color};icontype:awesome`;
	return code;
}

/*geomap url creator function*/
let geoMapMergeFetch = (API_URL_GEOMAP,API_KEY_GEOMAP,width,height,long,lat,latEvent1,longEvent1,color1,latEvent2,longEvent2,color2,latEvent3,longEvent3,color3,latEvent4,longEvent4,color4,latEvent5,longEvent5,color5) => {
	try{
		const response = (`${API_URL_GEOMAP}?style=osm-carto&width=${width}&height=${height}&center=lonlat:${long},${lat}&zoom=0&${genMarkCode(latEvent1,longEvent1,color1)}&${genMarkCode(latEvent2,longEvent2,color2)}&${genMarkCode(latEvent3,longEvent3,color3)}&${genMarkCode(latEvent4,longEvent4,color4)}&${genMarkCode(latEvent5,longEvent5,color5)}&apiKey=${API_KEY_GEOMAP}`);
		return response;
	}catch(error){
		console.log(error)
	}
}

module.exports = {fetchData,longlatDetails,geoMapMergeFetch};
