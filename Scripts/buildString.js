/*
    https://www.hackerrank.com/challenges/build-a-string/problem
*/

'use strict'

/*function isSubstring(string) {
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
}*/

function isSubstring(end, string) {
    var firstStringLastIndex = 0;
    var lastStringFirstIndex = 0;
    var lastStringLastIndex = 0;
    var flag = true;
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


function buildString(a, b, s) {
    var optimalArr = [];
    var minimalCost = 0;
    var stringInprogress = "";
    var substringIndex = 0;
    debugger;
    for(var i=0; i<s.length; i++){
        substringIndex = isSubstring(i, s);
        if(substringIndex != -1){
            minimalCost = Math.min(a + (optimalArr[i-1] ? optimalArr[i-1] : 0), b + optimalArr[substringIndex]);
        }
        else{
            minimalCost = a + (optimalArr[i-1] ? optimalArr[i-1] : 0);
        }
        optimalArr.push(minimalCost)
    }
    return optimalArr;
}

var input = 'abcabca';

console.log(input, '\n', buildString(4, 5, input));

/*var testCases = [{
    test: 'abcabc',
    expected: '17'
},{
    test: 'ababc',
    expected: '17'
}, {
    test: 'abc',
    expected: '12'
}, {
    test: 'abcabcaabbabc',
    expected: '35'
}, {
    test: 'aabaacaba',
    expected: 26
}];


for(var i=0; i<testCases.length; i++){
    console.log(testCases[i].test, buildString(4, 5, testCases[i].test), testCases[i].expected);
}*/