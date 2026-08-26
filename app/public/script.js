const form = document.getElementById('signupForm');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

const emailError = document.getElementById('emailError');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

email.addEventListener('input', () => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    emailError.textContent =
        email.value.match(emailPattern)
            ? ''
            : 'Please enter a valid email.';
});

username.addEventListener('input', () => {
    usernameError.textContent =
        username.value.length >= 3
            ? ''
            : 'Username must be at least 3 characters.';
});

password.addEventListener('input', () => {
    const passwordPattern = /^(?=.*\d).{6,}$/;

    passwordError.textContent =
        password.value.match(passwordPattern)
            ? ''
            : 'Password must be at least 6 characters and include a number.';
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;

    if (emailError.textContent || !email.value) valid = false;
    if (usernameError.textContent || !username.value) valid = false;
    if (passwordError.textContent || !password.value) valid = false;

    if (!valid) return;

    try {
        const response = await fetch('/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                username: username.value,
                password: password.value
            })
        });

        const result = await response.json();

        console.log(result);

        if (response.ok) {
            alert("✅ User created successfully!");

            form.reset();
        } else {
            alert("❌ Failed to create user");
        }

    } catch (err) {
        console.error(err);

        alert("❌ Request failed");
    }
});