/**
* SubOpcion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    nombre : { type: 'string' },

    valor : { type: 'string' },
    //Relacion 1-N opcion-subopcion
    opcion: {
    	model: 'opcion'
    }
  }
};

