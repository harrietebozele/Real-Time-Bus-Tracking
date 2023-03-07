mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycmlldDE3MDEiLCJhIjoiY2w4aTc1MWJ6MDE0ejN6bXAwbjg0Y2RkZyJ9.AjSwHmiIFELMjqgHCuYY1g';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.104081,42.36554],
        zoom: 13
    });
	const markerArray = [];

	async function run(){
       
	const locations = await getBusLocations();
	console.log(new Date());
	
	
	locations.forEach((bus) => {
		
		while (locations.length != markerArray.length){
			
			if (locations.length > markerArray.length) {
				let addMarker = new mapboxgl.Marker({
					color: "red"
				}).setLngLat([-71.092761, 42.357575]).addTo(map);
				markerArray.push(addMarker);
			
			} else {
				let removeMarker = markerArray.pop();
				removeMarker.remove();
			}
			
		}
		
		markerArray.forEach((marker,i) => {
		
			marker.setLngLat([locations[i].attributes.longitude,locations[i].attributes.latitude]);
		})
	})

	
	setTimeout(run, 15000);
}


async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();