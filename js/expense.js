var form = document.getElementById("expenseForm");
var inputs = document.querySelectorAll("#expenseForm input, #expenseForm select");
var sortSelect = document.getElementById("sortDate");
var filterSelect = document.getElementById("filter");
var tableBody = document.getElementById("tableBody");

var data = {};
var errorMsg = {};
var expenses = [];

inputs.forEach(function(input){
    input.addEventListener("input", function(e){
        var name = e.target.name;
        var value = e.target.value;
        data[name] = value;
    });
});

form.addEventListener("submit", function(e){
    e.preventDefault();
    clearErrors();

    if (!validate()) {
        return;
    }

    fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(function(response){ return response.json(); })
        .then(function(apiData){
            
            var expense = {
                id: Date.now(),
                name: data.name,
                amount: data.amount,
                date: data.date,
                category: data.category
            };

            expenses.push(expense);
            displayExpenses();

            form.reset();
            data = {};
        });
});

function validate() {
    errorMsg = {};

    if (!data.name) errorMsg.name = "Required";
    if (!data.amount) errorMsg.amount = "Required";
    if (!data.date) errorMsg.date = "Required";
    if (!data.category) errorMsg.category = "Required";

    showErrors();
    return Object.keys(errorMsg).length === 0;
}

function showErrors() {
    for (var key in errorMsg) {
        document.getElementById("error-" + key).innerText = errorMsg[key];
    }
}

function clearErrors() {
    for (var key in errorMsg) {
        document.getElementById("error-" + key).innerText = "";
    }
}

function displayExpenses() {
    tableBody.innerHTML = "";

    var list = expenses.slice();

    var filter = filterSelect.value;
    if (filter !== "all") {
        list = list.filter(function(exp){
            return exp.category === filter;
        });
    }

    var sort = sortSelect.value;
    if (sort === "asc") {
        list.sort(function(a, b){
            return new Date(a.date) - new Date(b.date);
        });
    } else {
        list.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });
    }

    list.forEach(function(exp){
        var row = "<tr>" +
            "<td>" + exp.name + "</td>" +
            "<td>" + exp.amount + "</td>" +
            "<td>" + exp.date + "</td>" +
            "<td>" + exp.category + "</td>" +
            "<td class='text-center'>" +
                "<button class='btn btn-sm btn-primary' onclick='editExpense(" + exp.id + ")'>Edit</button> " +
                "<button class='btn btn-sm btn-danger' onclick='deleteExpense(" + exp.id + ")'>Delete</button>" +
            "</td>" +
        "</tr>";

        tableBody.innerHTML += row;
    });
}

function editExpense(id) {
    var exp = expenses.find(function(e){ return e.id === id; });

    document.getElementById("name").value = exp.name;
    document.getElementById("amount").value = exp.amount;
    document.getElementById("date").value = exp.date;
    document.getElementById("category").value = exp.category;

    data.name = exp.name;
    data.amount = exp.amount;
    data.date = exp.date;
    data.category = exp.category;

    deleteExpense(id);
}

function deleteExpense(id) {
    expenses = expenses.filter(function(e){
        return e.id !== id;
    });

    displayExpenses();
}

displayExpenses();
