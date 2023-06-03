
//::BUSCARLAMANERADEQUESEADIRECTOCHIRANIWATAPOLOTI

const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const age = document.getElementById("age");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("age", age.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("http://127.0.0.1:5000/register", {
        method: 'POST',
        body: formData      
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));

    // "Content-Type": "multipart/form-data"  //va en headers  
    
}

//ON CHANGE:

function showFile (e) {
    const file = e.files[0];
    document.getElementById('avatar_name').innerHTML = file.name;//file;
};

