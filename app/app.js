(function () {
    angular.module('app', ['ui.router']);

    angular.module('app').config(StateConfig);

    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function StateConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/parent');

        $stateProvider
            .state('parent', {
                url: '/parent',
                template: '<parent></parent>'
            })
            .state('parent.childA', {
                template: '<child-a></child-a>'
            })
            .state('parent.childB', {
                template: '<child-b></child-b>'
            })
            .state('parent.childC', {
                template: '<child-c></child-c>'
            })
            .state('parent.childC.grandChild', {
                template: '<grand-child></grand-child>'
            });
    };
})();