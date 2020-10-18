'use strict';

// newest solution
// solution for https://www.hackerrank.com/challenges/matrix-rotation-algo/problem

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

function matrixRotation(matrix, rotations) {
    var row = 0;
    var column = 0;
    var boxRowStart = 0;
    var boxColumnStart = 0;
    var boxRowEnd = matrix.length - 1;
    var boxColumnEnd = matrix[0].length - 1;
    var retMatrix = initSizeMatrix(matrix.length, matrix[0].length);
    var index;
    while(boxRowStart < matrix.length/2 && boxColumnStart < matrix[0].length/2){
        for(; column<=boxColumnEnd; column++){
            index = getPosition(rotations, row, column, boxRowStart, boxRowEnd, boxColumnStart, boxColumnEnd);
            retMatrix[index.row][index.column] = matrix[row][column];
        }
        column--;
        row++;
        for(; row<=boxRowEnd; row++){
            index = getPosition(rotations, row, column, boxRowStart, boxRowEnd, boxColumnStart, boxColumnEnd);
            retMatrix[index.row][index.column] = matrix[row][column];
        }
        row--;
        column--;
        for(; column>=boxColumnStart; column--){
            index = getPosition(rotations, row, column, boxRowStart, boxRowEnd, boxColumnStart, boxColumnEnd);
            retMatrix[index.row][index.column] = matrix[row][column];
        }
        column++;
        row--;
        for(; row>boxRowStart; row--){
            index = getPosition(rotations, row, column, boxRowStart, boxRowEnd, boxColumnStart, boxColumnEnd);
            retMatrix[index.row][index.column] = matrix[row][column];
        }        
        boxRowStart++;
        boxRowEnd--;
        boxColumnStart++;
        boxColumnEnd--;
        row = boxRowStart;
        column = boxColumnStart;
    }

    printMatrix(retMatrix);
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

function getPosition(rotations, row, column, minRow, maxRow, minColumn, maxColumn){
    var index = {
        row,
        column
    };
    var cycle = 2*((maxRow - minRow + 1) + (maxColumn - minColumn + 1) - 2);
    rotations = rotations%cycle;
    
    while(rotations){
        index = rotateElementOnce(index.row, index.column, minRow, maxRow, minColumn, maxColumn);
        rotations--;
    }

    return index;
}

function rotateElementOnce(row, column, minRow, maxRow, minColumn, maxColumn) {
    
    if(maxRow == minRow || maxColumn == minColumn){

    }
    else if(minRow == row){
        if(column == minColumn){
            row++;
        }
        else{
            column--;
        }
    }
    else if(row == maxRow){
        if(column == maxColumn){
            row--;
        }
        else{
            column++;
        }
    }
    else if(column == minColumn){
        if(row == maxRow){
            column++;
        }
        else{
            row++;
        }
    }
    else if(column == maxColumn){
        if(row == minRow){
            column--;
        }
        else{
            row--;
        }
    }
    else{
        console.log('nothing happned');
    }
    return {
        row, 
        column
    }
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
