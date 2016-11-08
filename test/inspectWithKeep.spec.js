import { assert } from 'chai';
import { default as Reflux } from '../src';

describe('with the keep reset', function() {
    beforeEach(function () {
        Reflux.__keep.reset();
    });

    describe('when an action is created', function() {
        var action;

        beforeEach(function () {
            action = Reflux.createAction();
        });

        it('should be in the keep', function() {
            assert.equal(Reflux.__keep.createdActions[0], action);
        });
    });

    describe('when an action is created and requested not to be kept', function() {
        beforeEach(function () {
            Reflux.createAction({ dontKeep: true });
        });

        it('should not be in the keep', function() {
            assert.equal(Reflux.__keep.createdActions.length, 0);
        });
    });

    describe('when a store is created', function() {
        var store;

        beforeEach(function () {
            store = Reflux.createStore({ init: function() { /* no-op */} });
        });

        it('should be in the keep', function() {
            assert.equal(Reflux.__keep.createdStores[0], store);
        });
    });

    describe('when a store is created and requested not to be kept', function() {
        beforeEach(function () {
            Reflux.createStore({ init: function() { /* no-op */}, dontKeep: true });
        });

        it('should not be in the keep', function() {
            assert.equal(Reflux.__keep.createdStores.length, 0);
        });
    });
});
