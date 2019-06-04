
(function ($) {
	/* "YYYY-MM[-DD]" => Date */
	var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var monthAbbr = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "AGO", "SEP", "OCT", "NOV", "DIC"];
	
	function strToDate(str) {
		try {
			var array = str.split('-');
			var year = parseInt(array[0]);
			var month = parseInt(array[1]);
			var day = array.length > 2? parseInt(array[2]): 1 ;
			if (year > 0 && month >= 0) {
				return new Date(year, month - 1, day);
			} else {
				return null;
			}
		} catch (err) {}; // just throw any illegal format
	};

	/* Date => "YYYY-MM-DD" */
	function dateToStr(d) {
		/* fix month zero base */
		var year = d.getFullYear();
		var month = monthNames[d.getMonth()];
		return month + ' ' + year;
	};
	function dateToStr1(d) {
		/* fix month zero base */
		var year = d.getFullYear();
		var month = d.getMonth();
		return year + "-" + (month + 1) + "-" + d.getDate();
	};

	$.fn.calendar = function (options) {
		var _this = this;
		var opts = $.extend({}, $.fn.calendar.defaults, options);
		var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var tHead = week.map(function (day) {
			return "<th>" + day + "</th>";
		}).join("");

		_this.init = function () {
			var tpl = '<table class="cal">' +
			'<caption>' +
			'	<span class="prev"><a href="javascript:void(0);"><i class="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i></a></span>' +
			'	<span><a class="month"></a></span>' +
			'	<span class="next"><a href="javascript:void(0);"><i class="fa fa-arrow-circle-right fa-lg" aria-hidden="true"></i></a></span>' +
			'	<span style="display:none" class="month"><span>' +
			"</caption>" +
			"<tbody>" +
			"</tbody>" + "</table>" + "<p style='display:none' class='mes'></p>";
			var html = $(tpl);
			_this.append(html);
		};

		function daysInMonth(d) {
			var newDate = new Date(d);
			newDate.setMonth(newDate.getMonth() + 1);
			newDate.setDate(0);
			return newDate.getDate();
		}

		_this.update = function (date) {
			var mDate = new Date(date);
			mDate.setDate(1); /* start of the month */
			var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
			mDate.setDate(mDate.getDate()) /* now mDate is the start day of the table */

			function dateToTag(d) {
				var tag = $('<td><a href="javascript:void(0);"></a></td>');
				var a = tag.find('a');
				a.text(d.getDate());
				a.data('date', dateToStr1(d));
				var fullDate = new Date()
				var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '' + (fullDate.getMonth()+1);
				var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + fullDate.getDate();
				if (date.getMonth() != d.getMonth()) { // the bounday month
					tag.addClass('off');
				} else if (currentDate == a.data('date')) { // the select day
					tag.addClass('active');
					_this.data('date', dateToStr(d));
				}
				return tag;
			};

			var tBody = _this.find('tbody');
			tBody.empty(); /* clear previous first */
			var cols = daysInMonth(date);
			for (var i = 0; i < 1; i++) {
				var tr = $('<tr></tr>');
				for (var j = 0; j < cols; j++, mDate.setDate(mDate.getDate() + 1)) {
					tr.append(dateToTag(mDate));
				}
				tBody.append(tr);
			}

			/* set month head */
			var monthStr = dateToStr(date).replace(/-\d+$/, '');
			var monthStr1 = dateToStr1(date);
			_this.find('.month').text(monthStr)
			_this.find('.mes').text(monthStr1)
		};

		_this.getCurrentDate = function () {
			return _this.data('date');
		}

		_this.init();
		/* in date picker mode, and input date is empty,
		 * should not update 'data-date' field (no selected).
		 */
		var initDate = opts.date? opts.date: new Date();
		if (opts.date || !opts.picker) {
			_this.data('date', dateToStr(initDate));
		}
		_this.update(initDate);

		/* event binding */
		_this.delegate('tbody td', 'click', function () {
			var $this = $(this);
			_this.find('.active').removeClass('active');
			$this.addClass('active');
			_this.data('date', $this.find('a').data('date'));
			/*ocultar todas las actividades que no tengan la fecha clickeada*/
			$('.actividades-list').find('.item').each(function(){
				var fecha = $(this).find('a').find('span').text();
				var fecha_actual = _this.find('.mes').text();

				fecha = fecha.split('/');
				fecha_actual = fecha_actual.split('-');

				/*formatear dia*/
				if(fecha[0].substr(0, 1) == '0'){
					fecha[0] = fecha[0].substr(1, 1);
				}
				
				$(this).hide();

				if(fecha[0] == $this.text() && fecha_actual[0].substr(2, 2) === fecha[2] && monthAbbr[fecha_actual[1] - 1] === fecha[1]){
					$(this).show();
				}
			});
			/* if the 'off' tag become selected, switch to that month */
			if ($this.hasClass('off')) {
				_this.update(strToDate(_this.data('date')));
			}
			if (opts.picker) {  /* in picker mode, when date selected, panel hide */
				_this.hide();
			}
		});

		function updateTable(monthOffset) {
			var date = strToDate(_this.find('.mes').text());
			date.setMonth(date.getMonth() + monthOffset);
			_this.update(date);
		};

		_this.find('.next').click(function () {
			updateTable(1);
			$('.actividades-list').find('.item').each(function(){
				var fecha = $(this).find('a').find('span').text();
				var fecha_actual = _this.find('.mes').text();

				fecha = fecha.split('/');
				fecha_actual = fecha_actual.split('-');

				/*formatear dia*/
				if(fecha[0].substr(0, 1) == '0'){
					fecha[0] = fecha[0].substr(1, 1);
				}

				$(this).hide();

				if(fecha[1] == monthAbbr[(fecha_actual[1] - 1)]){
					$(this).show();
				
					$('.cal').find('tbody').find('tr').find('td').each(function(){
						var dia = $(this).find('a').text();
						if(fecha[0] == dia){
							$(this).find('a').css('color', 'red');
						}
					})
				}
			});

		});

		_this.find('.prev').click(function () {
			updateTable(-1);
			$('.actividades-list').find('.item').each(function(){
				var fecha = $(this).find('a').find('span').text();
				var fecha_actual = _this.find('.mes').text();

				fecha = fecha.split('/');
				fecha_actual = fecha_actual.split('-');

				/*formatear dia*/
				if(fecha[0].substr(0, 1) == '0'){
					fecha[0] = fecha[0].substr(1, 1);
				}

				$(this).hide();

				if(fecha[1] == monthAbbr[(fecha_actual[1] - 1)]){
					$(this).show();
				
					$('.cal').find('tbody').find('tr').find('td').each(function(){
						var dia = $(this).find('a').text();
						if(fecha[0] == dia){
							$(this).find('a').css('color', 'red');
						}
					})
				}
			});
		});

		$('.actividades-list').find('.item').each(function(){
			var fecha = $(this).find('a').find('span').text();
			var fecha_actual = _this.find('.mes').text();

			fecha = fecha.split('/');
			fecha_actual = fecha_actual.split('-');

			/*formatear dia*/
			if(fecha[0].substr(0, 1) == '0'){
				fecha[0] = fecha[0].substr(1, 1);
			}

			$(this).hide();

			if(fecha[1] == monthAbbr[(fecha_actual[1] - 1)]){
				$(this).show();

				$('.cal').find('tbody').find('tr').find('td').each(function(){
					var dia = $(this).find('a').text();

					if(fecha[0] == dia){
						$(this).find('a').css('color', 'red');
					}
				})
			}
		});

		return this;
	};

	$.fn.calendar.defaults = {
		date: new Date(),
		picker: false,
	};

	$(window).load(function () {
		$('.jquery-calendar').each(function () {
			$(this).calendar();
		});
	});
}($));
