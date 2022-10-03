
const placeForm = document.querySelector('.place-form');
const placeNameInput = document.querySelector('#place-name-input');
const placeLocationInput = document.querySelector('#place-locations-input');
const placeRatingInput = document.querySelector('#place-rating-input');
const placeDescriptionInput = document.querySelector('#place-description-input');
const placePictureInput = document.querySelector('#place-picture-input');
const placeList = document.querySelector('.places-list');
const placesIsEmpty = document.querySelector('.places-empty');
const fileSelected = document.querySelector('#file-selected');

const placeNameError = document.querySelector('.place-name-error');
const placeLocationError = document.querySelector('.place-locations-error');
const placeDescriptionError = document.querySelector('.place-description-error');
const placePictureError = document.querySelector('.place-picture-error');

let placeRating = 0;


function validateForm() {
    let isValid = true;

    if (!placeNameInput.value.trim()) {
        isValid = false;
        placeNameError.textContent = 'Enter place name';
    }

    if (!placeLocationInput.value.trim()) {
        isValid = false;
        placeLocationError.textContent = 'Enter place location';
    }
    
    if (!placeDescriptionInput.value.trim()) {
        isValid = false;
        placeDescriptionError.textContent = 'Enter place dexription';
    }

    if (!placePictureInput.value) {
        isValid = false;
        placePictureError.textContent = 'Provide picture';
    }


    return isValid;
}


function createStarRating(rating) {
    let htmlRating = '';
    for(let i = 1; i <= 5; i++) {
        htmlRating +=  `<label class="rating-label ${i <= rating ? 'active-star' : ''}">
        ★
        <input type="radio" name="note">
      </label>`
    }

    return htmlRating
}


placeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateForm()) {
        
        let form = new FormData();

        const file = placePictureInput.files[0];
        form.append('name',placeNameInput.value);
        form.append('location', placeLocationInput.value);
        form.append('description', placeDescriptionInput.value);
        form.append('rating', placeRating);
        
        if (file) {
            form.append('picture', file, file.name)
        }


        axios
            .post('/create_post', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res =>{
                const place = res.data;
                console.log(place)
                if (placesIsEmpty) {
                    placesIsEmpty.style.display = 'none'; 
                }
                placeList.insertAdjacentHTML('beforeend', `
                <div class="place-item">
                <div class="place-header">
                    <div class="place-info">
                        <div class="place-name">
                            Name: 
                            <a href="/edit-place-page/${place._id}" class="edit-link">
                                                ${place.name}
                            </a> 
                        </div>
                        <div class="place-location">
                            Location: <span>${place.location}</span>
                        </div>
                        <div class="rating">
                            Rating: ${createStarRating(place.rating)}

                        </div>
                    </div>

                    <div class="place-picture">
                        <img src="/images/${place.picture}" alt="">
                    </div>
                </div>
                <div class="place-footer">
                    <p>
                    ${place.description}

                    </p>
                </div>
            </div>
                `)

            })
            .catch(err => {
                console.log(err)
            })
    } else {
        setTimeout(() => {
            placeNameError.textContent = '';
            placeLocationError.textContent = '';
            placeDescriptionError.textContent = '';
            placePictureError.textContent = '';

        }, 7500)
    }


}); 

placePictureInput.addEventListener('change', event => {
    fileSelected.textContent = event.target.files[0].name;
});




/* Rating Stars */


const classStarInactive = "inactive-star";
const classStarActive = "active-star";

const stars = document.querySelectorAll("#rating-label");
const starsInput = document.querySelectorAll("#rating-label > input");



document.addEventListener('DOMContentLoaded', function() {
    stars.forEach(star => {
        star.classList.remove(classStarActive);
        star.addEventListener('click', activeStar);
        star.addEventListener('mouseenter', activeStar);
        star.addEventListener('mouseout', inactiveStar);
    })

    starsInput.forEach(sInput => {
        sInput.addEventListener('click', function(event) {
            placeRating = parseInt(event.target.value);
            event.stopPropagation();

        })
    })
})
