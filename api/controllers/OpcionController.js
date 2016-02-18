/**
 * OpcionController
 *
 * @description :: Server-side logic for managing opcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res) {
		//Opcion.findOne({
		//	where: { id: Number(req.params.opcionId)}
		Opcion.find({
			where: { pregunta: Number(req.params.opcionesId)}
		  }).populate('subopciones').then(function(opcion){
			if(opcion) {
				req.opcion = opcion;
				console.log("opcion-"+opcion);
				res.json(opcion);
			} else { next(new Error('No existe la opcion con el id' + req.params.opcionId));}
		}).catch(function(error){next(error);});
	},
	
};

