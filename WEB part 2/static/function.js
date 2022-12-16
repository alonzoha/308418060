function showPassword() {
  var x = document.getElementById("psw");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function check_fname_input() {
  let validation_res = false;
  let f_name = document.getElementById("first_name").value;
  let check_f_name = check_names_str(f_name);
  if (!check_f_name) {
    document.getElementById("first_name_error").innerHTML='First name should contain only English letters without spaces';
  } else {
    document.getElementById("first_name_error").innerHTML = '';
    validation_res = true;
  }
  return validation_res;

}

function check_lname_input() {
  let validation_res = false;
  let l_name = document.getElementById("last_name").value;
  let check_l_name = check_names_str(l_name);
  if (!check_l_name) {
    document.getElementById("last_name_error").innerHTML='Last name should contain only English letters without spaces';
  } else {
    document.getElementById("last_name_error").innerHTML = '';
    validation_res = true;
  }
  return validation_res;

}

function check_names_str(name) {
  return /^[a-z]+$/i.test(name);
}


function success_validation(alert_msg) {
  let check_first_n = check_fname_input();
  let check_last_n = check_lname_input();
  if (check_first_n && check_last_n) {
    alert(alert_msg);
    return true;
  } else {
    return false;
  }
}

function success_new_game(g) {
    alert("You successfully opened a new game!");
}

function success_register() {
  alert('You have successfully register to the game');
}

if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'MyGames.html') {

  document.getElementById("cancel_reg").addEventListener("click", function(e){
          if( ! confirm("Do you really want to cancel your registration?") ){
              e.preventDefault();
          } else {
              alert('Your registration was successfully cancelled');
          }
  });
}

if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'MyInvitations.html') {

  document.getElementById("ignore_invite").addEventListener("click", function(e){
          if( ! confirm("Do you want to ignore and delete this invitation?") ){
              e.preventDefault();
          } else {
              alert('Your invitation was successfully deleted');
          }
  });
}

function showGamesTable(){
  document.getElementById('games_table').style.visibility = "visible";
}
  function hideGamesTable(){
  document.getElementById('games_table').style.visibility = "hidden";
}


function showNewGameButton(){
  document.getElementById('new_game').style.visibility = "visible";
}
  function hideNewGameButton(){
  document.getElementById('new_game').style.visibility = "hidden";
}


function set_min_dt() {
  var current_dt = new Date().toISOString().slice(0, -8);
  document.getElementById("dt").min = current_dt;
}

function set_min_date() {
  var min_date = new Date().toISOString().split("T")[0];
  document.getElementById("game_date").min = min_date;
}

function check_input_date() {
  var date_input = document.getElementById("game_date").value;
  if (date_input == "") {
    alert("You must pick a date");
  } else {
    showGamesTable();
    showNewGameButton();
  }
}

function hideFriendEmail(){
  document.getElementById('Email').style.visibility = "hidden";
}

function showInviteFriendsInput(){
  document.getElementById('Email').style.visibility = "visible";
}

function hideSendIcon(){
  document.getElementById('sendIcon').style.visibility = "hidden";
}

function showSendIcon(){
  document.getElementById('sendIcon').style.visibility = "visible";
}

function sendEmail() {
  var email_input = document.getElementById("Email").value;
  if (email_input == "") {
    alert("You must enter an email");
  } else {
    alert('Your invitation was successfully sent!');
  }
}

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
