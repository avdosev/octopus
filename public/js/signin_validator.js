import { showError, hideError, checkValidation } from "./modules/input_error.js";

document.addEventListener('DOMContentLoaded', start);

async function start() {
    // запрос на джсончик
    const validators = await 
        fetch('/public/json/input_errors.json').then(response => {
            if (response.ok)
                return response.json()
            else 
                console.log('с джсоном какая то проблема', response)
        })
    
    const sendBtn = document.querySelector("#submit")
    
    email.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(email, emailError, validators.email.error_str)
    });

    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.password.error_str)
    })

    function errorHandler(err) {
        showError(serverError, err)
    }


    sendBtn.addEventListener('click', (event) => {
        if ( !email.value.match(validators.email.regexp ) )  { //пусть будет так
            showError(emailError, validators.email.EventError[0])
        } else if(!password.value.match(password.regexp ) ) {
            showError(passwordError, validators.password.error_str)
        } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
            console.log("запрос")
            const options = {
                method:"post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email.value,
                    "password": password.value
                })
            }
            fetch("/api/signin", options).then(response => {
                if (response.ok) {
                    document.location.href = document.referrer || "/"
                } else {
                    response.text().then(errorHandler)
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    false
    );
}
