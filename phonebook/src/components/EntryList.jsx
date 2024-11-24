const Entry = (props) => {
	const person = props.person;
	const deleteFunc = () => props.deleteFunc(person.id);

	return (
		<p>
			{person.name} | {person.number} |{" "}
			<button onClick={deleteFunc}>delete</button>
		</p>
	);
};

const EntryList = (props) => {
	const persons = props.persons;
	const searchText = props.searchText;
	// also don't love how many layers this just gets handed through
	const deleteFunc = props.deleteFunc;

	// don't love the structure of this one-use func but uh
	const filterList = () => {
		if (searchText == "") {
			return persons;
		} else {
			const lowText = searchText.toLowerCase();

			return persons.filter((person) => {
				return person.name.toLowerCase().includes(lowText);
			});
		}
	};
	const personsToShow = filterList();

	return (
		<div>
			{personsToShow.map((person) => (
				<Entry
					key={person.id}
					person={person}
					deleteFunc={deleteFunc}
				/>
			))}
		</div>
	);
};

export default EntryList;
