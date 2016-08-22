(function () {
	'use strict';

	angular
		.module('app')
		.controller('EstadoController', EstadoController)
		.controller('EstadoListagemController', EstadoListagemController);

	EstadoController.$inject = ['$scope', '$location', '$confirm', '$stateParams', 'EstadoService', 'PaisService'];

	function EstadoController($scope, $location, $confirm, $stateParams, EstadoService, PaisService) {
		var estadoID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (estadoID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando estado' : 'Novo estado';

		PaisService.GetAll().then(function(data){
			$scope.paises = data;
		});

		if(estadoID > 0){
			EstadoService.GetById(estadoID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					EstadoService.Delete(estadoID).then(function(data){
						$location.path('/estado');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/estado');
				});
			}else{
				$location.path('/estado');
			}
  		}

		$scope.update = function(){
			var pais = angular.fromJson($scope.form.pais);

			$scope.form.pais = pais;

			if(estadoID > 0){
				EstadoService.Update($scope.form, estadoID).then(function(data){
					$location.path('/estado');
				})
			}else{			
				EstadoService.Create($scope.form).then(function(data){
					$location.path('/estado');
				});
			}
		}
	}

	EstadoListagemController.$inject = ['$scope', '$location', 'EstadoService'];

	function EstadoListagemController($scope, $location, EstadoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		EstadoService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_estado';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
