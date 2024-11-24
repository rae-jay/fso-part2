import { useState, useEffect } from "react";
import infoService from "./services/infoFetch";

import Results from "./components/Results";

function App() {
	const [countryNames, setCountryNames] = useState([]);
	const [searchText, setSearchText] = useState("");

	// get [] of country names, once
	useEffect(() => {
		// console.log("effect test");
		infoService.getNames().then((data) => {
			// console.log(data);
			setCountryNames(data);
		});
	}, []);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	// infoService.searchCountry("").then((result) => console.log(result));
	// infoService.searchCountry("Aus").then((result) => console.log(result));

	return (
		<div>
			<div>
				<label htmlFor="search">find countries: </label>
				<input
					id="search"
					type="text"
					value={searchText}
					onChange={handleSearchChange}
				/>
			</div>
			<Results search={searchText} bank={countryNames} />
		</div>
	);
}

export default App;
