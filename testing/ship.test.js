import {Gameboard} from '../game_classes/gameboard.js';
import {Carrier, Battleship, Destroyer, Submarine, PatrolBoat} from '../game_classes/defaultShips';

const emptyGameBoard = new Gameboard();

const horizontal = true;
const vertical = false;


const threeShipsBoard = new Gameboard();
threeShipsBoard.placeShip(Battleship, 0, 0, horizontal);   // length 4 → (0,0) to (0,3)
threeShipsBoard.placeShip(Submarine, 1, 0, vertical);      // length 3 → (0,1) to (2,1)
threeShipsBoard.placeShip(PatrolBoat, 8, 7, vertical);     // length 2 → (8,7) to (9,7)

test('Game lost test', () => {
    expect(emptyGameBoard.noMoreShipsStanding()).toBe(true);
});

test('Three Ships recieve attack test hit', () => {
    expect(threeShipsBoard.receiveAttack(0,3)).toBe(true);
    expect(Battleship.getHits()).toBe(1);
});

test('Three Ships recieve attack test miss', () => {
    expect(threeShipsBoard.receiveAttack(1,3)).toBe(false);
    expect(Submarine.getHits()).toBe(0);
});

test('Three Ships recieve attack test invalid', () => {
    expect(() => threeShipsBoard.receiveAttack(10, 3)).toThrow();
});