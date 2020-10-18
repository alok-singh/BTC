/*
    https://www.hackerrank.com/challenges/richie-rich/problem
*/

function stepToPalindrome(string) {
    var start = 0;
    var end = string.length - 1;
    var changesRequired = 0;
    while(end - start >= 0){
        if(string[start] != string[end]){
            changesRequired += 1;
        }
        start++;
        end--;
    }
    return changesRequired;
}

function highestValuePalindrome(string, size, allowedChanges) {
    var start = 0;
    var changesDone = 0;
    var end = string.length - 1;
    var stringArr = string.split('');
    var changesRequired = stepToPalindrome(string);
    
    if(changesRequired > allowedChanges){
        return -1;
    }
    else{
        while(end - start >= 0){
            if((allowedChanges - changesRequired >= 2) && (stringArr[start] == stringArr[end])){
                if(stringArr[start] != '9'){
                    stringArr[start] = '9';
                    stringArr[end] = '9';
                    allowedChanges -= 2;
                }
            }
            else if((allowedChanges - changesRequired >= 1) && (stringArr[start] != stringArr[end])){
                if(stringArr[start] != '9'){
                    stringArr[start] = '9';
                    allowedChanges--;
                }
                if(stringArr[end] != '9'){
                    stringArr[end] = '9';
                    allowedChanges--;
                }
                changesRequired--;
            }
            else if((allowedChanges == 1) && (end == start)){
                stringArr[start] = '9';
                allowedChanges--;
            }
            else if(allowedChanges - changesRequired == 0){
                if(stringArr[start] < stringArr[end]){
                    stringArr[start] = stringArr[end];
                    changesRequired--;
                    allowedChanges--;
                }
                else if(stringArr[end] < stringArr[start]){
                    stringArr[end] = stringArr[start];
                    changesRequired--;
                    allowedChanges--;
                }
            }
            start++;
            end--;
        }
        return stringArr.join('');
    }
}

/*var num = '902';
console.log(num);
console.log(highestValuePalindrome(num, num.length, 2));*/

var passedAll = true;
var testCases = [{
    num: '1213',
    allowedChanges: 2,
    expectedOutput: 3223
}, {
    num: '900',
    allowedChanges: 2,
    expectedOutput: 999
}, {
    num: '123',
    allowedChanges: 1,
    expectedOutput: 323
}, {
    num: '123',
    allowedChanges: 2,
    expectedOutput: 929
}, {
    num: '12122',
    allowedChanges: 1,
    expectedOutput: 22122
}];

for(var i=0; i<testCases.length; i++){
    var test = testCases[i];
    if(test.expectedOutput != highestValuePalindrome(test.num, test.num.length, test.allowedChanges)){
        console.log('failed', JSON.stringify(test, null, "    "));
        passedAll = false;
        break;
    }
}

if(passedAll){
    console.log('passed All test cases');
}

