var emailReg = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
var passReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/

// password must contain 1 number (0-9)
// password must contain 1 uppercase letters
// password must contain 1 lowercase letters
// password must contain 1 non-alpha numeric number
// password is 8-16 characters with no space

var usrReg = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/

let getLabel = document.getElementsByClassName("label")
let errorText = document.getElementsByClassName("errorText")

function CheckUsr() {
    let usrname = document.getElementById("usr-input").value
    if (usrReg.test(usrname) == false) {
        document.getElementById("input-usr").style.border = "1px solid #FF3C3C"
        getLabel[0].style.color = "#FF3C3C"
        errorText[0].style.display = "block"
        document.getElementsByClassName("fi fi-rr-user")[0].style.color = "#ff3c3c"
        return false
    } else {
        document.getElementById("input-usr").style.border = "1px solid #2fbf6c"
        getLabel[0].style.color = "#2fbf6c"
        document.getElementsByClassName("fi fi-rr-user")[0].style.color = "#2fbf6c"
        errorText[0].style.display = "none"
        return true
    }
}

function CheckEmail() {
    let email = document.getElementById("email-input").value
    if (emailReg.test(email) == false) {
        document.getElementById("input-em").style.border = "1px solid #FF3C3C"
        getLabel[1].style.color = "#FF3C3C"
        errorText[1].style.display = "block"
        errorText[2].style.display = "none"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "#ff3c3c"
        return false
    } else {
        document.getElementById("input-em").style.border = "1px solid #2fbf6c"
        getLabel[1].style.color = "#2fbf6c"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "#2fbf6c"
        errorText[1].style.display = "none"
        errorText[2].style.display = "none"
        return true
    }
}

function CheckRepass() {
    let pswd = document.getElementById("pass-input").value
    let repswd = document.getElementById("repass-input").value
    if (pswd !== repswd || repswd == "") {
        document.getElementById("input-repswd").style.border = "1px solid #FF3C3C"
        getLabel[3].style.color = "#FF3C3C"
        errorText[4].style.display = "block"
        document.getElementsByClassName("fi fi-rr-lock")[1].style.color = "#ff3c3c"
        return false
    } else {
        document.getElementById("input-repswd").style.border = "1px solid #2fbf6c"
        getLabel[3].style.color = "#2fbf6c"
        document.getElementsByClassName("fi fi-rr-lock")[1].style.color = "#2fbf6c"
        errorText[4].style.display = "none"
        return true
    }
}

function CheckPass() {
    let pswd = document.getElementById("pass-input").value
    if (passReg.test(pswd) == false) {
        document.getElementById("input-pswd").style.border = "1px solid #FF3C3C"
        getLabel[2].style.color = "#FF3C3C"
        errorText[3].style.display = "block"
        document.getElementsByClassName("fi fi-rr-lock")[0].style.color = "#ff3c3c"
        CheckRepass()
        return false
    } else {
        document.getElementById("input-pswd").style.border = "1px solid #2fbf6c"
        getLabel[2].style.color = "#2fbf6c"
        document.getElementsByClassName("fi fi-rr-lock")[0].style.color = "#2fbf6c"
        errorText[3].style.display = "none"
        CheckRepass()
        return true
    }
}

function validateForm() {
    let getUser = document.getElementById("usr-input").value
    let getEmail = document.getElementById("email-input").value
    let getPass = document.getElementById("pass-input").value
    if (typeof (localStorage.getItem(document.getElementById("email-input").value)) == "string") {
        document.getElementById("input-em").style.border = "1px solid #FF3C3C"
        getLabel[1].style.color = "#FF3C3C"
        errorText[2].style.display = "block"
        errorText[1].style.display = "none"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "#ff3c3c"
        return false
    } else if (CheckUsr() == true && CheckEmail() == true && CheckPass() == true && CheckRepass() == true && document.getElementById("messageCheckbox").checked == true) {
        errorText[5].style.display = "none"
        let AccountContainer = {
            Username: getUser,
            Email: getEmail,
            Password: getPass
        }
        document.getElementById("btnText").innerHTML = "Đợi một chút..."
        setTimeout((a) => {
            localStorage.setItem(getEmail, JSON.stringify(AccountContainer))
            window.location = "../index.html"
        }, 2000);
    } else {
        console.log("cant")
        CheckUsr()
        CheckEmail()
        CheckPass()
        CheckRepass()
        errorText[5].style.display = "block"
        return false
    }


}