const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '626af7630c2b36885c34cc34',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fugiat laboriosam fugit facere nisi quo ut vitae tempora, quasi aspernatur. Earum molestias assumenda error porro nihil quod consequuntur, amet laboriosam?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude    
                ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/dlyhlkpu6/image/upload/v1652091117/YelpCamp/pzarnoal1iyfs78wx8s5.jpg',
                filename: 'YelpCamp/pzarnoal1iyfs78wx8s5'
                },
                {
                url: 'https://res.cloudinary.com/dlyhlkpu6/image/upload/v1652091118/YelpCamp/erimgtkhykupewaqxscx.jpg',
                filename: 'YelpCamp/erimgtkhykupewaqxscx'
                },
                {
                url: 'https://res.cloudinary.com/dlyhlkpu6/image/upload/v1652091118/YelpCamp/b4awgfuipetjnn0a1iec.webp',
                filename: 'YelpCamp/b4awgfuipetjnn0a1iec'
                }
            ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})