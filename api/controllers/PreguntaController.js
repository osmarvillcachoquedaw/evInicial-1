/**
 * PreguntaController
 *
 * @description :: Server-side logic for managing preguntas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Pregunta.findOne({
			where: { id: Number(req.params.preguntaId)}
		//}).then(function(pregunta){
		}).populate('opciones').then(function(pregunta){
			if(pregunta) {
				req.pregunta = pregunta;
				console.log("preguntas-"+pregunta);
				next();
			} else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	corregirRespuesta: function(req, res) {
		var respuestaVal = (req.query.respuesta) ? req.query.respuesta : undefined,
			resultado = 'Incorrecto';
		if(req.pregunta.respuesta == respuestaVal) {
			resultado = 'Correcto';
		}
		res.json(resultado);
	},

	//muestraInfo: function(req, res){
		//var pregunta = req.pregunta.toJSON;
		//var pregunta.opciones = req.opcion.toJSON;
	//} 
	findOne: function(req, res, next){
		Pregunta.findOne({
			where: { id: Number(req.params.id)}
		}).then(function(pregunta){
			if(pregunta){
				var pregunta = pregunta.toJSON;
				Opcion.find({
					pregunta : res.params.id
				}).populate('subopciones').then(function(opcion){
					if(opcion){
						pregunta.opcion = opcion;
						res.json(pregunta);
					}else {next(new Error('no existe las opciones con el id '+ req.params.preguntaId))}
				}).catch(function(error){next(error);});
			}else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	}
};

