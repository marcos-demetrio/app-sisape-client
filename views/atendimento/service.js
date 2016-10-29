﻿(function () {
	'use strict';

	angular
		.module('app')
		.factory('AtendimentoService', AtendimentoService);

	AtendimentoService.$inject = ['$http', 'API'];
	function AtendimentoService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'atendimento').then(handleSuccess, handleError('Erro obtendo lista de atendimento'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'atendimento/' + id).then(handleSuccess, handleError('Erro obtendo atendimento pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'atendimento/' + id).then(handleSuccess, handleError('Erro ao excluir atendimento pelo ID: ' + id));
		}

		service.DeleteSintoma = function DeleteSintoma(id) {
			return $http.delete(API + 'atendimento/sintoma/' + id).then(handleSuccess, handleError('Erro ao excluir sintoma do atendimento pelo ID: ' + id));
		}

		service.DeleteMedicamento = function DeleteMedicamento(id) {
			return $http.delete(API + 'atendimento/medicamento/' + id).then(handleSuccess, handleError('Erro ao excluir medicamento do atendimento pelo ID: ' + id));
		}

		service.DeleteExame = function DeleteExame(id) {
			return $http.delete(API + 'atendimento/exame/' + id).then(handleSuccess, handleError('Erro ao excluir exame do atendimento pelo ID: ' + id));
		}

		service.Create = function Create(atendimento) {
			return $http.post(API + 'atendimento/', atendimento).then(handleSuccess, handleError('Erro ao criar atendimento'));
		}

		service.Update = function Update(atendimento, id) {
			return $http.put(API + 'atendimento/' + id, atendimento).then(handleSuccess, handleError('Erro ao atualizar atendimento'));
		}

		service.AtendimentoRelatorioPesquisarPorUbs = function AtendimentoRelatorioPesquisarPorUbs(id) {
			return $http.get(API + 'atendimento/relatorio/ubs/' + id).then(handleSuccess, handleError('Erro ao atualizar atendimento'));
		}

		service.AtendimentoRelatorioPesquisarPorProfissional = function AtendimentoRelatorioPesquisarPorProfissional(id) {
			return $http.get(API + 'atendimento/relatorio/profissional/' + id).then(handleSuccess, handleError('Erro ao atualizar atendimento'));
		}

		service.AtendimentoRelatorioPesquisarPorCidadao = function AtendimentoRelatorioPesquisarPorCidadao(id) {
			return $http.get(API + 'atendimento/relatorio/cidadao/' + id).then(handleSuccess, handleError('Erro ao atualizar atendimento'));
		}

		service.AtendimentoRelatorioPesquisarPorDataAtendimento = function AtendimentoRelatorioPesquisarPorDataAtendimento(config) {
			return $http.get(API + 'atendimento/relatorio/periodo', config).then(handleSuccess, handleError('Erro ao atualizar atendimento'));
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
