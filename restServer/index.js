
var userMessages = {};
var messageData = {};


function restRequest(req,res){
  var response = {};
  res.setHeader('Content-Type', 'application/json');
  var user = req.get("user"); 
  console.log(req.method);
  if (!userMessages[user]) {
    userMessages[user] = [];
  }
  if(req.method == "POST"){
     response = postMessages(req,res , user);
  }
  else if(req.method == "GET"){
    response = getMessages(req,res , user);
  }
  else if(req.method =="DELETE") {
    console.log("got delete");
    deleteMessages(req,res , user);
  }
  res.send(JSON.stringify(response));
}

  function getMessages(req , res , user){
    let messages = [];
    for(let guid of userMessages[user]){
      messages.push(messageData[guid]);
    }
    return messages;
  }

  function postMessages(req , res , user){
   let message = req.body;
    message.sender = user;
    message.timeStamp = new Date();
    message.guid = guid();
   
    messageData[message.guid] = message;
    
   if(!userMessages[message.receiver]){
      userMessages[message.receiver] = [];
    }
    userMessages[message.receiver].push(message.guid);    
    userMessages[user].push(message.guid);
    return {'id': message.guid};

  }

 function deleteMessages (req,res){
    let id = req.params.id;
    if (id in messageData ){
      let message = messageData[id];
      removeUserMessage(message.sender);
      removeUserMessage(message.receiver);
      delete(messageData[id]);
    }
  }

  function removeUserMessage(user){
    let messages = userMessages[user];
    let index = messages.indexOf(message.guid);
    messages.remove(index);
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  module.exports.restRequest = restRequest;