(function () {
	'use strict';

	angular
		.module('app')
		.factory('PacienteService', PacienteService);

	PacienteService.$inject = ['$http', 'API'];
	function PacienteService($http, API) {
		var service = {};

		/*service.GetById = GetById;
		service.GetByUsername = GetByUsername;
		service.Create = Create;
		service.Update = Update;
		service.Delete = Delete;*/
		

		service.GetAll = function GetAll() {
			return $http.get(API + 'pacientes').then(handleSuccess, handleError('Erro obtendo lista de pacientes'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'pacientes/' + id).then(handleSuccess, handleError('Erro obtendo paciente pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'pacientes/' + id).then(handleSuccess, handleError('Erro ao excluir paciente pelo ID: ' + id));
		}

		service.Create = function Create(paciente) {
			return $http.post(API + 'pacientes/', paciente).then(handleSuccess, handleError('Erro ao criar paciente'));
		}

		service.Update = function Update(paciente, id) {
			return $http.put(API + 'pacientes/' + id, paciente).then(handleSuccess, handleError('Erro ao atualizar paciente'));
		}

		return service;
		

		/*function GetByUsername(username) {
			return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
		}



		function Update(user) {
			return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
		}

		function Delete(id) {
			return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
		}*/

		// private functions

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
