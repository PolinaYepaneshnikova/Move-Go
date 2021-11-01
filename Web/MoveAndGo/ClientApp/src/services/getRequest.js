/*The function makes a post request to the server, 
which accepts the entered data from the form*/

import axios from 'axios';

export default async function getRequest(url) {
  const result = await axios.get(url);
  return await result.data;
};