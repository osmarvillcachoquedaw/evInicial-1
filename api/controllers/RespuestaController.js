/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Respuesta.findOne({
			where: { id: Number(req.params.respuestaId)}
		}).then(function(respuesta){
			if(respuesta) {
				req.respuesta = respuesta;
				next();
			} else { next(new Error('No existe la respuesta con el id' + req.params.respuestad));}
		}).catch(function(error){next(error);});
	},
	//paso 1 -->carga cuestionario
	//paso 2 -->carga pregunta
	//paso 3 -->respuesta.Controller envia (idOpcion,idUsuario,idCuest, idPreg) a pregunta.comprobarRespuesta
	corregirRespuesta: function(req, res, next){
		sails.log.verbose("1 "+req.body.answered);
		sails.log.verbose("2 "+req.session.passport.user);
		sails.log.verbose("3 "+req.cuestionario.id);
		sails.log.verbose("4 "+req.pregunta.id);
		var tipoPregunta=req.pregunta;
		//sails.log.verbose("5 "+pregun.tipo);
		req.pregunta.tipoPregunta(req.body.answered, req.session.passport.user, req.cuestionario.id,  tipoPregunta, function ahi(funcion){res.json(funcion);});
	}


};

