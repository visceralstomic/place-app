
const usernameError = document.querySelector('.login-username-error');
const passwordError = document.querySelector('.login-password-error');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('#login-username-input');
const passwordInput = document.querySelector('#login-password-input');

loginForm.addEventListener('submit', event => {

    if (!usernameInput.value || !passwordInput.value) {
        event.preventDefault();
        if (!usernameInput.value) {
            usernameError.textContent = 'Enter username field'
        }
        if (!passwordInput.value) {
            passwordError.textContent = 'Enter password field'
        }
        setTimeout(() => {
            usernameError.textContent = '';
            passwordError.textContent = '';
        }, 5000)
    }
})
