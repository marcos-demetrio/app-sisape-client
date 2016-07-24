(function () {
	'use strict';

	angular
		.module('app')
		.controller('PacienteController', PacienteController)
		.controller('PacienteListagemController', PacienteListagemController);

	PacienteController.$inject = ['$location'];

	function PacienteController($location) {

	}

	PacienteListagemController.$inject = ['$scope', '$location'];

	function PacienteListagemController($scope, $location) {

		$scope.itens = [
			{produto: 'Leite', quantidade: 2, comprado: false},
			{produto: 'Cerveja', quantidade: 12, comprado: false},
			{produto: 'Arroz', quantidade: 4, comprado: false}
		];
	}

})();
