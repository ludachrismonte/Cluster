var z_max = 20;


var container_pre = `
	<div class='item' onmousedown='stopPropagating()'>
		<div class='handle' onmousedown='dragMouseDown()'></div>
		<div class='item-content'>
`;

var container_post = `
		</div>
	</div>
`;

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

$( document ).ready(function() {

    var startPositon;
    window.scrollTo($("#main").width() / 2, $("#main").height() / 2);

    $( ".control-item" ).draggable();
    $( ".control-item" ).mousedown(function() {
		startPositon = $(this).position();
	});
	$( ".control-item" ).mouseup(function() {
		$(this).css({top: startPositon.top, left: startPositon.left});
		var id = guidGenerator();
		if ($(this).attr('id') == "text") {
			console.log("making textbox");
			$("#main").append(container_pre + "<textarea></textarea>" + container_post);
		}
		else if ($(this).attr('id') == "spotify") {
			console.log("making spotify");
			$("#main").append(container_pre + "<iframe src='' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>" + container_post);
			$("#main iframe").last().attr("src", "https://open.spotify.com/embed/playlist/7mCyRDqYopn6QVU9cYgHyk");
		}
		else if ($(this).attr('id') == "image") {
			console.log("making image");
			$("#main").append(container_pre + "<img src=''></img>" + container_post);
			//$("#main img").last().attr("src", "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
		}
		else {
			console.log("making generic");
			$("#main").append(container_pre + container_post);
		}
		$("#main div").last().parent().attr("id", id);
		$("#main .handle:first-child").attr("id", id + "-handle");
  		var scale = $("#zoom").slider("value") / 100;
  		$("#main div:last-child").css({top: (event.pageY - $('#main').offset().top) / scale, left: (event.pageX - $('#main').offset().left) / scale});
  		//$("#main div:last-child").resizable();
	});

	$("#zoom").slider({
      orientation: "horizontal",
      range: "min",
      min: 20,
      max: 200,
      value: 100,
      slide: zoom,
      change: zoom
    });

	var curYPos = 0;
	var curXPos = 0;
	var curDown = false;

	$(window).on("mousemove", function (event) {
	  if (curDown === true) {
	    $(document).scrollTop(parseInt($(document).scrollTop() + (curYPos - event.pageY)));
	    $(document).scrollLeft(parseInt($(document).scrollLeft() + (curXPos - event.pageX)));
	  }
	});

	$("#main").on("mousedown", function (e) { curDown = true; curYPos = e.pageY; curXPos = e.pageX; e.preventDefault(); });
	$(window).on("mouseup", function (e) { curDown = false; });
	$(window).on("mouseout", function (e) { curDown = false; });

});

function zoom() {
	var centerX = window.scrollX + window.innerWidth / 2;
	var centerY = window.scrollY + window.innerHeight / 2;
	$("#main").css('transform-origin', centerX  + "px " + centerY + "px");
	var zoom = $("#zoom").slider("value") / 100;
	$("#main").css('transform', 'scale(' + zoom + ')');
}

function stopPropagating() {
	var e = window.event;
	e.stopPropagation();
}

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
var elem;

function dragMouseDown() {
	var e = window.event;
	e.stopPropagation();
	elem = document.getElementById(e.target.parentElement.id);
	z_max++;
	elem.style.zIndex = z_max.toString();
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	document.onmousemove = elementDrag;
}

function elementDrag() {
	var e = window.event;
	e.stopPropagation();
	var scale = $("#zoom").slider("value") / 100;
	pos1 = (pos3 - e.clientX) / scale;
	pos2 = (pos4 - e.clientY) / scale;
	pos3 = e.clientX;
	pos4 = e.clientY;
	elem.style.top = (elem.offsetTop - pos2) + "px";
	elem.style.left = (elem.offsetLeft - pos1) + "px";
}

function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
}
