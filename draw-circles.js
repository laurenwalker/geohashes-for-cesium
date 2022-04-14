function start(){// Your access token can be found at: https://cesium.com/ion/tokens.

    Cesium.Ion.defaultAccessToken = ""
    
    const viewer = new Cesium.Viewer('cesiumContainer', {
      projectionPicker: true,
    });
        
    const drawGeohashes = function(){
        bboxes(-90,-180,90,180,2).forEach( (hash) => {
      
          let bbox = decode_bbox(hash),
              count = parseInt(Math.random()*100);
      
          let circle = viewer.entities.add({
            position : Cesium.Cartesian3.fromDegrees((bbox[3]+bbox[1])/2, (bbox[2]+bbox[0])/2),
            ellipse: {
              semiMinorAxis: count/100 * 350000.0,
              semiMajorAxis: count/100 * 350000.0,
              height: 200000.0,
              material: Cesium.Color.fromHsl(170/360, 0.5, 0.5, 0.5),
              outline: false
            }
          });
      
          let label = viewer.entities.add({
            position : Cesium.Cartesian3.fromDegrees((bbox[3]+bbox[1])/2, (bbox[2]+bbox[0])/2),
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
console.log(`Draw geohash circles took ${t1 - t0} milliseconds.`);
    
    }
    
    start()
    