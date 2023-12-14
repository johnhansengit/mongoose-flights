const Flight = require('../models/flight')

const index = async (req, res) => {
    try {
        let flights = await Flight.find({}).sort('departs')
        res.render('flights/index', {
            title: 'All Flights',
            flights
        })
    } catch (err) {
        res.render('flights/index', {
            title: 'All Flights',
            errorMsg: err.message
        })
    }
}

const addFlight = (req, res) => {
    res.render('flights/add', {
        title: 'Add Flight',
        errorMsg: ''
    })
}

const create = async (req, res) => {
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        console.log(err);
        res.render('flights/add', { 
            title: 'Add Flight',
            errorMsg: err.message 
        });
    }
}

const show = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { title: 'Flight Detail', flight });
}


module.exports = {
    new: addFlight,
    create,
    index,
    show,
}