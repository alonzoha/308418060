function signUp(event) {
    event.preventDefault();
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const Email = document.getElementById("Email");
    const phone = document.getElementById("phone");
    const psw = document.getElementById("psw");
        
    if (validate(first_name, last_name, Email, phone, psw)) {
        fetch(`http://localhost:3000/signUp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: first_name.value,
                last_name: last_name.value,
                email: Email.value,
                phone: phone.value,
                psw: psw.value
            }),
        })
            .then((response) => response.json())
            .then((response) => {
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
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
}