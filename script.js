const surveyForm = document.getElementById('survey-form');
const desc = document.getElementById('desc');
const responseContainer = document.getElementById('response-container');
const surveyResponses = {};

surveyForm.addEventListener('submit', e=> {
    e.preventDefault();
    saveResponses();
    showResponses();
}); 

function saveResponses(){
    document.querySelectorAll('input').forEach( item => {
        if(item.type === 'checkbox' && item.checked === false) return;
        if(item.type === 'radio' && item.checked === false) return;
        saveToObject(item);
    });
    document.querySelectorAll('select').forEach( item => saveToObject(item));
    document.querySelectorAll('textarea').forEach( item => saveToObject(item));
}

function saveToObject(item){
    if(!surveyResponses.hasOwnProperty(item.name)){
        surveyResponses[item.name] = [];
    }
    surveyResponses[item.name].push(item.value);
}

function showResponses(){
    responseContainer.style.display = 'block';
    surveyForm.style.display = 'none';
    desc.innerText = 'Thank you! Here are the responses you submitted.';
    const table = document.createElement('table');
    Object.entries(surveyResponses).forEach(item => {
        if(item.type === 'checkbox' && item.checked === false) return;
        if(item.type === 'radio' && item.checked === false) return;
        table.appendChild(setTableRow(item[0], item[1]));
    })
    table.style.borderColor = '#ffffff';
    responseContainer.appendChild(table);
}

function setTableRow(name, value){
    const row = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    tdName.innerText = name.toUpperCase();
    tdValue.innerText = value;
    row.appendChild(tdName);
    row.appendChild(tdValue);
    return row;
}
