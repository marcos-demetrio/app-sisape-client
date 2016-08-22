(function () {
	'use strict';

	angular
		.module('app')
		.controller('MunicipioController', MunicipioController)
		.controller('MunicipioListagemController', MunicipioListagemController);

	MunicipioController.$inject = ['$scope', '$location', '$confirm', '$stateParams', 'MunicipioService', 'EstadoService'];

	function MunicipioController($scope, $location, $confirm, $stateParams, MunicipioService, EstadoService) {
		var municipioID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (municipioID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando município' : 'Novo município';

		EstadoService.GetAll().then(function(data){
			$scope.estados = data;
		});

		if(municipioID > 0){
			MunicipioService.GetById(municipioID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					MunicipioService.Delete(municipioID).then(function(data){
						$location.path('/municipio');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/municipio');
				});
			}else{
				$location.path('/municipio');
			}
  		}

		$scope.update = function(){
			var estado = angular.fromJson($scope.form.estado);

			$scope.form.estado = estado;

			if(municipioID > 0){
				MunicipioService.Update($scope.form, municipioID).then(function(data){
					$location.path('/municipio');
				})
			}else{			
				MunicipioService.Create($scope.form).then(function(data){
					$location.path('/municipio');
				});
			}
		}
	}

	MunicipioListagemController.$inject = ['$scope', '$location', 'MunicipioService'];

	function MunicipioListagemController($scope, $location, MunicipioService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		MunicipioService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_municipio';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
