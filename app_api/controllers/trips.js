const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json(err);
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        res.status(201).json(trip);
    } catch (err) {
        res.status(400).json(err);
    }
};

const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        res.status(400).json(err);
    }
};

const tripsDeleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json({
            message: 'Trip deleted'
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};