/**
 * Filters data based on a given pattern, matching animal names.
 * @param {Object[]} data - The array of country objects to filter.
 * @param {string} pattern - The pattern to match against animal names.
 * @returns {Object[]} Filtered array of country objects.
 */
function filterData(data, pattern) {
    const lowercasePattern = pattern.toLowerCase();

    return data
        .map(country => ({
            ...country,
            people: country.people
                .map(person => ({
                    ...person,
                    animals: person.animals.filter(animal =>
                        animal.name.toLowerCase().includes(lowercasePattern)
                    )
                }))
                .filter(person => person.animals.length > 0)
        }))
        .filter(country => country.people.length > 0);
}

/**
 * Counts and adds the number of elements to the names in the data structure.
 * @param {Object[]} data - The array of country objects to process.
 * @returns {Object[]} Array of country objects with count information added to names.
 */
function countData(data) {
    return data.map(country => ({
        name: `${country.name} [${country.people.length}]`,
        people: country.people.map(person => ({
            name: `${person.name} [${person.animals.length}]`,
            animals: person.animals
        }))
    }));
}

/**
 * Generic function to count and add the number of elements to names in a nested data structure.
 * @param {Object[]} data - The array of objects to process.
 * @returns {Object[]} Array of objects with count information added to names.
 */
function genericCountData(data) {
    return data.map(element => {
        const obj = Object.keys(element);
        if (obj.length > 1) {
            // If the element has more than one property, it's a nested object
            return {
                name: `${element.name} [${element[obj[1]].length}]`,
                [obj[1]]: genericCountData(element[obj[1]])
            }
        } else {
            // If the element has only one property, it's a leaf node
            return element;
        }
    });
}

module.exports = {
    filterData,
    countData,
    genericCountData
};