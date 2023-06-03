//ESTUDIAR
//https://www.tutorialesprogramacionya.com/javascriptya/nodejsya/detalleconcepto.php?punto=18&codigo=18&inicio=15#google_vignette
//https://developer.mozilla.org/en-US/docs/Web/API/FormData/values
//https://stackoverflow.com/questions/17066875/how-to-inspect-formdata
//https://www.google.com/search?q=formdata+values
//::BUSCARLAMANERADEQUESEADIRECTOCHIRANIWATAPOLOTI

const form = document.getElementById("form_login");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    
    //const formData = new FormData();
    
    
    //formData.append("email", email.value);
    //formData.append("password", password.value);

let objl ={
    email:email.value,
    password:password.value
}
  console.log("::",objl)
    fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objl)    
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));

    
/*    
    fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: formData      
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
*/
/*
//        JSON.stringify(data)    
fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'          
          },
        body: JSON.stringify(formData)
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
*/


    // "Content-Type": "multipart/form-data"  //va en headers  
    
}

