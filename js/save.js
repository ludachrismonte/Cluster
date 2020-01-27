function save() {
	var markup = document.documentElement.innerHTML;
	$.ajax({
		type: "POST",
		url: "https://cluster-manager.herokuapp.com/save/",
		data: markup
	});
}