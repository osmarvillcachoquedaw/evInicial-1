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
    },

    aJSON: function (cb){
	var preguntaJSON = [];
	var cuestionarioJSON = this.toJSON();

	this.preguntas.fotEach(function(pregunta){
		preguntasJSON.push(pregunta.aJSON());
	});

	Promise.all(preguntaJSON).then(function(opciones){
		opciones.forEach(function(opcionesPregunta, index){
			cuestionarioJSON.preguntas[index].opciones = opcionesPregunta;
		});
		cb(cuestionarioJSON);
	});
	},

    /*Adaptando tipo preguntas y dependiendo el tipo de pregunta que sea, se asigna una funcion*/
    tipoPregunta:function(respuesta, user, cuestionario, pregunta, cb){
	Alumno.findOne({
		where : {user: user}
	}).then(function(alumnum){
	if (alumnum){
        switch (pregunta.tipo) {
          case "Ensayo":
                console.log("Pregunta tipo: "+pregunta.tipo);
                break;
          case "Numerica": 
                console.log("Pregunta tipo: "+pregunta.tipo);
                this.corregirNumerica(respuesta, function (valorfraction,valortext){
                         Respuesta.create({valor: valortext, puntuacion: valorfraction, alumno: alumnum.id, cuestionario:cuestionario , pregunta: pregunta.id})
                         .exec(function (err, funcion){
                         cb(funcion);
                         });
                    })
                break;
          case "Emparejamiento":
                console.log("Pregunta tipo: "+pregunta.tipo);
                statements // they are executed if variable ==  any of the above c's
                break;
          case "Verdadero/Falso":  
                console.log("Pregunta tipo: "+pregunta.tipo);      
                this.corregirTruefalse(respuesta, function (valorfraction,valortext){
                         Respuesta.create({valor: valortext, puntuacion: valorfraction, alumno: alumnum.id, cuestionario:cuestionario , pregunta: pregunta.id})
                         .exec(function (err, funcion){
                         cb(funcion);
                         });
                    })
                break;
          case "Eleccion multiple": 
                this.corregirEleccionMultiple(respuesta, function (err, valorfraction, valortext){
                        if(!err){
                            Respuesta.create({valor: valortext, puntuacion: valorfraction, alumno: alumno.id, cuestionario: cuestionario, pregunta: pregunta.id})
                            .exec(function createCB(err, created){
                                //sails.log.verbose(created);
                                cb(err,created);
                            })
                        }else{
                            //cb(err, null);
                        }
                    });
                break;    
        }
	}else{
		sails.log.verbose("No estas autenticado como usuario Alumno");
	}
	}.bind(this))

    },
    /*funciones que se utilizaran en el SWITCH para cada tipo de pregunta*/
    //para -.>ENSAYO

	//para -.>NUMERICA
	corregirNumerica: function(respuesta, cb){
		//respuesta es el id de la opcion que envia el usuario 
		var valortext;
		var valorfraction;	
        SubOpcion.findOne({
            where: {opcion: Number(respuesta), nombre: "fraction"}
        }).then(function(subopcion){
            valorfraction = subopcion.valor;
            SubOpcion.findOne({
                where: {opcion: Number(respuesta), nombre: "text"}
            }).then(function(subopcion){
                valortext = subopcion.valor;
                cb(valorfraction, valortext);
            })  
        })
	},
    //para -.>EMPAREJAMIENTO
    
    //para -.>VERDADERO/FALSO
    corregirTruefalse: function(respuesta, cb){
        var valortext;
		var valorfraction;	

        Opcion.findOne({
            where: { pregunta: this.id, id: Number(respuesta)}
            }).populate('subopciones').then(function(misOpciones){

            misOpciones.subopciones.forEach(function(subopcion){             
                if(subopcion.nombre === 'fraction'){
                    valorfraction = subopcion.valor;
                }
                if(subopcion.nombre === 'text'){
                    valortext = subopcion.valor;
                }
            });
			cb(valorfraction, valortext);
        });
	},	
    
    //para -->ELECCION MULTIPLE
    corregirEleccionMultiple: function(respuesta, cb){
    		var valortext;
			var valorfraction;
            this.comprobarOpcion(respuesta, function(opcion){
                if(opcion) {
                    Subopcion.findOne({
                        where: {opcion: Number(opcion.id), nombre: "fraction"}
                    }).then(function(subopcion){
                        valorfraction = subopcion.valor;
                        Subopcion.findOne({
                            where: {opcion: Number(opcion.id), nombre: "text"}
                        }).then(function(subopcion){
                            valortext = subopcion.valor;
                            cb(null,valorfraction, valortext);
                        })
                    })
                }
                else {
                    cb(new Error('No coincide la opcion con la pregunta'), null,null);
                }
            });
    },
    comprobarOpcion: function(respuesta, cb) {
            Opcion.findOne({
                where: { id: respuesta, pregunta: Number(this.id) }
            }).then(function(opcion){
                sails.log.verbose(opcion);
                cb(opcion);
            })
            ;
        }

  }
};

