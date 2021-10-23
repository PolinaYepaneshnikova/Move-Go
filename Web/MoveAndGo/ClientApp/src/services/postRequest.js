/*The function makes a post request to the server, 
which accepts the entered data from the form*/

import axios from 'axios';

export default async function postRequest(url, data) {
  return await axios.post(url, data);
};