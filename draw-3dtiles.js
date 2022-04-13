function start(){// Your access token can be found at: https://cesium.com/ion/tokens.

Cesium.Ion.defaultAccessToken = ""


// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
var Cartesian3 = Cesium.Cartesian3;
var ellipsoidTerrainProvider = new Cesium.EllipsoidTerrainProvider({
  ellipsoid: Cesium.Ellipsoid.WGS84
});

const viewer = new Cesium.Viewer('cesiumContainer', {
  skyAtmosphere: false,
  projectionPicker: true,
  globe: new Cesium.Globe(Cesium.Ellipsoid.WGS84),
  contextOptions : {
    alpha : true
}
});

drawGeohashes = function(){
  var tileset = new Cesium.Cesium3DTileset({
    url: "tilesets/geohash/tileset.json",
    debugShowBoundingVolume: false,
    debugShowContentBoundingVolume: false
  });

  tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["true", "color('DARKTURQUOISE', 0.5)"],
      ],
    },
    show: true,
  });
  viewer.scene.primitives.add(tileset);


  bboxes(-90,-180,90,180,2).forEach( (hash) => {

    let bbox = decode_bbox(hash),
        count = parseInt(Math.random()*100);

    let label = viewer.entities.add({
      position : Cesium.Cartesian3.fromDegrees((bbox[2]+bbox[0])/2, (bbox[3]+bbox[1])/2),
      label : {
          text : count.toString(),
          font : '14pt monospace',
          style: Cesium.LabelStyle.FILL,
          outlineWidth : 0,
          //Make label text smaller when zoomed out, larger when zoomed in
          scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 8.0e6, 0.7)
      }
    });
  });
} 

const t0 = performance.now();
drawGeohashes()      
const t1 = performance.now();    
console.log(`Draw geohash 3dtiles took ${t1 - t0} milliseconds.`);
   
}

start()
