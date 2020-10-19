var sceneEl = document.querySelector('a-scene');
var doorEl = document.querySelectorAll('.door');
var buttonEl = document.querySelector('#button');
var playerEl = document.querySelector('#player');
var angryEl = document.querySelector('#angryblock');
var checkbuttonEl = document.querySelector("#checkpoint");
var finalbuttonEl = document.querySelector('#holebutton');
let playing2 = false;
let move = true;

let audio1 = document.querySelector("#closedoor");
let audio2 = document.querySelector("#stoprock");

buttonEl.addEventListener('grab-start', function() {

	audio1.play();

	if(doorEl[0].getAttribute('rotation').y == -90){ // open
		doorEl[0].setAttribute('rotation', '0 0 0');
		doorEl[0].setAttribute('position', '-0.75 1.5 -3');
		doorEl[1].setAttribute('rotation', '0 0 0');
		doorEl[1].setAttribute('position', '0.75 1.5 -3');
	}else{
		doorEl[0].setAttribute('rotation', '0 -90 0');
		doorEl[0].setAttribute('position', '-1.5 1.5 -2.25');
		doorEl[1].setAttribute('rotation', '0 -90 0');
		doorEl[1].setAttribute('position', '1.5 1.5 -2.25');
	}
});
buttonEl.addEventListener('mouseenter', function() {
	buttonEl.setAttribute('color', "gray");
	buttonEl.setAttribute('scale', "0.22 0.22 0.22");
});
buttonEl.addEventListener('mouseleave', function() {
	buttonEl.setAttribute('color', "black");
});

angryEl.addEventListener('grab-start', function () {
	if(!playing2) {
		audio2.play();
	} else {
		audio2.pause();
		audio2.currentTime = 0;
	}
	playing2 = !playing2;

	if(move == true){
		angryEl.removeAttribute('animation');
		move = false;
	}else{
		angryEl.setAttribute('position','0 24 -2');
		angryEl.setAttribute('animation','property: position; dur: 500; to: 0 15 -2; dir: alternate; loop: true');
		move = true;
	}
});

checkbuttonEl.addEventListener("mouseenter", function() {
	checkbuttonEl.setAttribute('color', 'red');
});

checkbuttonEl.addEventListener("mouseleave", function() {
	checkbuttonEl.setAttribute('color', 'purple');
});

checkbuttonEl.addEventListener("grab-start", function() {
	var pos = playerEl.getAttribute('position').x + " " + playerEl.getAttribute('position').y + " " + playerEl.getAttribute('position').z;
	playerEl.setAttribute('restart', {checkpoint: pos});
	checkbuttonEl.remove();
});

finalbuttonEl.addEventListener('mouseenter', function() {
	finalbuttonEl.setAttribute('scale', '0.4 0.4 0.4');
});
finalbuttonEl.addEventListener('mouseleave', function() {
	finalbuttonEl.setAttribute('scale', '0.25 0.25 0.25');
});
finalbuttonEl.addEventListener('grab-start', function() {
	var shrekEl = document.createElement('a-entity');
	var shrekEl2 = document.createElement('a-entity');
	var thanosEl = document.createElement('a-entity');
	var textEl = document.createElement('a-text');
	let audiofin = document.querySelector('#victorysound');

	audiofin.play();

	shrekEl.setAttribute('position', '5  13.2 27');
	shrekEl2.setAttribute('position', '-5  13.2 27');
	thanosEl.setAttribute('position', '0  13.2 27');

	shrekEl.setAttribute('scale', '0.0005 0.0005 0.0005');
	shrekEl2.setAttribute('scale', '0.0005 0.0005 0.0005');
	thanosEl.setAttribute('scale', '0.001 0.001 0.001');

	shrekEl.setAttribute('rotation', '0 180 0');
	shrekEl2.setAttribute('rotation', '0 180 0');
	thanosEl.setAttribute('rotation', '0 180 0');

	shrekEl.setAttribute('gltf-model', '#shrek');
	shrekEl2.setAttribute('gltf-model', '#shrek');
	thanosEl.setAttribute('gltf-model', '#thanos');

	shrekEl.setAttribute('animation-mixer' , '');
	shrekEl2.setAttribute('animation-mixer' , '');
	thanosEl.setAttribute('animation-mixer' , '');

	sceneEl.appendChild(shrekEl);
	sceneEl.appendChild(shrekEl2);
	sceneEl.appendChild(thanosEl);


	var aux = -5;
	for(var i = 0; i < 2; i++){
		var particleEl = document.createElement('a-entity');

		var pos = aux + " 12.8" + " 30.5"
		particleEl.setAttribute('position', pos);
		particleEl.setAttribute('particle-system' , 'color: #EF0000,#44CC00');
		sceneEl.appendChild(particleEl);
		aux += 10;
	}

	textEl.setAttribute('position','0 19 1000');
	textEl.setAttribute('scale','17 17 17');
	textEl.setAttribute('color','gold');
	textEl.setAttribute('align','center');
	textEl.setAttribute('rotation','0 180 0');
	textEl.setAttribute('value','CONGRATULATIONS!!');
	textEl.setAttribute('animation','property: position; dur: 3000; to: 0 21 30; loop: false');
	sceneEl.appendChild(textEl);

	finalbuttonEl.parentNode.removeChild(finalbuttonEl);
});
