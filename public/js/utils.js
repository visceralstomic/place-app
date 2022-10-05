function validateForm(nameInput, locInput, descrInput, 
                        nameError, locError, descError) {
    let isValid = true;

    if (!nameInput.value.trim()) {
        isValid = false;
        nameError.textContent = 'Enter place name';
    }

    if (!locInput.value.trim()) {
        isValid = false;
        locError.textContent = 'Enter place location';
    }
    
    if (!descrInput.value.trim()) {
        isValid = false;
        descError.textContent = 'Enter place desription';
    }

    return isValid;
}



function activeStar(event) {
    let currStarActive = event.target;
    let currStarInactive = event.target;

    if (event.type = "mouseenter" || !event.target.control.checked) {
        while (currStarActive != null) {
            currStarActive.classList.add(classStarActive);
            currStarActive = currStarActive.previousElementSibling;
        }


        while( (currStarInactive = currStarInactive.nextElementSibling) != null) {
            currStarInactive.classList.remove(classStarActive);
        }
    } else {
        event.preventDefault();
    }
}




function inactiveStar(event) {
    let starNode = event.target.parentNode.querySelectorAll('label');
    let currLabel = starNode[starNode.length - 1];


    starNode.forEach(function (star) {
        star.classList.add(classStarActive);
    })

    while (currLabel != null && !currLabel.control.checked) {
        currLabel.classList.remove(classStarActive)
        currLabel = currLabel.previousElementSibling;
    }
}
