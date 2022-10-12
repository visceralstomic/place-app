const PlaceModel = require('../models/placeModel');


const getAllPlaces = (req, res) => {
    if (req.session.user) {
        const {user} = req.session;
        PlaceModel
            .find({creator: user.id})
            .sort({createdAt: -1})
            .then(places => {
                res.render('index', {places})
            })
            .catch( error => console.log(error));
    } else {
        res.render('hello-page', {regErrors: req.flash('regErrors')});
    }   
}


const createPlace = (req, res) => {
    let placeBody = {...req.body};
    placeBody['creator'] = req.session.user.id;

    if(req.file) {
        placeBody['picture'] = req.file.filename;
    }   

    const placeObj = new PlaceModel(placeBody);
    placeObj
        .save()
        .then(place => {
            res.status(201).json(place)
        })
        .catch(error => {

            let errorMsg = '';

            if (error.name === 'ValidationError') {
                errorMsg = Object.values(error.errors).map(item => item.message).join(',\n');
            }
            res.status(400).json(errorMsg)
        })
}


const editPlacePage =  (req, res) => {
    PlaceModel
        .findOne({_id: req.params.id})
        .then(place => {
            res.render('edit-page', {place, editPlaceError: req.flash('editPlaceError')})
        })
        .catch(err => {
            console.log(err)
        })
}


const deletePlace =  (req, res) => {
    PlaceModel
        .findOneAndDelete({_id: req.params.id})
        .then(place => {
            res.redirect('/places')
        })
        .catch(err => {
            console.log(err);
        })
};

const editPlace = (req, res) => {
    const placeData = req.body;
    
    if(req.file) {
        placeData['picture'] = req.file.filename;
    }    

    PlaceModel
        .findOneAndUpdate(
            {_id: req.params.id},
            placeData,
            {new: true, runValidators: true}
        )
        .then(place => {
            res.redirect('/places');
        })
        .catch(err => {
            let errorMsg = '';

            if (err.name === 'ValidationError') {
                errorMsg = Object.values(err.errors).map(item => item.message).join(',\n');
            }
            req.flash('editPlaceError', errorMsg)
            req.session.save(function() {
                res.redirect(`/places/${req.params.id}/edit-page`)
            })
        }) 
};


module.exports = {
    getAllPlaces, 
    createPlace,
    editPlacePage,
    deletePlace,
    editPlace
}