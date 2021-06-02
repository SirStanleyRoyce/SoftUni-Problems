let dealership = {
    newCarCost: function (oldCarModel, newCarPrice) {

        let discountForOldCar = {
            'Audi A4 B8': 15000,
            'Audi A6 4K': 20000,
            'Audi A8 D5': 25000,
            'Audi TT 8J': 14000,
        }

        if (discountForOldCar.hasOwnProperty(oldCarModel)) {
            let discount = discountForOldCar[oldCarModel];
            let finalPrice = newCarPrice - discount;
            return finalPrice;
        } else {
            return newCarPrice;
        }
    },

    carEquipment: function (extrasArr, indexArr) {
        let selectedExtras = [];
        indexArr.forEach(i => {
            selectedExtras.push(extrasArr[i])
        });

        return selectedExtras;
    },

    euroCategory: function (category) {
        if (category >= 4) {
            let price = this.newCarCost('Audi A4 B8', 30000);
            let total = price - (price * 0.05)
            return `We have added 5% discount to the final price: ${total}.`;
        } else {
            return 'Your euro category is low, so there is no discount from the final price!';
        }
    }
}
const describe = require('mocha').describe;
const assert = require('chai').assert;

describe('dealership testing', () => {
    it('newCarCost', function () {
        assert.equal(dealership.newCarCost('Audi A4 B8', 15000), 0);
        assert.equal(dealership.newCarCost('Audi A4 B8', 14000), -1000);
        assert.equal(dealership.newCarCost(10, 14000), 14000);
        assert.equal(dealership.newCarCost('Audi A4 B8', '14000'), -1000);
    });
    it('carEquipment', function () {
        assert.equal(dealership.carEquipment(
            ['heated seats', 'massaging seats', 'GPS navigation', 'sliding roof', 'sports rims'],
            [0, 3, 4]).join(', '),'heated seats, sliding roof, sports rims');
    });
    it('euroCategory', function () {

        assert.equal(dealership.euroCategory(5),
            `We have added 5% discount to the final price: ${
            0.95*dealership.newCarCost('Audi A4 B8', 30000)}.`);
        assert.equal(dealership.euroCategory(3),
            'Your euro category is low, so there is no discount from the final price!');
        assert.equal(dealership.euroCategory('4'),
            `We have added 5% discount to the final price: ${
                0.95*dealership.newCarCost('Audi A4 B8', 30000)}.`);
    });
})
