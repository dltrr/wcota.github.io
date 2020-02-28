// Author: Wesley Cota <http://wesleycota.com/>
// Based on https://leafletjs.com/examples/choropleth/

document.getElementById("mapdate").textContent=riskDate;

var map = L.map('map'); //.setView([40,-4], 6);

var gps1 = [27.328890,-18.636901];
var gps2 = [44.024195,4.604581];

map.fitBounds([gps1, gps2]);

//map.setMaxBounds([gps1,gps2]);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, ' +
        'Adapted by <a href="http://wesleycota.com/" ref="author">Wesley Cota</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    if (props) {
        var a = getRisk(props.CODIGOINE);
        msg = (isNaN(a) ? 'Sin datos' : (a*100.0).toFixed(4) + "%");
        this._div.innerHTML = '<h4>Riesgo COVID-19</h4>' +  '<b>' + props.NAMEUNIT + '</b><br />' + msg; // + props.CODIGOINE;
    }
    else {
        this._div.innerHTML = '<h4>Riesgo COVID-19</h4>' + 'Pase el mouse sobre un municipio';
    }
};

info.addTo(map);

// get color depending on population density value
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function getColor(e, hmax=getBaseLog(20, 0.05), hmin=getBaseLog(20, 0.00000625)) {
    if (isNaN(e)) return "#ccc";

    i = 255.0 * (hmax - (getBaseLog(20, e*100.0))) / (hmax - hmin);
    if (i > 255) i = 255;
    if (i < 0 ) i = 0;
    return 'rgb(255, ' + i + ', ' + i + ')';
}

function getRisk(d) {
if (Number(d) in riskData) {
        return riskData[Number(d)];
    } else {
        return 'Sin datos';
    }
}

function style(feature) {
    return {
        weight: 0.5,
        opacity: 0.3,
        color: '#333',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(getRisk(feature.properties.CODIGOINE))
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: '#333',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var zmd = false;
var prvzmd;

function zoomToFeature(e) {
    if (zmd) {
        map.fitBounds(prvzmd);
        zmd = false;
    }
    else {
        zmd = true;
        prvzmd = map.getBounds();
        map.fitBounds(e.target.getBounds());
    }		
}

function resetZoom() {
    map.setView([40,-4], 6);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Datos demográficos del <a href="https://www.ine.es/">Instituto Nacional de Estadística (INE)</a>.');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0.05, 0.0024, 0.000125],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length ; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from/100.0) + '"></i> ' +
            from+'%');
            // + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);