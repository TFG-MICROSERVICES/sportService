import { Sport } from '../../models/sport.js';
import { generateError } from '../../utils/generateError.js';

export const createSport = async (data) => {
    try {
        console.log(data);
        const sport = await Sport.create(data);
        
        if(!sport) generateError('Error creating user', 500);

        return sport;
    } catch (error) {
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const getSports = async () =>{
    try{
        const sports = await Sport.findAll();

        if(!sports) generateError('Sports not found',404);

        return sports;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const getSportById = async(id) =>{
    try{
        const sport = await Sport.findByPk(id);

        if(!sport) generateError('Sport not found',404);

        return sport;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const updateSport = async(id) =>{
    try{
        const [updateRows] = await User.update(data,{
            where:{
                id: id
            }
        });

        if(updateRows === 0) generateError('Sport not updated',400);

        const newSport = getSportById(id);

        return newSport;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const deleteSport = async(id) =>{
    try{
        const sport = await Sport.destroy({
            where: {
                id: id
            }
        });

        if(!sport) generateError('Sport not deleted',400);

        return sport;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}