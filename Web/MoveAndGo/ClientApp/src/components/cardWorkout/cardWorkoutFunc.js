import deleteRequest from '../../services/deleteRequest';
import postRequest from '../../services/postRequest';

const userComplaint = (id) => {
  let ask = window.confirm('Do you want to report this post?');
  if (ask) {
    let complaint = prompt('What is the reason for the complaint?', '');
    let data = { itemLink: `/workout/${id}`, text: complaint };
    postRequest("/api/admin/complain", data)
      .then(() => alert('Your complaint has been sent for consideration by the administration!'))
      .catch(() => alert('Sorry, there was an error submitting your complaint!'))
  }
  else {
    alert("Post complaint has been canceled!");
  }
}

const adminDeletePost = (id) => {
  let ask = window.confirm('Are you sure you want to delete the post?');
  if (ask) {
    let data = { link: `/workout/${id}` };
    deleteRequest("/api/admin/delete", data)
      .then(() => {
        alert('The post has been successfully deleted!');
        document.location.href = '/';
      })
      .catch(() => alert('An error has occurred!'));
  }
  else {
    alert("Post deletion has been canceled!");
  }
}

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

export { userComplaint, adminDeletePost, blockUser };