// We wait to execute the javascript untill all the HTML has finished loading
window.onload = function() {
    var tl = gsap.timeline({repeat: 3, repeatDelay: 1});
    tl.from("#papers", {scale: 0.6, duration: 3, ease: "expo.in"});
    tl.from("#sad", {scale: 0.4, duration: 4, ease: "expo.in"}, 0);
    tl.to("#papers", {opacity: 0, display: "none", duration: 2}, 3);
    tl.to("#sad", {opacity: 0, display: "none", duration: 1}, 4);
    tl.from("#brain", {opacity: 0, duration: 1});
    tl.from("#controller", {opacity: 0, duration: 1}, 5);
    tl.to("#brain", {rotation: 360, x: 330, duration: 3, ease: "bounce"});
    tl.to("#controller", {x: -330, duration: 3, ease: "bounce"}, 6);
    tl.to("#brain", {opacity: 0, duration: 1});
    tl.to("#controller", {opacity: 0, duration: 1}, 9);
    tl.from("#logo", {opacity: 0, scale: 0.6, duration: 2}, 9);
    tl.to("#logo", {opacity: 0, display: "none", duration: 2});
    tl.to("#success", {opacity: 1, display: "block", scale: 1.2, duration: 2});
    tl.to("#calendar", {opacity: 1, display: "block", rotation: -20, duration: 2}, 13);
    
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

            addError("Your email doesn't contain '<b>@</b>', please try again."); 
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

    var accordion = document.getElementById("accordion");
    accordion.addEventListener("click", function() {    
        //Show/hide the navigation when clicking the menu button
        var navigation = document.getElementsByTagName("nav")[0];
        if (navigation.style.display === "block") {
            navigation.style.display = "none";
        } else {
            navigation.style.display = "block";
        }
    });
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