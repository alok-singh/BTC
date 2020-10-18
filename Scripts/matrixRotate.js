var main = require('./arguments');
var time = (new Date()).getTime();

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


function matrixRotation(matrix, r) {
    for(var i=0; i<r; i++){
        matrix = rotateMatrix(matrix);
    }
    return matrix;
}

function printMatrix(matrix){
    for(var i=0; i<matrix.length; i++){
        console.log(matrix[i].join(' '))
    }
}

printMatrix(matrixRotation(main, 212131));
console.log('duration', (new Date()).getTime() - time)

