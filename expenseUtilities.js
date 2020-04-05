//format date to 'yyyy/mm/dd' - '2020/03/19'
function getFormattedDate(date){
    var dtCreated = new Date(date);
    var dd = String(dtCreated.getDate()).padStart(2, '0');
    var mm = String(dtCreated.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dtCreated.getFullYear();
    var formattedDt = yyyy + '/' + mm + '/' + dd;

    return formattedDt;
}