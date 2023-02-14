const games_table = document.querySelector("#games_table tbody");
const user = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

fetch(`http://localhost:3000/games`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response.data?.length > 0) {
            for (let i = 0; i < response.data?.length; i++) {
                const game = response.data[i];
                if (game.organizer_id !== user.id) {
                    continue;
                }

                    games_table.innerHTML += `
                    <tr>
                        <td>You</td>
                        <td>${game.date}</td>
                        <td>${game.court}</td>
                        <td><span class="cancel_reg" class="fa fa-minus" aria-hidden="true" title="cancel register" onclick="cancel(${game.id})">Cancel</span></td>
                        <td><a href="GameDetails.html?id=${game.id}" class="fa fa-plus" aria-hidden="true" title="show more details">Show more details</a></td>
                    </tr>
                `;
            }
        } else {
            alert("No games was found!");
        }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });


function cancel(game_id) {
    fetch(`http://localhost:3000/games/${game_id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((response) => {
            alert("This game has been canceled");
            window.location.reload();
        })
        .catch((e) => {
            console.log(e);
            alert("A server error occurred");
        });
}