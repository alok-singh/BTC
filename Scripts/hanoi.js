'use strict';

/*
    https://www.hackerrank.com/challenges/gena/problem
*/

function resetTowers(discList, numOfDisc) {
    var state = discList.reduce((acc, val, index) => {
        acc[val].push(index + 1);
        return acc;
    }, {1: [], 2: [], 3: [], 4: []});
    
    for(var i=1; i<=4; i++){
        state[i].sort((a, b) => a - b);
    }
    state.level = 0;
    var level = 0;
    var stateQueue = [state];
    var isFinished = isInitialState(state);
    var discFromRadius = 0;
    var discToRadius = 0;
    var newState = {};
    while(!isFinished){
        state = stateQueue.shift();
        isFinished = isInitialState(state);
        // console.log(stateQueue.length);
        if(isFinished){
            return state.level;
        }
        level = state.level + 1;
        // push all the possible state from current state
        for(var from=1; from<=4; from++){
            if(state[from].length){
                discFromRadius = state[from][0];
                for(var to=1; to<=4; to++){
                    if(from != to){
                        if(state[to].length){
                            discToRadius = state[to][0];
                            if(discFromRadius < discToRadius){
                                // push state to queue
                                newState = Object.assign({}, state, {
                                    [from]: state[from].slice(1),
                                    [to]: [state[from][0]].concat(state[to])
                                }, {level});
                                if(isNewState(newState)){
                                    stateQueue.push(newState);
                                }
                            }
                        }
                        else{
                            // push state to queue
                            newState = Object.assign({}, state, {
                                [from]: state[from].slice(1),
                                [to]: [state[from][0]]
                            }, {level});
                            if(isNewState(newState)){
                                stateQueue.push(newState);
                            }
                        }
                    }
                }
            }
        }
    }
}

var stateTrack = {};

function isNewState(state){
    var t1 = state[1].join('');
    var t2 = state[2].join('');
    var t3 = state[3].join('');
    var t4 = state[4].join('');
    var retVal = !stateTrack[t1 + '_' + t2 + '_' + t3 + '_' + t4];
    if(retVal){
        stateTrack[t1 + '_' + t2 + '_' + t3 + '_' + t4] = true;   
        stateTrack[t1 + '_' + t2 + '_' + t4 + '_' + t3] = true;
        stateTrack[t1 + '_' + t3 + '_' + t2 + '_' + t4] = true;   
        stateTrack[t1 + '_' + t3 + '_' + t4 + '_' + t2] = true;   
        stateTrack[t1 + '_' + t4 + '_' + t2 + '_' + t3] = true;   
        stateTrack[t1 + '_' + t4 + '_' + t3 + '_' + t2] = true;   
    }
    return retVal;
}


function isInitialState(state){
    return !(state['2'].length + state['3'].length + state['4'].length);
}

/*console.log(resetTowers([1, 4, 1], 3))
console.log('expected output', 3);*/

var time = (new Date()).getTime();
console.log(resetTowers('4 1 2 1 4 3 3 4 3 4'.split(' '), 10))
console.log('time', (new Date()).getTime() - time);
console.log('expected output', 40);