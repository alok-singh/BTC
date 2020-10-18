// Complete the gridSearch function below.
function gridSearch(G, P) {
    var breakExternal = false;
    for(var i=0; i<=G.length - P.length; i++){
        for(var j=0; j<=G[0].length - P[0].length; j++){
            for(var k=0; k<P.length; k++){
                for(var l=0; l<P[0].length; l++){
                    if(G[i+k][j+l] == P[k][l]){
                        if((k == P.length - 1) && (l == P[0].length - 1)){
                            return 'YES'
                        }
                    }
                    else{
                        breakExternal = true;
                        break;
                    }
                }
                if(breakExternal){
                    breakExternal = false;
                    break;
                }    
            }
        }    
    }
    return 'NO';
}

var convert = (string) => {
    return string.split('\n').filter(val => !!val).map(val => val.trim().split('').map(num => parseInt(num)));
}

var mainString = `
    400453592126560
    114213133098692
    474386082879648
    522356951189169
    887109450487496
    252802633388782
    502771484966748
    075975207693780
    511799789562806
    404007454272504
    549043809916080
    962410809534811
    445893523733475
    768705303214174
    650629270887160
`;

var patternString = `
    99
    99
`;

var main = convert(mainString);

var pattern = convert(patternString);

// console.log(main);
// console.log(pattern);

console.log(gridSearch(main, pattern));


// if(G[i+k][j+l] == P[k][l]){
//     if(k == P.length - 1 && l == P[0].length){
//         return 'YES'
//     }
// }
// else{
//     break;
// }
