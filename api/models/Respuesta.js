/**
* Respuesta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    valor : { type: 'string', size: 255, required: true },

    puntuacion : { type: 'int' },
    //Relacion 1-N alumno-respuesta
    alumno: {
    	model: 'alumno'
    },
    //Relacion 1-N cuestionario-respuesta
    cuestionario: {
    	model: 'cuestionario'
    },
    //Relacion 1-N pregunta-respuesta
    pregunta: {
    	model: 'pregunta'
    }
  }
};

