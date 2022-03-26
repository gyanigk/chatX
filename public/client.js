var socket=io.connect('http://localhost:9041/')

const msgBox=document.getElementById("txtBox"),
    nm=document.getElementById("nameBox"),
    typeDiv=document.getElementById("type");

//send msg
function sendMessage(){
    
    
    
    // console.log('Recv', msgBox.value)
    

    socket.emit('chat',{
        name: nm.value,
        message: msgBox.value
    })
    msgBox.value=""
}

// listen for msg
socket.on('chat',function(data){
    typeDiv.innerHTML=""
    qry="<br>"+"<strong>"+ data.name+": "+ "</strong>" +data.message
    document.getElementById("chatWin").innerHTML+=qry
    
})


msgBox.addEventListener('keypress', function(){
    
    socket.emit('typing', nm.value)
})

socket.on('typing', function(data){
    
    typeDiv.innerHTML='<em>'+data+' is typing a message...</em>' 
})