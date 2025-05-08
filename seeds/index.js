const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "680e051f5f61fd02d5df6d22",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis tempora incidunt corrupti quisquam tenetur eum adipisci non labore. Sit sapiente facere ad eaque consequuntur, blanditiis vel quibusdam a id nulla!",
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
                //   url: 'https://res.cloudinary.com/ddhgml5y3/image/upload/v1746023464/YelpCamp/pmsruczkg9rtsu3jgnqj.jpg',
                  url: 'https://res.cloudinary.com/ddhgml5y3/image/upload/v1745940296/YelpCamp/f0mxfkcmx68cif3mphnc.jpg', //manually reseeded
                  filename: 'YelpCamp/pmsruczkg9rtsu3jgnqj',
                },
                {
                  url: 'https://res.cloudinary.com/ddhgml5y3/image/upload/v1746023467/YelpCamp/vff4nvpxikronfdovuok.jpg',
                  filename: 'YelpCamp/vff4nvpxikronfdovuok',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})