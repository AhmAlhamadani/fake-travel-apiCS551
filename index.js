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
        description: "Barcelona is a vibrant city known for its art, architecture, and culture. It offers a mix of historical landmarks and modern attractions, making it a popular destination for travelers.",
        image1: `${baseUrl}/images/barcelona.jpg`,
        image2: `${baseUrl}/images/barcelona2.jpg`,
        image3: `${baseUrl}/images/barcelona3.jpg`,
        gallery1: `${baseUrl}/images/barcelona4.jpg`,
        gallery2: `${baseUrl}/images/barcelona5.jpg`,
        gallery3: `${baseUrl}/images/barcelona6.jpg`,
        gallery4: `${baseUrl}/images/barcelona7.jpg`,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});