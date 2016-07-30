(function () {
	'use strict';

	angular
		.module('app')
		.controller('PacienteController', PacienteController)
		.controller('PacienteListagemController', PacienteListagemController);

	PacienteController.$inject = ['$scope', '$location', '$confirm', '$stateParams', 'PacienteService'];

	function PacienteController($scope, $location, $confirm, $stateParams, PacienteService) {
		var pacienteID = ($stateParams.id) ? parseInt($stateParams.id) : 0;

		$scope.editandoCadastro = (pacienteID > 0);
		$scope.title = ($scope.editandoCadastro) ? 'Editando paciente' : 'Novo paciente';

		if(pacienteID > 0){
			PacienteService.GetById(pacienteID).then(function(data){
				$scope.form = data;
			});
		}

		$scope.excluir = function() {
			$confirm({text: 'Os dados serão perdidos. Deseja continuar?', title: 'Excluir', ok: 'Sim', cancel: 'Não'})
				.then(function() {
					PacienteService.Delete(pacienteID).then(function(data){
						$location.path('/pacientes');
					});
			});
  		}

		$scope.cancelar = function(dirty) {
			if(dirty){
				$confirm({text: 'As alterações serão perdidas. Deseja continuar?', title: 'Cancelar', ok: 'Sim', cancel: 'Não'})
					.then(function() {
						$location.path('/pacientes');
				});
			}else{
				$location.path('/pacientes');
			}
  		}

		$scope.update = function(){
			if(pacienteID > 0){
				PacienteService.Update($scope.form, pacienteID).then(function(data){
					$location.path('/pacientes');
				})
			}else{
				PacienteService.Create($scope.form).then(function(data){
					$location.path('/pacientes');
				});
			}
		}
	}

	PacienteListagemController.$inject = ['$scope', '$location', 'PacienteService'];

	function PacienteListagemController($scope, $location, PacienteService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		PacienteService.GetAll().then(function(data){
			$scope.itens = data;

			$scope.listaVazia = $scope.itens.length === 0;
		});


		$scope.propertyName = 'i_paciente';
		$scope.reverse = false;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};
	}

})();
