function searchDevices(){

let input=document.getElementById("searchInput");

let filter=input.value.toUpperCase();

let cards=document.getElementsByClassName("device-card");

for(let i=0;i<cards.length;i++){

let title=cards[i].getElementsByTagName("h3")[0];

if(title.innerHTML.toUpperCase().indexOf(filter)>-1){

cards[i].style.display="block";

}

else{

cards[i].style.display="none";

}

}

}