function showHome(){
    const usernameInput = document.getElementById("usernameInput").value.trim();
    const passwordInput = document.getElementById("passwordInput").value.trim();

    if(usernameInput === "admin" && passwordInput === "admin123"){
        window.location.assign("home.html");
    }else{
        alert("Invalid username or password");

        passwordInput.value = "";
    }
    
}