var emailReg = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
var passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,30}$/
var usrReg = /^[a-zA-Z0-9._-]{4,30}$/

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
    let isTermsChecked = document.getElementById("messageCheckbox").checked

    // Kiểm tra từng bước để đảm bảo thông báo lỗi chính xác
    let isUsrValid = CheckUsr()
    let isEmailValid = CheckEmail()
    let isPassValid = CheckPass()
    let isRepassValid = CheckRepass()

    if (typeof (localStorage.getItem(getEmail)) == "string") {
        document.getElementById("input-em").style.border = "1px solid #FF3C3C"
        getLabel[1].style.color = "#FF3C3C"
        errorText[2].style.display = "block"
        errorText[1].style.display = "none"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "#ff3c3c"
        return false
    }

    if (isUsrValid && isEmailValid && isPassValid && isRepassValid) {
        if (!isTermsChecked) {
            errorText[5].style.display = "block"
            return false
        }
        
        errorText[5].style.display = "none"
        let AccountContainer = {
            Username: getUser,
            Email: getEmail,
            Password: getPass
        }
        document.getElementById("btnText").innerHTML = "Đợi một chút..."
        setTimeout(() => {
            localStorage.setItem(getEmail, JSON.stringify(AccountContainer))
            window.location.href = "../index.html"
        }, 2000);
    } else {
        errorText[5].style.display = "none" // Ẩn lỗi điều khoản nếu các trường khác còn sai
        return false
    }
}

function selfDestruct() {
    if (confirm("Bạn có chắc chắn muốn xóa mọi dữ liệu và đóng trang web này không?")) {
        localStorage.clear();
        window.close();
        setTimeout(() => {
            window.location.href = "about:blank";
        }, 100);
    }
}