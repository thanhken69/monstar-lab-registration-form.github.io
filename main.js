const inputRegister = document.querySelectorAll('.register__input');

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
        specialCharacters: 'Tên không được có ký tự đặc biệt.',
        upperCaseFirst: 'Phải viết hoa chữ cái đầu'
    },
    validateElement: isValid,
    success: false
}

let emailElement = {
    registerElement: registerEmail,
    message: messageEmail,
    error: {
        notEmty: 'Email không được bỏ trống.',
        specialCharacters: 'Sai cú pháp email.'
    },
    validateElement: validateEmail,
    success: false
}

let passwordElement = {
    registerElement: registerPassword,
    message: messagePassword,
    error: {
        notEmty: 'Mật khẩu không được bỏ trống',
        specialCharacters: 'Mật khẩu bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.',
        syntaxError: 'Mật khẩu 8-32 ký tự bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.'
    },
    validateElement: validatePassword,
    success: false
}

let confirmPasswordElement = {
    registerElement: registerConfirmPassword,
    message: messageConfirmPassword,
    error: {
        notEmty: 'Xác nhận mật khẩu không được bỏ trống',
        specialCharacters: 'Xác nhận mật khẩu phải trùng khớp.'
    },
    validateElement: validateConfirmPassword,
    success: false
}

registerName.addEventListener('input', () => {
    validateField(nameElement);
    if (!checkUpperCase(nameElement.registerElement.value)) {
        appendError(nameElement, nameElement.error.upperCaseFirst);
    }
})

registerEmail.addEventListener('input', () => {
    validateField(emailElement);
})

registerPassword.addEventListener('input', () => {
    validateField(passwordElement);
    if (registerPassword.value.length < 8 || registerPassword.value.length > 32) {
        appendError(passwordElement, passwordElement.error.syntaxError);
    }
    validateField(confirmPasswordElement);
})

registerConfirmPassword.addEventListener('input', function () {
    validateField(confirmPasswordElement);
})

for (let i = 0; i < inputRegister.length; i++) {
    inputRegister[i].addEventListener('input', function () {
        displaySubmit();
    })
}

registerSubmit.addEventListener('click', function () {
    submitForm();
})

registerClose.addEventListener('click', function () {
    closeModal();
})

registerButton.addEventListener('click', function () {
    closeModal();
})

function validateField(element) {
    if (isEmpty(element.registerElement.value) || element.registerElement.value === null || element.registerElement === undefined) {
        appendError(element, element.error.notEmty);
    } else if (!element.validateElement(element.registerElement.value)) {
        appendError(element, element.error.specialCharacters);
    } else if (element.validateElement(element.registerElement.value)) {
        removeError(element);
    }
}

function appendError(element, error) {
    element.message.textContent = error;
    element.registerElement.style.borderColor = 'red';
    element.message.style.color = 'red';
    element.message.style.visibility = 'visible';
    element.success = false;
}

function removeError(element) {
    element.registerElement.style.borderColor = 'black';
    element.message.style.visibility = 'hidden';
    element.success = true;
}

function submitForm() {
    if (isValidForm()) {
        registerSubmit.classList.add('register__submit--disabel');
        registerSubmit.classList.remove('register__submit--enable');
        registerLoading.style.display = 'inline-block';

        valueForm.name = nameElement.registerElement.value;
        valueForm.email = emailElement.registerElement.value;
        valueForm.password = passwordElement.registerElement.value;
        valueForm.confirmPassword = confirmPasswordElement.registerElement.value

        setTimeout(function () {
            registerLoading.style.display = 'none';

            modal({
                modalElement: registerModalSuccess, type: 'success', message: 'Login successfully'
            })
            for (let i = 0; i < inputRegister.length; i++) {
                inputRegister[i].value = '';
            }
            console.log(valueForm);
        }, 2000)
    }
}

function modal({ modalElement, type, message }) {
    modalElement.style.display = 'block';
    registerOverlay.style.display = 'block';
    if (type === 'success') {
        registerSuccess.textContent = message;
        registerSuccess.style.display = 'block'
    } else if (type === 'error') {
        registerError.style.display = 'block';
        registerErrorMessage.textContent = message;
    }
}

function closeModal() {
    registerModalSuccess.style.display = 'none';
    registerOverlay.style.display = 'none';
    nameElement.success = false;
    emailElement.success = false;
    passwordElement.success = false;
    confirmPasswordElement.success = false;
}

function displaySubmit() {
    if (isValidForm()) {
        registerSubmit.classList.remove('register__submit--disabel');
        registerSubmit.classList.add('register__submit--enable');
    } else {
        registerSubmit.classList.add('register__submit--disabel');
        registerSubmit.classList.remove('register__submit--enable');
    }
}

function checkUpperCase(str) {
    let check = true;
    str = str.trim().split(' ');
    str.map(char => {
        if ((char[0] === char[0].toUpperCase()) === false) return check = false
    })
    return check
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
    const re = /^[a-zA-Z ]{1,}$/g;
    return re.test(removeAscent(string))
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/;
    return re.test(password);
}

function validateConfirmPassword(confirmPassword) {
    return confirmPassword === registerPassword.value;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isValidForm() {
    return nameElement.success && emailElement.success && passwordElement.success && confirmPasswordElement.success;
}