//return rest Url headers.
function getExpenseRestHeaders(){
    return  restHeaders = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin' ,
        headers: { 
            'Accept': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Content-Type': 'application/json'
        }
    };
}