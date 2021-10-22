/*The function makes a post request to the server, 
which accepts the entered data from the form*/
export default async function postRequest(url, data) {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });

  return await result.json();
};