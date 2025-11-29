document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("login-form");
  var message = document.getElementById("login-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("login-email").value.trim();
    var pass = document.getElementById("login-password").value.trim();

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    var i;
    var found = null;

    for (i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].pass === btoa(pass)) {
        found = users[i];
        break;
      }
    }

    if (found === null) {
      show("Incorrect email or password", "danger");
      return;
    }

    localStorage.setItem("currentUser", found.id);

    show("Login successful!", "success");

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);
  });

  function show(txt, type) {
    message.className = "alert alert-" + type;
    message.innerText = txt;
    message.style.display = "block";
  }
});
