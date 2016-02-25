/**
* Pregunta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    enunciado:{
        type: 'string',
        size: 45,
        required: true
    },
    tipo:{
        type:'string',
        enum: ['Ensayo', 'Numerica', 'Emparejamiento', 'Verdadero/Falso', 'Eleccion multiple']
    },
    //Relacion 1-N pregunta-respuesta
    respuestas: {
        collection: 'respuesta',
        via: 'pregunta'
    },
    //Relacion 1-N pregunta-opcion
    opciones: {
        collection: 'opcion',
        via: 'pregunta'
    },
    //Relacion N-M cuestionario-pregunta
    cuestionarios: {
        collection: 'cuestionario',
        via: 'preguntas'
    },

    /*Adaptando tipo preguntas y dependiendo el tipo de pregunta que sea, se asigna una funcion*/
    tipoPregunta:function(respuesta, user, cuestionario, tipoPregunta, cb){
        switch (tipoPregunta.tipo) {
          case "Ensayo":
                console.log("Pregunta tipo: "+tipoPregunta.id);
                break;
          case "Numerica": 
                console.log("Pregunta tipo: "+tipoPregunta.id);
                this.comprobarNumerica(respuesta, function (valortext, valorfraction, cb){
                    Alumno.findOne({user: user})
                    .then(function(alumnum){
                        if(alumnum){
                            console.log("alumnum"+alumnum);
                        Respuesta.create({valor: valortext, puntuacion: valorfraction, alumno: alumnum.id, cuestionario:cuestionario , pregunta: tipoPregunta.id})
                        .exec(function funcion(err, funcion){
                        cb(funcion);
                        });
                        }else{
                            sails.log.verbose("No estas autenticado como usuario Alumno");
                        }
                    })
                })
                break;
          case "Emparejamiento":
                console.log("Pregunta tipo: "+tipoPregunta.id);
                statements // they are executed if variable ==  any of the above c's
                break;
          case "Verdadero/Falso":  
                console.log("Pregunta tipo: "+tipoPregunta.id);      
                statements // they are executed if variable ==  any of the above c's
                break;
          case "Eleccion multiple": 
                console.log("Pregunta tipo: "+tipoPregunta.id);       
                this.comprobarEleccionMultiple(respuesta, function cb(){
                    Alumno.findOne({
                        where: {user: user}
                    }).then(function(alumno){
                        if(alumno){
                            Respuesta.create({valor: "Correcto", puntuacion: 100, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id})
                            .exec(function createCB(err, created){
                                res.json(created);
                            })
                        }else{
                            sails.log.verbose("No estas autenticado como usuario Alumno");
                        }
                    })
                });
                break;    
          /*default:
                statements // they are executed if none of the above case is satisfied
                break;*/
        }
    },
    /*funciones que se utilizaran en el SWITCH para cada tipo de pregunta*/
    //para -.>ENSAYO

    //para -.>NUMERICA
    comprobarNumerica: function(respuesta, cb){
        console.log("Entrando a comprobarNumerica");
        var idRespuesta = respuesta;//id de la opcion que envia el usuario 
        var valortext;
        var valorfraction;
        Opcion.findOne({
            where: { id: Number(idRespuesta)}
          }).populate('subopciones').then(function(opcionSeleccionada){
                opcionSeleccionada.subopciones.forEach(function(unasubopcion){
                    if(unasubopcion.nombre == "fraction"){
                        valorfraction = unasubopcion.valor;
                        //console.log(""+uno);
                        sails.log.verbose(valorfraction);
                    }
                    if(unasubopcion.nombre == "text"){
                        valortext = unasubopcion.valor;
                        //console.log("dos"+dos);
                        sails.log.verbose(valortext);
                    }  
                    cb(valorfraction, valortext);                
                });
                
        })
    },
    //para -.>EMPAREJAMIENTO
    
    //para -.>VERDADERO/FALSO
    
    //para -->ELECCION MULTIPLE
    comprobarEleccionMultiple: function(respuesta, cb){
        Subopcion.findOne({
            where: {opcion: Number(respuesta), nombre: "fraccion"}
        }).then(function(subopcion){
            var puntuacion = subopcion.valor;
            Subopcion.findOne({
                where: {opcion: Number(respuesta), nombre: "text"}
            }).then(function(subopcion){
                var texto = subopcion.valor;
                cb(puntuacion, texto);
            })  
        })
    },


  }
};

