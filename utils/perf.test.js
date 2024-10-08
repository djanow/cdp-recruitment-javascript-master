const { filterData, countData, genericCountData } = require('./dataHelpers');
const { data } = require('../data');

describe('Performance tests', () => {
  // Utility function to measure execution time
  const measureExecutionTime = (fn) => {
    const start = process.hrtime.bigint();
    fn();
    const end = process.hrtime.bigint();
    return Number(end - start) / 1e6; // Converts to milliseconds
  };
  const runMultipleTimes = (fn, times = 10) => {
    let total = 0;
    for (let i = 0; i < times; i++) {
      total += measureExecutionTime(fn);
    }
    return total / times;
  };
  const offSetBatch = 100;

  test('filterData scales linearly', () => {
    const smallDataset = data.slice(0, 2);
    const mediumDataset = data.slice(0, 4);
    const largeDataset = data;

    const smallTime = runMultipleTimes(() => filterData(smallDataset, 'ry'));
    const mediumTime = runMultipleTimes(() => filterData(mediumDataset, 'ry'));
    const largeTime = runMultipleTimes(() => filterData(largeDataset, 'ry'));

    console.log(`filterData execution times:
      Small dataset: ${smallTime.toFixed(2)} ms
      Medium dataset: ${mediumTime.toFixed(2)} ms
      Large dataset: ${largeTime.toFixed(2)} ms`);

    // Check that the execution time increases roughly linearly
    const smallToMediumRatio = mediumTime / smallTime;
    const mediumToLargeRatio = largeTime / mediumTime;

    expect(Math.abs(smallToMediumRatio - mediumToLargeRatio)).toBeLessThan(1.1);
  });

  test('filterData performance', () => {
    const executionTime = runMultipleTimes(() => {
      filterData(data, 'ry');
    });
    console.log(`filterData execution time: ${executionTime.toFixed(2)} ms`);
    expect(executionTime).toBeLessThan(100); // Should execute in less than 100 ms
  });

  test('Multiple filterData performance', () => {
    let executionTime = 0;
    for (let i = 0; i < offSetBatch; i++) {
      executionTime += runMultipleTimes(() => {
        filterData(data, 'ry');
      });
    }
    executionTime = executionTime / offSetBatch;
    console.log(`Multiple filterData execution time: ${executionTime.toFixed(2)} ms`);
    expect(executionTime).toBeLessThan(100); // Should execute in less than 100 ms
  });

  test('countData performance', () => {
    const executionTime = runMultipleTimes(() => {
      countData(data);
    });
    console.log(`countData execution time: ${executionTime.toFixed(2)} ms`);
    expect(executionTime).toBeLessThan(50); // Should execute in less than 50 ms
  });

  test('genericCountData performance', () => {
    const executionTime = runMultipleTimes(() => {
      genericCountData(data);
    });
    console.log(`genericCountData execution time: ${executionTime.toFixed(2)} ms`);
    expect(executionTime).toBeLessThan(50); // Should execute in less than 50 ms
  });

  test('Multiple countData performance', () => {
    let executionTime = 0;
    for (let i = 0; i < offSetBatch; i++) {
      executionTime += runMultipleTimes(() => {
        countData(data);
      });
    }
    executionTime = executionTime / offSetBatch;
    console.log(`Multiple countData execution time: ${executionTime.toFixed(2)} ms`);
    expect(executionTime).toBeLessThan(50); // Should execute in less than 100 ms
  });
});