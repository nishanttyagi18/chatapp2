const ws = new WebSocket(`wss://${window.location.host}`);
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

ws.onopen = () => {
    console.log('Connected to the server');
};

ws.onmessage = (event) => {
    const message = document.createElement('div');
    // if event.data is stringfied array

    if(event.data === 'CLEARED'){
        messages.innerHTML = '';
        return;
    }

    if(event.data[0] === '['){
        const data = JSON.parse(event.data);
        data.forEach(msg => {
            const message = document.createElement('div');
            message.textContent = msg;
            messages.appendChild(message);
        });
        return;

    } else{
        message.textContent = event.data;
        messages.appendChild(message);
    }  
    


    window.scrollTo(0, document.body.scrollHeight);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from the server');
};

sendButton.onclick = () => {
    var username = window.location.search
    username = username.replace('?','');
    const message = `${username} - ${messageInput.value}`;
    ws.send(message);
    messageInput.value = '';
};


messageInput.addEventListener("keyup", function (event) { 
  
    // Checking if key pressed is ENTER or not 
    // if the key pressed is ENTER 
    // click listener on button is called 
    if (event.key == "Enter") { 
        sendButton.click(); 
    } 
}); 