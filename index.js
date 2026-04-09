const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/featured-locations', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json([
        {
            id: 1,
            city: "Barcelona",
            country: "Spain",
            image: `${baseUrl}/images/barcelona.jpg`
        },
        {
            id: 2,
            city: "Paris",
            country: "France",
            image: `${baseUrl}/images/paris.png`
        },
        {
            id: 3,
            city: "Tokyo",
            country: "Japan",
            image: `${baseUrl}/images/tokyo.png`
        },
        {
            id: 4,
            city: "Zanzibar",
            country: "Tanzania",
            image: `${baseUrl}/images/zanzibar.jpg`
        }
    ]);
});

app.get('/api/search', (req, res) => {
    const query = req.query.q || "";

    const locations = [
        { id: 1, city: "Barcelona", country: "Spain" },
        { id: 2, city: "Paris", country: "France" },
        { id: 3, city: "Tokyo", country: "Japan" },
        { id: 4, city: "Zanzibar", country: "Tanzania" },

        { id: 5, city: "London", country: "United Kingdom" },
        { id: 6, city: "Berlin", country: "Germany" }, // when B is typed, two shows up
        { id: 7, city: "New York", country: "USA" },
        { id: 8, city: "Dubai", country: "UAE" },
        { id: 9, city: "Rome", country: "Italy" },
        { id: 10, city: "Sydney", country: "Australia" }
    ];

    const results = locations.filter(location =>
        location.city.toLowerCase().includes(query.toLowerCase())
    );

    res.json(results);
});

app.get('/api/location/barcelona', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json({
        id: 1,
        city: "Barcelona",
        rating: 4,
        country: "Spain",
        description: "Barcelona is a dynamic coastal city in northeastern Spain, renowned for its unique blend of history, art, and modern culture. From the iconic architecture of Antoni Gaudí, such as the Sagrada Família and Park Güell, to the lively atmosphere of La Rambla, the city offers something for every visitor. Its Mediterranean beaches, vibrant food scene, and rich Catalan heritage make it a destination that effortlessly combines relaxation with exploration. Whether you're wandering through the historic Gothic Quarter or enjoying panoramic views from Montjuïc, Barcelona delivers an unforgettable experience full of character and charm.",

        images: `${baseUrl}/images/barcelona3.png`,

        gallery: [
            `${baseUrl}/images/barcelona.jpg`,
            `${baseUrl}/images/barcelona2.png`,
            `${baseUrl}/images/barcelona4.png`,
            `${baseUrl}/images/barcelona5.png`,
            `${baseUrl}/images/barcelona6.png`,
            `${baseUrl}/images/barcelona7.png`
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});