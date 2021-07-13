const registerElement = [
    nameElement = {
        id: "register-name",
        value: "",
        get domElement() {
            return domEl(this.id)
        },
        get messageDomElement() {
            return domEl(`${this.id}-message`)
        },
        isValid: false,
        rules: {
            required: {
                value: true,
                errorMessage: 'Tên không được bỏ trống.',
            },
            pattern: {
                value: name => {
                    const re = /^[a-zA-Z ]{1,}$/g;
                    return re.test(removeAscent(name))
                },
                errorMessage: "Tên chỉ chứa ký tự từ a đến Z.",
            },
            customValidate: {
                upperCaseFirstCharacter: {
                    validate: name => {
                        isValid = true
                        name = removeAscent(name);
                        arr = name.trim().split(' ');
                        arr.map(char => {
                            firstCharacter = char.charCodeAt(0);
                            if (!(65 <= firstCharacter && firstCharacter <= 90)) isValid = false
                            if (name === '') isValid = true
                        })
                        return isValid
                    },
                    errorMessage: "Tên phải có ký tự đầu tiên viết hoa."
                }
            }
        }
    },

    emailElement = {
        id: "register-email",
        value: "",
        get domElement() {
            return domEl(this.id)
        },
        get messageDomElement() {
            return domEl(`${this.id}-message`)
        },
        isValid: false,
        rules: {
            required: {
                value: true,
                errorMessage: "Email không được bỏ trống."
            },
            pattern: {
                value: email => {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                },
                errorMessage: "Email sai cú pháp.",
            }
        }
    },

    passwordElement = {
        id: "register-password",
        value: "",
        get domElement() {
            return domEl(this.id)
        },
        get messageDomElement() {
            return domEl(`${this.id}-message`)
        },
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
                value: password => {
                    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,32}$/;
                    return re.test(password);
                },
                errorMessage: "Mật khẩu bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.",
            },
        },
    },

    confirmPasswordElement = {
        id: "register-confirmpassword",
        value: "",
        get domElement() {
            return domEl(this.id)
        },
        get messageDomElement() {
            return domEl(`${this.id}-message`)
        },
        isValid: false,
        rules: {
            required: {
                value: true,
                errorMessage: "Xác nhận mật khẩu không được bỏ trống.",
            },
            customValidate: {
                matchPassword: {
                    value: confirmPassword => confirmPassword === passwordElement.domElement.value,
                    errorMessage: "Xác nhận mật khẩu phải trùng khớp."
                }
            }
        },
    }
]

for (let i = 0; i < registerElement.length; i++) {
    elementAddEventListener(registerElement[i]);
}

domEl('register-submit').addEventListener('click', function () {
    submitForm();
})

domEl('register-close').addEventListener('click', function () {
    closeModal();
    location.reload();
})

domEl('modal-ok').addEventListener('click', function () {
    closeModal();
    location.reload();
})

domEl('modal-tryagain').addEventListener('click', function () {
    closeModal();
    location.reload();
})

domEl('modal-cancel').addEventListener('click', function () {
    closeModal();
    location.reload();
})

function domEl(id) {
    return document.getElementById(id);
}

function elementAddEventListener(element) {
    const domEl = document.getElementById(element.id)
    domEl.addEventListener('input', () => {
        element.value = domEl.value;
        validateField(element);
        displaySubmit();
    })
}

