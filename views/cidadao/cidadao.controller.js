(function () {
	'use strict';

	angular
		.module('app')
		.controller('CidadaoController', CidadaoController)
		.controller('CidadaoListagemController', CidadaoListagemController);

	CidadaoController.$inject = ['$scope', '$location', '$confirm', '$stateParams', '$window', 'CidadaoService'];

	function CidadaoController($scope, $location, $confirm, $stateParams, $window, CidadaoService) {
		$scope.setFocus = function() {
			var element = $window.document.getElementById("numeroCartaoNacionalSaude");
			element.focus();
		};

		$scope.popup2 = {
			opened: false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};

		var cidadaoID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (cidadaoID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando cidadão' : 'Novo cidadão';

		if(cidadaoID > 0){
			CidadaoService.GetById(cidadaoID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					CidadaoService.Delete(cidadaoID).then(function(data){
						$location.path('/cidadao');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/cidadao');
				});
			}else{
				$location.path('/cidadao');
			}
  		}

		$scope.update = function(){
			if(cidadaoID > 0){
				CidadaoService.Update($scope.form, cidadaoID).then(function(data){
					$location.path('/cidadao');
				})
			}else{
				CidadaoService.Create($scope.form).then(function(data){
					$location.path('/cidadao');
				});
			}
		}
	}

	CidadaoListagemController.$inject = ['$scope', '$location', 'CidadaoService'];

	function CidadaoListagemController($scope, $location, CidadaoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		CidadaoService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_cidadao';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
