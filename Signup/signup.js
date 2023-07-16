async function signup(e) {
try {
    e.preventDefault();

    const signUpDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,

    };
    const response = await axios.post(
      "http://localhost:3000/user/signUp",
      signUpDetails
    );
  
    if (response.status === 201) {
      window.location.href ="../Login/login.html";
    }else{
      throw new Error('Failed to Login')
    }
} catch (error) {
    document.body.innerHTML+=`<div style ="color:red;">${error}</div>`
}
}
