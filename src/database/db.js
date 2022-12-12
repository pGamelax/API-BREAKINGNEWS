const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log('Wait connecting to the database')

    mongoose.connect("mongodb+srv://root:root@cluster0.olrh1o2.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((err) => console.log(err))
}

module.exports = connectDatabase;