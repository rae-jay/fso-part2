import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const apiKey = import.meta.env.VITE_WEATHER_KEY;
const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

const getNames = () => {
	return axios
		.get(`${baseUrl}/all`)
		.then((response) => {
			return response.data.map((country) => country.name.common);
			// k now response.data is our BIG BLOCK O SHIT
		})
		.catch((error) => {
			console.log(error);
		});
};

const searchCountry = (country) => {
	// return translateResponse(axios.get(baseUrl));
	// return promise.then((response) => response.data);

	return axios
		.get(`${baseUrl}/name/${country}`)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

const getWeather = (city) => {
	return axios
		.get(weatherUrl + city)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

export default { getNames, searchCountry, getWeather };

// so first get the 'all'
// and search through each for "name":"common"
// and determine how many match, i suppose

// and if only one matches,

// k actually it has to pull hella amounts of info and i shouldn't do that
// every time
// we should just like. pre-load a list of names, probably. once.
