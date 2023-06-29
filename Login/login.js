async function login(e) {
  try {
    e.preventDefault();
    const loginDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      loginDetails
    );
    if (response.status == 200) {
      alert(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    document.body.innerHTML += `<div style=""color:red>${error.message}</div>`;
  }
}
