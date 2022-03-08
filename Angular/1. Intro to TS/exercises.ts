//1. Data Class
console.log(1, ')');
class HTTPRequest {
    public response: string = undefined;
    public fullfilled: boolean = false;

    constructor(
        public method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
        public uri: string,
        public version: string,
        public message: string
    ) { }
}

/* let myData = new HTTPRequest('GET', 'https://google.com', 'HTTP/1.1', '');
console.log(myData) */

//2. Tickets
console.log(2, ')');
class Ticket {
    constructor(public destination: string, public price: number, public status: string) { }
}

function manageTickets(data: string[], sortBy: 'destination' | 'price' | 'status'): Ticket[] {
    const tickets: Ticket[] = [];
    data.forEach(t => {
        const [destination, price, status] = t.split('|');
        tickets.push(new Ticket(destination, Number(price), status));
    });
    const sortMethod = (a: Ticket, b: Ticket) => sortBy === 'price' ? a.price - b.price : a[sortBy].localeCompare(b[sortBy]);
    tickets.sort(sortMethod);
    return tickets;
}

/* console.log(manageTickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
],
    'destination'
)) */

//3. People
console.log(3, ')');
abstract class Employee {
    public _salary: number = 0;
    public tasks: string[] = [];
    constructor(public name: string, public age: number) { }

    get salary(): number {
        return this._salary;
    }
    set salary(newSalary: number) {
        this._salary = newSalary;
    }

    public work(): void {
        const task = this.tasks.shift();
        this.tasks.push(task);
        console.log(`${this.name} ${task}`);
    }

    public collectSalary(): void {
        console.log(`${this.name} received ${this.salary} this month.`)
    }
}

class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('is working on a simple task.');
    }
}

class Senior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('is working on a complicated task.');
        this.tasks.push('is taking time off work.');
        this.tasks.push('is supervising junior workers.');
    }
}

class Manager extends Employee {
    public divident: number = 0;

    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('scheduled a meeting.');
        this.tasks.push('is preparing a quarterly report.');
    }

    get salary(): number {
        return this._salary + this.divident
    }
    set salary(newSalary: number) {
        this._salary = newSalary;
    }
}
/* const junior = new Junior('Ivan', 8);
const senior = new Senior('Bob', 44);
const manager = new Manager('Karen', 88);

junior.work();
senior.work();
manager.work();

junior.salary = 1200;
senior.salary = 2400;
manager.salary = 3600;
manager.divident = 360;

junior.collectSalary();
senior.collectSalary();
manager.collectSalary(); */

//4. The Elemelons
console.log(4, ')');
abstract class Melon {
    private _elementIndex: number;
    public element: 'Water' | 'Fire' | 'Earth' | 'Air';
    constructor(public weight: number, public melonSort: string) {
        this._elementIndex = weight * melonSort.length;
    }

    get elementIndex(): number {
        return this._elementIndex;
    }

    public toString(): string {
        return `Element: ${this.element || 'none'}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
    }
}

class Watermelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Water';
    }
}
class Firemelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Fire';
    }
}
class Earthmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Earth';
    }
}
class Airmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Air';
    }
}
class Melolemonmelon extends Melon {
    private readonly morphElements: ['Water', 'Fire', 'Earth', 'Air'] = ['Water', 'Fire', 'Earth', 'Air'];
    private morphElementIndex: number = 0;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }

    public morph(): void {
        this.morphElementIndex++;
        if (this.morphElementIndex > 3) this.morphElementIndex = 0;
        this.element = this.morphElements[this.morphElementIndex];
    }
}
/* // let errormelon: Melon = new Melon(8, 'ERROR'); 

let watermelon: Watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());

let earthmelon: Earthmelon = new Earthmelon(25, 'Stone');
console.log(earthmelon.toString());

let melolemonmelon: Melolemonmelon = new Melolemonmelon(25, 'Melolemon');
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());*/

//5. Boxes
console.log(5, ')');
class Box<T> {
    public box: T[] = [];

    public add(el: T): void {
        this.box.push(el);
    }

    public remove(): void {
        this.box.pop();
    }

    get count(): number {
        return this.box.length;
    }
}
/* let box1 = new Box<Number>();
box1.add(1);
box1.add(2);
box1.add(3);
console.log(box1.count);

let box2 = new Box<String>();
box2.add("Pesho");
box2.add("Gosho");
console.log(box2.count);
box2.remove();
console.log(box2.count); */

//6. KeyValuePairs
console.log(6, ')');

class KeyValuePair<T, U>{
    private key: T;
    private value: U;

    public setKeyValue(key: T, value: U) {
        this.key = key;
        this.value = value;
    }

    public display(): string {
        return `key = ${this.key}, value = ${this.value}`
    }
}
/* let kvp1 = new KeyValuePair<number, string>();
let kvp2 = new KeyValuePair<number[], string[]>();
kvp1.setKeyValue(2, 'eyes');
console.log(kvp1.display());
kvp2.setKeyValue([9, 8], ['gag', 'beans']);
console.log(kvp2.display()); */