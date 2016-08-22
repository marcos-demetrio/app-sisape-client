(function () {
	'use strict';

	angular
		.module('app')
		.controller('PaisController', PaisController)
		.controller('PaisListagemController', PaisListagemController);

	PaisController.$inject = ['$scope', '$location', '$confirm', '$stateParams', 'PaisService'];

	function PaisController($scope, $location, $confirm, $stateParams, PaisService) {
		var paisID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (paisID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando país' : 'Novo país';

		if(paisID > 0){
			PaisService.GetById(paisID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					PaisService.Delete(paisID).then(function(data){
						$location.path('/pais');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/pais');
				});
			}else{
				$location.path('/pais');
			}
  		}

		$scope.update = function(){
			if(paisID > 0){
				PaisService.Update($scope.form, paisID).then(function(data){
					$location.path('/pais');
				})
			}else{
				PaisService.Create($scope.form).then(function(data){
					$location.path('/pais');
				});
			}
		}
	}

	PaisListagemController.$inject = ['$scope', '$location', 'PaisService'];

	function PaisListagemController($scope, $location, PaisService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		PaisService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_pais';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
