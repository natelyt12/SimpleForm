let inputDiv = document.getElementsByClassName("input")
let inputLabel = document.getElementsByClassName("label")
let errorText = document.getElementsByClassName("errorText")[0]
errorText.innerText = "ㅤ"

function validateLogin() {
    let emailInput = document.getElementById("email-input").value
    let passInput = document.getElementById("pass-input").value
    let getAccountFromServer = localStorage.getItem(emailInput)
    if (localStorage.getItem(emailInput) == null) {
        inputDiv[0].style.border = "1px solid #ff3c3c"
        inputLabel[0].style.color = "#ff3c3c"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "#ff3c3c"
        errorText.innerText = "Không tìm thấy email của bạn"
        return false
    } else if (typeof (getAccountFromServer) == "string") {
        let parsedAccount = JSON.parse(getAccountFromServer)
        if (parsedAccount.Password != passInput) {
            inputDiv[1].style.border = "1px solid #ff3c3c"
            inputLabel[1].style.color = "#ff3c3c"
            document.getElementsByClassName("fi fi-rr-lock")[0].style.color = "#ff3c3c"
            errorText.innerText = "Sai mật khẩu"
            return false
        } else {
            document.getElementById('btnText').innerText = "Thành công!"
            localStorage.setItem("active", emailInput)
            setTimeout((a) => {
                window.location = "../index.html"
            }, 2000);
        }
    }
}

function checkLogin() {
    let emailInput = document.getElementById("email-input").value
    let passInput = document.getElementById("pass-input").value
    let isValid = true;

    if (emailInput == "") {
        inputDiv[0].style.border = "1px solid #ff3c3c"
        inputLabel[0].style.color = "#ff3c3c"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "#ff3c3c"
        errorText.innerText = "Vui lòng điền đầy đủ thông tin"
        isValid = false;
    }
    
    if (passInput == "") {
        inputDiv[1].style.border = "1px solid #ff3c3c"
        inputLabel[1].style.color = "#ff3c3c"
        document.getElementsByClassName("fi fi-rr-lock")[0].style.color = "#ff3c3c"
        errorText.innerText = "Vui lòng điền đầy đủ thông tin"
        isValid = false;
    }

    if (isValid) {
        errorText.innerText = "ㅤ"
        validateLogin()
    }

    setTimeout(() => {
        inputDiv[0].style.border = "1px solid rgba(128, 128, 128, 0.63)"
        inputLabel[0].style.color = "black"
        document.getElementsByClassName("fi fi-rr-envelope")[0].style.color = "black"
        inputDiv[1].style.border = "1px solid rgba(128, 128, 128, 0.63)"
        inputLabel[1].style.color = "black"
        document.getElementsByClassName("fi fi-rr-lock")[0].style.color = "black"
        if (errorText.innerText === "Vui lòng điền đầy đủ thông tin") {
            errorText.innerText = "ㅤ"
        }
    }, 2000);
}