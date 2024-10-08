const { filterData, countData } = require('./dataHelpers.js');

// Mock des données de test
const testData = [
    {
        name: 'Country1',
        people: [
            {
                name: 'Person1',
                animals: [
                    { name: 'Dog' },
                    { name: 'Cat' },
                    { name: 'Fish' }
                ]
            },
            {
                name: 'Person2',
                animals: [
                    { name: 'Bird' },
                    { name: 'Snake' }
                ]
            }
        ]
    },
    {
        name: 'Country2',
        people: [
            {
                name: 'Person3',
                animals: [
                    { name: 'Lion' },
                    { name: 'Tiger' }
                ]
            }
        ]
    }
];

describe('filterData', () => {
    test('filters animals correctly', () => {
        const result = filterData(testData, 'a');
        expect(result).toEqual([
            {
                name: 'Country1',
                people: [
                    {
                        name: 'Person1',
                        animals: [
                            { name: 'Cat' }
                        ]
                    },
                    {
                        name: 'Person2',
                        animals: [
                            { name: 'Snake' }
                        ]
                    }
                ]
            }
        ]);
    });

    test('removes empty people and countries', () => {
        const result = filterData(testData, 'z');
        expect(result).toEqual([]);
    });

    test('is case insensitive', () => {
        const result = filterData(testData, 'DOG');
        expect(result).toEqual([
            {
                name: 'Country1',
                people: [
                    {
                        name: 'Person1',
                        animals: [
                            { name: 'Dog' }
                        ]
                    }
                ]
            }
        ]);
    });
});

describe('countData', () => {
    test('adds correct counts', () => {
        const result = countData(testData);
        expect(result).toEqual([
            {
                name: 'Country1 [2]',
                people: [
                    {
                        name: 'Person1 [3]',
                        animals: [
                            { name: 'Dog' },
                            { name: 'Cat' },
                            { name: 'Fish' }
                        ]
                    },
                    {
                        name: 'Person2 [2]',
                        animals: [
                            { name: 'Bird' },
                            { name: 'Snake' }
                        ]
                    }
                ]
            },
            {
                name: 'Country2 [1]',
                people: [
                    {
                        name: 'Person3 [2]',
                        animals: [
                            { name: 'Lion' },
                            { name: 'Tiger' }
                        ]
                    }
                ]
            }
        ]);
    });
});