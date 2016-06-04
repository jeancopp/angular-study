angular.module("alurapic").controller("FotoController", function ($scope, $routeParams, recursoFoto, cadastroFotos) {
    $scope.foto = {};
    $scope.mensagem = {};

    var mensagemErro = erro => {
        $scope.mensagem.texto = "Não foi possível adicionar/atualizar a foto";
        $scope.mensagem.class = "alert alert-danger";
        console.log(erro);
    };

    if ($routeParams.fotoId) {
        recursoFoto.get({ fotoId: $routeParams.fotoId }, function (foto) {
            $scope.foto = foto;
        }, erro => mensagemErro(erro));
    }
    $scope.submeter = function () {
        cadastroFotos.cadastrar($scope.foto)
            .then( function(ret) {
                $scope.mensagem.texto = ret.mensagem;
                $scope.mensagem.class = "alert alert-success";
            }).catch( ret => mensagemErro(ret.mensagem) );
    };
});

