var imageOne;
var imageTwo;
var imageThree;
var currentScene;

const expectedActions = {
    changeimageOne: () => {
    return (
        imageOne = true
    )
  },
    changeimageTwo: () => {
    return (
        imageTwo = false
    )
  },
    changeimageThree: () => {
    return (
        imageThree = false
    )
  },
    changeCurrentScene: () => {
    return (
        currentScene = 'Tibet'
    )
  }
}

module.exports = expectedActions;