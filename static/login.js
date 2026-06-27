function togglePassword(){

let password=document.getElementById("password");

if(password.type==="password"){

password.type="text";

}
else{

password.type="password";

}

}

document.getElementById("loginForm")

.addEventListener("submit",async function(e){

e.preventDefault();

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

let response=await fetch("/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

password

})

});

let data=await response.json();

if(data.success){

window.location="/dashboard";

}

else{

document.getElementById("message").innerHTML=data.message;

}

});