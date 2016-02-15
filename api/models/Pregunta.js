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
    }

    /*pregunta : {
    	type: 'string',
    	size: 255,
    	required: true
	},

    respuesta : { type: 'string',
    	size: 255,
    	required: true
    }*/
  }
};

