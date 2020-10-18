var alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
function isAnagram(stringA, stringB, string) {
    var dictionaryA = {};  
    var dictionaryB = {};
    for(var i=stringA.start; i<stringA.end; i++){
        if(dictionaryA[string[i]]){
            dictionaryA[string[i]] += 1;
        }
        else{
            dictionaryA[string[i]] = 1;
        }
    }
    for(var i=stringB.start; i<stringB.end; i++){
        if(dictionaryB[string[i]]){
            dictionaryB[string[i]] += 1;
        }
        else{
            dictionaryB[string[i]] = 1;
        }
    }
    for(var i=0; i<alphabets.length; i++){
        var char = alphabets[i];
        if(dictionaryA[char] != dictionaryB[char]){
            return false;
        }
    }
    return true;
}

// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(string) {
    var stringA = {};
    var stringB = {};
    var count = 0;
    for(var length=1; length<=string.length-1; length++){
        for(var i=0; i<=string.length-length; i++){
            stringA.start = i;
            stringA.end = i + length;
            for(var j=i+1; j<=string.length-length; j++){
                stringB.start = j;
                stringB.end = j + length;
                count += isAnagram(stringA, stringB, string) ? 1 : 0;
            }
        }
    }
    return count;
}
// console.log(sherlockAndAnagrams('aaa'));

var time = (new Date()).getTime();
for(var i=0; i<10; i++){
    console.log(sherlockAndAnagrams('tyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm'));
    // console.log(sherlockAndAnagrams('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
}
console.log((new Date()).getTime() - time);

// var time = (new Date()).getTime();
// var testCases = [{
//     test: 'aaa',
//     expected: '3'
// }];

// for(var i=0; i<testCases.length; i++){
//     var result = sherlockAndAnagrams(testCases[i].test);
//     if(testCases[i].expected != result){
//         console.log('failed', result);
//     }
//     console.log('Test case duration', i, (new Date()).getTime() - time);
// }