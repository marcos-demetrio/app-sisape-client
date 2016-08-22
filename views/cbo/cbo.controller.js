(function () {
	'use strict';

	angular
		.module('app')
		.controller('CboController', CboController)
		.controller('CboListagemController', CboListagemController);

	CboController.$inject = ['$scope', '$location', '$confirm', '$stateParams', 'CboService'];

	function CboController($scope, $location, $confirm, $stateParams, CboService) {
		var cboID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (cboID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando CBO' : 'Novo CBO';

		if(cboID > 0){
			CboService.GetById(cboID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					CboService.Delete(cboID).then(function(data){
						$location.path('/cbo');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/cbo');
				});
			}else{
				$location.path('/cbo');
			}
  		}

		$scope.update = function(){
			if(cboID > 0){
				CboService.Update($scope.form, cboID).then(function(data){
					$location.path('/cbo');
				})
			}else{
				CboService.Create($scope.form).then(function(data){
					$location.path('/cbo');
				});
			}
		}
	}

	CboListagemController.$inject = ['$scope', '$location', 'CboService'];

	function CboListagemController($scope, $location, CboService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		CboService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_cbo';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
