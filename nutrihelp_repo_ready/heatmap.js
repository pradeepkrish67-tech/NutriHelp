var map = L.map('heatmap').setView([20.5937,78.9629],5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);
var heatPoints = [[12.97,77.59,0.9],[19.07,72.87,0.8],[28.70,77.10,0.6],[13.08,80.27,0.7]];
L.heatLayer(heatPoints, {radius: 30, blur: 15}).addTo(map);
