import { openDatabase } from "../database.js";

export const listVehicles = async (request, response,) => {

    const db = await openDatabase();
    const vehicles = await db.all(`

    SELECT * FROM vehicles
    
    `);

    db.close();
   
    response.send(vehicles)
 
};

export const insertVehicles = async (request, response,)=>{

    const {model, label, type, owner, observation} = request.body;
    const db = await openDatabase();
    const data = await db.run(`

    INSERT INTO vehicles(model, label, type, owner, observation)
    VALUES (?, ?, ?, ?, ?)
    
    `, [model, label, type, owner, observation]);

    db.close();
   
    response.send({
        ID: data.lastID,
        model, 
        label, 
        type, 
        owner, 
        observation

    });

};

export const updateVehicles = async (request, response,)=>{

    const {model, label, type, owner, observation} = request.body;
    const {ID} = request.params;

    const db = await openDatabase();

    const  vehicles = await db.get(`

    SELECT * FROM vehicles WHERE id = ?
   
    
    `, [ID]);

    if (vehicles) {
        const data = await db.run(`
            UPDATE vehicles 
               SET model = ?, 
                   label = ?, 
                   type = ?, 
                   owner = ?, 
                   observation = ?
             WHERE id = ?
        `,  [model, label, type, owner, observation, id]);
        
        db.close();
        response.send({
            id,
            model, 
            label, 
            type, 
            owner,
            observation
        });
        return;
    }

    db.close();
    response.send(vehicles || {});
   
}

export const deleteVehicles = async (request, response,)=>{

    const {ID} = request.params;
    const db = await openDatabase();
    const data = await db.run(`

    DELETE FROM vehicles 
    WHERE ID = ?
    
    `, [ID]);

    db.close();
   
    response.send({
        ID,
        message: `veiculo [${ID}] removido com sucesso`, 


    });
    


};