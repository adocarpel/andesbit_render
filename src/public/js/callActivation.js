
window.onload=function(){ 
  callActivation();
}

function callActivation() {    
    const ahc = document.getElementById("ahc");    
    const data = {
        activation_token: ahc.value
    };
    const customHeaders = {
        "Content-Type": "application/json",
    }        
    fetch("http://127.0.0.1:5000/activation", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
    .then((res) => {console.log(res); document.getElementById("u").innerHTML="¡SI"})
    .catch((err) => ("Error occured", err));   
}

