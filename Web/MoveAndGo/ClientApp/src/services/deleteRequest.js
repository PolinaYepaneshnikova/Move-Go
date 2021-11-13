export default async function deleteRequest(url, data) {
  return await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};