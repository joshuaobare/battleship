const Gameboard = function (name) {
  this.name = name;
  this.missedHit = [];
  this.ships = [];
  this.occupiedSpots = [];
  this.playableSpots = [];
  this.attackedSpots = [];
  this.hitSpots = [];

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      this.playableSpots.push([y, x]);
    }
  }

  this.placeShip = (ship) => {
    const occupiedSpotCheck = ship.coord.some((coord) => {
      return this.occupiedSpots.some((coords) => {
        if (coord.toString() === coords.toString()) {
          return true;
        }
      });
    });

    const playableSpotCheck = ship.coord.every((coord) => {
      return this.playableSpots.some((coords) => {
        if (coord.toString() === coords.toString()) {
          return true;
        }
      });
    });

    const proximityCheck = ship.coord.some((coord) => {
      return this.occupiedSpots.some((coords) => {
        if (
          [coord[0], coord[1]].toString() ===
            [coords[0] + 1, coords[1]].toString() ||
          [coord[0], coord[1]].toString() ===
            [coords[0], coords[1] + 1].toString() ||
          [coord[0], coord[1]].toString() ===
            [coords[0] + 1, coords[1] + 1].toString() ||
          [coord[0], coord[1]].toString() ===
            [coords[0] - 1, coords[1]].toString() ||
          [coord[0], coord[1]].toString() ===
            [coords[0], coords[1] - 1].toString() ||
          [coord[0], coord[1]].toString() ===
            [coords[0] - 1, coords[1] - 1].toString()
        ) {
          return true;
        }
      });
    });

    if (occupiedSpotCheck) {
      throw "Ship coordinates are taken";
    } else if (!playableSpotCheck) {
      throw "Ship coordinates are out of bounds";
    } else if (
      proximityCheck &&
      this.name.toString().toUpperCase() == "PLAYERBOARD"
    ) {
      throw "Ship too close";
    } else {
      this.ships.push(ship);
      ship.coord.forEach((point) => {
        this.occupiedSpots.push(point);
      });
    }
  };

  this.receiveAttack = (coords) => {
    this.attackedSpots.push(coords);

    const index = this.playableSpots.findIndex((element) => {
      return JSON.stringify(element) == JSON.stringify(coords);
    });
    this.playableSpots.splice(index, 1);

    const coordCheck = this.occupiedSpots.some((val) => {
      if (val.toString() === coords.toString()) {
        return true;
      }
    });

    if (coordCheck) {
      const myShip = this.ships.find((ship) => {
        return ship.coord.find((coord) => {
          return coord.toString() === coords.toString();
        });
      });

      const index = myShip.coord.findIndex((val) => {
        if (val.toString() === coords.toString()) {
          return true;
        }
      });
      myShip.hit(index);
      this.hitSpots.push(coords);

      return "Attack hit a ship";
    } else {
      this.missedHit.push(coords);

      return "Attack missed";
    }
  };

  this.allShipsSunk = () => {
    const decision = this.ships.every((ship) => {
      if (ship.isSunk()) {
        return true;
      }
    });

    if (decision) {
      return true;
    } else {
      return false;
    }
  };
};

export { Gameboard };
