let valueForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const nameElement = {
    id: "name",
    value: "",
    registerElement: registerName,
    message: messageName,
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: 'Tên không được bỏ trống.',
        }, maxLength: {
            value: 8,
            errorMessage: "Tên phải lớn hơn 8 ký tự.",
        },
        pattern: {
            value: function (value) {
                const re = /^[a-zA-Z ]{1,}$/g;
                return re.test(removeAscent(value))
            },
            errorMessage: "Tên chỉ chứa ký tự từ a đến Z.",
        },
        customValidate: {
            upperCaseFirstCharacter: {
                validate: function (name) {
                    let check = true;
                    name = name.trim().split(' ');
                    name.map(char => {
                        if ((char[0] === char[0].toUpperCase()) === false) return check = false
                    })
                    return check
                },
                errorMessage: "Tên phải có ký tự đầu tiên viết hoa.",
            },
        },
    },
};

const emailElement = {
    id: "email",
    value: "",
    registerElement: registerEmail,
    message: messageEmail,
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: "Email không được bỏ trống.",
        },
        pattern: {
            value: function (email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            errorMessage: "Email sai cú pháp.",
        }
    },
};

const passwordElement = {
    id: "password",
    value: "",
    registerElement: registerPassword,
    message: messagePassword,
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: "Password không được bỏ trống.",
        }, maxLength: {
            valueMin: 8,
            valueMax: 32,
            errorMessage: "Mật khẩu có độ dài trên 8 và nhỏ hơn 32 ký tự.",
        },
        pattern: {
            value: function (password) {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,32}$/;
                return re.test(password);
            },
            errorMessage: "Mật khẩu bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.",
        }
    },
};

const confirmPasswordElement = {
    id: "password",
    value: "",
    registerElement: registerConfirmPassword,
    message: messageConfirmPassword,
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: "Xác nhận mật khẩu không được bỏ trống.",
        },
        pattern: {
            value: function validateConfirmPassword(confirmPassword) {
                return confirmPassword === registerPassword.value;
            },
            errorMessage: "Xác nhận mật khẩu phải trùng khớp",
        }
    },
};


registerName.addEventListener('keyup', () => {
    nameElement.value = registerName.value;
    validateFieldTest(nameElement);
    if (!nameElement.rules.customValidate.upperCaseFirstCharacter.validate(nameElement.value)) {
        appendError(nameElement, nameElement.rules.customValidate.upperCaseFirstCharacter.errorMessage);
    }
    displaySubmit();
})

registerEmail.addEventListener('keyup', () => {
    emailElement.value = registerEmail.value;
    validateFieldTest(emailElement);
    displaySubmit();
})

registerPassword.addEventListener('keyup', () => {
    passwordElement.value = registerPassword.value;
    validateFieldTest(passwordElement);
    if (passwordElement.value !== '' && passwordElement.value.length < passwordElement.rules.maxLength.valueMin || passwordElement.value.length > passwordElement.rules.maxLength.valueMax) {
        appendError(passwordElement, passwordElement.rules.maxLength.errorMessage);
    }
    validateFieldTest(confirmPasswordElement);
    displaySubmit();
})

registerConfirmPassword.addEventListener('keyup', () => {
    confirmPasswordElement.value = registerConfirmPassword.value;
    validateFieldTest(confirmPasswordElement);
    displaySubmit();
})

function validateFieldTest(element) {
    if (element.value === '') {
        appendError(element, element.rules.required.errorMessage);
    } else if (!element.rules.pattern.value(element.value)) {
        appendError(element, element.rules.pattern.errorMessage);
    } else if (element.rules.pattern.value(element.value)) {
        removeError(element);
    }
}

registerSubmit.addEventListener('click', function () {
    submitForm();
})

registerClose.addEventListener('click', function () {
    closeModal();
})

registerBtnClose.addEventListener('click', function () {
    closeModal();
})

registerButton.addEventListener('click', function () {
    closeModal();
})

function appendError(element, error) {
    element.message.textContent = error;
    element.registerElement.style.borderColor = 'red';
    element.message.style.color = 'red';
    element.message.style.visibility = 'visible';
    element.isValid = false;
}

function removeError(element) {
    element.registerElement.style.borderColor = 'black';
    element.message.style.visibility = 'hidden';
    element.isValid = true;
}

function submitForm() {
    if (isValidForm()) {
        registerSubmit.classList.add('register__submit--disabel');
        registerSubmit.classList.remove('register__submit--enable');
        registerLoading.style.display = 'inline-block';

        valueForm.name = nameElement.value;
        valueForm.email = emailElement.value;
        valueForm.password = passwordElement.value;
        valueForm.confirmPassword = confirmPasswordElement.value

        setTimeout(function () {
            registerLoading.style.display = 'none';

            modal({
                modalElement: registerModalSuccess, type: 'success', message: 'Login Successfully'
            })
            registerName.value = '';
            registerEmail.value = '';
            registerPassword.value = '';
            registerConfirmPassword.value = '';
            console.log(valueForm);
        }, 2000)
    }
}

function modal({ modalElement, type, message }) {
    modalElement.style.display = 'block';
    registerOverlay.style.display = 'block';
    if (type === 'success') {
        registerModalMessage.textContent = message;
    } else if (type === 'error') {
        registerModalMessage.textContent = message;
        registerButton.style.display = 'inline-block';
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

function isValidForm() {
    return nameElement.isValid && emailElement.isValid && passwordElement.isValid && confirmPasswordElement.isValid;
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
