/*=========================================
        SELECT ELEMENTS
=========================================*/

const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const ageInput = document.getElementById("age");
const terms = document.getElementById("terms");

const submitBtn = document.getElementById("submitBtn");

/*=========================================
        ERROR ELEMENTS
=========================================*/

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const ageError = document.getElementById("ageError");
const termsError = document.getElementById("termsError");

/*=========================================
        REGEX
=========================================*/

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

/*=========================================
        SHOW ERROR
=========================================*/

function showError(input, message, errorElement){

    const box = input.parentElement;

    box.classList.remove("success");
    box.classList.add("error");

    errorElement.textContent = message;
}

/*=========================================
        SHOW SUCCESS
=========================================*/

function showSuccess(input, errorElement){

    const box = input.parentElement;

    box.classList.remove("error");
    box.classList.add("success");

    errorElement.textContent = "";
}

/*=========================================
        NAME VALIDATION
=========================================*/

function validateName(){

    const value = nameInput.value.trim();

    if(value === ""){

        showError(
            nameInput,
            "Name is required.",
            nameError
        );

        return false;
    }

    if(value.length < 3){

        showError(
            nameInput,
            "Minimum 3 characters.",
            nameError
        );

        return false;
    }

    showSuccess(
        nameInput,
        nameError
    );

    return true;
}

/*=========================================
        EMAIL VALIDATION
=========================================*/

function validateEmail(){

    const value = emailInput.value.trim();

    if(value === ""){

        showError(
            emailInput,
            "Email is required.",
            emailError
        );

        return false;
    }

    if(!emailRegex.test(value)){

        showError(
            emailInput,
            "Enter a valid email address.",
            emailError
        );

        return false;
    }

    showSuccess(
        emailInput,
        emailError
    );

    return true;
}

/*=========================================
        PASSWORD VALIDATION
=========================================*/

function validatePassword(){

    const value = passwordInput.value;

    if(value === ""){

        showError(
            passwordInput,
            "Password is required.",
            passwordError
        );

        return false;
    }

    if(!passwordRegex.test(value)){

        showError(
            passwordInput,
            "Password must contain 8+ characters, uppercase, lowercase, number and special character.",
            passwordError
        );

        return false;
    }

    showSuccess(
        passwordInput,
        passwordError
    );

    return true;
}

/*=========================================
        CONFIRM PASSWORD
=========================================*/

function validateConfirmPassword(){

    if(confirmPassword.value === ""){

        showError(
            confirmPassword,
            "Confirm your password.",
            confirmError
        );

        return false;
    }

    if(confirmPassword.value !== passwordInput.value){

        showError(
            confirmPassword,
            "Passwords do not match.",
            confirmError
        );

        return false;
    }

    showSuccess(
        confirmPassword,
        confirmError
    );

    return true;
}

/*=========================================
        AGE VALIDATION
=========================================*/

function validateAge(){

    const age = Number(ageInput.value);

    if(ageInput.value === ""){

        showError(
            ageInput,
            "Age is required.",
            ageError
        );

        return false;
    }

    if(age < 18 || age > 60){

        showError(
            ageInput,
            "Age must be between 18 and 60.",
            ageError
        );

        return false;
    }

    showSuccess(
        ageInput,
        ageError
    );

    return true;
}

/*=========================================
        TERMS VALIDATION
=========================================*/

function validateTerms(){

    if(!terms.checked){

        termsError.textContent =
        "Please accept Terms & Conditions.";

        return false;
    }

    termsError.textContent = "";

    return true;
}

/*=========================================
        CHECK FORM
=========================================*/

function checkForm(){

    const valid =

        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateAge() &&
        validateTerms();

    submitBtn.disabled = !valid;
}

/*=========================================
        LIVE VALIDATION
=========================================*/

nameInput.addEventListener("input",()=>{

    validateName();

    checkForm();

});

emailInput.addEventListener("input",()=>{

    validateEmail();

    checkForm();

});

passwordInput.addEventListener("input",()=>{

    validatePassword();

    validateConfirmPassword();

    checkForm();

});

confirmPassword.addEventListener("input",()=>{

    validateConfirmPassword();

    checkForm();

});

ageInput.addEventListener("input",()=>{

    validateAge();

    checkForm();

});

terms.addEventListener("change",()=>{

    validateTerms();

    checkForm();

});
/*=========================================
        PASSWORD STRENGTH
=========================================*/

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

function updateStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if(password.length === 0){

        strengthFill.style.width = "0%";
        strengthText.textContent = "Password Strength";
        strengthFill.style.background = "#EF4444";

        return;
    }

    if(score <= 2){

        strengthFill.style.width = "35%";
        strengthFill.style.background = "#EF4444";
        strengthText.textContent = "Weak Password";
    }

    else if(score <= 4){

        strengthFill.style.width = "70%";
        strengthFill.style.background = "#F59E0B";
        strengthText.textContent = "Medium Password";
    }

    else{

        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22C55E";
        strengthText.textContent = "Strong Password";
    }

}

passwordInput.addEventListener("input",()=>{

    updateStrength(passwordInput.value);

});

/*=========================================
        SHOW / HIDE PASSWORD
=========================================*/

document.querySelectorAll(".toggle-password")
.forEach(button=>{

    button.addEventListener("click",()=>{

        const input =
        document.getElementById(
            button.dataset.target
        );

        const icon =
        button.querySelector("i");

        if(input.type==="password"){

            input.type="text";

            icon.classList.remove("ri-eye-line");
            icon.classList.add("ri-eye-off-line");

        }

        else{

            input.type="password";

            icon.classList.remove("ri-eye-off-line");
            icon.classList.add("ri-eye-line");

        }

    });

});

/*=========================================
        SUCCESS MODAL
=========================================*/

const successModal =
document.getElementById("successModal");

const continueBtn =
document.getElementById("continueBtn");

/*=========================================
        FORM SUBMIT
=========================================*/

let submitting = false;

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    checkForm();

    if(submitBtn.disabled || submitting){

        return;
    }

    submitting = true;

    submitBtn.classList.add("loading");

    submitBtn.disabled = true;

    setTimeout(()=>{

        submitBtn.classList.remove("loading");

        successModal.classList.add("show");

    },2000);

});

/*=========================================
        CONTINUE BUTTON
=========================================*/

continueBtn.addEventListener("click",()=>{

    successModal.classList.remove("show");

    form.reset();

    strengthFill.style.width="0%";
    strengthText.textContent="Password Strength";

    document
    .querySelectorAll(".input-box")
    .forEach(box=>{

        box.classList.remove("success");
        box.classList.remove("error");

    });

    document
    .querySelectorAll("small")
    .forEach(error=>{

        error.textContent="";

    });

    submitBtn.disabled=true;

    submitting=false;

});

/*=========================================
        TRIM SPACES
=========================================*/

nameInput.addEventListener("blur",()=>{

    nameInput.value=nameInput.value.trim();

});

emailInput.addEventListener("blur",()=>{

    emailInput.value=emailInput.value.trim();

});

/*=========================================
        PREVENT COPY / PASTE
=========================================*/

confirmPassword.addEventListener("paste",(e)=>{

    e.preventDefault();

});

confirmPassword.addEventListener("copy",(e)=>{

    e.preventDefault();

});

/*=========================================
        ENTER KEY SUPPORT
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(
        e.key==="Enter"
        &&
        !submitBtn.disabled
    ){

        form.requestSubmit();

    }

});

/*=========================================
        AUTO FOCUS
=========================================*/

window.addEventListener("load",()=>{

    nameInput.focus();

});

/*=========================================
        INITIAL STATE
=========================================*/

checkForm();