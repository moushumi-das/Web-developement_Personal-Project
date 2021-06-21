var odd = document.querySelectorAll('button'); //selecting submit buttons
var radio = document.querySelectorAll('input[type="radio"]'); //selecting submit buttons

odd[0].style.backgroundColor = 'gray'; //setting the background color of 2nd submit value
//odd[1].style.color = 'black';
//odd[0].style.color = 'black';
odd[0].value = "Register Now"
    //odd[1].value = "Login"
    // sending the value of 2nd submit value


var button = document.getElementById("button").addEventListener('click', function() {

});

//hide and show form
var form = document.getElementById('regForm');
var form2 = document.getElementById('logForm');


var message = document.getElementById("message").addEventListener('click', function() {
    if (form.style.display === 'none') {
        form.style.display = "block";
    } else {
        form.style.display = 'none'
        form.style.display = "block";

    }
});

function buttonClick() {
    document.getElementById("addForm").animate({ height: "toggle", opacity: "toggle" }, "slow");
}



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