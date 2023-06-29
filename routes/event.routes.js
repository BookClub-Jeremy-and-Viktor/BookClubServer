const router = require("express").Router();

const mongoose = require("mongoose");

const Event = require("../models/Event.model");
const Book = require("../models/Book.model");



//  POST /api/events  -  Creates a new event
router.post("/events", (req, res, next) => {
    const { title, location, address, description, time, date} = req.body;

    const newEvent = {
      title: title,
      location: location,
      address: address,
      description: description,
      time: time,
      date: date,
      comments: [],
      books: []

    }

    Event.create(newEvent)
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating a new event", err);
            res.status(500).json({
                message: "error creating a new event",
                error: err
            });
        })
});



// GET /api/events -  Retrieves all of the events
router.get('/events', (req, res, next) => {
    Event.find()
        .populate("books")
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of events", err);
            res.status(500).json({
                message: "error getting list of events",
                error: err
            });
        })
});




//  GET /api/events/:eventId  -  Get details of a specific event by id
router.get('/events/:eventId', (req, res, next) => {
    
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }


    Event.findById(eventId)
        .populate('books')
        .then(event => res.json(event))
        .catch(err => {
            console.log("error getting details of an event", err);
            res.status(500).json({
                message: "error getting details of an preventoject",
                error: err
            });
        })
});


// PUT /api/events/:eventId  -  Updates a specific event by id
router.put('/events/:eventId', (req, res, next) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    const newDetails = {
        title: req.body.title,
        location: req.body.location,
        address: req.body.address,
        description: req.body.description,
        time: req.body.time,
        date: req.body.date,
        
    }

    Event.findByIdAndUpdate(eventId, newDetails, { new: true })
        .then((updatedEvent) => res.json(updatedevent))
        .catch(err => {
            console.log("error updating event", err);
            res.status(500).json({
                message: "error updating event",
                error: err
            });
        })
});



// DELETE /api/events/:eventId  -  Delete a specific event by id
router.delete('/events/:eventId', (req, res, next) => {
    const {eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Event.findByIdAndRemove(eventId)
        .then(deletedEvent => {
            return Book.deleteMany({ _id: { $in: deletedEvent.books } });
        })
        .then(() => res.json({ message: `Event with id ${eventId} & all associated books were removed successfully.` }))
        .catch(err => {
            console.log("error deleting event", err);
            res.status(500).json({
                message: "error deleting event",
                error: err
            });
        })
});





module.exports = router;
