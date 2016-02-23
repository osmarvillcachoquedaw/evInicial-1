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
	respuesta: function(req, res, next){
		req.pregunta.tipoPregunta(req.body.answered, req.session.passport.user, req.cuestionario.id, req.pregunta.id, res);
	}


};

