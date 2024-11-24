import { useState } from "react";
import Country from "./Country";

const Results = (props) => {
	const search = props.search;
	const bank = props.bank;

	const [selectedCountry, setSelectedCountry] = useState("");
	// k so 'badDecision' is actually 'last search term', and is used because otherwise
	// if one 'show' button was pressed, and a country selected, it was never de-
	// selected, even if search was changed. but every other way i tried to clear
	// it was leading to infinite render loops.
	// this CANNOT BE the optimal method, but it DOES TECHNICALLY WORK
	const [badDecision, setBadDecision] = useState("");
	if (badDecision != search) {
		setSelectedCountry("");
		setBadDecision(search);
	}

	if (!bank || bank.length < 1) {
		return <div>...</div>;
	}

	const matches = search
		? bank.filter((name) =>
				name.toLowerCase().includes(search.toLowerCase())
		  )
		: bank;

	const selectCountry = (e) => {
		const country = e.target.value;
		setSelectedCountry(country);

		// so somehow... actually needs to CLEAR results as it is and render
		// for just one country...
		// which FEELS like... overriding 'search', kinda.
	};

	// more than 10
	if (matches.length > 10) {
		return <div>Too many matches</div>;
		// less than 10, more than 1
	} else if (matches.length > 1) {
		if (selectedCountry) {
			return <Country country={selectedCountry} />;
		}
		// else
		return (
			<ul>
				{matches.map((name) => (
					<li key={name}>
						{name}{" "}
						<button value={name} onClick={selectCountry}>
							show
						</button>
					</li>
				))}
			</ul>
		);
		// none
	} else if (matches.length < 1) {
		return <div>No match found</div>;
		// one match
	} else {
		return <Country country={matches[0]} />;
	}
};

export default Results;
