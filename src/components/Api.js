import request from 'superagent';

export function GetDecks(){
    let rej, req;
    let promise = new Promise(function (resolve, reject) {
        req = request.get('http://localhost:8080/GetDecks')
        .set('Accept', 'application/json')
        .then(res=> {
            if (!res.error){
                resolve(res.body);
            }
            else {
                console.log(res.statusText + ", " + res);
            }
        });

    });
    promise.abort=function(){
        req.abort();
        rej();
    };
    return promise;
}
export function GetCards(deckId){
    let rej, req;
    let promise = new Promise(function (resolve, reject) {
        req = request.get('http://localhost:8080/Getcards?deckId='+ deckId)
        .set('Accept', 'application/json')
        .then(res=> {
            if (!res.error){
                resolve(res.body);
            }
            else {
                console.log(res.statusText + ", " + res);
            }
        });

    });
    promise.abort=function(){
        req.abort();
        rej();
    };
    return promise;
}