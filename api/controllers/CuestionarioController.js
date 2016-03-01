/**
 * CuestionarioController
 *
 * @description :: Server-side logic for managing cuestionarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Cuestionario.findOne({
			where: { id: Number(req.params.cuestionarioId)}
		}).populate('preguntas').then(function(cuestionario){
			if(cuestionario) {
				req.cuestionario = cuestionario;
				next();
			} else { next(new Error('No existe el cuestionario con el id' + req.params.cuestionarioId));}
		}).catch(function(error){next(error);});
	},
	findOne: function(req, res, next){
	Alumno.findOne({
		where : {user: req.session.passport.user}
	}).then(function(alumno){
	if (alumno){


	Cuestionario.findOne({
		where: { alumnos: alumno )}
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


	duplicar: function(req, res, next) {
/* Con metodo de clase 
		Cuestionario.duplicar
			(req.cuestionario,	function (err, cuestionarioDuplicado)
				{ res.json(cuestionarioDuplicado)}
			);
*/
/* Con metodo de instancia */

		req.cuestionario.duplicar
			(function (err, cuestionarioDuplicado)
				{ res.json(cuestionarioDuplicado)}
			);
	},

	asociarGrupo: function(req, res, next) {
		console.log(req.cuestionario.id + ' - ' + req.cuestionario.alumnos)
		req.cuestionario.asociarGrupo(req.grupo);
		res.json(req.cuestionario);
	}

};

