const { Job } = require("../models/Job");

const jobController = {
  getAll: (req, res) => {
    Job.find()
      .populate("locations") 
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Job.findById(id)
      .populate([{ path: "locations" }])
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: async (req, res) => {
    try {
      let job = new Job({
        title: req.body.title,
        summary: req.body.summary,
        description: req.body.description,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        locations: req.body.locations
      });
      await job.save();

      res.status(201).json(job);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: (req, res) => {
    let id = req.params.id;

    Job.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        summary: req.body.summary,
        description: req.body.description,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        locations: req.body.locations
      },
      { new: true }
    )
      .populate("locations")
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteById: (req, res) => {
    let id = req.params.id;

    Job.findByIdAndDelete(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

module.exports = {
  jobController
};
