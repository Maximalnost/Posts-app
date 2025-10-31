let authForm,
  authFormEmail,
  authFormPassword,
  authFormSubmit,
  emailError,
  passwordError,
  showPassword,
  alertError,
  alertClose,
  registrationLinkInAlert,
  registrationLinkInForm;

const wrapper = document.querySelector("#wrapper");

const users = [
    {id: 1, email: 'user1@mail.ru', password: 'qweQWE123'},
    {id: 2, email: 'user2@mail.ru', password: 'Qwerty1'},
    {id: 3, email: 'user3@mail.ru', password: 'qwerty123A'},
    {id: 4, email: 'user4@mail.ru', password: '1234Aa'},
]

const validationRules = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
}

const formTypes = ['auth', 'reg'];

const formValidation = {
    email: false,
    password: false,
};

let isAlertErrorVisible = false;

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

const authFormMarkup = `
 <form id="auth-form" class="border border-gray-50/50 flex flex-col rounded-xl p-10 pt-5 gap-2 w-1/2 max-w-80">
            <h1 class="text-white  text-3xl mb-5 self-center">Авторизация</h1>
            <div>
                <input id="auth-form-email" type="text" name="email" placeholder="Введите почту" class="input-with-icon border border-gray-50/50 rounded-md text-white px-3 py-2 w-full bg-[url('https://api.iconify.design/material-symbols:mail-outline-rounded.svg?color=%23f9fafb')] bg-no-repeat bg-[length:20px_20px] bg-[left_8px_center] pl-8 focus:placeholder:opacity-0" autofocus>
                <p id="email-error" class="text-red-600 text-xs mt-1 invisible">Введите корректный email</p>
            </div>
            <div class="relative">
                <input id="auth-form-password" type="password" name="password" placeholder="Введите пароль" class="border border-gray-50/50 rounded-md text-white px-3 py-2 w-full bg-[url('https://api.iconify.design/mynaui:lock-password.svg?color=%23f9fafb')] bg-no-repeat bg-[length:20px_20px] bg-[left_8px_center] pl-8 focus:placeholder:opacity-0 disabled:opacity-45 peer" disabled>

                <button id="show-password" class=" hidden absolute right-3 top-1/3 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer  bg-no-repeat peer-disabled:opacity-25 peer-not-focus:opacity-45"   style="background-image: url(https://api.iconify.design/mdi:eye-outline.svg?color=%23f9fafb)" data-visibility="false"></button>
                
                <p id="password-error" class="text-red-600 text-xs mt-1 invisible">Неверный пароль</p>
            </div>
            <input id="auth-form-submit" type="submit" value="Войти" class="rounded-md bg-blue-700 text-white px-3 py-2 cursor-pointer hover:bg-blue-800 disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto" disabled>
            <a id="registration-link-in-form" class="text-blue-600 underline self-center hover:no-underline hover:text-blue-200">Регистрация</a>
        </form> 
`

const regFormMarkup = `
 <form id="auth-form" class="border border-gray-50/50 flex flex-col rounded-xl p-10 pt-5 gap-2 w-1/2 max-w-80">
            <h1 class="text-white  text-3xl mb-5 self-center">Регистрация</h1>
            <div>
                <input id="auth-form-email" type="text" name="email" placeholder="Введите почту" class="input-with-icon border border-gray-50/50 rounded-md text-white px-3 py-2 w-full bg-[url('https://api.iconify.design/material-symbols:mail-outline-rounded.svg?color=%23f9fafb')] bg-no-repeat bg-[length:20px_20px] bg-[left_8px_center] pl-8 focus:placeholder:opacity-0" autofocus>
                <p id="email-error" class="text-red-600 text-xs mt-1 invisible">Введите корректный email</p>
            </div>
            <div class="relative">
                <input id="auth-form-password" type="password" name="password" placeholder="Введите пароль" class="border border-gray-50/50 rounded-md text-white px-3 py-2 w-full bg-[url('https://api.iconify.design/mynaui:lock-password.svg?color=%23f9fafb')] bg-no-repeat bg-[length:20px_20px] bg-[left_8px_center] pl-8 focus:placeholder:opacity-0 disabled:opacity-45 peer" disabled>

                <button id="show-password" class=" hidden absolute right-3 top-1/3 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer  bg-no-repeat peer-disabled:opacity-25 peer-not-focus:opacity-45"   style="background-image: url(https://api.iconify.design/mdi:eye-outline.svg?color=%23f9fafb)" data-visibility="false"></button>
                
                <p id="password-error" class="text-red-600 text-xs mt-1 invisible">Неверный пароль</p>
            </div>
            <input id="auth-form-submit" type="submit" value="Зарегистрироваться" class="rounded-md bg-blue-700 text-white px-3 py-2 cursor-pointer hover:bg-blue-800 disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto" disabled>
            <a id="registration-link-in-form" class="text-blue-600 underline self-center hover:no-underline hover:text-blue-200">Авторизация</a>
        </form> 
`;

const render = (markup) => {
    wrapper.insertAdjacentHTML('afterbegin', markup)
}

// render(authFormMarkup)

const init = (formType) => {
  authForm = document.querySelector("#auth-form");
  authFormEmail = document.querySelector("#auth-form-email");
  authFormPassword = document.querySelector("#auth-form-password");
  authFormSubmit = document.querySelector("#auth-form-submit");
  emailError = document.querySelector("#email-error");
  passwordError = document.querySelector("#password-error");
  showPassword = document.querySelector('#show-password')
  alertError = document.querySelector("#alert-error");
  alertClose = document.querySelector("#alert-close");
  registrationLinkInAlert = document.querySelector(
    "#registration-link-in-alert"
  );
  registrationLinkInForm = document.querySelector("#registration-link-in-form");

authForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const formData = Object.fromEntries(formObj);
    if (
        formData.email.match(validationRules.emailRegex) && 
        formData.password.match(validationRules.passwordRegex)
    ) {
    if (formType === formTypes[0]) {
          const isUser = users.find(
      (user) =>
        formData.email === user.email && formData.password === user.password
    );

    if (!isUser) {
        alertError.classList.remove("opacity-0");
        isAlertErrorVisible = true;
        if(isAlertErrorVisible) {
        setTimeout(()=>{
            alertError.classList.add('opacity-0')
        }, 5000)
    } 
    } else {
        document.cookie = `authUser=${isUser.id}; path=/; max-age=3600`;
        location.href = 'posts.html'
    }
    } else if (formType === formTypes[1]) {
        users.push({id: users.length + 1, ...formData});
        authForm.remove();
        render(authFormMarkup);
        init(formTypes[0]);
        document.cookie = `authUser=${isUser.id}; path=/; max-age=3600`;
        location.href = 'posts.html';
    }
  

    //  { email: "user1@mail.ru", password: "qwe123QWE" },
  }
});

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

 alertClose.addEventListener("click", () => {
    if (isAlertErrorVisible) {
      alertError.classList.add("opacity-0");
    }
  });

  registrationLinkInAlert.addEventListener("click", (e) => {
    e.preventDefault();
    authForm.remove();
    render(regFormMarkup);
    init(formTypes[1]);
  });

  registrationLinkInForm.addEventListener("click", (e) => {
    e.preventDefault();
    authForm.remove();
    render(regFormMarkup);
    init(formTypes[1]);
    if (formType === formTypes[1]) {
        authForm.remove();
        render(authFormMarkup);
        init(formTypes[0]);  
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  render(authFormMarkup);
  init(formTypes[0]);
});





