const nameElement = {
    id: "name",
    value: "",
    registerElement: domEl('registerName'),
    message: domEl('messageName'),
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: 'Tên không được bỏ trống.',
        },
        pattern: {
            value: function (value) {
                const re = /^[a-zA-Z ]{1,}$/g;
                return re.test(removeAscent(value))
            },
            errorMessage: "Tên chỉ chứa ký tự từ a đến Z.",
        },
        upperCaseFirstCharacter: {
            validate: function (name) {
                const firstCharacter = name.trim().charCodeAt(0)
                if (name !== '') {
                    return (65 <= firstCharacter && firstCharacter <= 90 && (name !== ''))
                } else return true
            },
            errorMessage: "Tên phải có ký tự đầu tiên viết hoa.",
        },
    },
};

const emailElement = {
    id: "email",
    value: "",
    registerElement: domEl('registerEmail'),
    message: domEl('messageEmail'),
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
    registerElement: domEl('registerPassword'),
    message: domEl('messagePassword'),
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: "Password không được bỏ trống.",
        }, minLength: {
            value: 8,
            errorMessage: "Mật khẩu có độ dài trên 8 ký tự.",
        }, maxLength: {
            value: 32,
            errorMessage: "Mật khẩu có độ dài nhỏ hơn 32 ký tự.",
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
    registerElement: domEl('registerConfirmPassword'),
    message: domEl('messageConfirmPassword'),
    isValid: false,
    rules: {
        required: {
            value: true,
            errorMessage: "Xác nhận mật khẩu không được bỏ trống.",
        },
        matchPassword: {
            value: confirmPassword => confirmPassword === registerPassword.value,
            errorMessage: "Xác nhận mật khẩu phải trùng khớp."
        }
    },
};

elementAddEventListener(nameElement, 'registerName');
elementAddEventListener(emailElement, 'registerEmail');
elementAddEventListener(passwordElement, 'registerPassword');
elementAddEventListener(confirmPasswordElement, 'registerConfirmPassword');

domEl('registerPassword').addEventListener('input', () => {
    validateField(confirmPasswordElement);
})

domEl('registerSubmit').addEventListener('click', function () {
    submitForm();
})

domEl('registerClose').addEventListener('click', function () {
    closeModal();
})

domEl('modalOk').addEventListener('click', function () {
    closeModal();
})

domEl('modalTryAgain').addEventListener('click', function () {
    closeModal();
    location.reload();
})

domEl('modalCancel').addEventListener('click', function () {
    closeModal();
    location.reload();
})

function domEl(id) {
    return document.getElementById(id);
}

function elementAddEventListener(element, id) {
    const domEl = document.getElementById(id)
    domEl.addEventListener('input', () => {
        element.value = domEl.value;
        validateField(element);
        displaySubmit();
    })
}

function validateField(element) {
    if (element.value === '') {
        appendError(element, element.rules.required.errorMessage);
    } else if (element.rules.pattern !== undefined) {
        if (!element.rules.pattern.value(element.value)) {
            appendError(element, element.rules.pattern.errorMessage);
        } else if (element.rules.pattern.value(element.value)) {
            removeError(element);
        }
    }
    if (element.rules.upperCaseFirstCharacter) {
        if (!element.rules.upperCaseFirstCharacter.validate(element.value)) {
            appendError(element, element.rules.upperCaseFirstCharacter.errorMessage);
        }
    }
    if (element.rules.minLength) {
        if (element.value !== '' && element.value.length < element.rules.minLength.value) {
            appendError(element, element.rules.minLength.errorMessage);
        }
    }
    if (element.rules.maxLength) {
        if (element.value.length > element.rules.maxLength.value) {
            appendError(element, element.rules.maxLength.errorMessage);
        }
    }
    if (element.rules.matchPassword) {
        if (!element.rules.matchPassword.value(element.value)) {
            appendError(element, element.rules.matchPassword.errorMessage);
        } else {
            removeError(element)
        }
    }
}

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
        domEl('registerSubmit').classList.add('register__submit--disabel');
        domEl('registerSubmit').classList.remove('register__submit--enable');
        domEl('registerLoading').style.display = 'inline-block';
        domEl('submitContent').textContent = 'Loading'

        setTimeout(function () {
            domEl('registerLoading').style.display = 'none';
            domEl('submitContent').textContent = 'Submit';
            modal({
                modalElement: domEl('registerModal'), type: 'success'
            })
            registerName.value = '';
            registerEmail.value = '';
            registerPassword.value = '';
            registerConfirmPassword.value = '';
            console.log({
                name: nameElement.value,
                email: emailElement.value,
                password: passwordElement.value,
                confirmPassword: confirmPasswordElement.value
            });
        }, 2000)
    }
}

modalTryAgain = document.getElementById('modalTryAgain')
function modal({ modalElement, type }) {
    modalElement.style.display = 'block';
    domEl('registerOverlay').style.display = 'block';
    if (type === 'success') {
        domEl('modalContent').textContent = 'Login Successfully';
        domEl('modalTryAgain').style.display = 'none';
    } else if (type === 'error') {
        domEl('modalContent').textContent = 'Login Failed';
        domEl('modalCancel').style.display = 'inline-block';
        domEl('modalCancel').style.backgroundColor = 'red';
        domEl('modalOk').style.display = 'none';
        domEl('modalTryAgain').style.backgroundColor = 'red';
    }
}

function closeModal() {
    domEl('registerModal').style.display = 'none';
    domEl('registerOverlay').style.display = 'none';
    nameElement.isValid = false;
    emailElement.isValid = false;
    passwordElement.isValid = false;
    confirmPasswordElement.isValid = false;
}

function displaySubmit() {
    if (isValidForm()) {
        domEl('registerSubmit').classList.remove('register__submit--disabel');
        domEl('registerSubmit').classList.add('register__submit--enable');
    } else {
        domEl('registerSubmit').classList.add('register__submit--disabel');
        domEl('registerSubmit').classList.remove('register__submit--enable');
    }
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