'use strict';

// newest solution

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the matrixRotation function below.
function matrixRotation(matrix, r) {
    for(var i=0; i<r; i++){
        matrix = rotateMatrix(matrix);
    }
    printMatrix(matrix);
}

function printMatrix(matrix){
    for(var i=0; i<matrix.length; i++){
        console.log(matrix[i].join(' '))
    }
}

function initSizeMatrix(rows, columns) {
    var column = [];
    var copy = [];
    for (var i = 0; i < columns; i++) {
        column[i] = 0;
    }
    for (var i=0; i < rows; i++){
        copy[i] = column.slice(0);
    }
    return copy;
}

function rotateMatrix(matrix) {
    var row = 0;
    var column = 0;
    var boxRowStart = 0;
    var boxColumnStart = 0;
    var boxRowEnd = matrix.length - 1;
    var boxColumnEnd = matrix[0].length - 1;
    var retMatrix = initSizeMatrix(matrix.length, matrix[0].length);
    while(boxRowStart < matrix.length/2 && boxColumnStart < matrix[0].length/2){
        for(; column<=boxColumnEnd; column++){
            if(column == boxColumnStart){
                retMatrix[row+1][column] = matrix[row][column];
            }
            else{
                retMatrix[row][column-1] = matrix[row][column];
            }
        }
        column--;
        row++;
        for(; row<=boxRowEnd; row++){
            retMatrix[row-1][column] = matrix[row][column];
        }
        row--;
        column--;
        for(; column>=boxColumnStart; column--){
            retMatrix[row][column+1] = matrix[row][column];
        }
        column++;
        row--;
        for(; row>boxRowStart; row--){
            retMatrix[row+1][column] = matrix[row][column];
        }        
        boxRowStart++;
        boxRowEnd--;
        boxColumnStart++;
        boxColumnEnd--;
        row = boxRowStart;
        column = boxColumnStart;
    }

    return retMatrix;
}

function main() {
    const mnr = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(mnr[0], 10);

    const n = parseInt(mnr[1], 10);

    const r = parseInt(mnr[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
