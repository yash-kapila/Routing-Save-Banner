(function () {

    'use strict';
    
    angular.module('app').service('saveService', Service);

    Service.$inject = [];

    function Service() {
        this.saveCallback = null;
        this.decisionCallback = null;

        this.subscribeSaveCallback = function (callback) {
            this.saveCallback = callback;
        };

        this.unsubscribeSaveCallback = function () {
            this.saveCallback = null;
        };

        this.subscribeDecisionCallback = function (callback) {
            this.decisionCallback = callback;
        };

        this.unsubscribeDecisionCallback = function () {
            this.decisionCallback = null;
        };

        this.executeSaveCallback = function () {
            if (this.saveCallback)
                this.saveCallback();
            else
                return;
        };

        this.executeDecisionCallback = function () {
            if (this.decisionCallback)
                this.decisionCallback();
            else
                return;
        };

        this.checkSaveOrDecision = function (state) {
            switch (state) {
                case 'parent.childA':
                    this.executeSaveCallback();
                    break;
                case 'parent.childB':
                    this.executeSaveCallback();
                    break;
                case 'parent.childC':
                    this.executeDecisionCallback();
                    break;
                default:
                    break;
            };
        };
    };
})();