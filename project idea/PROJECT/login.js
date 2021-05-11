var odd = document.querySelectorAll('button'); //selecting submit buttons

odd[0].style.backgroundColor = 'gray'; //setting the background color of 2nd submit value
//odd[1].style.color = 'black';
//odd[0].style.color = 'black';
odd[0].value = "Register Now"



var button = document.getElementById("button").addEventListener('click', function() {

});

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





function addItem(e) {
    e.preventDefault();

}

var newItem = document.getElementById('username');




oddLi = document.querySelectorAll('li:nth-child(odd)'); //selecting nth child
evenLi = document.querySelectorAll('li:nth-child(even)'); //selecting 

for (let i = 0; i < oddLi.length; i++) {
    oddLi[i].style.backgroundColor = 'gray';
    evenLi[i].style.backgroundColor = 'yellow';
}