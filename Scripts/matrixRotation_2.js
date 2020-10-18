var main = require('./arguments');
var time = (new Date()).getTime();

function rotateMatrix(matrix, rotations) {
    var row = 0;
    var column = 0;
    var boxRowStart = 0;
    var boxColumnStart = 0;
    var boxRowEnd = matrix.length - 1;
    var boxColumnEnd = matrix[0].length - 1;
    var retMatrix = initSizeMatrix(matrix.length, matrix[0].length);
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

    return retMatrix;
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
    return {
        row, 
        column
    }
}

function getPosition(rotations, row, column, minRow, maxRow, minColumn, maxColumn){
    var index = {
        row,
        column
    };
    var cycle = (maxRow - minRow)*(maxColumn - minColumn);
    rotations = rotations%cycle;
    
    while(rotations){
        index = rotateElementOnce(index.row, index.column, minRow, maxRow, minColumn, maxColumn);
        rotations--;
    }

    return index;
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

function printMatrix(matrix){
    for(var i=0; i<matrix.length; i++){
        console.log(matrix[i].join(' '))
    }
}

printMatrix(rotateMatrix(main, 211122));
console.log('duration', (new Date()).getTime() - time)

