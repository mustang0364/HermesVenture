const expectedActions = require('./imageOneChange.js');

const expectedActionsTwo = require('./imageTwoChange.js');


test('Should update state to correct values for Tibet', () => {
    expect(expectedActions.changeimageOne()).toBe(true);
    expect(expectedActions.changeimageTwo()).toBe(false);
    expect(expectedActions.changeimageThree()).toBe(false);
    expect(expectedActions.changeCurrentScene()).toBe('Tibet');
})

test('Should update state to correct values for Peru', () => {
    expect(expectedActionsTwo.changeimageOne()).toBe(false);
    expect(expectedActionsTwo.changeimageTwo()).toBe(false);
    expect(expectedActionsTwo.changeimageThree()).toBe(true);
    expect(expectedActionsTwo.changeCurrentScene()).toBe('Peru');
})

