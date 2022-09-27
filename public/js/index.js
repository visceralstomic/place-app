
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

const ratingStars = [...document.querySelectorAll('.rating-star')];



function executeRating(stars) {
    const activeRating = 'star-solid';
    const inActiveRating = 'star-regular';
    const starsLength = stars.length;
    let i;
    stars.map(star => {
        star.onclick = (event) => {
            console.log(star)
            i = stars.indexOf(star);
            if (star.src.includes(inActiveRating)){
                for (i; i >= 0; --i) stars[i].src = stars[i].src.replace(inActiveRating, activeRating)
            } else {
                for (i; i < starsLength; ++i) stars[i].src = stars[i].src.replace(activeRating, inActiveRating)
            }
        }
    })
}


executeRating(ratingStars);


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
        htmlRating +=  `<img src="/images/svg/star-${ i <= rating ? 'solid' : 'regular'}.svg" alt="" class="star-ico">`
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
        form.append('rating', placeRatingInput.value);
        
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
                            Name: <span>${place.name}</span>
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
    console.log(event.target)
    fileSelected.textContent = event.target.files[0].name;
});