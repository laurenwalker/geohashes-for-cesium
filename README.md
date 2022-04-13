# Geohashes for Cesium

Examples of how to draw geohash polygons in Cesium using:
- Circles
- Polygons
- 3D Tiles

Each geohash has a random number label displayed, as well.

## Usage
1. You will need to update each `.js` file with your Cesium Ion access token, retrieved from your Cesium account at https://cesium.com/ion/tokens. This will render a satelite imagery layer from Cesium Ion.

```js
Cesium.Ion.defaultAccessToken = "'eyJhbGciOiJ..."
```

2. Start the local node server:

```shell
node server.js
```

3. and then visit `localhost:3003` in your web browser to view the example scripts.