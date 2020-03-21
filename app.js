console.log('expense manager');

//get list of expenses
async function getExpensesAsync(){
    
    try
    {
        const result = await fetch(`https://localhost:5001/expense`);
        const data = await result.json();
        //populate html table
        let table = document.getElementById('expenseTable');
        data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + object.id + '</td>' +
            '<td>' + object.name + '</td>' +
            '<td>' + object.value + '</td>' +
            '<td>' + object.category + '</td>' +
            '<td>' + object.created + '</td>';
        table.appendChild(tr);});
    }
    catch(error)
    {
        alert('getExpensesAsync(): ' + error);
    }
};

getExpensesAsync();

//add an expense

async function addExpenseAsync(){
    try{
        let expName = document.getElementById('txtName').value;
        let expVal = document.getElementById('txtValue').value;
        let expCat = document.getElementById('txtCategory').value;
        var today = new Date(2020 , 3 , 21);
        /* var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy; */
        let expCur = "AUD";
        
        let expense = {
            id: 190,
            created: today,
            name: expName,
            value: expVal,
            category: expCat,
            currency: expCur
          };

        let expJson = JSON.stringify(expense);
        console.log(expJson);

       const result = await fetch(`https://localhost:5001/expense`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin' ,
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Content-Type': 'application/json'
        }, 
        body: expJson
      });
      
      const content = await result.json();
      console.log(content);

    }
    catch(error){
        alert('addExpenseAsync(): ' + error);
    }
}


