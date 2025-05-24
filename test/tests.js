import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import sportRoutes from '../routes/sportRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/sport', sportRoutes);

// Añadir el middleware de manejo de errores
app.use((err, req, res, next) => {
    console.log("Error in test:", err);
    res.status(err.status || 500).json({
        message: err.message,
    });
});


describe('Sport Endpoints', () => {
    let createdSportId;

    describe('POST /sport/', () => {
        it('Debería registrar un deporte correctamente', async () => {
            const sportData = {
                name: 'Balonmano',
                description: 'Deporte de equipo con 5 jugadores',
                status: true,
                minimum_players: 5
            };

            const response = await request(app)
                .post('/sport')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(sportData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('sport');
            expect(response.body.message).to.equal('Deporte registrado correctamente');
            
            // Guardamos el ID para usarlo en las pruebas posteriores
            createdSportId = response.body.sport.id;
        });

        it('Debería fallar si el nombre del deporte ya existe', async () => {
            const sportData = {
                name: 'Fútbol',
                description: 'Deporte de equipo con 11 jugadores',
                status: true,
                minimum_players: 11
            };

            const response = await request(app)
                .post('/sport')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(sportData);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Este deporte ya está registrado');
        });

        it('Debería fallar si faltan campos obligatorios', async () => {
            const sportData = {
                name: 'Fútbol'
                // Faltan campos obligatorios: minimum_players
            };

            const response = await request(app)
                .post('/sport')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(sportData);

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message');
        });

        it('Debería fallar si no viene api key', async () => {
            const sportData = {
                name: 'Fútbol',
                description: 'Deporte de equipo con 11 jugadores',
                status: true,
                minimum_players: 11
            };

            const response = await request(app)
                .post('/sport')
                .send(sportData);

            expect(response.status).to.equal(403);
            expect(response.body).to.have.property('message');
            expect(response.body).to.deep.equal({
                message: "Acceso denegado"
            });
        });
    });

    describe('GET /sport', () => {
        it('Debería obtener todos los deportes correctamente', async () => {
            const response = await request(app)
                .get('/sport')
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('sports');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Deportes encontrados');
            expect(response.body.sports).to.be.an('array');
        });
    });
});
