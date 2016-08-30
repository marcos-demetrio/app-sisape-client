(function () {
	'use strict';

	angular
		.module('app')
		.controller('InicioController', InicioController);

	InicioController.$inject = ['$scope', '$location', '$confirm', '$stateParams'];

	function InicioController($scope, $location, $confirm, $stateParams) {
		
	}
})();
