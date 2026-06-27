document.getElementById("signupForm")

.addEventListener("submit", async function(e){

e.preventDefault();

let name=document.getElementById("name").value;

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

let confirm=document.getElementById("confirmPassword").value;

if(password!==confirm){

document.getElementById("message").innerHTML="Passwords do not match";

return;

}

let response=await fetch("/signup",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

name,

email,

password

})

});

let data=await response.json();

if(data.success){

alert("Account Created Successfully");

window.location="/";

}

else{

document.getElementById("message").innerHTML=data.message;

}

});