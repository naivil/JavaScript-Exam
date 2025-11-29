document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("signup-form");
  var message = document.getElementById("signup-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var pass = document.getElementById("password").value.trim();
    var cpass = document.getElementById("confirm-password").value.trim();

    if (name === "" || email === "" || pass === "" || cpass === "") {
      show("Please fill all fields", "danger");
      return;
    }

    if (pass !== cpass) {
      show("Passwords do not match", "danger");
      return;
    }

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    // check if email exists
    var i;
    for (i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        show("Email already registered", "danger");
        return;
      }
    }

    var user = {
      id: Date.now(),
      name: name,
      email: email,
      pass: btoa(pass)
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    show("Signup successful!", "success");

    setTimeout(function () {
      window.location.href = "login.html";
    }, 1500);
  });

  function show(txt, type) {
    message.className = "alert alert-" + type;
    message.innerText = txt;
    message.style.display = "block";
  }
});
