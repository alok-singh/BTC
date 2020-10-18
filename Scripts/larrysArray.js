function getUnsortedIndex(A, B){
    for(var i=0; i<A.length; i++){
        if(B[i] != A[i]){
            return i;
        }
    }
    return -1;
}

function findMinIndex(startIndex, A) {
    var min = 10000;
    var minIndex = '';
    for(var i=startIndex; i<A.length; i++){
        if(min > A[i]){
            min = A[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function rotateArray(startIndex, endIndex, arr) {
    var temp = '';
    if(arr[startIndex] < arr[endIndex] && arr[startIndex] < arr[startIndex +1]){
        return arr;
    }
    else if(arr[startIndex + 1] < arr[endIndex] && arr[startIndex + 1] < arr[startIndex]){
        temp = arr[startIndex];
        arr[startIndex] = arr[startIndex + 1];
        arr[startIndex + 1] = arr[endIndex];
        arr[endIndex] = temp;
        return arr;
    }
    else if(arr[endIndex] < arr[startIndex] && arr[endIndex] < arr[startIndex + 1]){
        temp = arr[endIndex];
        arr[endIndex] = arr[startIndex + 1];
        arr[startIndex + 1] = arr[startIndex];
        arr[startIndex] = temp;
        return arr;
    }
}

// Complete the larrysArray function below.
function larrysArray(A) {
    var B = A.slice(0).sort((a, b) => a-b);
    var startIndex = getUnsortedIndex(A, B);
    if(startIndex == -1){
        return 'YES';
    }
    var endIndex = A.length - 1;
    var minIndex = findMinIndex(startIndex, A);
    var endBlockIndex = minIndex;
    var startBlockIndex = '';
    
    if(minIndex - 2 >= startIndex){
        startBlockIndex = minIndex - 2;
    }
    else{
        startBlockIndex = startIndex;
    }
    
    if(startBlockIndex == minIndex - 2){
        endBlockIndex = endBlockIndex
    }
    else if(minIndex + 1 <= endIndex){
        endBlockIndex = minIndex + 1;
    }
    else{
        endBlockIndex = endIndex;
    }

    
    if(Math.abs(startBlockIndex - endBlockIndex) != 2){
        return 'NO';
    }
    else{
        A = rotateArray(startBlockIndex, endBlockIndex, A);
        console.log(A);
        return larrysArray(A);
    }
}


var A = [1,6,5,2,4,3];
console.log(A);
console.log(larrysArray(A));