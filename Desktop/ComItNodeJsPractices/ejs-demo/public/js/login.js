var odd = document.querySelectorAll('button'); //selecting submit buttons





//var button = document.getElementById("button").addEventListener('click', function() {

//});

//var button = document.getElementById("button2").addEventListener('click', function() {

///});

//hide and show form
var regForm = document.getElementById('regForm');
var logForm = document.getElementById('logForm');


var message = document.getElementById("message").addEventListener('click', function() {
    if (regForm.style.display === 'none') {
        regForm.style.display = "block";
        logForm.style.display = 'none';
    } else {
        logForm.style.display = "block";
        regForm.style.display = 'none';

    }
});

var message = document.getElementById("go-to-login").addEventListener('click', function() {
    if (logForm.style.display === 'none') {
        logForm.style.display = "block";
        regForm.style.display = 'none';
    } else {
        regForm.style.display = "block";
        logForm.style.display = 'none';

    }
});