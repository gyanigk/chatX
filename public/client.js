var socket=io.connect('http://localhost:9041/')

const msgBox=document.getElementById("txtBox"),
    nm=document.getElementById("nameBox"),
    typeDiv=document.getElementById("type"),
    chatWin=document.getElementById("chatWindow");

//send msg
function sendMessage(){
    
    
    
    console.log('Recv', msgBox.value)
    // msgBox.value=""
    

    socket.emit('chat',{
        name: nm.value,
        message: msgBox.value
    })
    msgBox.value=""
}

// listen for msg

/*

--------------------------------------
    Recv section base code
---------------------------------------


<div class="chatr">
    <div class="rcv">
        <h6 id="rName">sadf</h6>
        <h4 id="receiving">Hifdsafsd</h4>
    </div>
    
</div> 

--------------------------------------
    Sending section base code
---------------------------------------

<div class="chats">
    <div class="snd">
        <h4 id="sending">Hi this is Ayush Saha. And I would like to inform that you have a meeting now.</h4>
    </div>
</div>

*/
const scrollToBottom = (node) => {
	node.scrollTop = node.scrollHeight;
}

function getRecvQuery(data){
    qry="<div class=\"chatr\"><div class=\"rcv\"><h6 id=\"rName\">"
    qry+=data.name
    qry+="</h6>"

    qry+="<h4 id=\"receiving\">"
    qry+=data.message


    qry+="</h4></div>"

    return qry
}

function getSendQuery(data){
    qry="<div class=\"chats\"><div class=\"snd\">"
    

    qry+="<h4 id=\"sending\">"
    qry+=data.message


    qry+="</div>"

    return qry
}
socket.on('chat',function(data){
    typeDiv.innerHTML=""
    qry=""

    if(nm.value == data.name){
        qry=getSendQuery(data)
    }else{
        qry=getRecvQuery(data)
    }
    
    
    chatWin.innerHTML+=qry
    scrollToBottom(chatWin)
})

msgBox.addEventListener('keypress', function(e){
    
    if (e.key === 'Enter' && msgBox.value!="") {
        sendMessage()
    }else{
        socket.emit('typing', nm.value)
    }

})



socket.on('typing', function(data){
    
    typeDiv.innerHTML='<h6><em>'+data+' is typing a message...</em></h6>' 
})