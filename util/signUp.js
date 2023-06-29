async function signUp() {
  try {
    const data = {
      name: document.getElementById("form3Example1c").value,
      email: document.getElementById("form3Example3c").value,
      password: document.getElementById("form3Example4c").value,
    };
    const res = await axios.post(
      "http://localhost:3000/api/expense/signUp",
      data
    );

    console.log("response",res)

    if (res.data == "User exists") {
      document.getElementById("addToMe").innerHTML +=
        "<h3>User already exist, Please try a different email!</h3>";
    }else{
      document.getElementById("addToMe").innerHTML +=
        "<h2>You have successfully Signed Up, You can login now</h2>";
    }
  } catch (error) {
    console.log(error);
  }
}
