function createNewGame(event) {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    const date = document.getElementById("dt");
    const court = document.getElementById("court");
    const phone = document.getElementById("phone");

    if (date.value && court.value && phone.value) {
        fetch(`http://localhost:3000/games`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: date.value,
                court: court.value,
                phone: phone.value,
                organizer_id: user.id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                window.location = "MyGames.html";
            })
            .catch((e) => {
                console.log(e);
                alert("A server error occurred");
            });
    } else {
        alert("Some of the fields are missing!");
    }
}
