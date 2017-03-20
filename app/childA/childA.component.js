(function () {

    'use strict';
    
    angular.module('app').component('childA', {
        templateUrl: './childA/childA.html',
        controller: 'childACtrl'
    });

    angular.module('app').controller('childACtrl', Ctrl);

    Ctrl.$inject = ['isFormDirty', 'saveService', 'navigationService', '$state'];

    function Ctrl(isFormDirty, saveService, navigationService, $state) {
        var vm = this;

        vm.$onInit = function () {
            isFormDirty.value = null;
            vm.showNavigationBanner = false;
            vm.showSaveDecisionBanner = false;
            saveService.subscribeSaveCallback(vm.saveChildA);
            navigationService.subscribeToStateChangeEvent(vm.checkFormStatus);
        };

        vm.makeFormDirty = function () {
            isFormDirty.value = true;
            vm.showSaveDecisionBanner = true;
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

        vm.saveChildA = function () {
            if (!isFormDirty.value) {
                vm.showNavigationBanner = false;
                console.log("There is nothing to save. Can't proceed any further");
            }
            else {
                console.log("Saving Child A and then calling decision engine");
                saveService.executeDecisionCallback();
                vm.showSaveDecisionBanner = false;
                isFormDirty.value = false;
                vm.inputA = '';
            }
        };

        vm.$onDestroy = function () {
            isFormDirty.value = null;
            saveService.unsubscribeSaveCallback();
        };
    };
})();