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
    // console.log("Message",res.message);
    // document.getElementById("addToMe").getElementsByClassName("row justify-content-center").innerHTML +=
    // "<h3>User already exist</h3>";
    document.getElementById("addToMe").innerHTML +=
    "<h3>User already exist, Please try a different email!</h3>";
    // window.alert(res);
  } catch (error) {
    console.log(error);
  }
}
