const express = require ('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

// para todos los endpoints que inician con /api/lessons/

router.post('/', (req, res)=>{
    Lessons.add(req.body)
    .then(lesson=>{
        res.status(200).json(lesson);
    })
    .catch(error=>{
        res.status(500).json({message:"no se puede añadir lesson"});
    });
});

router.get('/', (req, res)=>{
    Lessons.find()
    .then(lessons=>{
        res.status(200).json(lessons)
    })
    .catch(error=>{
        res.status(500).json({message: "Inalcanzable recuperar lessons"});
    });
});

router.get('/:id', (req, res)=>{
    const{id}=req.params;
    Lessons.findById(id)
    .then(lesson =>{
     if(lesson){
         res.status(200).json(lesson)
     }else{
         res.status(404).json({message:'Registro no encontrado'})
     }
    })
    .catch(error=>{
        res.status(500).json({message:'Inalcanzable operación'})
    })
})

router.delete('/:id', (req, res)=>{
    const{id}=req.params;

    Lessons.remove(id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({message:'Borrado exitósamente'})
        }else{
            res.status(404).json({message:'Inalcanzable encontrar el registro'})
        }
    })
    .catch(error =>{
        res.status(500).json({message:'Inalcanzable borrar'})
    })
});

//patch es para actualizar un registro
router.patch('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    Lessons.update(id, changes)
    .then(lesson =>{
        if(lesson){
          res.status(200).json(lesson)
        }else{
          res.status(404).json({message:'Registro no encontrado'})
        }
    })
    .catch(err =>{
        res.status(500).json({message:'Error en actualizar registro'})
    })
});

router.post("/:id/messages", (req, res)=>{
    const {id}=req.params;
    const msg =req.body;

    if(!msg.lesson_id){
        msg["lesson_id"] = parseInt(id, 10)
    }

    Lessons.findById(id)
    .then(lesson =>{
        if(!lesson){
            res.status(404).json({message:'Inválida id'})
        }
        //chequear por todos los campos required
        if (!msg.sender || !msg.text){
            res.status(400).json({message:'Debe suministrar los campos sender y text'})
        }

        Lessons.addMessage(msg, id)
        .then(message =>{
            if(message){
                res.status(200).json(message)
            }
        })
        .catch(error =>{
            res.status(500).json({message:'Falló en añadir el mensaje'})
        })
    })
    .catch(error=>{
        res.status(500).json({message:'Error encontrado en lesson'})
    })
});

router.get('/:id/messages', (req, res) =>{
    const {id}= req.params;

    Lessons.findLessonMessages(id)
    .then(lessons =>{
        res.status(200).json(lessons)
    })
    .catch(error =>{
        res.status(500).json({message:'Error al recuperar el mensaje'})
    });
});

module.exports = router;