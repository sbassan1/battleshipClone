import { Ship } from './ship';
import { Gameboard } from './gameboard';

class Player {

    constructor() {
        this.playerBoard = new Gameboard();
    }

    populateRandomShips() {
        const ships = [
            new Ship(5, 'Carrier'),
            new Ship(4, 'Battleship'),
            new Ship(3, 'Destroyer'),
            new Ship(3, 'Submarine'),
            new Ship(2, 'PatrolBoat'),
        ];

        for (const ship of ships) {
            let placed = false;
            while (!placed) {
                const coordY = Math.floor(Math.random() * 10);
                const coordX = Math.floor(Math.random() * 10);
                const isHorizontal = Math.random() < 0.5;

                try {
                    placed = this.playerBoard.placeShip(ship, coordY, coordX, isHorizontal);
                } catch (e) {
                    // Si lanza un error (por estar fuera de bordes), intentamos de nuevo
                    placed = false;
                }
            }
        }
    }

    getBoard() { return this.playerBoard };

}

export {Player};