

const editForm = document.querySelector('#edit-place-form');
const editPicture = document.querySelector('#edit-place-picture-input');
const fileSelected = document.querySelector('#file-selected');

const delForm = document.querySelector('.del-form');

const editPlaceNameInput = document.querySelector('#edit-place-name-input');
const editPlaceLocationInput = document.querySelector('#edit-place-locations-input');
const editPlaceDescriptionInput = document.querySelector('#edit-place-description-input');
const editPlacePictureInput = document.querySelector('#edit-place-picture-input');

const editPlaceNameError = document.querySelector('.edit-place-name-error');
const editPlaceLocationError = document.querySelector('.edit-place-locations-error');
const editPlaceDescriptionError = document.querySelector('.edit-place-description-error');





editPlacePictureInput.addEventListener('change', event => {
    fileSelected.textContent = event.target.files[0].name;
});


function validateEditForm() {

    let isValid = true;

    if (!editPlaceNameInput.value.trim()) {
        isValid = false;
        editPlaceNameError.textContent = 'Enter place name';
    }

    if (!editPlaceLocationInput.value.trim()) {
        isValid = false;
        editPlaceLocationError.textContent = 'Enter place location';
    }

    if (!editPlaceDescriptionInput.value.trim()) {
        isValid = false;
        editPlaceDescriptionError.textContent = 'Enter place desription';
    }




    return isValid;
}



editForm.addEventListener('submit', event => {
    if (!validateEditForm()) {
        event.preventDefault();
         setTimeout(() => {
            editPlaceNameError.textContent = '';
            editPlaceLocationError.textContent = '';
            editPlaceDescriptionError.textContent = '';
        }, 7500)
    } 
})

delForm.addEventListener('submit', event => {
   
    if (!window.confirm('Do you want to delete this place object?')) {
        event.preventDefault();
    }
})


/*  RATING */

const classStarInactive = "inactive-star";
const classStarActive = "active-star";

const stars = document.querySelectorAll("#rating-label");
const starsInput = document.querySelectorAll("#rating-label > input");
const ratingInput = document.querySelector('#place-old-rating');



let placeRating = parseInt(ratingInput.value);


document.addEventListener('DOMContentLoaded', function() {

    stars.forEach((star, idx) => {
        if (idx <= placeRating-1 ) {
            star.classList.add(classStarActive);
        }

        if (idx == placeRating-1 ) {
            star.control.checked = true;
        }
        star.addEventListener('click', activeStar);
        star.addEventListener('click', event => {
            console.log(event.target.control.checked)
        });
        star.addEventListener('mouseenter', activeStar);
        star.addEventListener('mouseout', inactiveStar);
    })

    starsInput.forEach(sInput => {
        sInput.addEventListener('click', function(event) {
            ratingInput.value = event.target.value;
            event.stopPropagation();
        })
    })
})
