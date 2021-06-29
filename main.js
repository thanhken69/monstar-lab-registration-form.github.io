const inputRegister = document.querySelectorAll('.register__input'),
    message = document.querySelectorAll('.register__message'),
    submit = document.querySelector('#registerSubmit'),
    loading = document.querySelector('#registerLoading'),
    success = document.querySelector('#registerModalSuccess'),
    close = document.querySelector('#registerClose'),
    overlay = document.querySelector('#registerOverlay');

let nameError = {
    notEmty: 'Tên không được bỏ trống.',
    noSpecialCharacters: 'Tên không được có ký tự đặc biệt.'
}

let emailError = {
    notEmty: 'Email không được bỏ trống.',
    noSpecialCharacters: 'Sai cú pháp email.'
}

let passwordError = {
    notEmty: 'Mật khẩu không được bỏ trống',
    noSpecialCharacters: 'Mật khẩu 8-32 ký tự bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.'
}

validateField(0, nameError, isValid);
validateField(1, emailError, validateEmail);
validateField(2, passwordError, validatePassword);

inputRegister[2].addEventListener('change', function () {
    confirmPassword();
})

inputRegister[3].addEventListener('change', function () {
    confirmPassword();
})

submitForm();

close.addEventListener('click', function () {
    success.style.display = 'none';
    overlay.style.display = 'none';
})

function validateField(element, error, validateElement) {
    inputRegister[element].addEventListener('change', function () {
        if (isEmpty(inputRegister[element].value) || inputRegister[element].value === null || inputRegister[element] === undefined) {
            message[element].textContent = error.notEmty;
            inputRegister[element].style.borderColor = 'red';
            message[element].style.color = 'red';
            message[element].style.visibility = 'visible';
        } else if (!validateElement(inputRegister[element].value)) {
            inputRegister[element].style.borderColor = 'red';
            message[element].style.color = 'red';
            message[element].style.visibility = 'visible';
            message[element].textContent = error.noSpecialCharacters;
        } else {
            inputRegister[element].style.borderColor = 'black';
            message[element].style.visibility = 'hidden';
        }
    })
}

function confirmPassword() {
    if (inputRegister[3].value === inputRegister[2].value) {
        message[3].style.visibility = 'hidden';
        inputRegister[3].style.borderColor = 'black';
        message[3].style.color = 'black';
    } else {
        inputRegister[3].style.borderColor = 'red';
        message[3].style.color = 'red';
        message[3].style.visibility = 'visible';
    }
}

function submitForm() {
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

    submit.addEventListener('click', function () {
        if (checkSubmit(inputRegister)) {
            submit.classList.add('register__submit--disabel');
            submit.classList.remove('register__submit--enable');
            loading.style.display = 'inline-block';

            setTimeout(function () {
                loading.style.display = 'none';
                success.style.display = 'block';
                overlay.style.display = 'block';

                for (let i = 0; i < inputRegister.length; i++) {
                    inputRegister[i].value = ''
                }
            }, 2000)
        }
    })
}

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
    const re = /^[a-zA-Z ]{2,}$/g;
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
}

function checkSubmit(inputRegister) {
    if (isValid(inputRegister[0].value) && validateEmail(inputRegister[1].value) && validatePassword(inputRegister[2].value) && inputRegister[3].value === inputRegister[2].value) {
        return true
    } else return false
}





