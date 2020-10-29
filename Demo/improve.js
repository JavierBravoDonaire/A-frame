function coloredOnSelect(){
	var panelbutton =  document.querySelector('#buttonPanel');
	var tablebutton =  document.querySelector('#buttonTable');
	var enterbutton =  document.querySelector('#enterEditButton');
	var exitbutton =  document.querySelector('#exitEditButton');

	panelbutton.addEventListener('raycaster-intersected', function () {
		panelbutton.setAttribute('color', "blue");
	});
	panelbutton.addEventListener('raycaster-intersected-cleared', function () {
		panelbutton.setAttribute('color', "black");
	});
	tablebutton.addEventListener('raycaster-intersected', function () {
		tablebutton.setAttribute('color', "blue");
	});
	tablebutton.addEventListener('raycaster-intersected-cleared', function () {
		tablebutton.setAttribute('color', "black");
	});
	enterbutton.addEventListener('raycaster-intersected', function () {
		enterbutton.setAttribute('color', "green");
	});
	enterbutton.addEventListener('raycaster-intersected-cleared', function () {
		enterbutton.setAttribute('color', "black");
	});
	exitbutton.addEventListener('raycaster-intersected', function () {
		exitbutton.setAttribute('color', "red");
	});
	exitbutton.addEventListener('raycaster-intersected-cleared', function () {
		exitbutton.setAttribute('color', "black");
	});
}

function createGrid(size) {

	for (var i = -size; i <= size; i++) {
		var z = document.createElement('a-entity');
		var x = document.createElement('a-entity');
		var y = document.createElement('a-entity');
		var marksx = document.createElement('a-entity');
		var marksz = document.createElement('a-entity');

		// Clase linea para acceder a todos ellos
		z.setAttribute('class','linedit');
		y.setAttribute('class','linedit');
		x.setAttribute('class','linedit');
		marksx.setAttribute('class','linedit');
		marksz.setAttribute('class','linedit');

		// Cuadrícula
		z.setAttribute('line', 'start: -' + size + ', 0.1, '  + i + '; end: ' + size + ' 0.1 ' + i + '; color: #47443F; visible: false');
		x.setAttribute('line', 'start: ' + i + ', 0.1, -' + size + '; end: ' + i + ' 0.1 ' + size  + '; color: #47443F; visible: false');
		if(size >= 0){
			// Marcas en el eje y
			marksx.setAttribute('line', 'start: -0.2, ' + i + ', 0; end: 0.2 ' + i + ' 0; color: #47443F; visible: false');
			marksz.setAttribute('line', 'start: 0, ' + i + ', -0.2; end: 0 ' + i + ' 0.2; color: #47443F; visible: false');
			sceneEl.appendChild(marksx);
			sceneEl.appendChild(marksz);
		}
		if(i == -size){
			// Eje y
			y.setAttribute('line', 'start: 0, 0, 0; end:  0 ' + size  + '0; color: #47443F; visible: false');
			sceneEl.appendChild(y);
		}
		sceneEl.appendChild(z);
		sceneEl.appendChild(x);
	}
}

function addaxis(entity){
	var z = document.createElement('a-entity');
	var y = document.createElement('a-entity');
	var x = document.createElement('a-entity');

	z.setAttribute('line', 'start: 0, 0, 0; end: 0 0 2; color: black; visible: false');
	y.setAttribute('line', 'start: 0, 0, 0; end: 0 2 0; color: black; visible: false');
	x.setAttribute('line', 'start: 0, 0, 0; end: 2 0 0; color: black; visible: false');
	// Clase linea para acceder a todos ellos
	z.setAttribute('class','linedit');
	y.setAttribute('class','linedit');
	x.setAttribute('class','linedit');

	entity.appendChild(x);
	entity.appendChild(y);
	entity.appendChild(z);
}

