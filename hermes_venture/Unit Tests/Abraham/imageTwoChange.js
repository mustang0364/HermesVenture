var imageOne;
var imageTwo;
var imageThree;
var currentScene;

const expectedActionsTwo = {
    changeimageOne: () => {
    return (
        imageOne = false
    )
  },
    changeimageTwo: () => {
    return (
        imageTwo = false
    )
  },
    changeimageThree: () => {
    return (
        imageThree = true
    )
  },
    changeCurrentScene: () => {
    return (
        currentScene = 'Peru'
    )
  }
}

module.exports = expectedActionsTwo;