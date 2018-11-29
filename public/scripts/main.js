class Person {
	constructor (name) {
		this.name = name;
	}

	hello() {
		if (typeof this.name === 'string') {
			return '<p>Hello, I am ' + this.name + '!</p>';
		} else {
			return 'Hello!';
		}
	}
}

var person = new Person("Peter");

document.write(person.hello());