function createEl(entity, position) {
	var podiumEntity = document.querySelector("#podiumEntity");
	var podium = podiumEntity.parentNode;
	var scale = podiumEntity.getAttribute("scale");
	var colour = podiumEntity.getAttribute("color");
	var material = podiumEntity.getAttribute("material");

	/*podiumEntity.removeAttribute('class');
	podiumEntity.removeAttribute('mixin');
	podiumEntity.removeAttribute('material');*/
	//podiumEntity.removeAttribute('static-body');
	//podiumEntity.setAttribute('editable', {}); // PARA PODER CAMBIAR TEXTURA
	//podiumEntity.setAttribute('static-body', '');
	//podiumEntity.setAttribute('class', entity + " remote");
	//podiumEntity.setAttribute('grabbable', '');

	podiumEntity.parentNode.removeChild(podiumEntity);

	var newEl = document.createElement('a-entity');
	newEl.setAttribute('id', 'podiumEntity');
	newEl.setAttribute('position', "0 2 0");
	newEl.setAttribute('class', "remote");
	newEl.setAttribute('editable', {});

	switch(entity) {
		case "cylinder":
			newEl.setAttribute('mixin', 'cylinder');
			newEl.setAttribute('material', {color: '#707B7C'});
			break;
		case "sphere":
			newEl.setAttribute('mixin', 'sphere');
			newEl.setAttribute('material', {color: 'red'});
			break;
		case "box":
			newEl.setAttribute('mixin', 'box');
			newEl.setAttribute('material', {color: 'blue'});
			break;
		default:
			newEl.setAttribute('scale', '0 0 0');
			newEl.setAttribute('position', position);
	}
	newEl.setAttribute('scale', scale);
	newEl.setAttribute('color', colour);
	newEl.setAttribute('material', material);

	podium.appendChild(newEl);
}

function cloneEntity(entity){
	var podiumEntity = document.querySelector("#podiumEntity");
	var podium = podiumEntity.parentNode;
	var newEl = document.createElement('a-entity');

	newEl.setAttribute('id', 'podiumEntity');
	newEl.setAttribute('position', '0 2 0');
	newEl.setAttribute('mixin', podiumEntity.getAttribute('mixin'));
	newEl.setAttribute('scale', podiumEntity.getAttribute('scale'));
	newEl.setAttribute('material', podiumEntity.getAttribute('material'));
	newEl.setAttribute('color', podiumEntity.getAttribute('color'));
	newEl.setAttribute('class', "remote");
	newEl.setAttribute('editable', {});

	// Podium's entity changes
	podiumEntity.removeAttribute('id');
	podiumEntity.classList.add("gridded");

	// Añado a la entidad sus ejes
	addaxis(podiumEntity);

	podium.appendChild(newEl);
}

function getNewPosition(){
	var x = playerEl.getAttribute('position').x;
	var y = playerEl.getAttribute('position').y;
	var z = playerEl.getAttribute('position').z;

	if(z < 0){
		z = z+1;
	}else{
		z = z-1;
	}
	return ((x+0.25) + " " + (y+1.5) + " " + (z));
}

function changeColor(color){
	var podiumEntity = document.querySelector("#podiumEntity");

	if(color === 'white'){
		podiumEntity.removeAttribute('material');
	}
	podiumEntity.setAttribute('material', "color:" + color);
}

function changeTexture(txt){
	var podiumEntity = document.querySelector("#podiumEntity");

	podiumEntity.removeAttribute("material");
	podiumEntity.setAttribute('material', "src:#" + txt);
}

function setHolos(){
	var holoCylinderEl = document.querySelector('#cylinderHolo');
	var holoBoxEl = document.querySelector('#boxHolo');
	var holoSphereEl = document.querySelector('#sphereHolo');


	// Sphere Holo Events
	holoSphereEl.addEventListener('grab-start', function() {
		createEl("sphere", getNewPosition());
	});
	// Cylinder Holo Events
	holoCylinderEl.addEventListener('grab-start', function() {
		createEl("cylinder", getNewPosition());
	});
	// Box Holo Events
	holoBoxEl.addEventListener('grab-start', function() {
		createEl("box", getNewPosition());
	});
}

