

const { default: mongoose } = require("mongoose");

const JobSchema = mongoose.Schema({
    addDate:{type:Date, default:Date.now},
    title:String,
    summary: String,
    description:String,
    minSalary:Number,
    maxSalary:Number,
    locations:[{type:mongoose.Schema.Types.ObjectId, ref:'Location'}]
})

// Middleware: Jobda update edende locationda da deyismesi ucun 

JobSchema.pre('findOneAndUpdate', async function () {
    const updatedJob = this._update.$set; // Güncellenen iş belgesini al

    // Konumları güncelle
    await location.updateMany(
        { jobs: this._conditions._id }, // İlgili işi referans alan konum belgelerini bul
        { $set: { 'jobs.$': updatedJob } } // Referans alanı güncelle
    );
});


const Job = mongoose.model('Job', JobSchema)


module.exports = {
    Job
}