import axios from "axios";

export default async function formRequest(url, data) {
  const result = await axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  });
  return await result.data;
};