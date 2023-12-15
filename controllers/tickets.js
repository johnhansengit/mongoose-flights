const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

const newTicket = async (req, res) => {
    const flight = await Flight.findById(req.params.id);

    res.render('tickets/new', {
        title: 'New Ticket',
        errorMsg: '',
        flight,
    })
}

const create = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        const ticketData = {
            ...req.body,
            flight: flight._id
        };
        await Ticket.create(ticketData);
        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.log(err);
        res.render(`flights/${flight._id}/tickets/new`, {
            title: 'New Ticket',
            errorMsg: err.message
        });
    }   
}


module.exports = {
    new: newTicket,
    create,
}