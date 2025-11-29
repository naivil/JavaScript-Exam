document.addEventListener("DOMContentLoaded", function () {

    // get logged in user
    var uid = localStorage.getItem("currentUser");

    if (!uid) {
        window.location.href = "login.html";
        return;
    }

    // get all users
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var username = "";

    // find user name
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == uid) {
            username = users[i].name;
        }
    }

    // SET USERNAME ON DASHBOARD
    var nameBox = document.getElementById("username-display");

    if (nameBox) {
        nameBox.innerText = username;
    } else {
        console.log("username-display element not found!");
    }

    // ----------------- EXPENSE LOGIC -----------------

    var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    var form = document.getElementById("expense-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("expense-name").value;
        var amount = document.getElementById("expense-amount").value;
        var date = document.getElementById("expense-date").value;
        var category = document.getElementById("expense-category").value;

        if (name === "" || amount === "" || date === "" || category === "") {
            alert("Please fill all fields");
            return;
        }

        var newExpense = {
            id: Date.now(),
            user: Number(uid),
            name: name,
            amount: Number(amount),
            date: date,
            category: category
        };

        expenses.push(newExpense);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        form.reset();
        loadExpenses();
    });

    function loadExpenses() {
        var tbody = document.getElementById("expense-table-body");
        tbody.innerHTML = "";

        var total = 0;

        for (var i = 0; i < expenses.length; i++) {
            if (expenses[i].user == uid) {

                total += expenses[i].amount;

                var row = "<tr>" +
                    "<td>" + expenses[i].name + "</td>" +
                    "<td>" + expenses[i].amount + "</td>" +
                    "<td>" + expenses[i].date + "</td>" +
                    "<td>" + expenses[i].category + "</td>" +
                    "</tr>";

                tbody.innerHTML += row;
            }
        }

        document.getElementById("total-amount").innerText = "₹" + total;
    }

    loadExpenses();

    // LOGOUT
    document.getElementById("logout-btn").onclick = function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    };
});
