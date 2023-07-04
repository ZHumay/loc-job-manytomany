const { location } = require("../models/Location");
const {Job}=require("../models/Job")

const locationController = {
  getAll: (req, res) => {
    location
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    location
      .findById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getJobsByLocationId: (req, res) => {
    let locationId = req.params.locationId;

    location.findById(locationId)
      .populate([ { path: "jobs" }])
      .exec()
      .then((location) => {
        if (!location) {
          return res.status(404).json({ msg: 'Location not found!' });
        }

        res.json(location.jobs);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: async (req, res) => {
    try {
      let newLocation = new location({
        name: req.body.name,
        icon: req.body.icon,
        jobs: req.body.jobs || [],
      });
      await newLocation.save();
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  

  deleteById: (req, res) => {
    let id = req.params.id;

    location
      .findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  update: (req, res) => {
    let id = req.params.id;

    location
      .findById(id)
      .then((data) => {
        data.name = req.body.name ;
        data.icon = req.body.icon ;
         data.save();

        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  locationController,
};
