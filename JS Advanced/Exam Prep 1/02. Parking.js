class Parking {
    constructor(capacity) {
        this.capacity = Number(capacity);
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        if (this.vehicles.length >= this.capacity) {
            throw new Error('Not enough parking space.');
        }
        this.vehicles.push({
            carModel,
            carNumber,
            payed: false
        });
        return `The ${carModel}, with a registration number ${carNumber}, parked.`;
    }

    removeCar(carNumber) {
        let car = this.vehicles.find(obj => obj.carNumber === carNumber);
        if (car == null) {
            throw new Error("The car, you're looking for, is not found.");
        }
        if (!car.payed) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }

        this.vehicles.splice(this.vehicles.indexOf(car), 1);
        return `${carNumber} left the parking lot.`;
    }

    pay(carNumber) {
        let car = this.vehicles.find(obj => obj.carNumber === carNumber);
        if (car == null) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
        if (car.payed) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        car.payed = true;
        return `${carNumber}'s driver successfully payed for his stay.`;
    }

    getStatistics(carNumber) {
        if(carNumber == null){
            let sorted = this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));
            let output = [`The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`];
            for (let obj of sorted) {
                let payedInfo = obj.payed ? 'Has payed' : 'Not payed';
                output.push(`${obj.carModel} == ${obj.carNumber} - ${payedInfo}`)
            }
            return output.join('\n')
        }
        let car = this.vehicles.find(obj => obj.carNumber === carNumber);
        let hasPayed = car.payed ? 'Has payed' : 'Not payed';
        return `${car.carModel} == ${car.carNumber} - ${hasPayed}`
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());
console.log(parking.addCar("Pejo 600", "891JAd18"));
console.log(parking.pay("TX3691CA"));
console.log(parking.pay("891JAd18"));
console.log(parking.removeCar("TX3691CA"));
console.log(parking.getStatistics());

