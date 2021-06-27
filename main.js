const inputRegister = document.querySelectorAll('.register__input'),
    message = document.querySelectorAll('.register__message'),
    nameRegister = document.getElementById('register__name');

for (let i = 0; i < inputRegister.length; i++) {
    inputRegister[i].addEventListener('click', function () {
        console.log(inputRegister[i].value);
        message[i].style.visibility = 'visible'
    })
}

nameRegister.addEventListener('change', function () {
    console.log(nameRegister.value);
    console.log(isValid(nameRegister.value))
    if (!isValid(nameRegister.value) || nameRegister.value === null || nameRegister === undefined) {
        nameRegister.style.borderColor = 'red';
        message[0].style.color = 'red';
        message[0].style.visibility = 'visible';
        message[0].textContent = 'Tên không được có ký tự đặc biệt và không bỏ trống.';
    } else {
        nameRegister.style.borderColor = 'black';
        message[0].style.visibility = 'hidden';
    }
})

inputRegister[1].addEventListener('change', function () {
    if (validateEmail(inputRegister[1].value)) {
        message[1].style.visibility = 'hidden';
        inputRegister[1].style.borderColor = 'black';
    } else {
        inputRegister[1].style.borderColor = 'red';
        message[1].textContent = 'Sai cú pháp email.';
        message[1].style.color = 'red';
        message[1].style.visibility = 'visible';
    }
})

inputRegister[2].addEventListener('change', function () {
    if (validatePassword(inputRegister[2].value)) {
        message[2].style.visibility = 'hidden';
        inputRegister[2].style.borderColor = 'black';
        message[2].style.color = 'black';
    } else {
        inputRegister[2].style.borderColor = 'red';
        message[2].style.color = 'red';
        message[2].style.visibility = 'hidden';
    }
})

inputRegister[3].addEventListener('change', function () {
    if (inputRegister[3].value === inputRegister[2].value) {
        message[3].style.visibility = 'hidden';
        inputRegister[3].style.borderColor = 'black';
        message[3].style.color = 'black';
    } else {
        inputRegister[3].style.borderColor = 'red';
        message[3].style.color = 'red';
        message[3].style.visibility = 'hidden';
    }
})

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function isValid(string) {
    var re = /^[a-zA-Z ]{2,}$/g;
    return re.test(removeAscent(string))
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return re.test(password);
}




