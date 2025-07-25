import { Ship } from "./ship.js";

const Carrier = new Ship(5, "Carrier", "../assets/carrierBoat.png");
const Battleship = new Ship(4, "Battleship", "../assets/battleShipBoat.png");
const Destroyer = new Ship(3, "Destroyer", "../assets/destroyerBoat.png");
const Submarine = new Ship(3, "Submarine", "../assets/submarineBoat.png");
const PatrolBoat = new Ship(2, "PatrolBoat", "../assets/patrolBoat.png");

const gameShips = [Carrier, Battleship, Destroyer, Submarine, PatrolBoat];

export { Carrier, Battleship, Destroyer, Submarine, PatrolBoat, gameShips };
