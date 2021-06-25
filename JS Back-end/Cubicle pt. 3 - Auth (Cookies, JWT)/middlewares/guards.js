function isUser(){
    return (req, res, next) => {
        if(req.user != undefined){
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if(req.user == undefined){
            next();
        } else {
            res.redirect('/cubes');
        }
    }
}

function isOwner(){
    return (req, res, next) => {
        if(req.user._id == req.data.cube.author._id){
            next();
        } else {
            const ctx = {
                title: 'Details',
                cube: req.data.cube,
                accessories: req.data.cube.accessories,
                error: 'You are not authorized to do this action!'
            }

            res.render('details', ctx)
        }
    }
}

module.exports = {isUser, isGuest, isOwner}