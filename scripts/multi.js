//Marcadores

//Variables globales
var markersURLArray=[];
var markersNameArray=[];
var modelsNumArray=[];

AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		var sceneEl = document.querySelector('a-scene');
		
		//Lista marcadores
		for(var i=1; i<34; i++)
		{
			var url="marcadores/pattern-"+i+".patt";
			markersURLArray.push(url);
			markersNameArray.push('Marker_'+i);
			modelsNumArray.push('modelo'+i);
			//console.log(url);
		}

		for(var k=0; k<33; k++)
		{
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);
			markerEl.setAttribute('raycaster', 'objects: .clickable');
			markerEl.setAttribute('cursor', {fuse: true, rayOrigin: 'mouse'});
			markerEl.setAttribute('smooth',true);
			markerEl.setAttribute('smoothCount',10);
			markerEl.setAttribute('smoothTolerance',.01);
			markerEl.setAttribute('smoothThreshold',5);
			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			//Modelos 3D
			var modelEl = document.createElement('a-entity');
			
			modelEl.setAttribute('id','Model_'+modelsNumArray[k]);
			modelEl.setAttribute('gltf-model','#'+modelsNumArray[k]);
			modelEl.setAttribute('animation-mixer','loop: pingpong');
			modelEl.setAttribute('gesture-handler', { enabled: true });
			modelEl.object3D.position.set(0, 0, 0);
			modelEl.object3D.scale.set(7, 7, 7);
			modelEl.object3D.rotation.set(0, 0, 0);

			markerEl.appendChild(modelEl);

			//Texto
			//var textEl = document.createElement('a-entity');
			
			//textEl.setAttribute('id','text');
			//textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});
			
			//textEl.object3D.position.set(0, 0.7, 0);
			//textEl.object3D.rotation.set(-90, 0, 0);
			//markerEl.appendChild(textEl);
		}
	}
});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('Marker Found: ', markerId);
			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});