function logIn(event) {
    event.preventDefault();
    const Email = document.getElementById("Email");
    const psw = document.getElementById("psw");

    if (Email.value && psw.value) {
        fetch(`http://localhost:3000/logIn`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: Email.value,
                password: psw.value,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.data?.length > 0) {
                    const user = response.data[0];
                    sessionStorage.setItem(
                        "LOGGED_IN_USER",
                        JSON.stringify(user)
                    );
                    window.location = "MyInvitations.html";
                } else {
                    alert("No user was found for the given email & password!");
                }
            })
            .catch((e) => {
                console.log(e);
                alert("A server error occurred");
            });
    } else {
        alert("Email & password are required!");
    }
}
