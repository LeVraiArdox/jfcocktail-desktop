let usedState = false;

document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".btn-primary");

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      if (usedState == false) {
        var info;
        switch (index) {
          case 0:
            info = "1";
            break;
          case 1:
            info = "2";
            break;
          case 2:
            info = "3";
            break;
          case 3:
            info = "4";
            break;
          case 4:
            info = "5";
            break;
          case 5:
            info = "6";
            break;
          default:
            info = "7";
        }

        // Send the information to Node-RED using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:1880/endpoint", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        alert("Commande envoyée: " + info);
        usedState = true;
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Success! Handle the response from the server
            var response = JSON.parse(xhr.responseText);
            alert("Boisson prête");
            usedState = false;
          } else {
            // Request failed
            alert("Request failed with status:", xhr.status);
            usedState = false;
          }
        };

        xhr.onerror = function () {
          alert("Network error occurred");
          usedState = false;
        };

        // Send the request with the JSON payload
        xhr.send(JSON.stringify({ cocktail: info }));
      } else {
        alert("une commande est deja en cours");
      }
    });
  });
});
