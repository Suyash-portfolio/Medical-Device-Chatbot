const chatbox = document.getElementById("chatbox");
const input = document.getElementById("message");
const typing = document.getElementById("typing");

function scrollBottom() {

    chatbox.scrollTop = chatbox.scrollHeight;

}

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

}

async function sendMessage() {

    let message = input.value.trim();

    if (message === "") return;



    chatbox.innerHTML += `

    <div class="user">

        <div class="message">

            ${message}

            <div class="timestamp">

                ${getCurrentTime()}

            </div>

        </div>

    </div>

    `;


    input.value = "";

    scrollBottom();


    // SHOW TYPING ANIMATION

    typing.style.display = "flex";


    try {

        let response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        let data = await response.json();


        // DELAY FOR BOT TYPING EFFECT

        setTimeout(() => {

            typing.style.display = "none";


            chatbox.innerHTML += `

            <div class="bot">

                <div class="message">

                    ${data.image ? `
                    <img
                    src="${data.image}"
                    class="device-image">
                    <br>
                    ` : ""}

                    ${data.response}

                    <div class="timestamp">

                        ${getCurrentTime()}

                    </div>

                </div>

            </div>

            `;


            scrollBottom();


        }, 1000);

    }

    catch (error) {

        typing.style.display = "none";

        chatbox.innerHTML += `

        <div class="bot">

            <div class="message">

                Server Error.<br><br>

                Please contact:

                <br><br>

                📧 suyashhadole14@gmail.com

            </div>

        </div>

        `;

        scrollBottom();

    }

}
// ======================================
// ENTER KEY SUPPORT
// ======================================

input.addEventListener(

    "keypress",

    function(event){

        if(event.key==="Enter"){

            sendMessage();

        }

    }

);


// ======================================
// SUGGESTED QUESTION CARDS
// ======================================

function askSuggestion(button){

    input.value = button.innerText;

    sendMessage();

}


// ======================================
// VOICE INPUT
// ======================================

function startVoice(){

    if(

        'webkitSpeechRecognition' in window

    ){

        const recognition =

        new webkitSpeechRecognition();

        recognition.lang = "en-US";

        recognition.start();

        recognition.onresult = function(event){

            input.value =

            event.results[0][0].transcript;

        };

    }

    else{

        alert(

            "Voice Input Not Supported"

        );

    }

}


// ======================================
// SAVE CHAT HISTORY
// ======================================

function saveHistory(){

    localStorage.setItem(

        "chatHistory",

        chatbox.innerHTML

    );

}


// ======================================
// LOAD CHAT HISTORY
// ======================================

function loadHistory(){

    let history =

    localStorage.getItem(

        "chatHistory"

    );


    if(history){

        chatbox.innerHTML = history;

    }

    scrollBottom();

}


// ======================================
// CLEAR HISTORY
// ======================================

function clearHistory(){

    localStorage.removeItem(

        "chatHistory"

    );

    location.reload();

}


// ======================================
// SAVE CHAT EVERY 2 SECONDS
// ======================================

setInterval(

    saveHistory,

    2000

);


// ======================================
// LOAD HISTORY WHEN PAGE OPENS
// ======================================

window.onload = function(){

    loadHistory();

};


// ======================================
// AUTO FOCUS INPUT BOX
// ======================================

input.focus();
// ======================================
// COPY BOT ANSWER
// ======================================

function copyText(button){

    let text =

    button.parentElement.innerText;

    navigator.clipboard.writeText(

        text

    );

    button.innerHTML = "✅ Copied";


    setTimeout(()=>{

        button.innerHTML = "📋 Copy";

    },2000);

}


// ======================================
// ADD BOT MESSAGE
// ======================================

function addBotMessage(response,image=null){

    chatbox.innerHTML += `

    <div class="bot">

        <div class="message">

            ${image ? `

            <img

            src="${image}"

            class="device-image">

            <br>

            ` : ""}

            ${response}

            <br><br>

            <button

            class="copy"

            onclick="copyText(this)">

            📋 Copy

            </button>

            <div class="timestamp">

                ${getCurrentTime()}

            </div>

        </div>

    </div>

    `;

    scrollBottom();

}


// ======================================
// LOADING EFFECT
// ======================================

function showTyping(){

    typing.style.display="flex";

}


function hideTyping(){

    typing.style.display="none";

}


// ======================================
// EMAIL FALLBACK
// ======================================

function emailFallback(){

    addBotMessage(

`
Sorry, I only answer questions related to medical devices.

Please contact:

📧 suyashhadole14@gmail.com
`

);

}


// ======================================
// STARTUP EFFECT
// ======================================

setTimeout(()=>{

console.log(

"AI Medical Device Chatbot Loaded Successfully"

);

},1000);



// ======================================
// NETWORK ERROR HANDLER
// ======================================

window.addEventListener(

"offline",

function(){

addBotMessage(

`
No Internet Connection.

Please check your network.
`

);

}

);



// ======================================
// PAGE TITLE ANIMATION
// ======================================

let originalTitle=document.title;


window.onblur=function(){

document.title=

"🤖 Come Back!";

};


window.onfocus=function(){

document.title=

originalTitle;

};


// ======================================
// INPUT PLACEHOLDER ANIMATION
// ======================================

let placeholders=[

"Ask about MRI Machines...",

"Ask about CT Scanners...",

"Ask about X-Ray Machines...",

"Ask about ECG Devices...",

"Ask about Patient Monitors..."

];


let index=0;


setInterval(()=>{

input.placeholder=

placeholders[index];

index++;

if(index>=placeholders.length)

index=0;

},3000);



// ======================================
// WELCOME MESSAGE
// ======================================

if(

!localStorage.getItem(

"visited"

)

){

setTimeout(()=>{

addBotMessage(

`
👋 Welcome to AI Medical Device Chatbot

Ask me about:

• X-Ray Machines

• CT Scanners

• MRI Systems

• Ultrasound Machines

• ECG Devices

• Patient Monitors

For unknown questions:

📧 suyashhadole14@gmail.com
`

);

},500);

localStorage.setItem(

"visited",

"true"

);

}

scrollBottom();