function setButtons(){
	var buttonCylinderEl = document.querySelector('#buttonCylinder');
	var buttonBoxEl = document.querySelector('#buttonBox');
	var buttonSphereEl = document.querySelector('#buttonSphere');
	var buttonBlue = document.querySelector('#buttonblue');
	var buttonWhite = document.querySelector('#buttonwhite');
	var buttonRed = document.querySelector('#buttonred');
	var buttonYellow = document.querySelector('#buttonyellow');
	var buttonPink = document.querySelector('#buttonpink');
	var buttonGreen = document.querySelector('#buttongreen');
	var buttonDiamond = document.querySelector('#buttondiamond');
	var buttonGranito = document.querySelector('#buttongranito');
	var buttonMosaico = document.querySelector('#buttonmosaico');

	// Sphere Holo Events
	buttonSphereEl.addEventListener('grab-start', function() {
		createEl("sphere", getNewPosition());
	});
	// Cylinder Holo Events
	buttonCylinderEl.addEventListener('grab-start', function() {
		createEl("cylinder", getNewPosition());
	});
	// Box Holo Events
	buttonBoxEl.addEventListener('grab-start', function() {
		createEl("box", getNewPosition());
	});
	// Colours and textures
	buttonBlue.addEventListener('grab-start', function() {
		changeColor("blue");
	});
	buttonWhite.addEventListener('grab-start', function() {
		changeColor("white");
	});
	buttonRed.addEventListener('grab-start', function() {
		changeColor("red");
	});
	buttonYellow.addEventListener('grab-start', function() {
		changeColor("yellow");
	});
	buttonPink.addEventListener('grab-start', function() {
		changeColor("pink");
	});
	buttonGreen.addEventListener('grab-start', function() {
		changeColor("green");
	});
	buttonDiamond.addEventListener('grab-start', function() {
		changeTexture("diamond");
	});
	buttonGranito.addEventListener('grab-start', function() {
		changeTexture("granito");
	});
	buttonMosaico.addEventListener('grab-start', function() {
		changeTexture("mosaico");
	});
}

function createButtonText(entity, button){
	let text = document.createElement('a-text');

	text.setAttribute('position', "0 0 0.05");
	text.setAttribute('align', "center");
	text.setAttribute('value', entity);
	text.setAttribute('width', '2');
	text.setAttribute('height', '2');
	text.setAttribute('color', 'black');

	button.appendChild(text);
}

function sliderText(slider){
	let text = document.createElement('a-text');

	text.setAttribute('position', "0 0.75 0.05");
	text.setAttribute('align', "center");
	text.setAttribute('value', 'Range Slider');
	text.setAttribute('width', '8');
	text.setAttribute('height', '8');
	text.setAttribute('font', 'kelsonsans');
	text.setAttribute('color', 'black');

	slider.appendChild(text);
}

function sliderAction(evt) {
	var entity = document.querySelector('#podiumEntity');

	if(evt.detail.intersection.point.x >= 0){
		evt.detail.intersection.point.x = evt.detail.intersection.point.x*2;
	}

	entity.setAttribute('scale', (2+evt.detail.intersection.point.x) + " " +(2+evt.detail.intersection.point.x) + " " +(2+evt.detail.intersection.point.x));
}

