import postRequest from "../../services/postRequest";

const blockUser = (nickname) => {
  let ask = window.confirm('Are you sure you want to block the user?');
  if (ask) {
    let data = { nickname };
    postRequest("/api/admin/blockuser", data)
      .then(() => {
        alert('The user has been successfully blocked!');
        document.location.href = '/';
      })
      .catch(() => alert('An error has occurred!'));
  }
  else {
    alert("User lock canceled!");
  }
}

const followUser = (nickname) => {
  let data = { nickname };
  postRequest("/api/relation/followuser", data)
    .then(() => {
      alert('You have successfully subscribed to the user!');
      document.location.href = '/';
    })
    .catch(() => alert('An error has occurred!'));
}

export { followUser, blockUser };