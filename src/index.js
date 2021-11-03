import express from 'express';


import { deleteVehicles, insertVehicles, listVehicles, updateVehicles } from './controllers/vehicles.Controller.js';

const app = express ();



app.use(express.json());


app.get('/api/ping', (request, response,)=>{
   response.send({

    message: 'pong'


   })

});

/*Endpoints vehicles*/

app.get('/api/vehicles', listVehicles);

app.post('/api/vehicles', insertVehicles);

app.put('/api/vehicles/:ID', updateVehicles);

app.delete('/api/vehicles:ID', deleteVehicles);






app.listen(8000, () => {

    console.log("servidor rodando na porta 8000");



});