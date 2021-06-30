const inputRegister = document.querySelectorAll('.register__input'),
    registerName = document.getElementById('registerName'),
    registerEmail = document.getElementById('registerEmail'),
    registerPassword = document.getElementById('registerPassword'),
    registerConfirmPassword = document.getElementById('registerConfirmPassword'),

    messageName = document.getElementById('registerMessageName'),
    messageEmail = document.getElementById('registerMessageEmail'),
    messagePassword = document.getElementById('registerMessagePassword'),
    messageConfirmPassword = document.getElementById('registerMessageConfirmPassword'),

    submit = document.getElementById('registerSubmit'),
    loading = document.getElementById('registerLoading'),
    success = document.getElementById('registerModalSuccess'),
    close = document.getElementById('registerClose'),
    overlay = document.getElementById('registerOverlay'),
    successMessage = document.getElementById('registerSuccessMessage');

let valueForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

let nameElement = {
    registerElement: registerName,
    message: messageName,
    error: {
        notEmty: 'Tên không được bỏ trống.',
        noSpecialCharacters: 'Tên không được có ký tự đặc biệt.'
    },
    validateElement: isValid,
    success: false
}

let emailElement = {
    registerElement: registerEmail,
    message: messageEmail,
    error: {
        notEmty: 'Email không được bỏ trống.',
        noSpecialCharacters: 'Sai cú pháp email.'
    },
    validateElement: validateEmail,
    success: false
}

let passwordElement = {
    registerElement: registerPassword,
    message: messagePassword,
    error: {
        notEmty: 'Mật khẩu không được bỏ trống',
        noSpecialCharacters: 'Mật khẩu 8-32 ký tự bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.'
    },
    validateElement: validatePassword,
    success: false
}

let confirmPasswordElement = {
    success: false
}

validateField(nameElement);
validateField(emailElement);
validateField(passwordElement);

registerPassword.addEventListener('keyup', function () {
    confirmPassword(confirmPasswordElement);
})

registerConfirmPassword.addEventListener('keyup', function () {
    confirmPassword(confirmPasswordElement);
})

submitForm();

function validateField(element) {
    element.registerElement.addEventListener('keyup', function () {
        if (isEmpty(element.registerElement.value) || element.registerElement.value === null || element.registerElement === undefined) {
            element.message.textContent = element.error.notEmty;
            element.registerElement.style.borderColor = 'red';
            element.message.style.color = 'red';
            element.message.style.visibility = 'visible';
            element.success = false;
        } else if (!element.validateElement(element.registerElement.value)) {
            element.registerElement.style.borderColor = 'red';
            element.message.style.color = 'red';
            element.message.style.visibility = 'visible';
            element.message.textContent = element.error.noSpecialCharacters;
            element.success = false;
        } else {
            element.registerElement.style.borderColor = 'black';
            element.message.style.visibility = 'hidden';
            element.success = true;
        }
    })
}

function confirmPassword(element) {
    if (registerConfirmPassword.value === registerPassword.value) {
        messageConfirmPassword.style.visibility = 'hidden';
        registerConfirmPassword.style.borderColor = 'black';
        messageConfirmPassword.style.color = 'black';
        element.success = true;
    } else {
        registerConfirmPassword.style.borderColor = 'red';
        messageConfirmPassword.style.color = 'red';
        messageConfirmPassword.style.visibility = 'visible';
        element.success = false;
    }
}

function submitForm() {
    for (let i = 0; i < inputRegister.length; i++) {
        inputRegister[i].addEventListener('keyup', function () {
            if (checkSubmit()) {
                submit.classList.remove('register__submit--disabel');
                submit.classList.add('register__submit--enable');
            } else {
                submit.classList.add('register__submit--disabel');
                submit.classList.remove('register__submit--enable');
            }
        })
    }

    submit.addEventListener('click', function () {
        if (checkSubmit()) {
            submit.classList.add('register__submit--disabel');
            submit.classList.remove('register__submit--enable');
            loading.style.display = 'inline-block';

            valueForm.name = registerName.value;
            valueForm.email = registerEmail.value;
            valueForm.password = registerPassword.value;
            valueForm.confirmPassword = registerConfirmPassword.value

            setTimeout(function () {
                loading.style.display = 'none';

                modal({ modalElement: success, type: 'success', message: 'Successfully' })
                for (let i = 0; i < inputRegister.length; i++) {
                    inputRegister[i].value = '';
                }
                console.log(valueForm);
            }, 2000)
        }
    })
}

function modal({ modalElement, type, message }) {
    modalElement.style.display = 'block';
    overlay.style.display = 'block';
    successMessage.textContent = message;

    modalElement.style.display = 'block';
    overlay.style.display = 'block';
    successMessage.textContent = message;

    close.addEventListener('click', function () {
        success.style.display = 'none';
        overlay.style.display = 'none';

        nameElement.success = false;
        emailElement.success = false;
        passwordElement.success = false;
        confirmPasswordElement.success = false;
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

function checkSubmit() {
    if (nameElement.success && emailElement.success && passwordElement.success && confirmPasswordElement.success) {
        return true
    } else return false
}





