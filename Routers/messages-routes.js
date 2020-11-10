const express = require ('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

//para todos los enpoints que empiezan con /api/messages/
router.delete('/:id', (req, res) =>{
    const{id}=req.params;

    Lessons.removeMessage(id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({message:`Mensaje con id ${id} exitósamente borrado`})
        } else {
            res.status(404).json({message:'No hay registro con ese id'})
        }
    })
    .catch(error =>{
        res.status(500).json({message:'Error al borrar el registro'})
    })
});

module.exports = router;