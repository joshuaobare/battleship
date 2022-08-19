/* eslint-disable no-undef */
const Ship = require('./ship')

test('sink ship with 3 hits', ()=> {
    const ship = new Ship("3")
    ship.hit(0)
    ship.hit(1)
    ship.hit(2)
    expect(ship.isSunk()).toBeTruthy()

})

test("ship unsunk without enough hits", ()=> {
    const ship = new Ship("4")
    ship.hit(0)
    expect(ship.isSunk()).toBeFalsy()
})