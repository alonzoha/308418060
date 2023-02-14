if (
    !sessionStorage.getItem("LOGGED_IN_USER") &&
    !["/LogInPage.html", "/NewUser.html"].includes(window.location.pathname)
) {
    alert("Please LogIn!");
    window.location = "LogInPage.html";
}

function logout() {
  sessionStorage.clear();
  window.location = "LogInPage.html";
}

function showPassword() {
    var x = document.getElementById("psw");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}