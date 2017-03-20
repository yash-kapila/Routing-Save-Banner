(function () {

    'use strict';
    
    angular.module('app').component('tabs', {
        templateUrl: './parent/tabs/tabs.html',
        controller: 'tabsCtrl',
        bindings: {
            tabs: '<',
            saveOrDecision: '&',
            navigateTo: '&'
        }
    });

    angular.module('app').controller('tabsCtrl', Ctrl);

    Ctrl.$inject = ['$state', 'navigationService'];

    function Ctrl($state, navigationService) {
        var vm = this;

        vm.$onInit = function () { 
            navigationService.stillPerformNavigation = vm.onClick.bind(vm);
            navigationService.navigationStopped = vm.navigationStopped.bind(vm);
        };

        vm.hideSaveDecisionButton = function () {
            if ($state.current.name === 'parent.childC.grandChild')
                return true;
            else
                return false;
        };
        
        vm.onClick = function (tab) {
            navigationService.requestedTab = tab;
            vm.navigateTo({ state: tab.state });
        };

        vm.navigationStopped = function (tab) {
            tab.active = true;
        };

    };
})();