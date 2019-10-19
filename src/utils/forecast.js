const request = require('request')

const forecast = (lat, long , callback) => {
	const url = 'https://api.darksky.net/forecast/8350713870f50645277ea59b2f914abf/'+ lat + ',' + long;

	request({url, json:true}, (err, response) => {
		const {currently, daily, error} = response.body

		if (err){
			callback('Unable to connect with weather services', undefined)
		}else if(error){
			callback('Unable to find location... try another location')
		}else{
			
			callback(undefined, daily.data[0].summary+'. It is currently '+currently.temperature+ ' degrees out. There is '+currently.precipProbability+'% chance of rain')
		}
	})
}

module.exports = forecast