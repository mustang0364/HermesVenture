const cart = [
    {id: 6, title: 'Shoes'},
    {id: 7, title: 'Jacket'},
    {id: 8, title: 'Gear'},
]

function remove(id) {
    let updateCart = cart.filter((item) => {
        return item.id !== id
    })
    return updateCart
  }
  module.exports = remove;