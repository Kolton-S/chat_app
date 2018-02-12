(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const nName = "julio";

	let messageList = document.querySelector('#messages'),
			userList = document.querySelector('#usersOnline'),
			messages = document.querySelector('li'),
			chatForm 	= document.querySelector('form'),
			nameInput	= document.querySelector('.nickname'),
			nickName 	= null,
			chatMessage = chatForm.querySelector('.message');

	function setNickname() {
		nickName = this.value;
	}

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		if (chatMessage.value === ""){
			debugger;
			alert("You haven't added a message to send!");
		} else {
			debugger;
			nickName = (nickName && nickName.length > 0) ? nickName : 'user';
			msg = `<p style="font-size: 17px;"><strong style="text-transform: uppercase;">${nickName}</strong> says:</p> ${chatMessage.value}`;
			var objDiv = document.querySelector(".scroll-class");
			objDiv.scrollTop = objDiv.scrollHeight;
			socket.emit('chat message', msg);
			chatMessage.value = '';
			return false;
		}
	}

	function appendMessage(msg) {
		// will it get passed thru?
		debugger;
		let newMsg = `<li class='speech-bubble'>${msg.message}</li>`
		messageList.innerHTML += newMsg;
	}

	function appendDMessage(msg) {
		let newMsg = `<li class='speech-bubble'>${msg}</li>`
		messageList.innerHTML += newMsg;
	}

	// function userOnline(msg) {
	// 	let newMsg = `<li>${msg.message}</li>`
	// 	userList.innerHTML += newMsg;
	// }

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	// socket.addEventListener('chat message', userOnline, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
})();
