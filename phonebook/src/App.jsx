import { useState, useEffect } from "react";

import serverService from "./services/persons";
import InputField from "./components/InputField";
// there is a third seperated component, it's just only used by EntryList
import EntryList from "./components/EntryList";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchText, setSearchText] = useState("");
	const [notification, setNotification] = useState(null);
	//

	// initial load
	useEffect(() => {
		serverService.getAll().then((data) => {
			setPersons(data);
		});
	}, []);
	//

	const resetFields = () => {
		setNewName("");
		setNewNumber("");
		setSearchText("");
	};

	const makeNotification = (message, isError) => {
		setNotification({ message: message, isError: isError });
		setTimeout(() => setNotification(null), 3000);
	};

	// add/remove/change data
	const submitName = (e) => {
		e.preventDefault();

		// persons.some((person) => person.name == newName)
		const preexisting = persons.find((person) => person.name === newName);
		if (preexisting) {
			if (preexisting.number !== newNumber) {
				const newObject = { ...preexisting, number: newNumber };

				serverService.updateEntry(newObject).catch((error) => {
					makeNotification(
						`${newName} has already been removed from server`,
						true
					);
				});
				setPersons(
					persons.map((p) => (p.id !== newObject.id ? p : newObject))
				);
				resetFields();

				// feels like this should be overriding the error message when it
				// happens but also doesn't SEEM to be happening, so...?
				makeNotification(`Edited entry for ${newName}`, false);
			} else {
				makeNotification(
					`${newName} is already added to the phonebook`,
					true
				);
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};

			serverService
				.createEntry(newPerson)
				.then((data) => {
					setPersons(persons.concat(data));
					resetFields();
					makeNotification(
						`Added ${newPerson.name} to phonebook`,
						false
					);
				})
				.catch((error) => {
					makeNotification("Something went wrong", true);
				});
		}
	};

	const deleteEntry = (id) => {
		serverService.deleteEntry(id);
		setPersons(persons.filter((person) => person.id !== id));
	};
	//

	// input value change
	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	//(im sorry i need these empty // for spacing or my linter or w/e deletes \n's)
	return (
		<div>
			<Notification info={notification} />
			<h1>Phonebook</h1>
			<InputField
				id={"searchField"}
				value={searchText}
				changeFunc={handleSearchChange}
				label={"Search: "}
			/>
			<br />

			<h2>Add new:</h2>
			<form onSubmit={submitName}>
				<InputField
					id={"nameField"}
					value={newName}
					changeFunc={handleNameChange}
					label={"Name: "}
				/>
				<br />
				<InputField
					id={"numberField"}
					value={newNumber}
					changeFunc={handleNumberChange}
					label={"Number: "}
				/>
				<br />
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			<EntryList
				persons={persons}
				searchText={searchText}
				deleteFunc={deleteEntry}
			/>
		</div>
	);

	// search filter
	// form
};

export default App;

// on press 'submit', add value of input to persons[]
// persons[] content should be displayed below 'Numbers'
