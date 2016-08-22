(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function config($locationProvider, $stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/404');

		$stateProvider
			.state('login', {
				url: "/login",
				views: {
					"viewMain": {
						controller: 'LoginController',
						templateUrl: 'views/login/login.view.html'
					}
				}
			})
			.state('naoEncontrado', {
				url: "/404",
				views: {
					"viewMain": {
						template: '<h3>404</h3>'
					}
				}
			})
			.state('pacienteNovo', {
				url: "/pacientes/novo",
				views: {
					"viewMain": {
						controller: 'PacienteController',
						templateUrl: 'views/paciente/paciente.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('pacienteEditar', {
				url: "/pacientes/:id/editar",
				views: {
					"viewMain": {
						controller: 'PacienteController',
						templateUrl: 'views/paciente/paciente.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('pacienteListagem', {
				url: "/pacientes",
				views: {
					"viewMain": {
						controller: 'PacienteListagemController',
						templateUrl: 'views/paciente/paciente.lista.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('paisNovo', {
				url: "/pais/novo",
				views: {
					"viewMain": {
						controller: 'PaisController',
						templateUrl: 'views/pais/pais.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('paisEditar', {
				url: "/pais/:id/editar",
				views: {
					"viewMain": {
						controller: 'PaisController',
						templateUrl: 'views/pais/pais.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('paisListagem', {
				url: "/pais",
				views: {
					"viewMain": {
						controller: 'PaisListagemController',
						templateUrl: 'views/pais/pais.lista.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})

			.state('estadoNovo', {
				url: "/estado/novo",
				views: {
					"viewMain": {
						controller: 'EstadoController',
						templateUrl: 'views/estado/estado.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('estadoEditar', {
				url: "/estado/:id/editar",
				views: {
					"viewMain": {
						controller: 'EstadoController',
						templateUrl: 'views/estado/estado.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('estadoListagem', {
				url: "/estado",
				views: {
					"viewMain": {
						controller: 'EstadoListagemController',
						templateUrl: 'views/estado/estado.lista.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})

			.state('municipioNovo', {
				url: "/municipio/novo",
				views: {
					"viewMain": {
						controller: 'MunicipioController',
						templateUrl: 'views/municipio/municipio.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('municipioEditar', {
				url: "/municipio/:id/editar",
				views: {
					"viewMain": {
						controller: 'MunicipioController',
						templateUrl: 'views/municipio/municipio.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('municipioListagem', {
				url: "/municipio",
				views: {
					"viewMain": {
						controller: 'MunicipioListagemController',
						templateUrl: 'views/municipio/municipio.lista.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
	}
})();