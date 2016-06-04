angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function ($resource) {

        return $resource('/v1/fotos/:fotoId', null, {
            'update': {
                method: 'PUT'
            }
        });
    })
    .factory('cadastroFotos', function (recursoFoto, $q) {
        var funcaoErro = function (reject,foto,erro) {
            console.log(erro);
            reject({
                mensagem: 'Não foi possível atualizar a foto '
            });
        };
        var retorno = (foto,isInclusao) => {
            return {
                mensagem: 'Foto ' + foto.titulo + ' atualizada/incluída com sucesso',
                inclusao: isInclusao
            }
        };
        return {
            cadastrar: (foto) => $q(function (resolve, reject) {
                    if (foto._id) {
                        recursoFoto.update(
                            { fotoId: foto._id }, 
                            foto, 
                            (() => resolve(retorno(foto,true))), 
                            ((erro)=> funcaoErro(reject,foto,erro))
                         );
                    } else {
                        recursoFoto.save(
                            foto,
                            (() => resolve(retorno(foto,false))), 
                            ((erro)=> funcaoErro(reject,foto,erro))
                         );
                    }
                })
            
        };
    });

