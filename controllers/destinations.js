const Flight = require('../models/flight')

const create = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body);
    flight.destinations.sort((a, b) => new Date(a.arrival) - new Date(b.arrival));
    try {
        await flight.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/flights/${flight._id}`);
}

module.exports = {
    create,
}