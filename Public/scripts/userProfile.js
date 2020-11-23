console.log(sessionStorage.getItem("token"));
console.log(sessionStorage.getItem("user"));

const username = document.getElementById("username");

// get users to form options
const getUsers = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "auth/user", options);
    const users = await response.json();
    users.forEach((element) => {
      if (element.email == sessionStorage.getItem("user")) {
        console.log("match found");
        username.innerText = element.username;
      }
    });
  } catch (e) {
    console.log(e.message);
  }
};

getUsers();
