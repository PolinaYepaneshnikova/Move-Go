/*The function makes a post request to the server, 
which accepts the entered data from the form*/

import axios from 'axios';

export default async function postRequest(url, data) {
  const result = await axios.post(url, data);
  return await result.data;
};