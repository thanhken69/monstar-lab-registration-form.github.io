const formSubmit = domEl('register-submit');
const formCloseButton = domEl('register-close');
const formOkButton = domEl('modal-ok');
const formTryAgainButton = domEl('modal-tryagain');
const formCancelButton = domEl('modal-cancel');
const submitLoading = domEl('register-loading');
const submitContent = domEl('submit-content');
const registerModal = domEl('register-modal');
const formOverlay = domEl('register-overlay');
const modalContent = domEl('modal-content');

let registerElement = {
    nameElement: {
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
                    value: name => {
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

    emailElement: {
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

    passwordElement: {
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
                    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/;
                    return re.test(password);
                },
                errorMessage: "Mật khẩu bao gồm số, chữ thường, chữ hoa, ký tự đặc biệt.",
            },
        },
    },

    confirmPasswordElement: {
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
                    value: confirmPassword => {
                        return confirmPassword === registerElement.passwordElement.value
                    },
                    errorMessage: "Xác nhận mật khẩu phải trùng khớp."
                }
            }
        },
    }
}

for (let element of Object.values(registerElement)) {
    elementAddEventListener(element);
}

formSubmit.addEventListener('click', function () {
    submitForm();
})

formCloseButton.addEventListener('click', function () {
    closeModal();
    location.reload();
})

formOkButton.addEventListener('click', function () {
    closeModal();
    location.reload();
})

formTryAgainButton.addEventListener('click', function () {
    closeModal();
    location.reload();
})

formCancelButton.addEventListener('click', function () {
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
    if (!element.value && element.rules.required.value) {
        appendError(element, element.rules.required.errorMessage);
    } else if (element.rules.pattern && !element.rules.pattern.value(element.value)) {
        appendError(element, element.rules.pattern.errorMessage);
    } else if (element.rules.minLength && element.value.length < element.rules.minLength.value) {
        appendError(element, element.rules.minLength.errorMessage);
    } else if (element.rules.maxLength && element.value.length > element.rules.maxLength.value) {
        appendError(element, element.rules.maxLength.errorMessage);
    } else {
        removeError(element)
    }

    if (element.rules.customValidate) {
        for (const validation of Object.values(element.rules.customValidate)) {
            if (!validation.value(element.value)) {
                appendError(element, validation.errorMessage);
                break;
            }
        }
    } if (registerElement.confirmPasswordElement.value !== '') {
        const matchPassword = registerElement.confirmPasswordElement.rules.customValidate.matchPassword;
        if (!matchPassword.value(registerElement.confirmPasswordElement.value)) {
            appendError(registerElement.confirmPasswordElement, matchPassword.errorMessage);
        }
        else {
            removeError(registerElement.confirmPasswordElement);
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
        formSubmit.classList.add('register__submit--disabel');
        formSubmit.classList.remove('register__submit--enable');
        submitLoading.style.display = 'inline-block';
        submitContent.textContent = 'Loading'

        setTimeout(function () {
            submitLoading.style.display = 'none';
            submitContent.textContent = 'Submit';
            modal({
                modalElement: registerModal, type: 'success', message: 'Login successfully'
            })

            console.log({
                name: registerElement.nameElement.value,
                email: registerElement.emailElement.value,
                password: registerElement.passwordElement.value,
                confirmPassword: registerElement.confirmPasswordElement.value
            });
        }, 2000)
    }
}

function modal({ modalElement, type, message }) {
    modalElement.style.display = 'block';
    formOverlay.style.display = 'block';
    if (type === 'success') {
        modalContent.textContent = message;
        formTryAgainButton.style.display = 'none';
    } else if (type === 'error') {
        modalContent.textContent = message;
        formCancelButton.style.display = 'inline-block';
        formCancelButton.style.backgroundColor = 'red';
        formOkButton.style.display = 'none';
        formTryAgainButton.style.backgroundColor = 'red';
    }
}

function closeModal() {
    registerModal.style.display = 'none';
    formOverlay.style.display = 'none';
    for (const validation of Object.values(registerElement)) {
        validation.isValid = false
    }
}

function displaySubmit() {
    if (isValidForm()) {
        formSubmit.classList.remove('register__submit--disabel');
        formSubmit.classList.add('register__submit--enable');
    } else {
        formSubmit.classList.add('register__submit--disabel');
        formSubmit.classList.remove('register__submit--enable');
    }
}

function isValidForm() {
    return registerElement.nameElement.isValid && registerElement.emailElement.isValid && registerElement.passwordElement.isValid && registerElement.confirmPasswordElement.isValid;
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