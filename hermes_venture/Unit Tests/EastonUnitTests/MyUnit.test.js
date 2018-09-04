const expectedActions = require('./ChangeSceneOne.js');

test('Should update state to correct values', () => {
    expect(expectedActions.changeVideoOneShown()).toBe(true);
    expect(expectedActions.changeVideoTwoShown()).toBe(false);
    expect(expectedActions.changeVideoThreeShown()).toBe(false);
    expect(expectedActions.changeCurrentScene()).toBe('Tibet');
})

test('Should')