AFRAME.registerComponent('editable', {
	schema: {
		active: {type: 'boolean', default: false},
		colors: {default: ["blue", "green", "purple", "black"]},
		textures: {default: ["#diamond", "#granito", "#mosaico"]},
	},

	init: function () {
		let el = this.el;
		let data = this.data;

		this.el.addEventListener('grab-start', function() {

			if(data.active === false){
				data.active = true;

				let editTable = document.createElement('a-entity');

				editTable.setAttribute('geometry', {primitive: 'plane', width: 1, height: 0.5});
				editTable.setAttribute('material', "color:" + 'orange');
				editTable.setAttribute('strechable', {});
				editTable.setAttribute('class', "editTable");
				editTable.setAttribute('position', "1.5 0 0");

				let colors = data.colors;
            	for (let color of colors){
	                let colorButton = document.createElement('a-entity');
					colorButton.setAttribute('geometry', {primitive: 'box',
										width: 0.1, height: 0.1, depth: 0.025});
	                colorButton.setAttribute('id', "botton" + color);
					colorButton.setAttribute('class', 'remote');
	                colorButton.setAttribute('position', ((colors.indexOf(color)*0.2)-0.3)+" 0.125 0.01");
	                colorButton.setAttribute('material', "color:" + color);
					colorButton.setAttribute('clickable', {});
	                colorButton.setAttribute('button', '');
	                editTable.appendChild(colorButton);
            	}
				let textures = data.textures;
            	for (let texture of textures){
	                let textureButton = document.createElement('a-entity');
					textureButton.setAttribute('geometry', {primitive: 'box',
										width: 0.1, height: 0.1, depth: 0.025});
	                textureButton.setAttribute('id', "botton" + texture);
					textureButton.setAttribute('class', 'remote');
	                textureButton.setAttribute('position', ((textures.indexOf(texture)*0.2)-0.3)+" -0.125 0.01");
	                textureButton.setAttribute('material', "src:" + texture);
					textureButton.setAttribute('clickable', {});
	                textureButton.setAttribute('button', '');
	                editTable.appendChild(textureButton);
            	}

				let defaultButton = document.createElement('a-entity');
				defaultButton.setAttribute('geometry', {primitive: 'box',
									width: 0.1, height: 0.1, depth: 0.025});
				defaultButton.setAttribute('id', "bottonDefault");
				defaultButton.setAttribute('class', 'remote');
				defaultButton.setAttribute('position', ("0.3 -0.125 0.01"));
				defaultButton.setAttribute('material', el.getAttribute('material'));
				defaultButton.setAttribute('clickable', {});
				defaultButton.setAttribute('button', '');
				editTable.appendChild(defaultButton);

				el.appendChild(editTable);
				cloneEntity(this.el);
				event.stopPropagation();
			}
		});
	}
});

AFRAME.registerComponent('button', {
	init: function () {
		let el = this.el;

		el.addEventListener('grab-start', function() {
			let entity = el.parentNode.parentNode;

			entity.setAttribute('material', el.getAttribute('material'));
			event.stopPropagation();
		});
	}
});

AFRAME.registerComponent('exitbutton', {
	init: function () {
		let el = this.el;

		el.addEventListener('grab-start', function() {
			let entity = el.parentNode.parentNode;
			let table = el;

			table.parentNode.removeChild(table);
			event.stopPropagation();
		});
	}
});

