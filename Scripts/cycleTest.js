// var main = [
//     [1, 2, 3, 4],
//     [10, 11, 12, 5],
//     [9, 8, 7, 6]
// ];

var main = [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
];


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

// for(var r=0; r<10; r++){
    for(var row=0; row<main.length; row++){
        for(var column=0; column<main[0].length; column++){
            if(row == 1 && column == 1){
                console.log(`${1} rotations at row:${row}, column:${column}`, getPosition(1, row, column, 1, 1, 1, 1));
                console.log(`${9} rotations at row:${row}, column:${column}`, getPosition(9, row, column, 1, 1, 1, 1));
            }
            else{
                console.log(`${1} rotations at row:${row}, column:${column}`, getPosition(1, row, column, 0, 2, 0, 2));
                console.log(`${9} rotations at row:${row}, column:${column}`, getPosition(9, row, column, 0, 2, 0, 2));
            }
        }
    }
// }

// console.log('1 rotations it should be row:0, col:2', getPosition(1, 1, 2, 0, 2, 0, 2));
// console.log('1 rotations it should be row:0, col:0', getPosition(1, 0, 1, 0, 2, 0, 2));
// console.log('2 rotations it should be row:1, col:0', getPosition(2, 0, 1, 0, 2, 0, 2));
// console.log('3 rotations it should be row:2, col:0', getPosition(3, 0, 1, 0, 2, 0, 2));
// console.log('4 rotations it should be row:2, col:1', getPosition(4, 0, 1, 0, 2, 0, 2));
// console.log('5 rotations it should be row:2, col:2', getPosition(5, 0, 1, 0, 2, 0, 2));
// console.log('6 rotations it should be row:1, col:2', getPosition(6, 0, 1, 0, 2, 0, 2));
// console.log('7 rotations it should be row:0, col:2', getPosition(7, 0, 1, 0, 2, 0, 2));
// console.log('8 rotations it should be row:0, col:1', getPosition(8, 0, 1, 0, 2, 0, 2));
// console.log('9 rotations it should be row:0, col:0', getPosition(9, 0, 1, 0, 2, 0, 2));
// console.log('10 rotations it should be row:1, col:0', getPosition(10, 0, 1, 0, 2, 0, 2));
// console.log('11 rotations it should be row:2, col:0', getPosition(11, 0, 1, 0, 2, 0, 2));



// console.log('0 rotations it should be row:1, col:1', getPosition(0, 1, 1, 1, 1, 1, 1));
// console.log('1 rotations it should be row:1, col:1', getPosition(1, 1, 1, 1, 1, 1, 1));
// console.log('2 rotations it should be row:1, col:1', getPosition(2, 1, 1, 1, 1, 1, 1));
// console.log('3 rotations it should be row:1, col:1', getPosition(3, 1, 1, 1, 1, 1, 1));




// function getPosition(rotations, row, column, minRow, maxRow, minColumn, maxColumn) {
    // var cycle = (maxRow - minRow)*(maxColumn - minColumn);
    // rotations = rotations%cycle;
//     while(rotations > 0){
//         for(; column>=minColumn; column--){
//             // console.log(main[row][column], row, column);
//             if(!rotations){
//                 return {
//                     row,
//                     column
//                 }
//             }
//             rotations--;
//         }
//         column++;
//         row++;
//         for(; row<=maxRow; row++){
//             // console.log(main[row][column], row, column);
//             if(!rotations){
//                 return {
//                     row,
//                     column
//                 }
//             }
//             rotations--;
//         }
//         row--;
//         column++;
//         for(; column<=maxColumn; column++){
//             // console.log(main[row][column], row, column);
//             if(!rotations){
//                 return {
//                     row,
//                     column
//                 }
//             }
//             rotations--;
//         }
//         column--;
//         row--;
//         for(; row>=minRow; row--){
//             // console.log(main[row][column], row, column);
//             if(!rotations){
//                 return {
//                     row,
//                     column
//                 }
//             }
//             rotations--;
//         }
//         row++;
//         column--;
//     }
//     return {
//         row, 
//         column
//     }
// }
