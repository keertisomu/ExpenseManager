console.log('expense manager');
let expenseData;

//get list of expenses
async function getExpensesAsync(){
    
    try
    {
        const result = await fetch(`https://localhost:5001/expense`);
        expenseData = await result.json();
        //populate html table
        let table = document.getElementById('expenseTable');

        //clear the table
        var rowCount = table.rows.length; 
        if(rowCount > 0){
            while(--rowCount) {
                table.deleteRow(rowCount);
            }
        }

        expenseData.forEach(function(object) {
        var dtCreated = getFormattedDate(object.created);
        var tr = document.createElement('tr');
        //style="display:none;"
        //| <button id=${object.id}>Delete</button>
        tr.innerHTML =
            '<td style="display:none;">' + object.id + '</td>' +
            '<td contentEditable>' + object.name + '</td>' +
            '<td contentEditable>' + object.value + '</td>' +
            '<td contentEditable>' + object.category + '</td>' +
            '<td contentEditable>' + dtCreated + '</td>' +
            `<td><button id=upd_${object.id}>Update</button> | <button id=del_${object.id}>Delete</button></td>`;
        table.appendChild(tr);
        document.getElementById('upd_' + object.id).addEventListener("click", updateExpenseAsync);
        document.getElementById('del_' + object.id).addEventListener("click", delExpenseAsync);
    });
    }
    catch(error)
    {
        console.log('getExpensesAsync(): ' + error);
    }
}

getExpensesAsync();

//add an expense
async function addExpenseAsync(){
    try{
        let expName = document.getElementById('txtName').value;
        let expVal = document.getElementById('txtValue').value;
        let expCat = document.getElementById('selectCategory').value;
        var expDt = document.getElementById('dtExpense').value;
        let expCur = "AUD";
        
        let expense = {
            created: expDt,
            name: expName,
            value: expVal,
            category: expCat,
            currency: expCur
          };

        let expJson = JSON.stringify(expense);
        console.log(expJson);
        const restInfo = getExpenseRestHeaders();

       const result = await fetch(`https://localhost:5001/expense`, {
        method: 'POST',
        mode: restInfo.mode,
        cache: restInfo.cache,
        credentials: restInfo.credentials ,
        headers: restInfo.headers,
        body: expJson
      });
      
      const content = await result.json();
      console.log(content);
      alert(`Successfully inserted expense , id : ${content}`)
    }
    catch(error){
        alert('addExpenseAsync(): ' + error);
    }
}

async function updateExpenseAsync(event){
    try{

        let elementId = event.target.id
        //example string: upd_464664dfhf...
        elementId = elementId.substring(4 , (elementId.length)) 
        console.log(`update : ${elementId}`);
        var expTable = document.getElementById('expenseTable');
        //gets rows of table
        var rowLength = expenseTable.rows.length;
        //loops through rows
        for (i = 0; i < rowLength; i++) {
            if(i == 0){ //skip first row as its the header.
                continue;
            }
            //gets cells of current row
            var cells = expenseTable.rows[i].cells;
            //gets amount of cells of current row
            var cellLength = cells.length;
            //skip row if this is not the row where update was clicked.
            if(cells[0].textContent != elementId){
                continue;
            }
    
           //loops through each cell in current row
           for(var j = 0; j < cellLength; j++){
                console.log('id of the cell:' + cells[0].textContent);
                //match the guid for which update is being performed.
                if(cells[0].textContent == elementId){
                    let updName = cells[1].textContent;
                    let updVal = parseFloat(cells[2].textContent);
                    let updCat = cells[3].textContent;
                    let dt = getFormattedDate(cells[4].textContent);

                    let updatedExpense = {
                        id: elementId,
                        created: dt,
                        name: updName,
                        value: updVal,
                        category: updCat,
                        currency: 'AUD'
                    };

                    let updExpJson = JSON.stringify(updatedExpense);
                    console.log(updExpJson);
                    const restInfo = getExpenseRestHeaders();

                    const updatedResult = await fetch(`https://localhost:5001/expense`, {
                        method: 'PUT',
                        mode: restInfo.mode,
                        cache: restInfo.cache,
                        credentials: restInfo.credentials ,
                        headers: restInfo.headers, 
                        body: updExpJson
                      });
                      const content = await updatedResult.json();
                      console.log(content);
                      //alert(`Successfully inserted expense , id : ${content}`)
                      break;
                }
            }
        }
    }
    catch(error){
        console.log('updateExpenseAsync(): ' + error)
    }
}

    //delete expense
    async function delExpenseAsync(event){

        try{
        var elementId = event.target.id
        console.log(`delete : ${elementId}`);
        elementId = event.target.id
        //example string: upd_464664dfhf...
        elementId = elementId.substring(4 , elementId.length) 

        const restInfo = getExpenseRestHeaders();
        const result = await fetch(`https://localhost:5001/expense/${elementId}`, {
                        method: 'DELETE'
                      });
                      const deleteStatus = result.status;
                      console.log(deleteStatus);
                      //reload the expense table.
                      getExpensesAsync();
                    }
        catch(error){
            alert('delExpenseAsyncerror()' + error);
        }
    }



