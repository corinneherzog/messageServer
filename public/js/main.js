/**
 * Created by corinne on 6/15/17.
 */

var friends = {};
var user;
var controller = {};
var url = "http://localhost:3000/test";

// main method runs the first page
function main() {
    user = prompt("Login", "username");


    if (user == null) {
        return;
    }
    displayPage("peers");
    getRequest();

}
// indicates which page user is currently on
function displayPage(name, p2) {
    controller.page = name;
    if (p2) {
        controller.p2 = p2;
    }
    else {
        delete controller.p2;
    }
}
// when clicked posts message to server
function sendClicked(peer){
    var input = $('#newMessage');
    var newMessage = input.val();
    input.val("");
    if(newMessage.length < 1){
        alert("Can't send empty messsage");
        return;

    }
    console.log(newMessage)
    var xhr  = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("user",user);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var message = { "sender": user, "receiver": peer , "text" : newMessage}
    var json = JSON.stringify(message);
    xhr.send(json);
    displayPage("messages",peer);
    getRequest();

}
// gets request from server based on user
function getRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("user", user);
    xhr.onload = function () {
        messages = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.log("Got 200");
            processData(messages);
            if (controller.page == "peers") {
                showPeers()
            }
            else if (controller.page == "messages") {
                showMessages(controller.p2);
            }
        } else {
            console.log("error");
        }
    }
    xhr.send(null);
}
// processes data from the server and pushes it to array of friends which stores all of the messages from all this user's friends
function processData(messages) {
    friends = {};
    var peer;
    if(messages) {
        for (var i = 0; i < messages.length; i++) {
            if ((peer = messages[i].receiver) == user) {
                peer = messages[i].sender;
            }
            ;
            if (!friends[peer]) {
                friends[peer] = [];
            }
            friends[peer].push(messages[i]);
        }
    }


}
// shows the message page for the peer the user is talking too
function showMessages(peer){
    var output = "<div class = user>  " + peer + " </div><div id=messageArea ></div>";


    if (controller.page != "messages") {
        displayPage("messages" , peer);
        output += "<textarea id = newMessage></textarea>";
        output += `<button peer = ${peer} type=button onclick = "sendClicked('${peer}')"> send </button>`;
        output += `<button type=button onclick = "showPeers()"> back</button>`;
        $('body').html(output);
    }

    var messageOutput = "";
    if(friends[peer]) {
        for (var i = 0; i < friends[peer].length; i++) {
            var message = friends[peer][i];
            if (message.sender === peer) {
                messageOutput +=  `</div><div class = bubbles style="float: left;background-color:lavender "> ${message.text} </div><BR>`;
            }
            else {
                messageOutput += `<div class = bubbles style="float: right"> ${message.text} </div><BR>`;
            }
        }
    }
    $("#messageArea").html(messageOutput);
    setTimeout("getRequest()" , 2000);
}

// shows the peers page of all the peers this user has
function showPeers(){
    var output = "";
    if(friends) {
        for (var peer in friends) {
            output += `<div id = ${peer} class = bubbles> ${peer} </div>`;
        }
    }
    output += `<button id = newPeer type=button onclick = "newPeer()"> new receiver </button>`;
    $('body').html(output);
    $( "div" ).click(function(e) {
        showMessages(e.target.id);
    });
    displayPage("peers");
    setTimeout("getRequest()" , 2000);

}
// creates a new peer
function newPeer(){
    var peer = prompt("Receiver", "name");
    showMessages(peer);

}