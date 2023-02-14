const games_table = document.querySelector("#games_table tbody");
const user = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

fetch(`http://localhost:3000/invitees`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
            console.log(response);
            for (let i = 0; i < response.invitees?.length; i++) {
                const invite = response.invitees[i];
                if (invite.invited_user_id !== user.id) {
                    continue;
                }

                games_table.innerHTML += `
                    <tr>
                        <td>${invite.organizer_fullname} - ${invite.phone}</td>
                        <td>${invite.date}</td>
                        <td>${invite.court}</td>
                        <td><span class="cancel_reg" class="fa fa-minus" aria-hidden="true" title="cancel register" onclick="decline(${invite.id})">Decline</span></td>
                        <td><a href="GameDetails.html?id=${invite.id}" class="fa fa-plus" aria-hidden="true" title="show more details">Show more details</a></td>
                    </tr>
                `;
            }
    })
    .catch((e) => {
        console.log(e);
        alert("A server error occurred");
    });

function decline(game_id) {
    fetch(`http://localhost:3000/invitees`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            game_id,
            user_id: user.id,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            alert("This invite has been declined");
            window.location.reload();
        })
        .catch((e) => {
            console.log(e);
            alert("A server error occurred");
        });
}
