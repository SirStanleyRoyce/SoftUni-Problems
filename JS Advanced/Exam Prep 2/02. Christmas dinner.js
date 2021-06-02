class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }
    set budget(value){
        if(value<0){
            throw new Error('The budget cannot be a negative number');
        }
        this._budget = value;
    }
    get budget() {
        return this._budget;
    }

    shopping(product) {
        if(product[1] > this.budget){
            throw new Error('Not enough money to buy this product');
        }
        this.budget -= product[1]
        this.products.push(product[0]);
        return `You have successfully bought ${product[0]}!`;
    }
    recipes(recipe) {
        if (recipe.productsList.some(product => !this.products.includes(product))){
            throw new Error('We do not have this product');
        }
        this.dishes.push({recipeName: recipe.recipeName, productsList: recipe.productsList});
        return `${recipe.recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish) {

        if(!this.dishes.some(recipe => recipe.recipeName === dish)){
            throw new Error('We do not have this dish');
        }
        if(this.guests[name]){
            throw new Error('This guest has already been invited');
        }
        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let result = [];
        for (const guest in this.guests) {
            result.push(`${guest} will eat ${this.guests[guest]}, which consists of ${
                this.dishes.find(obj => obj.recipeName === this.guests[guest]).productsList.join(', ')}`)
        }
        return result.join('\n');
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());
