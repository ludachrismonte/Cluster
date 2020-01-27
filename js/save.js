function save() {
	var markup = document.documentElement.innerHTML;
	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:5000/save/",
		data: markup
	});
}