/*
    solution for absolute permutation
*/

function absolutePermutation(n, k) {
    var arr = [];
    var usedNums = {};
    for(var i=0; i<n; i++){
        var reqNumberA = i + 1 + k;
        var reqNumberB = i + 1 - k;

        if(reqNumberB <= n && reqNumberB > 0 && !usedNums[reqNumberB]){
            usedNums[reqNumberB] = true;
            arr[i] = reqNumberB;
        }
        else if(reqNumberA <= n && reqNumberA > 0 && !usedNums[reqNumberA]){
            usedNums[reqNumberA] = true;
            arr[i] = reqNumberA;
        }

    }

    for(var i=0; i<n; i++){
        if(!arr[i]){
            return [-1];
        }
    }

    return arr;
}

// console.log(absolutePermutation(10, 5));

/*
    solution for longest common subsequence
*/

function commonChild(s1, s2) {
    // LCS(i, j) = Max(LCS(i, j-1), LCS(i-1, j), LCS(i-i, j-1) + 1)
    var LCS = [];
    var row = [];
    var length = s1.length;
    for(var i=0; i<length; i++){
        row.push(0);
    }
    for(var i=0; i<length; i++){
        LCS.push(row.slice(0));
    }
    
    for(var i=0; i<length; i++){
        for(var j=0; j<length; j++){
            if(s1[i] == s2[j]){
                if(i>0 && j>0){
                    LCS[i][j] = LCS[i-1][j-1] + 1;
                }
                else{
                    LCS[i][j] = 1;
                }
            }
            else{
                if(i>0 && j>0){
                    LCS[i][j] = Math.max(LCS[i][j-1], LCS[i-1][j]);
                }
                else if(i>0){
                    LCS[i][j] = LCS[i-1][j];
                }
                else if(j>0){
                    LCS[i][j] = LCS[i][j-1];
                }
                else{
                    LCS[i][j] = 0;
                }
            }
        }   
    }
    return LCS[s1.length-1][s1.length-1];
}


console.log(commonChild('MCB', 'MAC'));
