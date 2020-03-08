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
		});
	}
});

AFRAME.registerComponent('exitbutton', {
	init: function () {
		let el = this.el;

		el.addEventListener('grab-start', function() {
			let entity = el.parentNode.parentNode;
			let table = el.parentNode;


			console.log(table);
			console.log(entity);
			//entity.removeChild(table);
			// entity.setAttribute('editable', 'active', false);
		});
	}
});
