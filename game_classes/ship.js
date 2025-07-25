class Ship {
  constructor(length, name, image) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.imageUrl = image;
  }

  /**
   * Get the length of tiles of ship
   * @returns length
   */
  getLength() {
    return this.length;
  }

  /**
   * Get hits of the ship
   * @returns
   */
  getHits() {
    return this.hits;
  }

  /**
   * Score a hit on the ship
   */
  hit() {
    this.hits++;
  }

  /**
   * Returns if the ship has sunk
   * @returns boolean representing if the ship has sunk
   */
  isSunk() {
    if (this.hits == this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.imageUrl;
  }
}

export { Ship };
