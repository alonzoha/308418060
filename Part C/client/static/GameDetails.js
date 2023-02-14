const gamesDetail = document.getElementById("gamesDetail");
const loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let users, usersOptions, gameInvitees;

Promise.all([
    fetch(`http://localhost:3000/users`).then((res) => res.json()),
    fetch(`http://localhost:3000/games/${params.id}`).then((res) => res.json()),
    fetch(`http://localhost:3000/invitees/${params.id}`).then((res) =>
        res.json()
    ),
]).then((allResponses) => {
    const users = allResponses[0]?.data;
    const game = allResponses[1]?.data[0];
    const gameInvitees = allResponses[2]?.invitees;

    invitees = gameInvitees
        ?.map((user) => "<li>" + user.fullname + "</li>")
        .join("");

    usersOptions = users
        ?.filter((user) => user.id !== loggedInUser.id)
        ?.filter(
            (user) => !gameInvitees.map((u) => u.user_id)?.includes(user.id)
        )
        ?.map(
            (user) =>
                "<option value=" + user.id + ">" + user.fullname + "</option>"
        )
        .join("");

    gamesDetail.innerHTML =
        `
                <li class="formLabelDetails"><strong>Organizer: &nbsp</strong>${game.organizer}, ${game.phone}</li>
                <li class="formLabelDetails"><strong>Date & Time: &nbsp</strong>${game.date}</li>
                <li class="formLabelDetails"><strong>Court: &nbsp</strong>${game.court}</li>
                <br>
                <li class="formLabelDetails"><strong>Invitees :&nbsp&nbsp&nbsp</strong>
                    <ul>
                        ` +
        invitees +
        `
                    </ul>
                </li>
            `;
    
    if (loggedInUser.id === game.organizer_id) {
        gamesDetail.innerHTML +=
            `<div class="send-invite">
                    <i>Invite friend</i>
                    <a>
                        <i id="inviteIcon" class="fa fa-envelope fa-2x"></i>
                    </a>
                    <select id="invite-user">
                        ` +
            usersOptions +
            `
                    </select>
                    <input id="sendIcon" onclick="sendInvite()" type="image" src="../static/images/send.svg"/>
                </div>`;
    }
});

function sendInvite() {
    selectedUserIdToInvite = document.querySelector("#invite-user").value;

    fetch(`http://localhost:3000/invitees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            game_id: params.id,
            user_id: selectedUserIdToInvite,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            window.location.reload();
        })
        .catch((e) => {
            console.log(e);
            alert("A server error occurred");
        });
}
