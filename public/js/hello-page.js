const regForm = document.querySelector('.reg-form');
const regUsernameInput = document.querySelector('#reg-username-input');
const regPasswordInput = document.querySelector('#reg-password-input');
const regEmailInput = document.querySelector('#reg-email-input');
const regUsernameError = document.querySelector('.reg-username-error');
const regPasswordError = document.querySelector('.reg-password-error');
const regEmailError = document.querySelector('.reg-email-error');
const formError = document.querySelector('.form-error');


regForm.addEventListener('submit', event => {
    const usernameValue = regUsernameInput.value;
    const passwordValue = regPasswordInput.value;
    const emailValue = regEmailInput.value;

    if (!usernameValue || !passwordValue || !emailValue) {
        event.preventDefault();


        if (!usernameValue) {
            regUsernameError.textContent = 'Enter username';
        }

        if (!passwordValue) {
            regPasswordError.textContent = 'Enter password';
        }

        if (!emailValue) {
            regEmailError.textContent = 'Enter email';
        }

        setTimeout(() => {
            regUsernameError.textContent = '';
            regPasswordError.textContent = '';
            regEmailError.textContent = '';
        }, 6000);
    }
})


