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

			.state('inicio', {
				url: "/inicio",
				views: {
					"viewMain": {
						controller: 'InicioController',
						templateUrl: 'views/inicio/inicio.view.html'
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
			.state('cidadaoNovo', {
				url: "/cidadao/novo",
				views: {
					"viewMain": {
						controller: 'CidadaoController',
						templateUrl: 'views/cidadao/cidadao.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cidadaoEditar', {
				url: "/cidadao/:id/editar",
				views: {
					"viewMain": {
						controller: 'CidadaoController',
						templateUrl: 'views/cidadao/cidadao.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cidadaoListagem', {
				url: "/cidadao",
				views: {
					"viewMain": {
						controller: 'CidadaoListagemController',
						templateUrl: 'views/cidadao/cidadao.lista.html'
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

			.state('cboNovo', {
				url: "/cbo/novo",
				views: {
					"viewMain": {
						controller: 'CboController',
						templateUrl: 'views/cbo/cbo.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cboEditar', {
				url: "/cbo/:id/editar",
				views: {
					"viewMain": {
						controller: 'CboController',
						templateUrl: 'views/cbo/cbo.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cboListagem', {
				url: "/cbo",
				views: {
					"viewMain": {
						controller: 'CboListagemController',
						templateUrl: 'views/cbo/cbo.lista.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cidNovo', {
				url: "/cid/novo",
				views: {
					"viewMain": {
						controller: 'CidController',
						templateUrl: 'views/cid/cid.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cidEditar', {
				url: "/cid/:id/editar",
				views: {
					"viewMain": {
						controller: 'CidController',
						templateUrl: 'views/cid/cid.view.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
			.state('cidListagem', {
				url: "/cid",
				views: {
					"viewMain": {
						controller: 'CidListagemController',
						templateUrl: 'views/cid/cid.lista.html'
					},
					"viewMenu": {
						templateUrl: 'views/menu/menu.view.html'
					}
				}
			})
	}
})();