console.log('expense manager');

function getExpensesAsync(){
    
    fetch(`https://localhost:5001/expense`)
    .then(result =>{
        console.log(result);
        return result.json();
    })
    .then(data => {
        console.log(data);
        /* const day_data = data.consolidated_weather[0];
        //day_data = data.consolidated_weather[1];
        console.log(`Temperature of ${data.title} for today is between ${day_data.min_temp} and ${day_data.max_temp}`)  */
    })
    .catch(error => console.log('some error:' + error));
}
getExpensesAsync();