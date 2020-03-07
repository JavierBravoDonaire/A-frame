AFRAME.registerComponent('editable', {
	schema: {
		active: {type: 'boolean', default: 'false'},
		colors: {default: ["blue", "green", "yellow", "black"]},
	},

	init: function () {
		let el = this.el;
		let data = this.data;

		this.el.addEventListener('grab-start', function() {

			if(data.active === false){
				data.active = true;

				let editTable = document.createElement('a-entity');

				editTable.setAttribute('geometry', {primitive: 'plane', width: 1, height: 0.5});
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
				el.appendChild(editTable);
			}
		});
	}
});

AFRAME.registerComponent('button', {
	init: function () {
		let el = this.el;

		el.addEventListener('grab-start', function() {
			entity = el.parentNode.parentNode;
			entity.setAttribute('material', el.getAttribute('material'));
		});
		// let button = document.createElement('a-entity');
		// button.setAttribute('geometry', {primitive: 'box',
		// 					width: 0.1, height: 0.1, depth: 0.025});
		// button.setAttribute('material', {color: 'red'});
		// button.setAttribute('clickable', {});
		// button.classList.add("button");
		//
		// button.addEventListener('grab-start', (e) => {
		// 	console.log("Grab-start!");
		// 	button.setAttribute('material',  {color: 'green'});
		// });
		//
		// el.appendChild(button);
	}
});
