
(function(_c) {

	var $commits   = $('.single-chart-commits');
	var $frequency = $('.single-chart-frequency');
	var $chartButtons = $('.chart-buttons .button');

	Highcharts.setOptions({
		title: {
			text: false
		},
		subtitle: {
			text: false
		},
		credits : {
			enabled : false
		},
		legend: {
			enabled: false
		},
		exporting : {
			enabled : false,
		},
	});

	function initCharts() {
		if( $commits.length && $commits.is(':visible') && ! $commits.find('> *').length ) {
			commitsChart();
		}
		if( $frequency.length && $frequency.is(':visible') && ! $frequency.find('> *').length ) {
			frequencyChart();
		}
	}

	function commitsChart() {
		$commits.highcharts({
			chart: {
				type: 'column'
			},
			xAxis: {
				type: 'category',
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Population (millions)'
				}
			},
			series: [{
				name: 'Population',
				data: [
				['Shanghai', 23.7],
				['Lagos', 16.1],
				['Istanbul', 14.2],
				['Karachi', 14.0],
				['Mumbai', 12.5],
				['Moscow', 12.1],
				['São Paulo', 11.8],
				['Beijing', 11.7],
				['Guangzhou', 11.1],
				['Delhi', 11.1],
				['Shenzhen', 10.5],
				['Seoul', 10.4],
				['Jakarta', 10.0],
				['Kinshasa', 9.3],
				['Tianjin', 9.3],
				['Tokyo', 9.0],
				['Cairo', 8.9],
				['Dhaka', 8.9],
				['Mexico City', 8.9],
				['Lima', 8.9]
				],
			}]
		});
	}

	function frequencyChart() {
		$frequency.highcharts({
			chart: {
				type: 'area'
			},
			xAxis: {
				categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
			},
			series: [{
				name: 'John',
				data: [5, 3, 4, 7, 2]
			}, {
				name: 'Jane',
				data: [2, -2, -3, 2, 1]
			}]
		});
	}

	$chartButtons.on('click', function(e) {
		e.preventDefault();

		var $ele = $(this);
		if( $ele.hasClass('active') ) {
			return;
		}
		$('.chart-buttons .button.active').removeClass('active');
		$ele.addClass('active');
		var id = $ele.attr('href');
		$('.single-chart').addClass('hidden');
		$(id).removeClass('hidden');

		setTimeout(initCharts, 0);
	});

	_c.$doc.on('ready loaded', initCharts);

})(window.Clique);
