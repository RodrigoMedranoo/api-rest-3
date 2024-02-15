const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

const data = [
    {
        id: 1,
        nombre: "Josue",
        carrera: "cibernetica",
        semestre: 3
    },
    {
        id: 2,
        nombre: "Fernando",
        carrera: "industrial",
        semestre: 3
    },
    {
        id: 3,
        nombre: "Raul",
        carrera: "automotriz",
        semestre: 4
    },
    {
        id: 4,
        nombre: "Raul",
        carrera: "automotriz",
        semestre: 9
    }
];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.get("/data/all", (req, res) => {
    res.status(200).json(data);
});

app.get("/data", (req, res) => {
    const query_semestre = req.query.semestre;
    const query_carrera = req.query.carrera;
    if (query_semestre && query_carrera) {
        const filtro = data.filter(item => item.semestre == query_semestre && item.carrera == query_carrera);
        if (filtro.length > 0) {
            res.status(200).json(filtro);
        } else {
            res.status(404).json({ message: "No encontrado" });
        }
    } else {
        res.status(302).redirect("/data/all");
    }
});

app.get("/data/:id", (req, res) => {
    const id_user = req.params.id;
    const encontrado = data.find(item => item.id == id_user);
    if (encontrado) {
        res.status(200).json(encontrado);
    }
    else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.post("/data", (req, res) => {
    const user_body = req.body;
    data.push(user_body);
    res.status(201).json(data);
});

app.put("/data/:id", (req, res) => {
    const user_body = req.body;
    const param = req.params.id;
    const encontrado = data.findIndex(item => item.id == param);
    if (encontrado != -1) {
        data[encontrado] = user_body;
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.patch("/data/:id", (req, res) => {
    const user_body = req.body;
    const param = req.params.id;
    const encontrado = data.findIndex(item => item.id == param);
    if (encontrado != -1) {
        Object.assign(data[encontrado], user_body);
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.delete("/data/:id", (req, res) => {
    const param = req.params.id;
    const index = data.findIndex(item => item.id == param);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.options('*', (req, res) => {
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.status(200).end();
});

app.listen(port, () => {
    console.log("Servicio escuchando el puerto:", port);
});
