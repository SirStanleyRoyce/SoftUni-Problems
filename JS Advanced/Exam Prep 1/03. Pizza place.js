const describe = require('mocha').describe;
const assert = require('chai').assert;

let pizzUni = {
    makeAnOrder: function (obj) {

        if (!obj.orderedPizza) {
            throw new Error('You must order at least 1 Pizza to finish the order.');
        } else {
            let result = `You just ordered ${obj.orderedPizza}`
            if (obj.orderedDrink) {
                result += ` and ${obj.orderedDrink}.`
            }
            return result;
        }
    },

    getRemainingWork: function (statusArr) {

        const remainingArr = statusArr.filter(s => s.status != 'ready');

        if (remainingArr.length > 0) {

            let pizzaNames = remainingArr.map(p => p.pizzaName).join(', ')
            let pizzasLeft = `The following pizzas are still preparing: ${pizzaNames}.`

            return pizzasLeft;
        } else {
            return 'All orders are complete!'
        }

    },

    orderType: function (totalSum, typeOfOrder) {
        if (typeOfOrder === 'Carry Out') {
            totalSum -= totalSum * 0.1;

            return totalSum;
        } else if (typeOfOrder === 'Delivery') {

            return totalSum;
        }
    }
}

describe('pizzUni TEST', () => {
    describe('makeAnOrder', () => {
        it('makeAnOrder work test', () => {
            assert.equal(pizzUni.makeAnOrder({
                    orderedPizza: 'Margarita',
                    orderedDrink: 'Cola'
                }),
                'You just ordered Margarita and Cola.',
                'Wrong output');
        })
        it('Order pizza, no drink', () => {
            assert.equal(pizzUni.makeAnOrder({
                    orderedPizza: 'Hawaii'
                }),
                'You just ordered Hawaii',
                'Wrong output when no drink');
        })
        it('Order empty pizza string', () => {
            assert.throw(() => pizzUni.makeAnOrder({orderedPizza: ''}),"You must order at least 1 Pizza to finish the order." )
        })
        it('Order only a drink', () => {
            assert.throw(() => pizzUni.makeAnOrder({orderedDrink: 'Beer'}),"You must order at least 1 Pizza to finish the order." )

        })
        it('Order empty object', () => {
            assert.throw(() => pizzUni.makeAnOrder({}),"You must order at least 1 Pizza to finish the order." )
        })
        it('Order nothing', () => {
            assert.throw(() => pizzUni.makeAnOrder(), 'Cannot read property \'orderedPizza\' of undefined')
        })
    })
    describe('getRemainingWork', () => {
        it('getRemainingWork all orders are ready', () => {
            assert.equal(pizzUni.getRemainingWork([
                {
                    pizzaName: 'Hawaii',
                    status: 'ready'
                },
                {
                    pizzaName: 'California',
                    status: 'ready'
                },
                {
                    pizzaName: 'Margarita',
                    status: 'ready'
                }
            ]),'All orders are complete!')
        });
        it('getRemainingWork NOT all orders are ready', () => {
            assert.equal(pizzUni.getRemainingWork([
                {
                    pizzaName: 'Hawaii',
                    status: 'preparing'
                },
                {
                    pizzaName: 'California',
                    status: 'ready'
                },
                {
                    pizzaName: 'Margarita',
                    status: 'preparing'
                }
            ]),'The following pizzas are still preparing: Hawaii, Margarita.')
        });
        it('getRemainingWork not array input',  () => {
            assert.throw(() => pizzUni.getRemainingWork('asd'), 'statusArr.filter is not a function')
        });
    })
    describe('orderType', () => {
        it('orderType work test', () => {
            assert.equal(pizzUni.orderType(100, 'Carry Out'),90);
        });
        it('orderType work test', () => {
            assert.equal(pizzUni.orderType(100, 'Delivery'),100);
        });
        it('orderType work test', () => {
            assert.equal(pizzUni.orderType('100', 'Carry Out'),NaN);
        });
    })
})

