const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync(process.argv[2]);

pdf(dataBuffer).then(function (data) {
    console.log(data.text.substring(0, 4000));
}).catch(err => {
    console.error(err);
});
