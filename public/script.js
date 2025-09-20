const form = document.getElementById('signupForm');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

const emailError = document.getElementById('emailError');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

// Real-time validation
email.addEventListener('input', () => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    emailError.textContent = email.value.match(emailPattern) ? '' : 'Please enter a valid email.';
});

username.addEventListener('input', () => {
    usernameError.textContent = username.value.length >= 3 ? '' : 'Username must be at least 3 characters.';
});

password.addEventListener('input', () => {
    const passwordPattern = /^(?=.*\d).{6,}$/;
    passwordError.textContent = password.value.match(passwordPattern) ? '' : 'Password must be at least 6 characters and include a number.';
});

// Form submission validation
form.addEventListener('submit', function(e) {
    let valid = true;

    if (emailError.textContent || !email.value) valid = false;
    if (usernameError.textContent || !username.value) valid = false;
    if (passwordError.textContent || !password.value) valid = false;

    if (!valid) e.preventDefault();
});
