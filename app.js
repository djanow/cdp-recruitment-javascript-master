const { data } = require('./data.js');
const { countData, filterData, genericCount } = require('./utils/dataHelpers.js');
// Fonction principale
function main() {
    console.time('time');

    const args = process.argv.slice(2);
    let result = data;

    if (args.length > 0) {
        const arg = args[0];
        if (arg.startsWith('--filter=')) {
            const pattern = arg.split('=')[1];
            result = filterData(data, pattern);
        } else if (arg === '--count') {
            result = countData(data);
        } else if (arg === '--genericCount') {
            result = countData(data);
        } else {
            console.log('Usage: node app.js [--filter=<pattern> | --count]');
            process.exit(1);
        }
    }

    console.log(JSON.stringify(result, null, 2));

    console.timeEnd('time');
}

main();