function validateField(element) {
    for (let i = 0; i <= 6; i++) {
        switch (i) {
            case 0:
                if (element.rules.pattern) {
                    if (!element.rules.pattern.value(element.value)) {
                        appendError(element, element.rules.pattern.errorMessage);
                    } else {
                        removeError(element);
                    }
                }
                break;
            case 1:
                if (!element.value && element.rules.required.value) {
                    appendError(element, element.rules.required.errorMessage);
                }
                break;
            case 2:
                if (element.rules.customValidate) {
                    if (element.rules.customValidate.upperCaseFirstCharacter) {
                        if (!element.rules.customValidate.upperCaseFirstCharacter.validate(element.value)) {
                            appendError(element, element.rules.customValidate.upperCaseFirstCharacter.errorMessage);
                        }
                    }
                }
                break;
            case 3:
                if (element.rules.minLength) {
                    if (element.value.length < element.rules.minLength.value) {
                        appendError(element, element.rules.minLength.errorMessage);
                    }
                }
                break;
            case 4:
                if (element.rules.maxLength) {
                    if (element.value.length > element.rules.maxLength.value) {
                        appendError(element, element.rules.maxLength.errorMessage);
                    }
                }
                break;
            case 5:
                if (element.rules.customValidate) {
                    if (element.rules.customValidate.matchPassword) {
                        if (!element.rules.customValidate.matchPassword.value(element.value)) {
                            appendError(element, element.rules.customValidate.matchPassword.errorMessage);
                        } else {
                            removeError(element)
                        }
                    }
                }
                break;
            case 6:
                if (element = passwordElement) {
                    if (!confirmPasswordElement.rules.customValidate.matchPassword.value(confirmPasswordElement.value)) {
                        appendError(confirmPasswordElement, confirmPasswordElement.rules.customValidate.matchPassword.errorMessage);
                    }
                    else if (confirmPasswordElement.rules.customValidate.matchPassword.value(confirmPasswordElement.value) && confirmPasswordElement.value !== '') {
                        removeError(confirmPasswordElement)
                    }
                }
                break;
        }
    }
}

function appendError(element, error) {
    element.messageDomElement.textContent = error;
    element.domElement.style.borderColor = 'red';
    element.messageDomElement.style.color = 'red';
    element.messageDomElement.style.visibility = 'visible';
    element.isValid = false;
}

function removeError(element) {
    element.domElement.style.borderColor = 'black';
    element.messageDomElement.style.visibility = 'hidden';
    element.isValid = true;
}

function submitForm() {
    if (isValidForm()) {
        domEl('register-submit').classList.add('register__submit--disabel');
        domEl('register-submit').classList.remove('register__submit--enable');
        domEl('register-loading').style.display = 'inline-block';
        domEl('submit-content').textContent = 'Loading'

        setTimeout(function () {
            domEl('register-loading').style.display = 'none';
            domEl('submit-content').textContent = 'Submit';
            modal({
                modalElement: domEl('register-modal'), type: 'success', message: 'Login successfully'
            })
            domEl('register-name').value = '';
            domEl('register-email').value = '';
            domEl('register-password').value = '';
            domEl('register-confirmpassword').value = '';
            console.log({
                name: nameElement.value,
                email: emailElement.value,
                password: passwordElement.value,
                confirmPassword: confirmPasswordElement.value
            });
        }, 2000)
    }
}

function modal({ modalElement, type, message }) {
    modalElement.style.display = 'block';
    domEl('register-overlay').style.display = 'block';
    if (type === 'success') {
        domEl('modal-content').textContent = message;
        domEl('modal-tryagain').style.display = 'none';
    } else if (type === 'error') {
        domEl('modal-content').textContent = message;
        domEl('modal-cancel').style.display = 'inline-block';
        domEl('modal-cancel').style.backgroundColor = 'red';
        domEl('modal-ok').style.display = 'none';
        domEl('modal-tryagain').style.backgroundColor = 'red';
    }
}

function closeModal() {
    domEl('register-modal').style.display = 'none';
    domEl('register-overlay').style.display = 'none';
    nameElement.isValid = false;
    emailElement.isValid = false;
    passwordElement.isValid = false;
    confirmPasswordElement.isValid = false;
}

function displaySubmit() {
    if (isValidForm()) {
        domEl('register-submit').classList.remove('register__submit--disabel');
        domEl('register-submit').classList.add('register__submit--enable');
    } else {
        domEl('register-submit').classList.add('register__submit--disabel');
        domEl('register-submit').classList.remove('register__submit--enable');
    }
}

function isValidForm() {
    return nameElement.isValid && emailElement.isValid && passwordElement.isValid && confirmPasswordElement.isValid;
}

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/I|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    return str;
}