(function () {
	'use strict';

	angular
		.module('app', ['ngCookies', 'ngRoute', 'brasil.filters', 'ui.bootstrap', 'ui.mask', 'ngCpfCnpj'])
		.run(run)
		.value('API', 'http://localhost:8080/');//Desenvolviemnto
		//.value('API', 'http://localhost:8080/app-sisape-ws/');//Produção

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function run($rootScope, $location, $cookieStore, $http) {
		$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
		$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
		$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT';
		$http.defaults.headers.common['Access-Control-Allow-Credential'] = 'true';

		$rootScope.$on('$locationChangeStart', function (event, next, current) {

		});

		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = current.$$route.title;
		});
	}
})();
