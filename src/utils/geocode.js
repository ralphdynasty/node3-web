const request = require('request')

const geocode = (address, callback) =>{
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + 
	'.json?access_token=pk.eyJ1IjoicmFscGhkeW5hc3R5IiwiYSI6ImNrMWlicWs5dzB1cG0zbnA2cjEzemdpcG8ifQ.aW8TBTx9-fokEd_tb4wmoA&limit=1'

	request({url, json:true}, (error, {body}) => {
		if(error){
			callback('Unable to connect to location services!', undefined)
		}else if(body.features.length == 0){
			callback('Cannot find location... Try another location', undefined)
		}else{
			callback(undefined, {
				longitude:body.features[0].center[0],
				latitude:body.features[0].center[1],
				location:body.features[0].place_name
			})
		}
	} )
}


module.exports = geocode