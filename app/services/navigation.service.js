(function () {

    'use strict';
    
    angular.module('app').service('navigationService', Service);

    Service.$inject = ['$rootScope'];

    function Service($rootScope) {
        this.requestedTab = null;

        this.stillPerformNavigation = function () { };
        
        this.navigationStopped = function () { };
        
        this.subscribeToStateChangeEvent = function (callback) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                callback(event, toState.name);
            });
        };
    };
})();