AFRAME.registerComponent('create-table', {
	schema: {
		textures: {default: ["cylinder", "box", "sphere"]},
	},

	init: function () {
		let el = this.el;

		el.addEventListener('grab-start', function () {
			var table = document.createElement('a-entity');
			var scene = document.querySelector('a-scene');
			var cylinder = document.createElement('a-cylinder');
			var box = document.createElement('a-box');
			var sphere = document.createElement('a-sphere');

			table.setAttribute('id','palette');
			table.setAttribute('position','0 0 5');
			table.setAttribute('gltf-model','#table');
			table.setAttribute('scale','0.02 0.02 0.02');
			table.setAttribute('static-body','');
			// Cilindro
			cylinder.setAttribute('id','cylinderHolo');
			cylinder.setAttribute('class','holo');
			cylinder.setAttribute('clickable',{});
			cylinder.setAttribute('position','0.5 1.25 5.75');
			cylinder.setAttribute('radius','0.25');
			cylinder.setAttribute('height','0.25');
			cylinder.setAttribute('color','#707B7C');
			cylinder.setAttribute('transparent','true');
			cylinder.setAttribute('opacity','0.7');
			cylinder.setAttribute('animation','property: position; dur: 2000; to: 0.5 1.5 5.75; dir: alternate; loop: true');
			// Cubo
			box.setAttribute('id','boxHolo');
			box.setAttribute('class','holo');
			box.setAttribute('clickable',{});
			box.setAttribute('position','0.5 1.25 4.75');
			box.setAttribute('width','0.5');
			box.setAttribute('height','0.5');
			box.setAttribute('depth','0.5');
			box.setAttribute('color','blue');
			box.setAttribute('transparent','true');
			box.setAttribute('opacity','0.7');
			box.setAttribute('animation','property: position; dur: 1800; to: 0.5 1.5 4.75; dir: alternate; loop: true');
			// Esfera
			sphere.setAttribute('id','sphereHolo');
			sphere.setAttribute('class','holo');
			sphere.setAttribute('clickable',{});
			sphere.setAttribute('position',"-0.5 1.25 5.75");
			sphere.setAttribute('radius','0.25');
			sphere.setAttribute('color','red');
			sphere.setAttribute('transparent','true');
			sphere.setAttribute('opacity','0.7');
			sphere.setAttribute('animation','property: position; dur: 2500; to: -0.5 1.5 5.75; dir: alternate; loop: true');
			// Añado a la escena
			scene.appendChild(table);
			scene.appendChild(cylinder);
			scene.appendChild(box);
			scene.appendChild(sphere);

			setHolos();

			// Elimina la eleccion
			//el.parentNode.parentNode.removeChild(el.parentNode);

			event.stopPropagation();
		});
	}
});

AFRAME.registerComponent('create-panel', {
	schema: {
		entities: {default: ["Cylinder", "Box", "Sphere"]},
	},

	init: function () {
		let el = this.el;
		let data = this.data;

		el.addEventListener('grab-start', function () {
			var panel = document.createElement('a-plane');
			var scene = document.querySelector('a-scene');

			panel.setAttribute('id','panel');
			panel.setAttribute('position',"4 2 -4");
			panel.setAttribute('color',"grey");
			panel.setAttribute('height','1.1');
			panel.setAttribute('width','5');
			panel.setAttribute('static-body','');

			let color = ['blue', 'white', 'red'];
			let colours = ['blue', 'white', 'red', 'yellow', 'pink', 'green', "#diamond", "#granito", "#mosaico"];
			let entities = data.entities;
			let i = 0;
			for (let entity of entities){
				let button = document.createElement('a-entity');
				button.setAttribute('geometry', {primitive: 'box',
									width: 0.5, height: 0.5, depth: 0.025});
				button.setAttribute('id', "button" + entity);
				button.setAttribute('class', 'remote');
				button.setAttribute('position', ((entities.indexOf(entity)*0.3)-0.3) + ((entities.indexOf(entity)*0.3)-0.3)+" -0.15");
				button.setAttribute('material', "color:" + color[i]);
				button.setAttribute('clickable', {});
				createButtonText(entity, button);
				panel.appendChild(button);

				i++;
			}
			i = 0;
			for (let colour of colours){
				let button = document.createElement('a-entity');
				button.setAttribute('geometry', {primitive: 'box',
									width: 0.25, height: 0.25, depth: 0.025});

				button.setAttribute('class', 'remote');
				button.setAttribute('position', (((colours.indexOf(colour)*0.2)-0.2)-1) + ((colours.indexOf(colour)*0.3)-0.9) + " 0.3");
				if(i <= 5){
					button.setAttribute('id', "button" + colour);
					button.setAttribute('material', "color:" + colours[i]);
				}else{
					button.setAttribute('id', "button" + colour.slice(1));
					button.setAttribute('material', "src:" + colours[i]);
				}
				button.setAttribute('clickable', {});
				panel.appendChild(button);

				i++;
			}
			scene.appendChild(panel);

			setButtons();

			// Crea Range Slider
			let slider = document.createElement('a-gui-slider');
			slider.setAttribute('id', "slider");
			slider.setAttribute('class', "remote");
			slider.setAttribute('width', "2.5");
			slider.setAttribute('height', "2.2");
			slider.setAttribute('percent', "0.5");
			slider.setAttribute('margin', "0 0 0.05 0");
			slider.setAttribute('gui-interactable', "");
			slider.setAttribute('gui-item', "");
			slider.setAttribute('gui-slider', "");
			slider.setAttribute('position', "3 4 -4");
			slider.setAttribute('clickable', "");
			slider.setAttribute('hoverable', "");
			slider.setAttribute('onclick', "sliderAction");
			slider.setAttribute('onhover', "sliderAction");
			sliderText(slider);

			scene.appendChild(slider);


			// Elimina la eleccion
			//el.parentNode.parentNode.removeChild(el.parentNode);

			event.stopPropagation();
		});
	}
});

