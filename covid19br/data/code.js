

$.ajax({
	type: "GET",
	url: "https://raw.githubusercontent.com/wcota/covid19br/master/_control.csv",
	dataType: "text",
	success: function(data) {runAll(data);}
});

function runAll(_controlValue) {

	function makeplot() {
		Plotly.d3.csv("https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv", function(data){ processData(data) } );
	
	};
   
	function processData(allRows) {

		//    console.log(allRows);
		var x = [], y = [], xn = [], yn = [];

		maxval = 0;
		valDeath = 0;

		for (var i=0; i<allRows.length; i++) {
			row = allRows[i];
			if (row['state'] == 'TOTAL') {
				x.push( row['date'] );
				y.push( row['totalCases'] );
				xn.push( row['date'] );
				yn.push( row['newCases'] );
				maxval = Math.max(row['totalCases'], maxval);
			};
		};
		//console.log(maxval);
		var diferenca = parseInt(maxval) - parseInt(_controlValue);
		document.getElementById("maxCases").innerHTML = '<b><u>Total de casos: '+maxval+'</u> ('+ _controlValue + ' mortes*)</b>';
		// document.getElementById("maxCases").innerHTML = '<b><u>Total de casos: '+maxval+'</u> ('+ diferenca + ' + ' + _controlValue + ' mortes)</b>';
		//    console.log( 'X',x, 'Y',y );
		makePlotly( x, y, xn, yn);
		makePlotlylog( x, y, xn, yn);
	}

	function makePlotly( x, y, xn, yn){
	var plotDiv = document.getElementById("plot");
	var totCases = {
		x: x, 
		y: y,
		mode: 'markers',
		name: 'Casos confirmados',
			marker: {
				color: 'rgb(219, 64, 82)',
				size: 18
			}
	};
	var newCases = {
		x: xn, 
		y: yn,
		name: 'Novos casos',
		type: 'bar',
			marker: {
				color: '#3f51db'
			}
	};
	
	var layout = {
		margin : {'r' :10 },
		title: 'COVID-19 no Brasil',
		font:{
			family: 'Raleway, sans-serif',
		size: 14
		},
		showlegend: true,
			legend : {
				x: 0,
				y: 1,
				font: {
					size: 16
				},
			},
		xaxis: {
			tickangle: 0,
			fixedrange: true,
			title: "Data",
			tickfont: {
				size: 18
			},
			titlefont: {
				size: 18
			},
			tickmode: "auto",
			//tick0: '2020-02-25',
			tickformat: '%d/%m',
			//dtick: 1 * 24 * 60 * 60 * 1000 // milliseconds
		},
		yaxis: {
			//  type: 'log',
			fixedrange: true,
			tickfont: {
			size: 18
			},
			titlefont: {
			size: 18
		},
		//  dtick: 1,
		title: "Número de casos",
			autorange: true
			//zeroline: false,
			//gridwidth: 2
		},
		bargap :0.1
	};

	var config = {responsive: true,
		modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
		};

	Plotly.newPlot('plotlydiv', [totCases,newCases], layout, config);

	
	};


	function makePlotlylog( x, y, xn, yn){
		var plotDiv = document.getElementById("plot");
		var totCases = {
			x: x, 
			y: y,
			mode: 'markers',
			name: 'Casos confirmados',
			marker: {
				color: 'rgb(219, 64, 82)',
				size: 18
			}
		};
		var newCases = {
			x: xn, 
			y: yn,
			name: 'Novos casos',
			type: 'bar',
			marker: {
				color: '#3f51db'
			}
		};
		
		var layout = {
		margin : {'r' :10 },
		title: 'COVID-19 no Brasil (escala log)',
		font:{
			family: 'Raleway, sans-serif',
		size: 14
		},
		showlegend: true,
			legend : {
				x: 0,
				y: 1,
				font: {
					size: 16
				},
			},
		xaxis: {
			tickangle: 0,
			fixedrange: true,
			title: "Data",
			tickfont: {
				size: 18
			},
			titlefont: {
				size: 18
			},
			tickmode: "auto",
			//tick0: '2020-02-25',
			tickformat: '%d/%m',
			//dtick: 1 * 24 * 60 * 60 * 1000 // milliseconds
		},
		yaxis: {
			type: 'log',
			fixedrange: true,
			tickfont: {
			size: 18
			},
			titlefont: {
			size: 18
		},
		dtick: 1,
		title: "Número de casos",
			autorange: true
			//zeroline: false,
			//gridwidth: 2
		},
		bargap :0.1
		};
	
		var config = {responsive: true,
		modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
		};
	
		Plotly.newPlot('plotlydivlog', [totCases,newCases], layout, config);
	};

	makeplot();
	
	

	function format_link(link){
		if (link)
		return "<a href='" + link + "' target='_blank'>" + link + "</a>";
		else
		return "";
	};
	var statesName = {
		'RO' : 'Rondônia',
		'AC' : 'Acre',
		'AM' : 'Amazonas',
		'RR' : 'Roraima',
		'PA' : 'Pará',
		'AP' : 'Amapá',
		'TO' : 'Tocantins',
		'MA' : 'Maranhão',
		'PI' : 'Piauí',
		'CE' : 'Ceará',
		'RN' : 'Rio Grande do Norte',
		'PB' : 'Paraíba',
		'PE' : 'Pernambuco',
		'AL' : 'Alagoas',
		'SE' : 'Sergipe',
		'BA' : 'Bahia',
		'MG' : 'Minas Gerais',
		'ES' : 'Espírito Santo',
		'RJ' : 'Rio de Janeiro',
		'SP' : 'São Paulo',
		'PR' : 'Paraná',
		'SC' : 'Santa Catarina',
		'RS' : 'Rio Grande do Sul',
		'MS' : 'Mato Grosso do Sul',
		'MT' : 'Mato Grosso',
		'GO' : 'Goiás',
		'DF' : 'Distrito Federal'
	};
	function format_stateb(state){

			if (statesName[state]) {
				return '<b>'+statesName[state]+' ('+state+')'+'</b>';
			}
			else {
				return '<b><i>'+state+'</i></b>';
			}
	};
	function format_state(state){
	
			if (statesName[state]) {
				return statesName[state]+' ('+state+')';
			}
			else {
				return state;
			}
		};
		function format_bold(valor){
		return '<b>'+valor+'</b>'
		};
		function format_red(valor){
			if (valor > 0 ) {
				return '<span style="color:red">'+valor+'</span>'
			}
		};


	CsvToHtmlTable.init({
		csv_path: 'https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-total.csv', 
		element: 'totalContent', 
		allow_download: true,
		csv_options: {separator: ',', delimiter: '"'},
		datatables_options: {"paging": false, "order" : [2, 'desc'], "language" : {"url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"},
				"columnDefs": [
					{ "visible": false, "targets" : 0 },
					{ "title": 'Estado', "targets" : 1 },
					{ "title": 'Total', "targets" : 2 },
					{ "title": 'Ministério da Saúde (MS)*', "targets" : 3 },
					{ "title": 'Diferença*', "targets" : 4 },
					{ "title": 'Mortes (MS)*', "targets" : 5 }
				]
					
				},
		custom_formatting: [[6, format_link], [5, format_red], [1, format_stateb], [2, format_bold]] 
	});

	CsvToHtmlTable.init({
		csv_path: 'https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities.csv', 
		element: 'municipioContent', 
		allow_download: true,
		csv_options: {separator: ',', delimiter: '"'},
		datatables_options: {"paging": false, "order" : [3, 'desc'], "language" : {"url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"},
		"columnDefs": [
			{ "visible": false, "targets" : 0 },
			{ "title": 'Estado', "targets" : 1 },
			{ "title": 'Cidade', "targets" : 2 },
			{ "title": 'Total', "targets" : 3 },
		]},
		custom_formatting: [[1, format_state], [2, format_bold], [3, format_bold]] 
		});

	CsvToHtmlTable.init({
		csv_path: 'https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv', 
		element: 'estadoContent', 
		allow_download: true,
		csv_options: {separator: ',', delimiter: '"'},
		datatables_options: {"paging": true, "order" : [[0, 'desc'],[5, 'desc']], "language" : {"url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"},
		"columnDefs": [
			{ "title": 'Data', "targets" : 0 },
			{ "visible": false, "targets" : 1 },
			{ "title": 'Estado', "targets" : 2 },
			{ "visible": false, "targets" : 3 },
			{ "title": 'Novos casos', "targets" : 4 },
			{ "title": 'Total', "targets" : 5 },
		]},
		custom_formatting: [[2, format_stateb], [0, format_bold], [5, format_bold]] 
		});
	

	CsvToHtmlTable.init({
		csv_path: 'https://raw.githubusercontent.com/wcota/covid19br/master/sources.csv', 
		element: 'fontesContent', 
		allow_download: true,
		csv_options: {separator: ',', delimiter: '"'},
		datatables_options: {"paging": true, lengthChange : false, "orderFixed": true, "order" : [0, 'desc'], "language" : {"url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"},
		"columnDefs": [
			{ "title": 'Data de Acesso', "targets" : 0 }]
		},
		custom_formatting: [[1, format_link]] 
	});
	

	$(document).ready(function () {
		$('#total').click(function () {
			$(' #totalContent').slideToggle('slow', function () {
				$('#total').focus();
			});
			return false;
		});
		$('#municipio').click(function () {
			$('#municipioContent').slideToggle('slow', function () {
				$('#municipioContent').focus();
			});
			return false;
		});
		$('#estado').click(function () {
			$('#estadoContent').slideToggle('slow', function () {
				$('#estadoContent').focus();
			});
			return false;
		});
		$('#fontes').click(function () {
			$('#fontesContent').slideToggle('slow', function () {
				$('#fontesContent').focus();
			});
			return false;
		});
	});
};