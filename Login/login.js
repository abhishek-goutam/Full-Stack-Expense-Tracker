async function login(e) {
  try {
    e.preventDefault();
    const loginDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const response = await axios.post(
      "http://localhost:3000/user/login",
      loginDetails
    );
    console.log("response-------",response)
    if (response.status == 200) {
      alert(response.data.message);
      localStorage.setItem('token',response.data.token);
      window.location.href ="../../ExpenseTracker/index.html"
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    document.body.innerHTML += `<div style=""color:red>${error.message}</div>`;
  }
}
