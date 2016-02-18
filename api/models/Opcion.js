/**
* Opcion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    tipoOpcion : { type: 'string' },

    //Relaciones 1-N pregunta-opcion
    pregunta: {
    	model: 'pregunta'
    },
    subopciones: {
    	collection: 'subopcion',
    	via: 'opcion'
    }

  }
};

