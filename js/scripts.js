// We wait to execute the javascript untill all the HTML has finished loading
window.onload = function() {
    // Get form element
    let form = document.getElementById("contactForm");
    
    // Get input element
    let inputEmail = document.getElementById("email");
    
    // Listen to the submit of the form
    form.onsubmit = function (event) {
        // Prevent the form from submitting so we can validate the input first
        event.preventDefault();

        // Variables to be able to check if notification has already been added to prevent multiple errors from being shown
        var alertElement = document.getElementsByClassName("alert");
        var alertElementExists = alertElement.length; // none found means a length of 0

        // Check whether the email starts with the prefix
        let validEmail = inputEmail.value.includes("@");

        if(inputEmail.value == "") 
        {
            // Remove error element if it's already there
            if(alertElementExists)
            {
                alertElement[0].remove();
            }

            addError('Please enter an email address, so I can respond to your message.')
        }
        // Check whether email is valid
        else if (!validEmail)
        {
            if(alertElementExists)
            {
                alertElement[0].remove();
            }

            addError("Your email doesn't containt '<b>@</b>', please try again."); 
        }
        else
        {
            if(alertElementExists)
            {
                // Remove red border
                inputEmail.classList.remove('red-border');
                // Remove existing alert message
                alertElement[0].remove();
            }
            
            var successText = `<div class="alert alert-success"><p>Your message has been sent!</p></div>`;
            let fragment = createHtmlElement(successText);

            inputEmail.after(fragment);
        }
    }
}

function addError(message)
{
    // Create HTML element that contains error message
    let fragment = createHtmlElement(`<p class="alert alert-danger validation-error">${message}</p>`);
            
    // Add HTML element after the inputs
    document.getElementById("email").after(fragment);

    // Add a red border around the input
    document.getElementById("email").classList.add('red-border');
}

function createHtmlElement(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}