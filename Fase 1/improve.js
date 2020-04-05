function createEl(entity, position) {
	var newEl = document.createElement('a-entity');

	newEl.setAttribute('position', position);
	newEl.setAttribute('editable', {});
	newEl.setAttribute('static-body', '');
	newEl.setAttribute('class', entity + " remote");

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

	sceneEl.appendChild(newEl);
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

			console.log("entra");

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

				let exitButton = document.createElement('a-entity');
				exitButton.setAttribute('geometry', {primitive: 'cylinder',
									radius: 0.03, height: 0.025});
				exitButton.setAttribute('id', "bottonExit");
				exitButton.setAttribute('class', 'remote');
				exitButton.setAttribute('position', ("0.43 0.2 0.01"));
				exitButton.setAttribute('rotation', ("-90 0 0"));
				exitButton.setAttribute('material', "src: #x");
				exitButton.setAttribute('clickable', {});
				exitButton.setAttribute('exitbutton', '');
				editTable.appendChild(exitButton);

				el.appendChild(editTable);
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
			let table = el.parentNode;

			entity.removeChild(table);
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

			event.stopPropagation();
		});
	}
});

AFRAME.registerComponent('create-panel', {
	schema: {
		entities: {default: ["cylinder", "box", "sphere"]},
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
			panel.setAttribute('height','3');
			panel.setAttribute('width','2');
			panel.setAttribute('static-body','');

			let entities = data.entities;
			for (let entity of entities){
				let button = document.createElement('a-entity');
				button.setAttribute('geometry', {primitive: 'box',
									width: 1, height: 1, depth: 0.025});
				button.setAttribute('id', "botton" + entity);
				button.setAttribute('class', 'remote');
				button.setAttribute('position', "0.3 " + ((entities.indexOf(entity)*0.2)-0.3)+" 0.01");
				button.setAttribute('material', "color: black");
				button.setAttribute('clickable', {});
				panel.appendChild(button);
			}
			scene.appendChild(panel);

			event.stopPropagation();
		});
	}
});
