function getProfile() {
    if (sessionStorage.getItem('LOGGED_IN_USER')) {
        const user = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
        const first_name = document.getElementById("first_name");
        const last_name = document.getElementById("last_name");
        const Email = document.getElementById("Email");
        const phone = document.getElementById("phone");
        const psw = document.getElementById("psw");

        first_name.value = user.first_name;
        last_name.value = user.last_name;
        Email.value = user.email;
        phone.value = user.phone;
        psw.value = user.password;
    }
}

function updateProfile(event) {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const Email = document.getElementById("Email");
    const phone = document.getElementById("phone");
    const psw = document.getElementById("psw");

    if (validate(first_name, last_name, Email, phone, psw)) {
        const updatedUserString = JSON.stringify({
            first_name: first_name.value,
            last_name: last_name.value,
            email: Email.value,
            phone: phone.value,
            password: psw.value,
            id: user.id,
        });

        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: updatedUserString,
        })
            .then((response) => response.json())
            .then((response) => {
                sessionStorage.setItem("LOGGED_IN_USER", updatedUserString);
                window.location = "index.html";
            })
            .catch((e) => {
                console.log(e);
                alert("A server error occurred");
            });
    }
}

function validate(first_name, last_name, Email, phone, psw) {
    if (
        !first_name.value ||
        !last_name.value ||
        !Email.value ||
        !phone.value ||
        !psw.value
    ) {
        alert("Some fields are missing!");
        return false;
    }

    if (!check_str_onlyLetters(first_name.value)) {
        alert("Only English letters are allowed for first_name");
        return false;
    }

    if (!check_str_onlyLetters(last_name.value)) {
        alert("Only English letters are allowed for last_name");
        return false;
    }

    if (!check_email(Email.value)) {
        alert("email is invalid");
        return false;
    }

    if (!check_phone(phone.value)) {
        alert("phone is invalid");
        return false;
    }

    return true;
}

function check_str_onlyLetters(name) {
    return /^[a-zA-Z\s]*$/i.test(name);
}

function check_email(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function check_phone(phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        phone
    );
}
