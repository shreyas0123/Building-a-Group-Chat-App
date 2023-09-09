const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')

sendButton.addEventListener("click",sendChat)

async function sendChat(e){
    try{
        e.preventDefault()

        const obj={
            chat:chat.value
        }
        const getToken=localStorage.getItem("token")
        const data=await axios.post("http://localhost:3000/chat/message",obj,{
            headers:{"Authorization":getToken}
        })
        console.log("response from frontend chat.js file",data)
    }catch(err){
        console.log("error in sending message",err)
    }
}