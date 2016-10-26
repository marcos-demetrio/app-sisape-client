(function () {
	'use strict';

	angular
		.module('app')
		.controller('AtendimentoController', AtendimentoController)
		.controller('AtendimentoListagemController', AtendimentoListagemController);

	AtendimentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AtendimentoService'];

	function AtendimentoController($scope, $location, $route, $routeParams, AtendimentoService) {
		
	}

	AtendimentoListagemController.$inject = ['$scope','$location', '$window', 'AtendimentoService'];

	function AtendimentoListagemController($scope, $location, $window, AtendimentoService) {

	}
})();
