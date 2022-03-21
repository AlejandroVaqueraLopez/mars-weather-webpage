const axios = require("axios");

let fetchData = async (API) => {
	try{
		const response = await axios.get(API)
		return response;
	}catch(error){
		console.log(error)
	}
}
module.exports = {fetchData};
