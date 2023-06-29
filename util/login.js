async function login() {
  const obj = {
    email: document.getElementById("form3Example3").value,
    password: document.getElementById("form3Example4").value,
  };
  //   console.log("eeeeeeeeeee", obj);
  const res = await axios.post("http://localhost:3000/api/user/login", obj);

  console.log(res.data);
}
