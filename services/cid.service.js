(function () {
	'use strict';

	angular
		.module('app')
		.factory('CidService', CidService);

	CidService.$inject = ['$http', 'API'];
	function CidService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'classificacaointernacionaldoenca').then(handleSuccess, handleError('Erro obtendo lista de CID'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'classificacaointernacionaldoenca/' + id).then(handleSuccess, handleError('Erro obtendo CID pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'classificacaointernacionaldoenca/' + id).then(handleSuccess, handleError('Erro ao excluir CID pelo ID: ' + id));
		}

		service.Create = function Create(cid) {
			return $http.post(API + 'classificacaointernacionaldoenca/', cid).then(handleSuccess, handleError('Erro ao criar CID'));
		}

		service.Update = function Update(cid, id) {
			return $http.put(API + 'classificacaointernacionaldoenca/' + id, cid).then(handleSuccess, handleError('Erro ao atualizar CID'));
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
