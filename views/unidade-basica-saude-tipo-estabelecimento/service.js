(function () {
	'use strict';

	angular
		.module('app')
		.factory('TipoEstabelecimentoUbsService', TipoEstabelecimentoUbsService);

	TipoEstabelecimentoUbsService.$inject = ['$http', 'API'];
	function TipoEstabelecimentoUbsService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'tipoestabelecimentoubs').then(handleSuccess, handleError('Erro obtendo lista de tipos de estabelecimento da ubs'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'tipoestabelecimentoubs/' + id).then(handleSuccess, handleError('Erro obtendo tipo de estabelecimento da ubs pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'tipoestabelecimentoubs/' + id).then(handleSuccess, handleError('Erro ao excluir tipo de estabelecimento da ubs pelo ID: ' + id));
		}

		service.Create = function Create(tipoestabelecimentoubs) {
			return $http.post(API + 'tipoestabelecimentoubs/', tipoestabelecimentoubs).then(handleSuccess, handleError('Erro ao criar tipo de estabelecimento da ubs'));
		}

		service.Update = function Update(tipoestabelecimentoubs, id) {
			return $http.put(API + 'tipoestabelecimentoubs/' + id, tipoestabelecimentoubs).then(handleSuccess, handleError('Erro ao atualizar tipo de estabelecimento da ubs'));
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
