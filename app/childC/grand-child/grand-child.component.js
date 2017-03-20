(function () {

    'use strict';
    
    angular.module('app').component('grandChild', {
        templateUrl: './childC/grand-child/grand-child.html',
        controller: 'grandChildCtrl'
    });

    angular.module('app').controller('grandChildCtrl', Ctrl);

    Ctrl.$inject = ['isFormDirty', 'navigationService'];    

    function Ctrl(isFormDirty, navigationService) {
        var vm = this;
        
        vm.$onInit = function () {
            isFormDirty.value = null;
            vm.showNavigationBanner = false;
            navigationService.subscribeToStateChangeEvent(vm.checkFormStatus);
        };

        vm.makeFormDirty = function () {
            isFormDirty.value = true;
        };

        vm.checkFormStatus = function (event, destinationState) {
            if (isFormDirty.value) {
                vm.showNavigationBanner = true;
                vm.showSaveDecisionBanner = false;
                navigationService.navigationStopped(navigationService.requestedTab);
                event.preventDefault();
            }
            else {
                vm.showNavigationBanner = false;
                vm.showSaveDecisionBanner = false;
            }
        };

        vm.navigateFromBanner = function (value) {
            if (value) {
                isFormDirty.value = false;
                navigationService.stillPerformNavigation(navigationService.requestedTab);
            }
            else {
                vm.showNavigationBanner = false;
                vm.showSaveDecisionBanner = true;
            }
        };

        vm.$onDestroy = function () { 
            isFormDirty.value = null;
        };
    };
})();