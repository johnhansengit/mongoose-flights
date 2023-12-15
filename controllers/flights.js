const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

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
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/add', {
        title: 'Add Flight',
        errorMsg: '',
        departsDate
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
    const tickets = await Ticket.find({ flight: req.params.id });

    let d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    let arrivalDate = d.toISOString().slice(0, 16);

    res.render('flights/show', { title: 'Flight Detail', flight, tickets, arrivalDate });
}


module.exports = {
    new: addFlight,
    create,
    index,
    show,
}