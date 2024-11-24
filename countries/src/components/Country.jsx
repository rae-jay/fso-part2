import { useEffect, useState } from "react";
import infoService from "../services/infoFetch";

// everything below the country name, that has to be fetched seperately
const Details = (props) => {
	const data = props.data;
	// console.log("data: ");
	// console.log(data);

	if (!data) {
		return <div>...</div>;
	} else {
		return (
			<div>
				<p>Capital: {data.capital}</p>
				<p>Population: {data.population}</p>
				<h3>Languages:</h3>
				<ul>
					{Object.entries(data.languages).map((entry) => {
						return <li key={entry[1]}>{entry[1]}</li>;
					})}
				</ul>
				<img src={data.flags.png} alt="flag" />
			</div>
		);
	}
};

const Weather = (props) => {
	const weather = props.weather;

	if (!weather) {
		return <div>...</div>;
	} else {
		const data = weather.current;
		// console.log(data);
		return (
			<div>
				<h3>Weather in {weather.capital}:</h3>
				<p>{data.condition.text}</p>
				<img src={"http:" + data.condition.icon} alt="weather icon" />
				<p>
					{data.temp_c} C / {data.temp_f} F
				</p>
				<p>Humidity: {data.humidity}%</p>
			</div>
		);
	}
};

const Country = (props) => {
	const country = props.country;
	const [countryData, setCountryData] = useState();
	const [weatherData, setWeatherData] = useState();

	if (!country) {
		return <div>Something went wrong</div>;
	}

	useEffect(() => {
		infoService.searchCountry(country).then((data) => {
			setCountryData(data);
			if (data.capital) {
				const capital = data.capital;
				infoService.getWeather(capital).then((data) => {
					data.capital = capital;
					setWeatherData(data);
				});
			}
		});
	}, [country]);

	return (
		<div>
			<h1>{country}</h1>
			<Details data={countryData} />
			<Weather weather={weatherData} />
		</div>
	);
};

export default Country;

//     function weatherStats(data){
//         const weatherOb = {};
//         weatherOb.locCity = data.location.name;
//         weatherOb.locCountry = data.location.country;
//         weatherOb.locRegion = data.location.region;

//         weatherOb.condition = data.current.condition.text;
//         weatherOb.tempC = data.current.temp_c;
//         weatherOb.tempF = data.current.temp_f;
//         weatherOb.windMph = data.current.wind_mph;
//         weatherOb.windKph = data.current.wind_kph;
//         weatherOb.humidity = data.current.humidity;

//         weatherOb.iconLink = 'http:' + data.current.condition.icon;

//         return weatherOb;
//     }
