import {Ship} from '../game_classes/ship';

const ship1 = new Ship(2,"any",".");

test('get the length of ship', () => {
    expect(ship1.getLength()).toBe(2);
});

test('get the hits of ship after hit', () => {
    const ship2 = new Ship(4,"any2",".1");
    expect(ship2.getHits()).toBe(0);
    ship2.hit();
    expect(ship2.getHits()).toBe(1);
});

test('ship is not sunk test', () => {
    expect(ship1.isSunk()).toBe(false);
});

test('sink a ship test', () => {
    const ship3 = new Ship(5,"any3",".2");
    ship3.hit();
    ship3.hit();
    ship3.hit();
    ship3.hit();
    ship3.hit();
    expect(ship3.isSunk()).toBe(true);
});