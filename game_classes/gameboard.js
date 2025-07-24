


class Gameboard {

    constructor() {
        this.board = Array.from({ length: 10 }, () => 
        Array.from({ length: 10 }, () => ({
            ship: null,    
            hit: false 
        }))
        ); 
        this.missed = 0;
        this.shipsStanding = 0;
        this.shipLocations = [];
    }


    placeShip(ship, coordY, coordX, isHorizontal) {
        
        const shiplength = ship.getLength();

        if (coordY < 0 || coordY > 9 || coordX < 0 || coordX > 9) {
            throw new Error("Invalid coordinates for ship placement");
        }

        if (isHorizontal) {
            if (coordX + shiplength > 10) {
                throw new Error("Ship goes out of bounds horizontally");
            }
        } else {
            if (coordY + shiplength > 10) {
                throw new Error("Ship goes out of bounds vertically");
            }
        }

        for (let i = 0; i < shiplength; i++) {
            const x = isHorizontal ? coordY : coordY + i;
            const y = isHorizontal ? coordX + i : coordX;

            console.log(`${x} , ${y}`);

           if (this.board[x][y].ship !== null) {
                return false;
            }
        }

        for (let i = 0; i < shiplength; i++) {
            const x = isHorizontal ? coordY : coordY + i;
            const y = isHorizontal ? coordX + i : coordX;

            this.board[x][y].ship = ship;
        }

        this.shipsStanding = (this.shipsStanding || 0) + 1;
        this.shipLocations.push({ship,coordY,coordX, isHorizontal});

        return true;
    }

    recieveAttack(coordY, coordX) {

        if (coordY < 0 || coordY > 9 || coordX < 0 || coordX > 9) {
            throw new Error("Invalid coordinates for attack recieved");
        }

        const spot = this.board[coordY][coordX];

        if (spot.ship !== null){

            if(spot.hit == false) {
                spot.hit = true;
                spot.ship.hit();

                if (spot.ship.isSunk()){
                    this.shipsStanding--;
                }

                return true;
            }

            throw new Error("Coordinate alredy attacked");
        
        }else{
            spot.hit = true;
            return false;
        }


    }

    printBoard() {
        console.log('   ' + [...Array(10).keys()].map(n => n).join('  ')); // Column headers

        for (let x = 0; x < 10; x++) {
            let row = `${x} `; // Row index
            for (let y = 0; y < 10; y++) {
                const spot = this.board[x][y];

                if (spot.hit) {
                    row += spot.ship ? ' X ' : ' x ';
                } else if (spot.ship) {
                    row += ` ${spot.ship.name[0]} `;
                } else {
                    row += ' . ';
                }
            }
            console.log(row);
        }
    }

    noMoreShipsStanding() { return this.shipsStanding == 0};

    getShipLocations() { return this.shipLocations };

    getMissedHits() { return this.missedHits };

    getShipsStanding() { return this.shipsStanding };

}

export {Gameboard};