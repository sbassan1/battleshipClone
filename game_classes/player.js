import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";

class Player {
  constructor() {
    this.playerBoard = new Gameboard();
  }

  populateRandomShips() {
    const ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "PatrolBoat"),
    ];

    for (const ship of ships) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 1000;

      while (!placed && attempts < maxAttempts) {
        const coordY = Math.floor(Math.random() * 10);
        const coordX = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() < 0.5;

        try {
          if (
            this.playerBoard.isPlaceAvailable(
              ship,
              coordY,
              coordX,
              isHorizontal,
            )
          ) {
            placed = this.playerBoard.placeShip(
              ship,
              coordY,
              coordX,
              isHorizontal,
            );
          }
        } catch (e) {
          placed = false;
        }

        attempts++;
      }

      if (!placed) {
        console.error(
          `Could not place ship: ${ship.getName()} after ${maxAttempts} attempts`,
        );
      }
    }
  }

  getBoard() {
    return this.playerBoard;
  }
}

export { Player };
