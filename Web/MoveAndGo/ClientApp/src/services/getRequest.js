import axios from 'axios';

export default async function getRequest(url) {
  const result = await axios.get(url);
  return await result.data;
};