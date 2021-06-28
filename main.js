const inputRegister = document.querySelectorAll('.register__input'),
    message = document.querySelectorAll('.register__message'),
    nameRegister = document.getElementById('register__name'),
    submit = document.querySelector('.register__submit'),
    loading = document.querySelector('.register__loading'),
    success = document.querySelector('.register__success'),
    close = document.querySelector('.register__close'),
    overlay = document.querySelector('.overlay');

for (let i = 0; i < inputRegister.length; i++) {
    inputRegister[i].addEventListener('click', function () {
        message[i].style.visibility = 'visible';

        if (isValid(inputRegister[0].value)) {
            message[0].style.visibility = 'hidden';
        }
        if (validateEmail(inputRegister[1].value)) {
            message[1].style.visibility = 'hidden';
        }
        if (validatePassword(inputRegister[2].value)) {
            message[2].style.visibility = 'hidden';
        }
        if (inputRegister[3].value === inputRegister[2].value && !isEmpty(inputRegister[3].value)) {
            message[3].style.visibility = 'hidden';
        }
    })
}

for (let i = 0; i < inputRegister.length; i++) {
    inputRegister[i].addEventListener('keyup', function () {
        if (checkSubmit(inputRegister)) {
            submit.classList.remove('register__submit--disabel');
            submit.classList.add('register__submit--enable');
        } else {
            submit.classList.add('register__submit--disabel');
            submit.classList.remove('register__submit--enable');
        }
    })
}

inputRegister[0].addEventListener('change', function () {
    if (isEmpty(inputRegister[0].value) || inputRegister[0].value === null || inputRegister[0] === undefined) {
        message[0].textContent = 'Tên không được bỏ trống.';
        inputRegister[0].style.borderColor = 'red';
        message[0].style.color = 'red';
        message[0].style.visibility = 'visible';
    } else if (!isValid(inputRegister[0].value)) {
        inputRegister[0].style.borderColor = 'red';
        message[0].style.color = 'red';
        message[0].style.visibility = 'visible';
        message[0].textContent = 'Tên không được có ký tự đặc biệt.';
    } else {
        inputRegister[0].style.borderColor = 'black';
        message[0].style.visibility = 'hidden';
    }
})

inputRegister[1].addEventListener('change', function () {
    if (isEmpty(inputRegister[1].value) || inputRegister[1].value === null || inputRegister[1] === undefined) {
        message[1].textContent = 'Email không được bỏ trống.';
        inputRegister[1].style.borderColor = 'red';
        message[1].style.color = 'red';
        message[1].style.visibility = 'visible';
    } else if (validateEmail(inputRegister[1].value)) {
        message[1].style.visibility = 'hidden';
        inputRegister[1].style.borderColor = 'black';
        message[1].style.color = 'black';
    } else {
        inputRegister[1].style.borderColor = 'red';
        message[1].textContent = 'Sai cú pháp email.';
        message[1].style.color = 'red';
        message[1].style.visibility = 'visible';
    }
})

inputRegister[2].addEventListener('change', function () {
    if (isEmpty(inputRegister[2].value) || inputRegister[2].value === null || inputRegister[2] === undefined) {
        message[2].textContent = 'Mật khẩu không được bỏ trống.';
        inputRegister[2].style.borderColor = 'red';
        message[2].style.color = 'red';
        message[2].style.visibility = 'visible';
    } else if (validatePassword(inputRegister[2].value)) {
        message[2].style.visibility = 'hidden';
        inputRegister[2].style.borderColor = 'black';
        message[2].style.color = 'black';
    } else {
        message[2].textContent = 'Mật khẩu 8-32 ký tự bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.';
        inputRegister[2].style.borderColor = 'red';
        message[2].style.color = 'red';
        message[2].style.visibility = 'visible';
    }
    if (inputRegister[3].value === inputRegister[2].value) {
        message[3].style.visibility = 'hidden';
        inputRegister[3].style.borderColor = 'black';
        message[3].style.color = 'black';
    } else {
        inputRegister[3].style.borderColor = 'red';
        message[3].style.color = 'red';
        message[3].style.visibility = 'visible';
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
        message[3].style.visibility = 'visible';
    }
})


submit.addEventListener('click', function () {
    if (checkSubmit(inputRegister)) {
        submit.classList.add('register__submit--disabel');
        submit.classList.remove('register__submit--enable');
        loading.style.display = 'inline-block';
    }

    setTimeout(function () {
        if (checkSubmit(inputRegister)) {
            loading.style.display = 'none';
            success.style.display = 'block';
            overlay.style.display = 'block';

            submit.classList.add('register__submit--disabel');
            submit.classList.remove('register__submit--enable');

            for (let i = 0; i < inputRegister.length; i++) {
                inputRegister[i].value = ''
            }
        }
    }, 2000)
})


submit.addEventListener('click', function () {

})

close.addEventListener('click', function () {
    success.style.display = 'none';
    overlay.style.display = 'none';
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

function isEmpty(str) {
    return (!str || 0 === str.length);
    // return (!str || /^\s*$/.test(str));
}

function checkSubmit(inputRegister) {
    if (isValid(inputRegister[0].value) && validateEmail(inputRegister[1].value) && validatePassword(inputRegister[2].value) && inputRegister[3].value === inputRegister[2].value) {
        return true
    } else return false
}





