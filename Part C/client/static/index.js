fetch(`http://localhost:3000/games`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response.data?.length > 0) {
            for (let i = 0; i < response.data?.length; i++) {
                const game = response.data[i];

                games_table.innerHTML += `
                    <tr>
                        <td>${game.organizer}</td>
                        <td>${game.date}</td>
                        <td>${game.court}</td>
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
