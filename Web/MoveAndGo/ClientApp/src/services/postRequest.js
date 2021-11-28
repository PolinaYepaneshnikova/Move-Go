import axios from 'axios';

export default async function postRequest(url, data) {
  const result = await axios.post(url, data);
  return await result.data;
};