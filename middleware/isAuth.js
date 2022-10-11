

const access = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).redirect('/')
    }
}

const func = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).json('You must be authenticated')
    }
}


module.exports = {
    access,
    func
};