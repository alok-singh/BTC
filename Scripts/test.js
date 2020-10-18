function binarySearch(val, start, end, array) {
    if(Math.abs(start - end) == 1){
        if(array[start] == val) {
            return start;
        }
        else if(array[end] == val){
            return end;
        }
        else if(array[end] < val){  
            return end + 1;
        }
        else if(array[end] > val && array[start] < val){
            return end;
        }
        else if(array[start] > val){
            return start;
        }
    }
    else{
        var searchIndex = parseInt((start + end)/2);
        if(array[searchIndex] == val){
            return searchIndex;
        }
        else if(array[searchIndex] < val){
            return binarySearch(val, searchIndex, end, array)
        }
        else if(array[searchIndex] > val){
            return binarySearch(val, start, searchIndex, array)
        }
    }
}


console.log(binarySearch(2, 0, 9, [1,2,3,4,5,6,7,8,9,10]))



/*function isSubstringNew(end, string) {
    var firstStringLastIndex = 0;
    var lastStringFirstIndex = 0;
    var lastStringLastIndex = 0;
    debugger;
    for(var i=Math.ceil(end/2); i<end; i++){
        firstStringLastIndex = i-1;
        lastStringFirstIndex = i;
        lastStringLastIndex = end;
        for(var j=0; j<=firstStringLastIndex; j++){
            flag = true;
            for(var k=0; k<=lastStringLastIndex - lastStringFirstIndex; k++){
                if(string[j + k] != string[lastStringFirstIndex + j + k]){
                    flag = false;
                }
            }
            if(flag){
                return firstStringLastIndex;
            }
        }
    }
    return -1;
}



function isSubstringOld(string) {
    var first = "";
    var last = "";
    for(var i=Math.ceil(string.length/2); i<=string.length-1; i++){
        first = string.slice(0, i);
        last = string.slice(i);
        if(first.indexOf(last) != -1){
            return i-1;
        }
    }
    return -1;
}

var input = 'abcabca';
console.log('isSubstringNew', '\n', isSubstringNew(6, input));
console.log('isSubstringOld', '\n', isSubstringOld(input));*/