AFRAME.registerComponent('edit-mode', {
	schema: {
		event: {type: 'string', default: 'click'},
	},

	init: function () {
		var self = this;

		document.addEventListener("keydown", event => {
			var griddedEls = sceneEl.querySelectorAll('.gridded');
			var lines = sceneEl.querySelectorAll('.linedit');
			var ground = sceneEl. querySelector('#ground');
			if (event.isComposing || event.keyCode === 71) {
				for (var i = 0; i < griddedEls.length; i++) {
					griddedEls[i].setAttribute('material', "wireframe:true");
				}
				for (var i = 0; i < lines.length; i++) {
					lines[i].setAttribute('line', "visible:true");
				}
				ground.removeAttribute("src");
				ground.setAttribute("color","green");
			}
			if (event.isComposing || event.keyCode === 72) {
				for (var i = 0; i < griddedEls.length; i++) {
					griddedEls[i].setAttribute('material', "wireframe:false");
				}
				for (var i = 0; i < lines.length; i++) {
					lines[i].setAttribute('line', "visible:false");
				}
				ground.removeAttribute("color");
				ground.setAttribute("src","#groundimg");
			}
		});
	}
});

AFRAME.registerComponent('enter-edit-mode', {
	schema: {
		event: {type: 'string', default: 'click'},
	},

	init: function () {
		let el = this.el;

		el.addEventListener("grab-start", function() {
			var griddedEls = sceneEl.querySelectorAll('.gridded');
			var lines = sceneEl.querySelectorAll('.linedit');
			var ground = sceneEl. querySelector('#ground');


			for (var i = 0; i < griddedEls.length; i++) {
				griddedEls[i].setAttribute('material', "wireframe:true");
			}
			for (var i = 0; i < lines.length; i++) {
				lines[i].setAttribute('line', "visible:true");
			}
			ground.removeAttribute("src");
			ground.setAttribute("color","#8AD350");
		});
	}
});

AFRAME.registerComponent('exit-edit-mode', {
	schema: {
		event: {type: 'string', default: 'click'},
	},

	init: function () {
		let el = this.el;

		el.addEventListener("grab-start", function() {
			var griddedEls = sceneEl.querySelectorAll('.gridded');
			var lines = sceneEl.querySelectorAll('.linedit');
			var ground = sceneEl. querySelector('#ground');


			for (var i = 0; i < griddedEls.length; i++) {
				griddedEls[i].setAttribute('material', "wireframe:false");
			}
			for (var i = 0; i < lines.length; i++) {
				lines[i].setAttribute('line', "visible:false");
			}
			ground.removeAttribute("color");
			ground.setAttribute("src","#groundimg");
		});
	}
});
