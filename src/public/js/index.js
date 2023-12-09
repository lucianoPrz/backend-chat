const socket = io();



Swal.fire({
    title: 'Hola!',
    input: 'text',
    text: 'Ingresa tu nombre de usuario',
    inputValidator: (value) =>{
      return !value && 'Es obligaroiot usuario'
    },
    allowOutsideClick: false,
  }).then((result)=>{
    username = result.value;
    socket.emit('new-user', username);
    console.log(username)
  })

  const chatInput = document.getElementById('chat-input')

  chatInput.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
      const inputMesage = chatInput.value;
      if(inputMesage.trim().length > 0){
        socket.emit('chat-message', {username, message: inputMesage});
        chatInput.value = "";
      }
    }
  })

  const messagePanel = document.getElementById('messages-panel');

  socket.on('messages',data=>{
    let messages = "";

    data.forEach((m) => {
      messages += `<b>${m.username}:</b>${m.message}</br>`
    });
    messagePanel.innerHTML = messages;
  })

  socket.on('new-user', (username)=>{
    swal.fire({
      title:`${username} se ha unido al chat.`,
      toast: true,
      position: "top-end"
    })
  })