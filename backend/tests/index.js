var test = require('tape');

var time = Date.now();

function getAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getBirthDate() {
    var date = new Date();

    date.setDate(date.getDate() - 365.25 * getAge(18, 78));
    return date;
}

var user = {
    name: 'testUser_' + time,
    birthDate: getBirthDate(),
    email: 'testUser_' + time + '@example.com',
    password: 'testUser_' + time + '_p@ssw0rd',
    gender: ~~(Math.random() * 2) ? 'male' : 'female',
};

console.log(user);

require('./register')(user);

test.onFinish(() => process.exit(0));
