(function () {

    'use strict';

    angular.module('app').component('parent', {
        templateUrl: './parent/parent.html',
        controller: 'parentCtrl'
    });

    angular.module('app').controller('parentCtrl', Ctrl);

    Ctrl.$inject = ['$state', 'saveService', 'navTabs'];

    function Ctrl($state, saveService, navTabs) {
        var vm = this;

        vm.$onInit = function () {
            vm.tabs = navTabs;

            // navigate to child A by default
            $state.go('parent.childA');

            saveService.subscribeDecisionCallback(vm.decisionFromParent);
        };

        vm.saveOrDecision = function () {
            saveService.checkSaveOrDecision($state.current.name);
        };

        vm.navigateTo = function (state) {
            $state.go(state);
        };

        vm.decisionFromParent = function () {
            console.log("Calling decision from parent");
        };

        vm.$onDestroy = function () {
            saveService.unsubscribeDecisionCallback();
        };

    };
})();