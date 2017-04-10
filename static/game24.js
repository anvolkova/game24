function cards_array() {
	var card1 = document.getElementById("c1");
	var card2 = document.getElementById("c2");
	var card3 = document.getElementById("c3");
	var card4 = document.getElementById("c4");
	return [ card1.innerHTML, card2.innerHTML, card3.innerHTML, card4.innerHTML ];
}

function new_task() {
	for (var i = 1; i <= 4; i++){
		document.getElementById("c"+i).innerHTML = Math.floor(Math.random() * 10) + 1;
	}
	document.getElementById("answer").value = "";
}

function clear_answer() {
	document.getElementById("message").innerHTML = "";
}

function give_up() {
	solve(cards_array());
}

function verify_symbols(user_answer) {
	var allowed_symbols = "1234567890+-*/() ";
	for (var i = 0; i < user_answer.length; ++i) {
		if (allowed_symbols.indexOf(user_answer[i]) == -1) {
			return false;
		}
	}
	return true;
}
function used_numbers(user_answer, a) {
	var split = user_answer.split(/[^0-9]+/);
	var split_not_empty = [];
	for (var i = 0; i < split.length; i++) {
		if (split[i].length > 0) {
			split_not_empty.push(split[i]);
		}
	}
	split_not_empty.sort();
	a.sort();
	if (split_not_empty.length != 4) {
		return false;
	}
	for (i = 0; i < 4; i++) {
		if (split_not_empty[i] != a[i]) {
			return false;
		}
	}
	return true;
}

function check() {
	var user_answer = document.getElementById("answer").value;
	var message = document.getElementById("message");
	var user_number = null;
	if (!verify_symbols(user_answer)) {
		message.innerHTML = "Bad input: wrong symbols. Try again!";
		return;
	}
	if (!used_numbers(user_answer, cards_array())) {
		message.innerHTML = "You should use each card once. Try again!";
		return;
	}
	try {
		user_number = eval(user_answer);
	} catch (err) {
		message.innerHTML = "Bad input: " + err + " Try again!";
		return;
	}
	if (user_number != 24) {
		message.innerHTML = "Result is not correct. Try again!";
	} else {
		message.innerHTML = "Well done! " + user_answer + " = 24";
		var solved = document.getElementById("solved");
		solved.innerHTML = parseInt(solved.innerHTML) + 1;
		new_task();
		setTimeout(clear_answer, 3000);
	}
}

function solve(a) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("message").innerHTML = "Solution is: "
					+ this.responseText;
			if (this.responseText != "No solution"){
				var failed = document.getElementById("failed");
				failed.innerHTML = parseInt(failed.innerHTML) + 1;
			}
			new_task();
			setTimeout(clear_answer, 3000);
		}
	};
	xhttp.open("GET", "solve?cards=" + a.join(), true);
	xhttp.send();
}

window.onload = new_task;