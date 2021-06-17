module.exports = {
    notFound: (req, res) => {
        res.render('404', {title: 'NOT FOUND'});
    }
}