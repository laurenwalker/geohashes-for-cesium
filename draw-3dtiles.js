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

window.tileset;
var counts = {};

drawGeohashes = function(){
  tileset = new Cesium.Cesium3DTileset({
    url: "tilesets/geohash/tileset.json",
    debugWireframe: false,
    debugShowBoundingVolume: false,
    debugShowContentBoundingVolume: false
  });

  tileset.style = new Cesium.Cesium3DTileStyle({
    show: true,
  });
  viewer.scene.primitives.add(tileset);

  tileset.allTilesLoaded.addEventListener(() => {
    drawLabels()
    changeColors()
  });

  drawLabels = function(){

    bboxes(-90,-180,90,180,2).forEach( (hash) => {

      let bbox = decode_bbox(hash),
          count = parseInt(Math.random()*100);

      //Save the count for this hash in the count map
      counts[hash] = count;

      let label = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees((bbox[3]+bbox[1])/2, (bbox[2]+bbox[0])/2),
        label : {
            text : hash,//count.toString(),
            font : '14pt monospace',
            style: Cesium.LabelStyle.FILL,
            outlineWidth : 0,
            //Make label text smaller when zoomed out, larger when zoomed in
            scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 8.0e6, 0.7)
        }
      });

        //Draw polygons to "outline" the 3D Tiles.
        //Commented out because it's too slow to work well.
      /*polygon = viewer.entities.add({
        polygon : {
          hierarchy : Cesium.Cartesian3.fromDegreesArray([ 
            bbox[1], bbox[0],
            bbox[3], bbox[0],  
            bbox[3], bbox[2],
            bbox[1], bbox[2] ]),
          height : 1,
          material : Cesium.Color.fromHsl(170/360, .5, .5, 0),
          outline : true,
          outlineColor : Cesium.Color.WHITE
        }
      });*/
      
    });
    
  }

  changeColors = function(){
    tileset.style = new Cesium.Cesium3DTileStyle({
      color : { 
        evaluateColor : function(feature, result) { 
          console.log(feature.getProperty("id"))
          let alpha = (["yt", "28", 28].indexOf(feature.getProperty("geohash"))>-1)? 0 : 1;
          let percent = counts[feature.getProperty("geohash")]/100;
          return Cesium.Color.fromHsl(Math.floor(Math.random() * 360)/360, 0.5, 0.6, alpha);
    }}})
  }
 


} 

const t0 = performance.now();
drawGeohashes()      
const t1 = performance.now();    
console.log(`Draw geohash 3dtiles took ${t1 - t0} milliseconds.`);
   
}

start()
