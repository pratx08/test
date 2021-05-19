/*
Setting up localhost axios to transfer the collected data from forms.
Created a seperate instance for localhost
*/

import Axios from 'axios';
const Instance = Axios.create({
    baseURL: "http://localhost:8080/"
});
export default Instance;