/*
    this program can generate all possible 
    permutations of a given string
*/

function biggerIsGreater(w) {
    var temp = '';
    var remain = '';
    var main = '';
    var wrongChar = '';
    for(var i=w.length-1; i>0; i--){
        if(w[i-1] < w[i]){
            wrongChar = w[i-1];
            main = w.slice(0, i-1);
            remain = w.slice(i-1).split('').sort((a, b) => {
                if(a < b){
                    return -1;
                }
                return 1;
            });
            for(var j=0; j<remain.length; j++){
                if(remain[j] > wrongChar){
                    remain.unshift(remain[j]);
                    remain[j+1] = '';
                    return main + remain.join('');
                }
            }
        }
    }
    return false;
}


var a = '1234';
while(a){
    console.log(a);
    a = biggerIsGreater(a);
}