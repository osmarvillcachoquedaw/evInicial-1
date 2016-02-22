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
				console.log("pregunta-"+pregunta);
				var preguntajson = pregunta.toJSON();
				Opcion.find({
					pregunta : req.params.id
				}).populate('subopciones').then(function(opcion){
					if(opcion){
						console.log("opcion-"+opcion);
						preguntajson.opciones = opcion;
						console.log("preguntajson-"+preguntajson);
						res.json(preguntajson);

					}else {next(new Error('no existe las opciones con el id '+ req.params.preguntaId))}
				}).catch(function(error){next(error);});
			}else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	//el usuario envia el id de una opcion (buscar la opcion que coincida)	
	corregir: function(req, res, next){
		var idRespuesta = req.body.answered;//id de la opcion que envia el usuario 
		var valortext;
		var valorfraction;
		//busco la opcion de una pregunta en concreto
		//busqueda de la opcion que el usuario envia
		Opcion.findOne({
			where: { id: Number(idRespuesta)}
		  }).populate('subopciones').then(function(opcionSeleccionada){
				/*opcionSeleccionada contendra la opcion, a la vez tendra las 2 subopciones (fraction-100)(text-valorcorrecto)
				que tiene la opcion, con el id que el usuario envia por POST`*/

				//for para recorrer el array y comprobar el resultado de la opcion


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
					
				});
				Alumno.findOne({user: req.session.passport.user})
				.then(function(alumnum){
					Respuesta.create({valor: valortext, puntuacion: valorfraction, alumno: alumnum.id, cuestionario:req.params.cuestionarioId , pregunta: req.params.preguntaId}).exec(function funcion(err, funcion){
					res.json(funcion);
					});
				})
				
				//res.json(mostrarRespuesta);
				//console.log("opcionSeleccionada"+opcionSeleccionada);

		}).catch(function(error){next(error);});
		//fin de la busqueda de la opcion  
		
	}

};

