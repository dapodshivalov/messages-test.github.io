var messageList = [];
var deletedMessageCount = 0;
var index = 0;

var message1 = new MessageObject("message 1");
var message2 = new MessageObject("message 2");

messageList.push(message1);
messageList.push(message2);

UpdateMessageList(messageList);

document.getElementsByClassName('send-button')[0].addEventListener('click', SendButtonOnClickHandler);
document.getElementsByClassName('send-message')[0].addEventListener('keydown', function(e){ 
	if (e.keyCode === 13){
		SendButtonOnClickHandler();
	}
});

HeaderUpdate(messageList, index++);
setInterval(() => {
	if (index >= messageList.length)
		index = 0;
	HeaderUpdate(messageList, index++)
}, 3000);


// Message as an object
function MessageObject(message = ""){
	this.text = message;
	this.IsDisplayed = true;
}

// Createing DOM element from MessageObject
function CreateDOMFromMessageOblect(mo){
	var m, but, text;
	m = document.createElement('div');
	m.className = 'message';
	but = document.createElement('div');
	but.className = 'x-button';
	if (mo.IsDisplayed === false){
		but.className += ' x-button_active';
	}
	but.innerHTML = 'x';
	text = document.createElement('div');
	text.className = 'message_text';
	text.innerHTML = mo.text;
	m.appendChild(but);
	m.appendChild(text);
	return m;
}

// Updating displayed list of messages
function UpdateMessageList(messageList){
	document.getElementsByClassName('messages')[0].innerHTML = "";

	for (var i = 0; i < messageList.length; i++){
		document.getElementsByClassName('messages')[0]
			.appendChild(CreateDOMFromMessageOblect(messageList[i]));
	}
}

function SendButtonOnClickHandler(){
	var text = document.getElementsByClassName('send-message')[0].value;
	if (text === "")
		return;
	var newMessage = new MessageObject(text);
	messageList.push(newMessage);
	UpdateMessageList(messageList);
}

function HeaderUpdate(messageList, index){
	var header = document.getElementsByClassName('header')[0];
	var oldMessage = header.children[0];
	header.innerHTML = "";
	if (messageList.length === deletedMessageCount)
		return;

	while (messageList[index].IsDisplayed != true){
		index = (index + 1) % messageList.length;
	}
	var newMessage = CreateDOMFromMessageOblect(messageList[index]);
	newMessage.children[0].className += ' header-x-button_active';
	newMessage.children[0].addEventListener('click', ClickHeaderMessageHandler);

	header.appendChild(newMessage);
}


function ClickHeaderMessageHandler(){
	deletedMessageCount++;
	curMessageIndex = (messageList.length + index - 1) % messageList.length;
	messageList[curMessageIndex].IsDisplayed = false;
	UpdateMessageList(messageList);
}
