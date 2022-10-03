

const editForm = document.querySelector('#edit-place-form');
const editPicture = document.querySelector('#edit-place-picture-input');
const fileSelected = document.querySelector('#file-selected');
const placePictureInput = document.querySelector('#edit-place-picture-input');
const delForm = document.querySelector('.del-form');


console.log('delForm', delForm)


placePictureInput.addEventListener('change', event => {
    fileSelected.textContent = event.target.files[0].name;
});


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
        star.addEventListener('click', activeStar);
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
