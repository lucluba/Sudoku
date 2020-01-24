const sudokuArray = [
    [7, 8, 1, , , 9, 3, 5,],
    [6, 3, 5, 1, , 8, 4, ,],
    [, , , , , 5, 8, 1, 7],
    [8, , , , 4, , , 6,],
    [, , , , 3, , 5, ,],
    [4, , 7, 5, 8, 2, , 9, 3],
    [5, , , 8, , 3, 2, ,],
    [, 7, , 6, , 4, , 3,],
    [, 9, 8, 2, , 7, , ,]
];

console.log("You want me to solve this sudoku: ")
console.table(sudokuArray);

let n, m;

function lineArray(array, n) {
    let lineArray = [];
    array[n].forEach(element => {
        if (element) {
            lineArray.push(element);
        }
    });
    return lineArray;
}

function columnArray(array, m) {
    let columnArray = [];
    let item;
    for (n = 0; n < 9; n++) {
        item = array[n][m];
        if (item) {
            columnArray.push(item);
        }
    }
    return columnArray;
}

function squareArray(array, i, j) {
    let squareArray = [];
    let item;
    for (let n = 0 + i; n < 3 + i; n++) {
        for (let m = 0 + j; m < 3 + j; m++) {
            item = array[n][m];
            if (item) {
                squareArray.push(item);
            }
        }
    }
    return squareArray;
}

function uniqueValues(newArray) {
    let fullValueArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let uniqueValue;
    let uniqueValuesArray = [];

    fullValueArray.forEach(element => {
        uniqueValue = true;
        newArray.forEach(item => {
            if (element === item) {
                uniqueValue = false;
            }
        });
        if (uniqueValue) {
            uniqueValuesArray.push(element);
        }
    });
    return uniqueValuesArray;
}

function valueToFill(n, m, s1, s2) {
    let newArray = [];
    let firstArray = lineArray(sudokuArray, n);
    let secondArray = columnArray(sudokuArray, m);
    let thirdArray = squareArray(sudokuArray, s1, s2);
    firstArray.forEach(item => {
        newArray.push(item);
    });
    secondArray.forEach(item => {
        newArray.push(item);
    });
    thirdArray.forEach(item => {
        newArray.push(item);
    });

    let uniqueValuesArray = uniqueValues(newArray);

    return uniqueValuesArray;
}

function createArrayOfUndefined(sudokuArray) {
    let arrayOfUndefined = [];
    for (n = 0; n < 9; n++) {
        for (m = 0; m < 9; m++) {
            if (!!!sudokuArray[n][m]) {
                arrayOfUndefined.push({
                    line: n,
                    column: m
                });
            }
        }
    }
    return arrayOfUndefined;
}

function setSValues(arrayOfUndefined) {
    let s1, s2;
    switch (arrayOfUndefined.line) {
        case 0:
        case 1:
        case 2: s1 = 0;
            break;
        case 3:
        case 4:
        case 5: s1 = 3;
            break;
        case 6:
        case 7:
        case 8: s1 = 6;
            break;
    }

    switch (arrayOfUndefined.column) {
        case 0:
        case 1:
        case 2: s2 = 0;
            break;
        case 3:
        case 4:
        case 5: s2 = 3;
            break;
        case 6:
        case 7:
        case 8: s2 = 6;
            break;
    }
    sValues = [s1, s2];
    return sValues;
}

function solvingSudoku(arrayOfUndefined, sudokuArray) {
    let elementNum = 0;
    let result;
    let resultArray = [];

    let s1 = setSValues(arrayOfUndefined)[0];
    let s2 = setSValues(arrayOfUndefined)[1];

    arrayOfUndefined.forEach(element => {
        elementNum += 1;
        result = valueToFill(element.line, element.column, s1, s2);
        resultArray.push(result);

        if (result.length === 1) {
            resultNum = Number(result);
            sudokuArray[element.line][element.column] = resultNum;
            arrayOfUndefined.splice(elementNum, 1);
        }
    });
    return resultArray;
}

function switchSet(position, arrayOfLinesColumns) {
    switch (position) {
        case 0:
        case 3:
        case 6: {
            arrayOfLinesColumns.push(position + 1, position + 2);
        };
            break;
        case 1:
        case 4:
        case 7:
            arrayOfLinesColumns.push(position - 1, position + 1);
            break;
        case 2:
        case 5:
        case 8:
            arrayOfLinesColumns.push(position - 2, position - 1);
            break;
    }
}

let checkStart,
    checkEnd = 81,
    iAmStuck = 0;

while (checkEnd !== 0) {
    arrayOfUndefined = createArrayOfUndefined(sudokuArray);
    checkStart = arrayOfUndefined.length;

    let uniqueArray = solvingSudoku(arrayOfUndefined, sudokuArray);

    arrayOfUndefined = createArrayOfUndefined(sudokuArray);
    checkEnd = arrayOfUndefined.length;

    if (checkStart === checkEnd) {
        // console.log("I'm stuck :(");
        iAmStuck += 1;
        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                const whatSize = squareArray(sudokuArray, i, j);
                if (whatSize.length === 8) {
                    let fullValueArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    let onlyValue;

                    fullValueArray.forEach(element => {
                        let unique = 0;
                        whatSize.forEach(item => {
                            if (element === item) {
                                unique = 1;
                            }
                        });
                        if (unique === 0) {
                            onlyValue = element;
                        }
                    });

                    let onlyValuePlace;
                    for (n = i; n < i + 3; n++) {
                        for (m = j; m < j + 3; m++) {
                            if (!!!sudokuArray[n][m]) {
                                onlyValuePlace = {
                                    value: onlyValue,
                                    line: n,
                                    column: m
                                };
                                sudokuArray[onlyValuePlace.line][onlyValuePlace.column] = onlyValuePlace.value;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

}
console.log("I think I've solved it");
console.table(sudokuArray);
