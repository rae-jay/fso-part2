import axios from "axios";

const baseUrl = "http://localhost:3001/persons/";

const getAll = () => {
	return translateResponse(axios.get(baseUrl));
};

const createEntry = (newObject) => {
	return translateResponse(axios.post(baseUrl, newObject));
};

const deleteEntry = (id) => {
	axios.delete(baseUrl + id);
};

const updateEntry = (newObject) => {
	return translateResponse(axios.put(baseUrl + newObject.id, newObject));
};

//
const translateResponse = (promise) => {
	return promise.then((response) => response.data);
};

export default { getAll, createEntry, deleteEntry, updateEntry };
