(function () {

    'use strict';

    angular.module('app').component('childB', {
        templateUrl: './childB/childB.html',
        controller: 'childBCtrl'
    });

    angular.module('app').controller('childBCtrl', Ctrl);

    Ctrl.$inject = ['isFormDirty', 'saveService', 'navigationService'];

    function Ctrl(isFormDirty, saveService, navigationService) {
        var vm = this;

        vm.$onInit = function () {
            isFormDirty.value = null;
            vm.showNavigationBanner = false;
            vm.showSaveDecisionBanner = false;
            saveService.subscribeSaveCallback(vm.saveChildB);
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
        
        vm.saveChildB = function () {
            if (!isFormDirty.value) {
                vm.showNavigationBanner = false;
                console.log("There is nothing to save. Can't proceed any further");
            }
            else {
                console.log("Saving Child B and then calling decision engine");
                saveService.executeDecisionCallback();
                vm.showSaveDecisionBanner = false;
                isFormDirty.value = false;
                vm.inputB = '';
            }
        };

        vm.$onDestroy = function () {
            isFormDirty.value = null;
            saveService.unsubscribeSaveCallback();
        };
    };
})();