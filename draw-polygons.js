function start(){// Your access token can be found at: https://cesium.com/ion/tokens.

Cesium.Ion.defaultAccessToken = ""

const viewer = new Cesium.Viewer('cesiumContainer', {
  projectionPicker: true,
});

window.zoom_to_me = function(){
  viewer.zoomTo(x);
}

drawGeohashes = function(){
  let polygon;
  bboxes(-90,-180,90,180,2).forEach( (hash) => {

    let bbox = decode_bbox(hash),
        count = parseInt(Math.random()*100),
        alpha = count/100+0.3;

    polygon = viewer.entities.add({
      polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([ 
          bbox[1], bbox[0],
            bbox[3], bbox[0],  
            bbox[3], bbox[2],
            bbox[1], bbox[2] ]),
        height : 1000,
        material : Cesium.Color.fromHsl(Math.floor(Math.random() * 360)/360, 0.5, 0.6, 0.5),
        outline : true,
        outlineColor : Cesium.Color.WHITE
      }
    });

    let label = viewer.entities.add({
      position : Cesium.Cartesian3.fromDegrees((bbox[3]+bbox[1])/2, (bbox[2]+bbox[0])/2),
      label : {
          text : hash,
          font : '14pt monospace',
          style: Cesium.LabelStyle.FILL,
          outlineWidth : 0,
          scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 8.0e6, 0.7)
      }
    });

  });
}

const t0 = performance.now();
drawGeohashes()      
const t1 = performance.now();    
console.log(`Draw geohash polygons took ${t1 - t0} milliseconds.`);
   


}

start()
