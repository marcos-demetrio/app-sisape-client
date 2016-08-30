(function () {
	'use strict';

	angular
		.module('app')
		.controller('CidController', CidController)
		.controller('CidListagemController', CidListagemController);

	CidController.$inject = ['$scope', '$location', '$confirm', '$stateParams', 'CidService'];

	function CidController($scope, $location, $confirm, $stateParams, CidService) {
		var cidID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (cidID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando CID' : 'Novo CID';

		if(cidID > 0){
			CidService.GetById(cidID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					CidService.Delete(cidID).then(function(data){
						$location.path('/cid');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/cid');
				});
			}else{
				$location.path('/cid');
			}
  		}

		$scope.update = function(){
			if(cidID > 0){
				CidService.Update($scope.form, cidID).then(function(data){
					$location.path('/cid');
				})
			}else{
				CidService.Create($scope.form).then(function(data){
					$location.path('/cid');
				});
			}
		}
	}

	CidListagemController.$inject = ['$scope', '$location', 'CidService'];

	function CidListagemController($scope, $location, CidService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		CidService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_cid';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
