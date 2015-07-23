var app = angular.module('app', [
    'ui.router',
    'kendo.directives'
    //state
    

]);

app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // 若未驗證成功會有stateChangeError, 判斷error名字，轉到登入會面
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.name === 'AuthenticationRequired') {
                    //User.setNextState(toState.name, 'You must login to access this page');
                    //alert("Login error, pls check user/pass");
                    $state.go('login', {}, { reload: true });
                }
            });

        }
]);


app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('validation', {
        url: '/',
        templateUrl: 'appPages/form/validation.html',
        controller: 'validationCtrl',
        resolve: {
            //bodyClass: ['$rootScope', function ($rootScope) {
            //    $rootScope.bodyClass = 'login-page';
            //    $rootScope.wrapperClass = 'login-box';
            //}]
        }
    })
    ;

}]);
