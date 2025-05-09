const form = document.getElementById("form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

inputEmail.value = "";
inputPassword.value = "";

form.onsubmit = async (e) => {
    try {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputEmail.value,
                password: inputPassword.value 
            })
        });

        console.log(response);
        if (!response.ok) throw new Error('Error en el login');
        window.location.replace('/users/private-cookies');
    } catch (error) {
        console.log(error);
        alert('Login failed');
        window.location.reload();
    }
};
