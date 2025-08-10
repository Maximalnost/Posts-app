const authForm = document.querySelector('#auth-form');
const authFormEmail = document.querySelector('#auth-form-email');
const authFormPassword = document.querySelector('#auth-form-password');
const authFormSubmit = document.querySelector('#auth-form-submit');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const showPassword = document.querySelector('#show-password');
const hidePassword = document.querySelector('#hide-password');

const validationRules = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
}

const formValidation = {
    email: false,
    password: false,
};

const passwordIcons = {
    eyeOpen: 'url(https://api.iconify.design/mdi:eye-outline.svg?color=%23f9fafb)',
    eyeClose: 'url(https://api.iconify.design/mdi:eye-off-outline.svg?color=%23f9fafb)'
}

const checkDisabled = () => {
    if (formValidation.email && formValidation.password) {
        authFormSubmit.disabled = false;
    } else {
        authFormSubmit.disabled = true;        
    }
}

authForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const formData = Object.fromEntries(formObj);
    if (
        formData.email.match(validationRules.emailRegex) && 
        formData.password.match(validationRules.passwordRegex)
    ) {
        console.log('yep');

}})

authFormEmail.addEventListener('input', (e) => {
    if (e.target.value.match(validationRules.emailRegex)) {
        formValidation.email = true;
        authFormPassword.disabled = false;
        emailError.classList.add('invisible');
    } else {
        formValidation.email = false;
        authFormPassword.disabled = true;
        emailError.classList.remove('invisible');
    }
    checkDisabled();
})

authFormPassword.addEventListener('input', (e) => {
    if (e.target.value) {
        showPassword.classList.remove('hidden')
    } else {
        showPassword.classList.add('hidden')
    }
    if (e.target.value.match(validationRules.passwordRegex)) {
        formValidation.password = true;
        passwordError.classList.add('invisible');
    } else {
        formValidation.password = false;
        passwordError.classList.remove('invisible');
    }
    checkDisabled();
})

showPassword.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.button === 0) {
    if (e.target.dataset.visibility === 'true') {
        authFormPassword.type = 'password';
        e.target.style.backgroundImage = passwordIcons.eyeOpen;
        e.target.dataset.visibility = 'false';

    } else {
        authFormPassword.type = 'text';
        e.target.style.backgroundImage = passwordIcons.eyeClose;
        e.target.dataset.visibility = 'true';
    }
   
    // const isPassword = authFormPassword.type === 'password';
    // authFormPassword.type = isPassword ? 'text' : 'password';
    
    // showPassword.style.backgroundImage = isPassword 
    // ? `url('https://api.iconify.design/mdi:eye-off-outline.svg?color=%23f9fafb')`
    // : `url('https://api.iconify.design/mdi:eye-outline.svg?color=%23f9fafb')`;
    
    }
});


