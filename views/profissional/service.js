(function () {
	'use strict';

	angular
		.module('app')
		.factory('ProfissionalService', ProfissionalService);

	ProfissionalService.$inject = ['$http', 'API'];
	function ProfissionalService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'profissional').then(handleSuccess, handleError('Erro obtendo lista de Profissional'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'profissional/' + id).then(handleSuccess, handleError('Erro obtendo Profissional pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'profissional/' + id).then(handleSuccess, handleError('Erro ao excluir Profissional pelo ID: ' + id));
		}

		service.Create = function Create(profissional) {
			return $http.post(API + 'profissional/', profissional).then(handleSuccess, handleError('Erro ao criar Profissional'));
		}

		service.Update = function Update(profissional, id) {
			return $http.put(API + 'profissional/' + id, profissional).then(handleSuccess, handleError('Erro ao atualizar Profissional'));
		}

		service.PesquisarPorNome = function PesquisarPorNome(params) {
			return $http.get(API + 'profissional/', params).then(handleSuccess, handleError('Erro ao pesquisar por nome do Profissional'));
		}

		return service;
		
		function handleSuccess(res) {
			return res.data;
		}

		function handleError(error) {
			return function () {
				return { success: false, message: error };
			};
		}
	}

})();
