angular.module('alurapic', ["minhasDiretivas", "ngAnimate", "ngRoute","ngResource","meusServicos"])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/fotos', {
            controller: "FotosController",
            templateUrl: "/partials/principal.html"
        }).when("/fotos/nova", {
            controller: "FotoController",
            templateUrl: "/partials/foto.html"
        }).when("/fotos/editar/:fotoId",{
            controller: "FotoController",
            templateUrl: "/partials/foto.html"            
        }).otherwise({
            redirectTo: "/fotos"
        });
    });