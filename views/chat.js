const chat = document.getElementById("chat")
const sendButton = document.getElementById('send')

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:3000/chat/showMessage")
        const showData = response.data.allData;
        for (let i = 0; i < showData.length; i++) {
            showChatOnScreen(showData[i].message)
        }

    } catch (err) {
        console.log("dom loading error", err)
    }
})

async function showChatOnScreen(msg) {
    try {
        const parent = document.getElementById("allmessages")
        const child = `</li class="text-white">${msg}</li><br>`
        parent.innerHTML = parent.innerHTML + child
    } catch (err) {
        console.log("error in showchatonscreen", err)
    }
}

sendButton.addEventListener("click", sendChat)

async function sendChat(e) {
    try {
        e.preventDefault()

        const obj = {
            chat: chat.value
        }
        const getToken = localStorage.getItem("token")
        const data = await axios.post("http://localhost:3000/chat/message", obj, {
            headers: { "Authorization": getToken }
        })
        
        showChatOnScreen(data.data.data.message); //trying access message from nested object
        //if i use data.message or data.data.message and when i add the new message on screen undefined will get print. If i refresh the page then only added new message will be displayed on screen
        //if i use data.data.data.message and try to add new message even though without efreshing the page newly added message will be showed on screen
} catch (err) {
        console.log("error in sending message", err);
    }
}