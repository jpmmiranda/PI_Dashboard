/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args); 
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

	var url = "http://localhost:8888/";	
	//var url = "http://smap.cm-braga.pt/scripts/"
	var de = moment().subtract(1, 'day').startOf('day');

	var ate= moment().subtract(1, 'day').endOf('day');
	var barGraph=null, barGraph1;
	var compAnos;
	var barGraphPilaretes=null,barGraphContribuintePorPilarete,barGraphTelefonePorPilarete, barGraphUtiPilaretes=null;
	var pieChart;
	var barGraphUtilizador=null;
	var barGraphUtilizadorTelefone=null;
	var pilareteSelecionado;
	var barGraphNegadosTelefoneBarras
	var barGraphNegadosContribuinteBarras
	var pieChartNegadosRazoes
	var tip=0;


// Sidebar
function init_sidebar() {
var setContentHeight = function () {
	// reset height
	$RIGHT_COL.css('min-height', $(window).height());

	var bodyHeight = $BODY.outerHeight(),
		footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
		leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
		contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

	// normalize content
	contentHeight -= $NAV_MENU.height() + footerHeight;

	$RIGHT_COL.css('min-height', contentHeight);
};

  $SIDEBAR_MENU.find('a').on('click', function(ev) {
	  console.log('clicked - sidebar_menu');
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }else
            {
				if ( $BODY.is( ".nav-sm" ) )
				{
					$SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
					$SIDEBAR_MENU.find( "li ul" ).slideUp();
				}
			}
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

// toggle small or large menu 
$MENU_TOGGLE.on('click', function() {
		console.log('clicked - menu toggle');
		
		if ($BODY.hasClass('nav-md')) {
			$SIDEBAR_MENU.find('li.active ul').hide();
			$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
		} else {
			$SIDEBAR_MENU.find('li.active-sm ul').show();
			$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
		}

	$BODY.toggleClass('nav-md nav-sm');

	setContentHeight();
});

	// check active menu
	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

	$SIDEBAR_MENU.find('a').filter(function () {
		return this.href == CURRENT_URL;
	}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
		setContentHeight();
	}).parent().addClass('active');

	// recompute content when resizing
	$(window).smartresize(function(){  
		setContentHeight();
	});

	setContentHeight();

	// fixed sidebar
	if ($.fn.mCustomScrollbar) {
		$('.menu_fixed').mCustomScrollbar({
			autoHideScrollbar: true,
			theme: 'minimal',
			mouseWheel:{ preventDefault: true }
		});
	}
};
// /Sidebar

	var randNum = function() {
	  return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
	};


// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200); 
            $BOX_PANEL.css('height', 'auto');  
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Progressbar
if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar();
}
// /Progressbar

// Switchery
$(document).ready(function() {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery


// iCheck
$(document).ready(function() {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}



// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).load(function () {
        NProgress.done();
    });
}

	
	  //hover and retain popover when on popover content
        var originalLeave = $.fn.popover.Constructor.prototype.leave;
        $.fn.popover.Constructor.prototype.leave = function(obj) {
          var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
          var container, timeout;

          originalLeave.call(this, obj);

          if (obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover');
            timeout = self.timeout;
            container.one('mouseenter', function() {
              clearTimeout(timeout);
              container.one('mouseleave', function() {
                $.fn.popover.Constructor.prototype.leave.call(self, self);
              });
            });
          }
        };

        $('body').popover({
          selector: '[data-popover]',
          trigger: 'click hover',
          delay: {
            show: 50,
            hide: 400
          }
        });


	function gd(year, month, day) {
		return new Date(year, month - 1, day).getTime();
	}
	 
	   
	 /* AUTOSIZE */
			
		function init_autosize() {
			
			if(typeof $.fn.autosize !== 'undefined'){
			
			autosize($('.resizable_textarea'));
			
			}
			
		};  
	   
	   /* PARSLEY */
			
		function init_parsley() {
			
			if( typeof (parsley) === 'undefined'){ return; }
			console.log('init_parsley');
			
			$/*.listen*/('parsley:field:validate', function() {
			  validateFront();
			});
			$('#demo-form .btn').on('click', function() {
			  $('#demo-form').parsley().validate();
			  validateFront();
			});
			var validateFront = function() {
			  if (true === $('#demo-form').parsley().isValid()) {
				$('.bs-callout-info').removeClass('hidden');
				$('.bs-callout-warning').addClass('hidden');
			  } else {
				$('.bs-callout-info').addClass('hidden');
				$('.bs-callout-warning').removeClass('hidden');
			  }
			};
		  
			$/*.listen*/('parsley:field:validate', function() {
			  validateFront();
			});
			$('#demo-form2 .btn').on('click', function() {
			  $('#demo-form2').parsley().validate();
			  validateFront();
			});
			var validateFront = function() {
			  if (true === $('#demo-form2').parsley().isValid()) {
				$('.bs-callout-info').removeClass('hidden');
				$('.bs-callout-warning').addClass('hidden');
			  } else {
				$('.bs-callout-info').addClass('hidden');
				$('.bs-callout-warning').removeClass('hidden');
			  }
			};
			
			  try {
				hljs.initHighlightingOnLoad();
			  } catch (err) {}
			
		};
	   
		
		  /* INPUTS */
		  
			function onAddTag(tag) {
				alert("Added a tag: " + tag);
			  }

			  function onRemoveTag(tag) {
				alert("Removed a tag: " + tag);
			  }

			  function onChangeTag(input, tag) {
				alert("Changed a tag: " + tag);
			  }

			  //tags input
			function init_TagsInput() {
				  
				if(typeof $.fn.tagsInput !== 'undefined'){	
				 
				$('#tags_1').tagsInput({
				  width: 'auto'
				});
				
				}
				
		    };
	   
	   
	   
		
		
	 
		/* INPUT MASK */
			
		function init_InputMask() {
			
			if( typeof ($.fn.inputmask) === 'undefined'){ return; }
			console.log('init_InputMask');
			
				$(":input").inputmask();
				
		};
	  
	 
	   
	   
	   
	   
	   /* DATERANGEPICKER */ /*Calendario da pagina principal*/
	   
		function init_daterangepicker(checkedBoxes) {


			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange span').html(start.format('DD-MM-YYYY') + ' Até ' + end.format('DD-MM-YYYY'));
			};

			var max = new Date().getFullYear();
			   
			var optionSet1 = {
			  minDate: '01/01/2016',
			  maxDate: '12/31/'+max,
			  dateLimit: {
				days: 366
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: true,
			  timePickerIncrement: 1,
			  timePicker24Hour: true,
			  ranges: {
				'Hoje': [moment().startOf('day'), moment().endOf('day')],
				'Ontem': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
				'Últimos 7 Dias': [moment().subtract(6, 'days').startOf('day'), moment()],
				'Este Mês': [moment().startOf('month'), moment().endOf('month')],
				'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este Ano': [moment().startOf('year'), moment().endOf('year')],
                'Último Ano': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'DD/MM/YYYY',
			  separator: ' de ',
              locale: {
                    applyLabel: 'Ok',
                    cancelLabel: 'Cancelar',
                    fromLabel: 'De',
                    toLabel: 'Até',
                    customRangeLabel: 'Personalizar',
                    daysOfWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    firstDay: 1
                  }
			 
			};
			
			$('#reportrange span').html(de.format('DD/MM/YYYY')+ ' Até ' + ate.format('DD/MM/YYYY'));
			$('#reportrange').daterangepicker(optionSet1, cb);
			$('#reportrange').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('YYYY/MM/DD HH:mm') + " to " + picker.endDate.format('YYYY/MM/DD HH:mm'));
          de = picker.startDate.format('YYYY/MM/DD HH:mm');
					ate = picker.endDate.format('YYYY/MM/DD HH:mm');
					barGraph.destroy();
		      		barGraphPilaretes.destroy();
		     		barGraphUtilizador.destroy();
					barGraphUtilizadorTelefone.destroy();
          init_charts(picker.startDate.format('YYYY/MM/DD HH:mm'),picker.endDate.format('YYYY/MM/DD HH:mm'),getCheckedBoxes('1'));

			});
			$('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange').data('daterangepicker').remove();
			});
   
		}

		/* Calendario da pagina de pilaretes */
		function init_daterangepickerPilaretes(pilaretes) {


			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange1 span').html(start.format('DD-MM-YYYY') + ' Até ' + end.format('DD-MM-YYYY'));
			};

			var max = new Date().getFullYear();
			   
			var optionSet1 = {
			  minDate: '01/01/2016',
			  maxDate: '12/31/'+max,
			  dateLimit: {
				days: 366
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: true,
			  timePickerIncrement: 1,
			  timePicker24Hour: true,
			  ranges: {
				'Hoje': [moment().startOf('day'), moment().endOf('day')],
				'Ontem': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
				'Últimos 7 Dias': [moment().subtract(6, 'days').startOf('day'), moment()],
				'Este Mês': [moment().startOf('month'), moment().endOf('month')],
				'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este Ano': [moment().startOf('year'), moment().endOf('year')],
                'Último Ano': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'DD/MM/YYYY',
			  separator: ' de ',
              locale: {
                    applyLabel: 'Ok',
                    cancelLabel: 'Cancelar',
                    fromLabel: 'De',
                    toLabel: 'Até',
                    customRangeLabel: 'Personalizar',
                    daysOfWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    firstDay: 1
                  }
			 
			};
			
			$('#reportrange1 span').html(de.format('DD/MM/YYYY')+ ' Até ' + ate.format('DD/MM/YYYY'));
			$('#reportrange1').daterangepicker(optionSet1, cb);
			$('#reportrange1').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange1').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange1').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('YYYY/MM/DD HH:mm') + " to " + picker.endDate.format('YYYY/MM/DD HH:mm'));
          de = picker.startDate.format('YYYY/MM/DD HH:mm');
					ate = picker.endDate.format('YYYY/MM/DD HH:mm');		
					barGraphContribuintePorPilarete.destroy();
					barGraphTelefonePorPilarete.destroy();		
					barGraph1.destroy();
					init_chartsPilaretes(de,ate,pilareteSelecionado)

			});
			$('#reportrange1').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange1').data('daterangepicker').remove();
			});
   
		}

		/* Calendario da pagina de acessos Negados */
		function init_daterangepickerAcessosNegados() {


			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange2 span').html(start.format('DD-MM-YYYY') + ' Até ' + end.format('DD-MM-YYYY'));
			};

			var max = new Date().getFullYear();
			   
			var optionSet1 = {
			  minDate: '01/01/2016',
			  maxDate: '12/31/'+max,
			  dateLimit: {
				days: 366
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: true,
			  timePickerIncrement: 1,
			  timePicker24Hour: true,
			  ranges: {
				'Hoje': [moment().startOf('day'), moment().endOf('day')],
				'Ontem': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
				'Últimos 7 Dias': [moment().subtract(6, 'days').startOf('day'), moment()],
				'Este Mês': [moment().startOf('month'), moment().endOf('month')],
				'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este Ano': [moment().startOf('year'), moment().endOf('year')],
                'Último Ano': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'DD/MM/YYYY',
			  separator: ' de ',
              locale: {
                    applyLabel: 'Ok',
                    cancelLabel: 'Cancelar',
                    fromLabel: 'De',
                    toLabel: 'Até',
                    customRangeLabel: 'Personalizar',
                    daysOfWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    firstDay: 1
                  }
			 
			};
			
			$('#reportrange2 span').html(de.format('DD/MM/YYYY')+ ' Até ' + ate.format('DD/MM/YYYY'));
			$('#reportrange2').daterangepicker(optionSet1, cb);
			$('#reportrange2').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange2').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange2').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('YYYY/MM/DD HH:mm') + " to " + picker.endDate.format('YYYY/MM/DD HH:mm'));
          de = picker.startDate.format('YYYY/MM/DD HH:mm');
					ate = picker.endDate.format('YYYY/MM/DD HH:mm');		
				
					barGraphNegadosTelefoneBarras.destroy();
					barGraphNegadosContribuinteBarras.destroy();
					pieChartNegadosRazoes.destroy();

					init_charts(de,ate,null);

			});
			$('#reportrange2').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange2').data('daterangepicker').remove();
			});
   
		}

			/* Calendario da pagina de acessos Utilizador */
		function init_daterangepickerAcessosUtilizador() {


			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange3 span').html(start.format('DD-MM-YYYY') + ' Até ' + end.format('DD-MM-YYYY'));
			};

			var max = new Date().getFullYear();
			   
			var optionSet1 = {
			  minDate: '01/01/2016',
			  maxDate: '12/31/'+max,
			  dateLimit: {
				days: 366
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: true,
			  timePickerIncrement: 1,
			  timePicker24Hour: true,
			  ranges: {
				'Hoje': [moment().startOf('day'), moment().endOf('day')],
				'Ontem': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
				'Últimos 7 Dias': [moment().subtract(6, 'days').startOf('day'), moment()],
				'Este Mês': [moment().startOf('month'), moment().endOf('month')],
				'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este Ano': [moment().startOf('year'), moment().endOf('year')],
                'Último Ano': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'DD/MM/YYYY',
			  separator: ' de ',
              locale: {
                    applyLabel: 'Ok',
                    cancelLabel: 'Cancelar',
                    fromLabel: 'De',
                    toLabel: 'Até',
                    customRangeLabel: 'Personalizar',
                    daysOfWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    firstDay: 1
                  }
			 
			};
			
			$('#reportrange3 span').html(de.format('DD/MM/YYYY')+ ' Até ' + ate.format('DD/MM/YYYY'));
			$('#reportrange3').daterangepicker(optionSet1, cb);
			$('#reportrange3').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange3').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange3').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('YYYY/MM/DD HH:mm') + " to " + picker.endDate.format('YYYY/MM/DD HH:mm'));
          de = picker.startDate.format('YYYY/MM/DD HH:mm');
					ate = picker.endDate.format('YYYY/MM/DD HH:mm');		
					pieChart.destroy();
					barGraph.destroy();
					barGraphUtiPilaretes.destroy();
					if(tip==1){
						$("#tabela  tbody tr").remove();
						init_utilizador(de,ate,document.getElementById('Tel').value,1);

					}else{
						$("#tabela  tbody tr").remove();
						init_utilizador(de,ate,document.getElementById('Cont').value,2);

					}

			});
			$('#reportrange3').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange3').data('daterangepicker').remove();
			});
   
		}
   	   

	   
	    
		

		 

	   
	   /* SMART WIZARD */
		
		function init_SmartWizard() {
			
			if( typeof ($.fn.smartWizard) === 'undefined'){ return; }
			console.log('init_SmartWizard');
			
			$('#wizard').smartWizard();

			$('#wizard_verticle').smartWizard({
			  transitionEffect: 'slide'
			});

			$('.buttonNext').addClass('btn btn-success');
			$('.buttonPrevious').addClass('btn btn-primary');
			$('.buttonFinish').addClass('btn btn-default');
			
		};
	  
	   
	  	/* PNotify */
			
		function init_PNotify() {
			
			if( typeof (PNotify) === 'undefined'){ return; }
			console.log('init_PNotify');
			
			new PNotify({
			  title: "PNotify",
			  type: "info",
			  text: "Welcome. Try hovering over me. You can click things behind me, because I'm non-blocking.",
			  nonblock: {
				  nonblock: true
			  },
			  addclass: 'dark',
			  styling: 'bootstrap3',
			  hide: false,
			  before_close: function(PNotify) {
				PNotify.update({
				  title: PNotify.options.title + " - Enjoy your Stay",
				  before_close: null
				});

				PNotify.queueRemove();

				return false;
			  }
			});

		}; 
	   
	   
	   /* CUSTOM NOTIFICATION */
			
		function init_CustomNotification() {
			
			console.log('run_customtabs');
			
			if( typeof (CustomTabs) === 'undefined'){ return; }
			console.log('init_CustomTabs');
			
			var cnt = 10;

			TabbedNotification = function(options) {
			  var message = "<div id='ntf" + cnt + "' class='text alert-" + options.type + "' style='display:none'><h2><i class='fa fa-bell'></i> " + options.title +
				"</h2><div class='close'><a href='javascript:;' class='notification_close'><i class='fa fa-close'></i></a></div><p>" + options.text + "</p></div>";

			  if (!document.getElementById('custom_notifications')) {
				alert('doesnt exists');
			  } else {
				$('#custom_notifications ul.notifications').append("<li><a id='ntlink" + cnt + "' class='alert-" + options.type + "' href='#ntf" + cnt + "'><i class='fa fa-bell animated shake'></i></a></li>");
				$('#custom_notifications #notif-group').append(message);
				cnt++;
				CustomTabs(options);
			  }
			};

			CustomTabs = function(options) {
			  $('.tabbed_notifications > div').hide();
			  $('.tabbed_notifications > div:first-of-type').show();
			  $('#custom_notifications').removeClass('dsp_none');
			  $('.notifications a').click(function(e) {
				e.preventDefault();
				var $this = $(this),
				  tabbed_notifications = '#' + $this.parents('.notifications').data('tabbed_notifications'),
				  others = $this.closest('li').siblings().children('a'),
				  target = $this.attr('href');
				others.removeClass('active');
				$this.addClass('active');
				$(tabbed_notifications).children('div').hide();
				$(target).show();
			  });
			};

			CustomTabs();

			var tabid = idname = '';

			$(document).on('click', '.notification_close', function(e) {
			  idname = $(this).parent().parent().attr("id");
			  tabid = idname.substr(-2);
			  $('#ntf' + tabid).remove();
			  $('#ntlink' + tabid).parent().remove();
			  $('.notifications a').first().addClass('active');
			  $('#notif-group div').first().css('display', 'block');
			});
			
		};
		
		/* Faz conversão da data */
		Date.prototype.toIsoString = function() {
		    var tzo = -this.getTimezoneOffset(),
		        dif = tzo >= 0 ? '+' : '-',
		        pad = function(num) {
		            var norm = Math.abs(Math.floor(num));
		            return (norm < 10 ? '0' : '') + norm;
		        };
		    return this.getFullYear() +
		        '-' + pad(this.getMonth() + 1) +
		        '-' + pad(this.getDate()) +
		        'T' + pad(this.getHours()) +
		        ':' + pad(this.getMinutes()) +
		        ':' + pad(this.getSeconds()) +
		        dif + pad(tzo / 60) +
		        ':' + pad(tzo % 60);
		}


		/* Função inicializa charts da pagina dos Pilaretes */

	function init_chartsPilaretes(de, ate,pilarete) {
				console.log('run_charts  typeof [' + typeof (Chart) + ']');
			
				if( typeof (Chart) === 'undefined'){ return; }
				
				console.log('init_chartsPilaretes');
			
				
				Chart.defaults.global.legend = {
					enabled: false
				};
				
			/*Grafico de linhas da pagina Pilaretes */
			if ($('#lineChartPilaretes').length ){
							 		$('#loadinglineChartPilaretes').show();

                var labels=["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                var tipo=0;
                var nomeLabel;
                var c = new Date(de)
                var d = new Date(ate)
                var prim = moment(de,'YYYY/MM/DD');
				var ult = moment(ate,'YYYY/MM/DD');
				var diffDays = ult.diff(prim, 'days');

                if(diffDays==0){
                    tipo=1;
                    nomeLabel="Horas"
                }

                else if (diffDays==1){
                     tipo =2;
                     nomeLabel="Dias"

                 }

                else if (diffDays<=31){
                     tipo =4;
                     nomeLabel="Dias"
                 }

                else if(diffDays<7){
                	  tipo =3;
                      nomeLabel="Dias"
                }
                else{
                    tipo =5;
                    nomeLabel="Meses"
                }

                

                var de = c.toISOString()
                var ate = d.toISOString()


                 $.ajax({

                    type: 'POST',
            				url: url + "acessosPilareteTab.php",
                    data: {de : de, ate : ate, tipo : tipo, pilarete : pilarete}, 
            		success: function(data) {

            			var valoresE = new Array();
            			var valoresS = new Array();
                  var label =new Array();
                  var posvaloresE=0;
                  var posvaloresS=0;

            			for(var i in data) {

            				if($.inArray(data[i].lab, label)!=-1){

	            				if (data[i].ee=="Entrada"){

	            					 posvaloresE=label.indexOf(data[i].lab);

	            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}

	            				if (data[i].es=="Saída"){


	            					 posvaloresS=label.indexOf(data[i].lab);

	            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}
	            			}else{
	            				
	            			   label.push(data[i].lab);
	            				if (data[i].es=="Saída"){

	            						posvaloresS=label.indexOf(data[i].lab);
	            						valoresS.splice(posvaloresS, 0, data[i].AcessosConcedidos);
	            						valoresE.splice(posvaloresS, 0, 0);
	            				}
	            				if (data[i].ee=="Entrada"){

	            					posvaloresE=label.indexOf(data[i].lab);
	            					valoresE.splice(posvaloresE, 0, data[i].AcessosConcedidos);
	            					valoresS.splice(posvaloresE, 0, 0);

	            				} 
	            			}

            				
            			}
            			if(tipo==5 && label.length==12){

            				for(var i in label) {
	                            label[i]=labels[i];

            				}
            			}
            			var chartdata = {
            				labels:  label,
            				datasets : [
            					{
            						label: "Total de Entradas",
            						backgroundColor: "rgba(38, 185, 154, 0.31)",
            						borderColor: "rgba(38, 185, 154, 0.7)",
            						pointBorderColor: "rgba(38, 185, 154, 0.7)",
            						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            						pointHoverBackgroundColor: "#fff",
            						pointHoverBorderColor: "rgba(220,220,220,1)",
            						pointBorderWidth: 1,
            						data: valoresE
            					},{
									label: "Total de Saídas",
									backgroundColor: "rgba(3, 88, 106, 0.3)",
									borderColor: "rgba(3, 88, 106, 0.70)",
									pointBorderColor: "rgba(3, 88, 106, 0.70)",
									pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
									pointHoverBackgroundColor: "#fff",
									pointHoverBorderColor: "rgba(151,187,205,1)",
									pointBorderWidth: 1,
									data: valoresS
								}	

            				]
            			};

            			

            			var ctx = $("#lineChartPilaretes");

            			barGraph1 = new Chart(ctx, {
            				type: 'line',
            				data: chartdata,
                            options: {
                                scales: {
                                    yAxes: [{
                                    	scaleLabel: {
									        display: true,
									        labelString: 'Acessos'
									    },
                                        ticks: {
                                            beginAtZero: true,

                                        }
                                    }],
                                    xAxes: [{
                                    	scaleLabel: {
									        display: true,
									        labelString: nomeLabel
									    }
                                    }]
                                }
                            }

            			});
            	document.getElementById('js-legend1').innerHTML = barGraph1.generateLegend();
							 		$('#loadinglineChartPilaretes').hide();

            		},
            		error: function(data) {
            			console.log(data);
            		}

	               });
			
			}

		
		if ($('#acessosContribuintePorPilarete').length ){ 
							 		$('#loadingacessosContribuintePorPilarete').show();

		$.ajax({
				url: url + "acessosContribuintePorPilarete.php",
				method: "POST",
				data: {de : de, ate : ate, pilarete : pilarete},
				success: function(data) {
					var valores = [];
					var telefone = []

					for(var i in data) {
						valores.push(data[i].AcessosConcedidos);
						telefone.push(data[i].nContribuinte);

					}

					var chartdata = {
						labels:  telefone,
						datasets : [
							{
								label: "Total de Acessos",
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								data: valores,
								
							}
						]
					};

					var ctx = $('#acessosContribuintePorPilarete');

					 barGraphContribuintePorPilarete = new Chart(ctx, {
						type: 'bar',
						data: chartdata,
						options: {
								  scales: {
									yAxes: [{
									  ticks: {
										beginAtZero: true
									  }
									}]
								  }
								}
					});
												 		$('#loadingacessosContribuintePorPilarete').hide();

				},
				error: function(data) {
					console.log(data);
				}
			});
			  
		}
		if ($('#acessosTelefonePorPilarete').length ){ 
												 		$('#loadingacessosTelefonePorPilarete').show();

		$.ajax({
				url: url + "acessosTelefonePorPilarete.php",
				method: "POST",
				data: {de : de, ate : ate, pilarete : pilarete},
				success: function(data) {
					var valores = [];
					var telefone = []

					for(var i in data) {
						valores.push(data[i].AcessosConcedidos);
						telefone.push(data[i].telemovel);

					}

					var chartdata = {
						labels:  telefone,
						datasets : [
							{
								label: "Total de Acessos",
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								data: valores,
								
							}
						]
					};

					var ctx = $('#acessosTelefonePorPilarete');

					barGraphTelefonePorPilarete = new Chart(ctx, {
						type: 'bar',
						data: chartdata,
						options: {
								  scales: {
									yAxes: [{
									  ticks: {
										beginAtZero: true
									  }
									}]
								  }
								}
					});
					$('#loadingacessosTelefonePorPilarete').hide();

				},
				error: function(data) {
					console.log(data);
				}
			});
			  
		} 

	}
		/* Função que inicializa os graficos */

		function init_charts(de, ate,checkedBoxes) {
				
						 
			 	var listados;
			 	if(checkedBoxes == null) listados = '.*';
				if(checkedBoxes!=null) listados = checkboxSelecionados(checkedBoxes);
				if(barGraph!=null) 		barGraph.destroy();
				if(barGraphPilaretes!=null) 		barGraphPilaretes.destroy();
				if(barGraphUtilizador!=null) 		barGraphUtilizador.destroy();
				if(barGraphUtilizadorTelefone!=null) 		barGraphUtilizadorTelefone.destroy();


				console.log('run_charts  typeof [' + typeof (Chart) + ']');
			
				if( typeof (Chart) === 'undefined'){ return; }
				
				console.log('init_charts');
			
				
				Chart.defaults.global.legend = {
					enabled: false
				};
			
			  /* Grafico de linhas da pagina Acessos Concedidos*/
	
			if ($('#lineChart').length ){
				    $('#loadingAcessos').show();

                var labels=["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                var tipo=0;
                var nomeLabel;
                var c = new Date(de)
                var d = new Date(ate)
                var prim = moment(de,'YYYY/MM/DD');
				var ult = moment(ate,'YYYY/MM/DD');
				var diffDays = ult.diff(prim, 'days');

                if(diffDays==0){
                    tipo=1;
                    nomeLabel="Horas"
                }

                else if (diffDays==1){
                     tipo =2;
                     nomeLabel="Dias"

                 }

                else if (diffDays<=31){
                     tipo =4;
                     nomeLabel="Dias"
                 }

                else if(diffDays<7){
                	  tipo =3;
                      nomeLabel="Dias"
                }
                else{
                    tipo =5;
                    nomeLabel="Meses"
                }

                var de = c.toIsoString();
                var ate = d.toIsoString();



                 $.ajax({

                    type: 'POST',
            		url: url + "teste.php",
                    data: {de : de, ate : ate, tipo : tipo, listados : listados}, 

            		success: function(data) {
	            		var valoresE = new Array();
	            		var valoresS = new Array();
	                    var label =new Array();
	                    var posvaloresE=0;
	                    var posvaloresS=0;

            			for(var i in data) {

            				if($.inArray(data[i].lab, label)!=-1){

	            				if (data[i].ee=="Entrada"){

	            					 posvaloresE=label.indexOf(data[i].lab);

	            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}

	            				if (data[i].es=="Saída"){


	            					 posvaloresS=label.indexOf(data[i].lab);

	            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}
	            			}else{
	            				
	            			   label.push(data[i].lab);
	            				if (data[i].es=="Saída"){

	            						posvaloresS=label.indexOf(data[i].lab);
	            						valoresS.splice(posvaloresS, 0, parseInt(data[i].AcessosConcedidos));
	            						valoresE.splice(posvaloresS, 0, 0);
	            				}
	            				if (data[i].ee=="Entrada"){

	            					posvaloresE=label.indexOf(data[i].lab);
	            					valoresE.splice(posvaloresE, 0, parseInt(data[i].AcessosConcedidos));
	            					valoresS.splice(posvaloresE, 0, 0);

	            				} 
	            			}

            				
            			}
            			if(tipo==5){

            				for(var i in label) {
	                            label[i]=labels[i];

            				}
            			}
            			var chartdata = {
            				labels:  label,
            				datasets : [
            					{
            						label: "Total de Entradas",
            						backgroundColor: "rgba(38, 185, 154, 0.31)",
            						borderColor: "rgba(38, 185, 154, 0.7)",
            						pointBorderColor: "rgba(38, 185, 154, 0.7)",
            						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            						pointHoverBackgroundColor: "#fff",
            						pointHoverBorderColor: "rgba(220,220,220,1)",
            						pointBorderWidth: 1,
            						data: valoresE
            					},{
									label: "Total de Saídas",
									backgroundColor: "rgba(3, 88, 106, 0.3)",
									borderColor: "rgba(3, 88, 106, 0.70)",
									pointBorderColor: "rgba(3, 88, 106, 0.70)",
									pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
									pointHoverBackgroundColor: "#fff",
									pointHoverBorderColor: "rgba(151,187,205,1)",
									pointBorderWidth: 1,
									data: valoresS
								}	

            				]
            			};

            			

            			var ctx = $("#lineChart");

            			barGraph = new Chart(ctx, {
            				type: 'line',
            				data: chartdata,
                            options: {
                                scales: {
                                    yAxes: [{
                                    	scaleLabel: {
									        display: true,
									        labelString: 'Acessos'
									    },
                                        ticks: {
                                            beginAtZero: true,

                                        }
                                    }],
                                    xAxes: [{
                                    	scaleLabel: {
									        display: true,
									        labelString: nomeLabel
									    }
                                    }]
                                }
                            }

            			});
            	document.getElementById('js-legend1').innerHTML = barGraph.generateLegend();
											    $('#loadingAcessos').hide();

            		},
            		error: function(data) {
            			console.log(data);
            		}

	               });
			
			} 
				
			 /* Gráfico de barras dos pilaretes */
			  
			if ($('#acessosPorPilareteBarras').length ){ 
            			  
            		$('#loadingacessosPorPilareteBarras').show();
                var c = new Date(de)
                var d = new Date(ate)
                var de = c.toISOString()
                var ate = d.toISOString()
								
            		$.ajax({
            			method: "POST",
            			url: url + "acessosPorPilarete.php",

                  data: {de : de, ate : ate,listados : listados},

            			success: function(data) {
            						var valoresE = new Array();
            						var valoresS = new Array();
                        var label =new Array();
                        var posvaloresE;
                        var posvaloresS;
                        var x;
            			for(var i in data) {

            				if($.inArray(data[i].Pilarete, label)!=-1){

								if (data[i].ee=="Entrada"){

	            					 posvaloresE=label.indexOf(data[i].Pilarete);

	            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}

	            				if (data[i].es=="Saída"){


	            					 posvaloresS=label.indexOf(data[i].Pilarete);

	            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}
	            			}else{
	            				label.push(data[i].Pilarete);

	            				if (data[i].es=="Saída"){

	            						posvaloresS=label.indexOf(data[i].Pilarete);
	            						valoresS.splice(posvaloresS, 0, parseInt(data[i].AcessosConcedidos));
	            				}
	            				if (data[i].ee=="Entrada"){

	            					posvaloresE=label.indexOf(data[i].Pilarete);
	            					valoresE.splice(posvaloresE, 0, parseInt(data[i].AcessosConcedidos));

	            				} 

	            			}

            				
            			}

            			  var numberWithCommas = function(x) {
							    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							  };

            			var chartdata = {

            				labels:  label,

            				datasets : [
            					{
            						label: "Total de Entradas",
            						backgroundColor: "rgba(38, 185, 154, 0.7)",
            						backgroundColor: "rgba(38, 185, 154, 0.7)",
									hoverBorderWidth: 2,
									hoverBorderColor: 'lightgrey',

            						data: valoresE
            					},{
									label: "Total de Saídas",
									backgroundColor: "rgba(3, 88, 106, 0.7)",
									backgroundColor: "rgba(3, 88, 106, 0.7)",

									hoverBorderWidth: 2,
									hoverBorderColor: 'lightgrey',
									data: valoresS

								}	
            				]	

            			};
            			
            			var ctx = $('#acessosPorPilareteBarras');

            			 barGraphPilaretes = new Chart(ctx, {
            				type: 'bar',
            				data: chartdata,
            				options: {


            					tooltips: {

										mode: 'label',
								          callbacks: {
								          label: function(tooltipItem, data) { 
								          	return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
								          }
								          }
         						},
            					scales:{
            						  xAxes: [{ 
								          	stacked: true,
								          	gridLines: { display: false },
 
								            }],
            						   yAxes: [{
            						   		stacked: true, 
            							  ticks: {
            								beginAtZero: true,
     				 
            							  },
            							}],

            						  }

            						}





            			});
            	    document.getElementById('js-legend2').innerHTML = barGraphPilaretes.generateLegend();
            		$('#loadingacessosPorPilareteBarras').hide();

            		},
            		error: function(data) {
            			console.log(data);
            		}
	           });
			  
			} 

			
					  
		if ($('#acessosPorUtilizadorBarras').length ){ 
            		$('#loadingacessosPorUtilizadorBarras').show();

		$.ajax({
				url: url + "acessosPorUtilizador.php",
				method: "POST",
				data: {de : de, ate : ate, listados : listados},
				success: function(data) {
					var valores = [];
					var telefone = []

					for(var i in data) {
						valores.push(parseInt(data[i].AcessosConcedidos));
						telefone.push(parseInt(data[i].nContribuinte));

					}

					var chartdata = {
						labels:  telefone,
						datasets : [
							{
								label: "Total de Acessos",
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								data: valores,
								
							}
						]
					};

					var ctx = $('#acessosPorUtilizadorBarras');

					 barGraphUtilizador = new Chart(ctx, {
						type: 'bar',
						data: chartdata,
						options: {
								  scales: {
									yAxes: [{
									  ticks: {
										beginAtZero: true
									  }
									}]
								  }
								}
					});
          $('#loadingacessosPorUtilizadorBarras').hide();

				},
				error: function(data) {
					console.log(data);
				}
			});
			  
		} 
		if ($('#acessosPorUtilizadorBarrasTelefone').length ){ 
            		$('#loadingacessosPorUtilizadorBarrasTelefone').show();

		$.ajax({
				url: url + "acessosPorUtilizadorTelefone.php",
				method: "POST",
				data: {de : de, ate : ate, listados : listados},
				success: function(data) {
					var valores = [];
					var telefone = []

					for(var i in data) {
						valores.push(parseInt(data[i].AcessosConcedidos));
						telefone.push(parseInt(data[i].telemovel));

					}

					var chartdata = {
						labels:  telefone,
						datasets : [
							{
								label: "Total de Acessos",
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								data: valores,
								
							}
						]
					};

					var ctx = $('#acessosPorUtilizadorBarrasTelefone');

					 barGraphUtilizadorTelefone = new Chart(ctx, {
						type: 'bar',
						data: chartdata,
						options: {
								  scales: {
									yAxes: [{
									  ticks: {
										beginAtZero: true
									  }
									}]
								  }
								}
					});
            		$('#loadingacessosPorUtilizadorBarrasTelefone').hide();

				},
				error: function(data) {
					console.log(data);
				}
			});
			  
		} 
			if ($('#acessosNegadosTelefoneBarras').length ){ 
			  
        	$('#loadingacessosNegadosTelefoneBarras').show();

				
          var c = new Date(de)
          var d = new Date(ate)
          var de = c.toISOString()
          var ate = d.toISOString()
								
          $.ajax({

						method: "GET",
						url: url + "acessosNegadosPorTelefone.php",
						data: {de : de, ate : ate},
						success: function(data) {
							var valores = [];
							var telefone = []

							for(var i in data) {
								valores.push(parseInt(data[i].AcessosNaoConcedidos));
								telefone.push(parseInt(data[i].Telefone));

							}

							var chartdata = {
								labels:  telefone,
								datasets : [
									{
										label: "Total de Acessos Negados",
										backgroundColor: "rgba(38, 185, 154, 0.31)",
										data: valores,
										
									}
								]
							};

							var ctx = $('#acessosNegadosTelefoneBarras');

							 barGraphNegadosTelefoneBarras = new Chart(ctx, {
								type: 'bar',
								data: chartdata,
								options: {
										  scales: {
											yAxes: [{

											  ticks: {
												beginAtZero: true,
											  }
											}]
										  }
										}
							});
							$('#loadingacessosNegadosTelefoneBarras').hide();
						},
						error: function(data) {
							console.log(data);
						}
					});
							  
			}
			if ($('#acessosNegadosContribuinteBarras').length ){ 
			  
							$('#loadingacessosNegadosContribuinteBarras').show();

				$.ajax({
						method: "GET",
						url: url + "acessosNegadosPorContribuinte.php",
						data: {de : de, ate : ate},
						success: function(data) {
							var valores = [];
							var contribuinte = []

							for(var i in data) {
								valores.push(parseInt(data[i].AcessosNaoConcedidos));
								if(data[i].nContribuinte != 0) contribuinte.push(parseInt(data[i].nContribuinte));
								else contribuinte.push("Não registados");
							}

							var chartdata = {
								labels:  contribuinte,
								datasets : [
									{
										label: "Total de Acessos Negados",
										backgroundColor: "rgba(38, 185, 154, 0.31)",
										data: valores,
										
									}
								]
							};

							var ctx = $('#acessosNegadosContribuinteBarras');

							 barGraphNegadosContribuinteBarras = new Chart(ctx, {
								type: 'bar',
								data: chartdata,
								options: {
										  scales: {
											yAxes: [{
											  ticks: {
												beginAtZero: true
											  }
											}]
										  }
										}
							});
							$('#loadingacessosNegadosContribuinteBarras').hide();

						},
						error: function(data) {
							console.log(data);
						}
					});
							  
			}

			if ($('#acessosNegadosRazoesPie').length ){
				  							$('#loadingacessosNegadosRazoesPie').show();

				  $.ajax({
						url: url + "acessosNegadosRazoes.php",
						method: "GET",
						data: {de : de, ate : ate},
						success: function(data) {
							var valores = [];
							var razao = []

							for(var i in data) {
								if(data[i].ValidacaoAcesso != 'Acesso Nao Concedido - Loop Saida nao ativo'){
									valores.push(parseInt(data[i].AcessosNaoConcedidos));
									razao.push(data[i].ValidacaoAcesso);
								}
							}


							/*var index = razao.indexOf('Acesso Nao Concedido - Loop Saida nao ativo');
							var valor = valores[index];
							if(index > -1){
								razao.splice(index,1);
								valores.splice(index,1);
							}
							var index = razao.indexOf('Acesso Nao Concedido - Loops nao ativo');
							valores[index] = parseInt(valores[index]) + parseInt(valor);*/

							for (var raz in razao){
								razao[raz]=razao[raz].replace('Acesso Nao Concedido - ','');
								razao[raz]=razao[raz].replace('Acesso Recusado - ','');
							};
							var colors = [
												"#2F4F4F", "#008080", "#2E8B57", "#3CB371", "#90EE90", "#4279a3", "#476c8a", "#49657b", "#7f8e9e"
											];
							
							var chartdata = {
								labels:  razao,
								datasets : [
									{
										label: "Total de Acessos Negados",
										backgroundColor: colors,
										data: valores,
									}
								]
							};

							var ctx = $('#acessosNegadosRazoesPie');

						 pieChartNegadosRazoes = new Chart(ctx, {
								data: chartdata,
								type: 'pie'
								
							});
						 document.getElementById('js-legend2').innerHTML = pieChartNegadosRazoes.generateLegend();
				  							$('#loadingacessosNegadosRazoesPie').hide();
						},
						error: function(data) {
							console.log(data);
						}
					});
				  
			  }
		}

			  



		function init_ano() {
			if(document.getElementById('selecaoano')!=null){
				var min = 2017;
				var max = new Date().getFullYear()+1;
			    for(i = min; i <max; i++){        

			    	$('#selecaoano').get(0).options[ $('#selecaoano').get(0).options.length] = new Option(i, i);
			    }
			}

		}

		function init_Utilizadorano() {
			if(document.getElementById('selecaoanoUtilizador')!=null){
				var min = 2017;
				var max = new Date().getFullYear()+1;
			    for(i = min; i <max; i++){        

			    	$('#selecaoanoUtilizador').get(0).options[ $('#selecaoanoUtilizador').get(0).options.length] = new Option(i, i);
			    }
			}

		}

		function escondeRodas(){
			$('#loadingcompAnosUtilizador').hide();
			$('#loadinglinhasTotalAcessos').hide();
			$('#loadingpieChartAcessos2').hide();
			$('#loadingutilizadorAcessosPorPilareteBarras').hide();
			$('#loadingcompAnos').hide();
			
		}

		// Função para a  criação dos gráficos da utilizadores
		function init_utilizdorComp_anos(utilizador, ano, tipo){
			if(tipo==1){
			var ctx = document.getElementById("compAnosUtilizador");
							  						$('#loadingcompAnosUtilizador').show();

			  $.ajax({
	
         			type: 'POST',
					url: url +"utilizadorCompAnos.php",
          			data: {utilizador : utilizador , ano: ano},
				success: function(data) {
					var score = [];
					var anoY = [];
					for(var i in data) {
						if (data[i].year==ano)
							{score.push(parseInt(data[i].AcessosConcedidos));}
						else {anoY.push(parseInt(data[i].AcessosConcedidos));}
					}

					var chartdata = {
						labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
						datasets : [
							{
								label: ano,
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								borderColor: "rgba(38, 185, 154, 0.7)",
								pointBorderColor: "rgba(38, 185, 154, 0.7)",
								pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointBorderWidth: 1,
								data: score
							},  {
								label: ano-1,
								backgroundColor: "rgba(3, 88, 106, 0.3)",
								borderColor: "rgba(3, 88, 106, 0.70)",
								pointBorderColor: "rgba(3, 88, 106, 0.70)",
								pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(151,187,205,1)",
								pointBorderWidth: 1,
								data: anoY
								}	
						]
					};

					var ctx = $("#compAnosUtilizador");

					   compAnosUtilizador = new Chart(ctx, {
						type: 'line',
						data: chartdata,
						options: {
                     scales: {
                        yAxes: [{
                         scaleLabel: {
									        display: true,
									        labelString: 'Acessos'
									    },
                      ticks: {
                        beginAtZero: true,
                          }
                          }],
                        xAxes: [{
										     	scaleLabel: {
									        display: true,
									        labelString: 'Meses'
									    }
                                    }]
                                }
                            }
					});
				 document.getElementById('js-legend4').innerHTML = compAnosUtilizador.generateLegend();
							  							$('#loadingcompAnosUtilizador').hide();

				},
				error: function(data) {
					console.log(data);
				}
			});
			}else{
				var ctx = document.getElementById("compAnosUtilizador");
							  							$('#loadingcompAnosUtilizador').show();

			  $.ajax({
	
          			type: 'POST',
					url: url +"utilizadorCompAnosContri.php",
          			data: {utilizador : utilizador , ano: ano},
				success: function(data) {
					var score = [];
					var anoY = [];
					for(var i in data) {
						if (data[i].year==ano)
							{score.push(parseInt(data[i].AcessosConcedidos));}
						else {anoY.push(parseInt(data[i].AcessosConcedidos));}
					}

					var chartdata = {
						labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
						datasets : [
							{
								label: ano,
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								borderColor: "rgba(38, 185, 154, 0.7)",
								pointBorderColor: "rgba(38, 185, 154, 0.7)",
								pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointBorderWidth: 1,
								data: score
							},  {
								label: ano-1,
								backgroundColor: "rgba(3, 88, 106, 0.3)",
								borderColor: "rgba(3, 88, 106, 0.70)",
								pointBorderColor: "rgba(3, 88, 106, 0.70)",
								pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(151,187,205,1)",
								pointBorderWidth: 1,
								data: anoY
								}	
						]
					};

					var ctx = $("#compAnosUtilizador");

					   compAnosUtilizador = new Chart(ctx, {
						type: 'line',
						data: chartdata,
						options: {
                     scales: {
                        yAxes: [{
                         scaleLabel: {
									        display: true,
									        labelString: 'Acessos'
									    },
                      ticks: {
                        beginAtZero: true,
                          }
                          }],
                        xAxes: [{
										     	scaleLabel: {
									        display: true,
									        labelString: 'Meses'
									    }
                                    }]
                                }
                            }
					});
				 document.getElementById('js-legend4').innerHTML = compAnosUtilizador.generateLegend();
							  							$('#loadingcompAnosUtilizador').hide();

				},
				error: function(data) {
					console.log(data);
				}
			});
			}
		}

		function init_destroyer(utilizador,tipo){
			tip=tipo;
			if(tipo==2){
				if ($("#tabela  tbody tr").length == 0){
}	
				else {
					$("#tabela  tbody tr").remove();
					pieChart.destroy();
					barGraph.destroy();
					barGraphUtiPilaretes.destroy();
					compAnosUtilizador.destroy();

				}
			}else{
				if ($("#tabela  tbody tr").length == 0){
}	
				else {
					$("#tabela  tbody tr").remove();
					pieChart.destroy();
					barGraph.destroy();
					barGraphUtiPilaretes.destroy();
					compAnosUtilizador.destroy();

				}
			}
			init_utilizador(de,ate,utilizador,tipo);

		}

		function init_utilizador(de,ate,utilizador,tipo){
			

			if(tipo==1){
				if (utilizador.length < 9 || utilizador.length > 9) {$("#myModal").modal()}
				
				if ($('#tipoUtil').length ){
					$.ajax({
							url: url + "tipoUtilizador.php",
							method: "POST",
							data: {utilizador : utilizador},
							success: function(data) {
								var tipo;
								
								for(var i in data){
									tipo = data[i].q;
								}

								if (tipo == 0) {
									$("#myModal").modal()
								}
								
							},
							error: function(data){
								console.log("erro");
							}
						})

				}
				if($('#tabela').length){
					 $.ajax({
				        url : url + "tabelaUtilizadorTele.php",
				        type : 'POST',
				        data: {utilizador : utilizador},
				        success : function(data) {

				        	for(var i in data){
								$('#tabela tbody').append("<tr><td>" + data[i].nome + "</td><td>" + data[i].morada + "</td><td>" + data[i].localidade +
								"</td><td>" + data[i].contribuinte + "</td><td>"  + data[i].telemovel + "</td><td>" +  data[i].tipo + "</td><td>" 
								+ data[i].email + "</td><td>"  + data[i].processo + "</td></tr>" );							}

								
				        },
				        error : function() {
				            console.log('error');
				        }
				    });
				}

				if ($('#pieChartAcessos2').length ){
					$('#loadingpieChartAcessos2').show();

	                var c = new Date(de)
	                var d = new Date(ate)
					var de = c.toISOString()
	                var ate = d.toISOString()
					
					$.ajax({
							url: url + "utilizadorAcessosNaoConcebidos.php",
							method: "POST",
							data: {de: de,ate:ate,utilizador : utilizador},
							success: function(data) {
								var valores = [];
								var razao = [];
								var r = "Viatura fora do local"

								for(var i in data) {
									valores.push(parseInt(data[i].AcessosNaoConcedidos));
									razao.push(data[i].ValidacaoAcesso);
								}

								for (var raz in razao){
									if (razao[raz] == "Acesso Nao Concedido - Loops nao ativo") razao[raz] = r;
									razao[raz]=razao[raz].replace('Acesso Nao Concedido - ','');
									razao[raz]=razao[raz].replace('Acesso Recusado - ','');
								};

								

								var colors = [
												"#2F4F4F", "#008080", "#2E8B57", "#3CB371", "#90EE90", "#4279a3", "#476c8a", "#49657b", "#7f8e9e"
											];
								
								var chartdata = {
									labels:  razao,
									datasets : [
										{
											label: "Total de Acessos Negados",
											backgroundColor: colors,
											data: valores,
										}
									]
								};

								var ctx = $('#pieChartAcessos2');

								pieChart = new Chart(ctx, {
									data: chartdata,
									type: 'pie'
									
								});
								document.getElementById('js-legend1').innerHTML = pieChart.generateLegend();
												  			$('#loadingpieChartAcessos2').hide();

							},
							error: function(data) {
								console.log("erro");
							}
						});
					  
				  }

				  if ($('#totalacesso').length ){

				  	 $.ajax({

						url: url + "totalAcessos.php",
						method: "POST",
						data: {de:de,ate:ate,utilizador : utilizador},
						success: function(data) {
							var total = 0;
							var saidas = 0;
							var entradas = 0;
							var recusados = 0;
							var aceites = 0;
							var especial = 0;
								
							for(var i in data) {
								total = data[i].total;
								saidas = data[i].saidas;
								entradas = data[i].entradas;
								recusados = data[i].recusados;
								aceites = data[i].aceites;
								especial = data[i].especial;
							}
							if(total!=0){

			  				document.getElementById('totalacesso2').innerHTML = total;
			  				document.getElementById('totalentradas').innerHTML = entradas;
			  				document.getElementById('totalsaidas').innerHTML = saidas;
			  				document.getElementById('totalRecusadas').innerHTML = recusados;
			  				document.getElementById('totalConcedidos').innerHTML = aceites;
			  				document.getElementById('totalEspecial').innerHTML = especial;


							}else{

			  				document.getElementById('totalacesso2').innerHTML = 0;
			  				document.getElementById('totalentradas').innerHTML = 0;
			  				document.getElementById('totalsaidas').innerHTML = 0;
			  				document.getElementById('totalRecusadas').innerHTML = 0;
			  				document.getElementById('totalConcedidos').innerHTML = 0;
			  				document.getElementById('totalEspecial').innerHTML = 0;
							}
				  		}
				  	})

				   }

					if ($('#linhasTotalAcessos').length) {
						$('#loadinglinhasTotalAcessos').show();
						var labels=["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
		                var tipo=0;
		                var nomeLabel;
		                var c = new Date(de)
		                var d = new Date(ate)
		                var prim = moment(de,'YYYY/MM/DD');
						var ult = moment(ate,'YYYY/MM/DD');
						var diffDays = ult.diff(prim, 'days');

		                if(diffDays==0){
		                    tipo=1;
		                    nomeLabel="Horas"
		                }

		                else if (diffDays==1){
		                     tipo =2;
		                     nomeLabel="Dias"

		                 }

		                else if (diffDays<=31){
		                     tipo =4;
		                     nomeLabel="Dias"
		                 }

		                else if(diffDays<7){
		                	  tipo =3;
		                      nomeLabel="Dias"
		                }
		                else{
		                    tipo =5;
		                    nomeLabel="Meses"
		                }

		                var de = c.toISOString()
		                var ate = d.toISOString()
									
	                 $.ajax({

	                    type: 'POST',
	            		url: url + "utilizadorAcessosTotais.php",
	                    data: {de : de, ate : ate, utilizador:utilizador, tipo:tipo}, 
	            		success: function(data){
	            			var valoresE = new Array();
	            			var valoresS = new Array();
			                var label =new Array();
			                var posvaloresE=0;
			                var posvaloresS=0;

	            			for(var i in data) {

	            				if($.inArray(data[i].lab, label)!=-1){

		            				if (data[i].ee=="Entrada"){

		            					 posvaloresE=label.indexOf(data[i].lab);

		            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
		            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
		            					
		            					
		            				}

		            				if (data[i].es=="Saída"){


		            					 posvaloresS=label.indexOf(data[i].lab);

		            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
		            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
		            					
		            					
		            				}
		            			}else{
		            				
		            			   label.push(data[i].lab);
		            				if (data[i].es=="Saída"){

		            						posvaloresS=label.indexOf(data[i].lab);
		            						valoresS.splice(posvaloresS, 0, parseInt(data[i].AcessosConcedidos));
		            						valoresE.splice(posvaloresS, 0, 0);
		            				}
		            				if (data[i].ee=="Entrada"){

		            					posvaloresE=label.indexOf(data[i].lab);
		            					valoresE.splice(posvaloresE, 0, parseInt(data[i].AcessosConcedidos));
		            					valoresS.splice(posvaloresE, 0, 0);

		            				} 
		            			}

	            				
	            			}
	            			if(tipo==5){

	            				for(var i in label) {
		                            label[i]=labels[i];

	            				}
	            			}



	            			
	            			var chartdata = {
	            				labels:  label,
	            				datasets : [
	            					{
	            						label: "Total de Entradas",
	            						backgroundColor: "rgba(38, 185, 154, 0.31)",
	            						borderColor: "rgba(38, 185, 154, 0.7)",
	            						pointBorderColor: "rgba(38, 185, 154, 0.7)",
	            						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
	            						pointHoverBackgroundColor: "#fff",
	            						pointHoverBorderColor: "rgba(220,220,220,1)",
	            						pointBorderWidth: 1,
	            						data: valoresE
	            					},{
													label: "Total de Saídas",
													backgroundColor: "rgba(3, 88, 106, 0.3)",
													borderColor: "rgba(3, 88, 106, 0.70)",
													pointBorderColor: "rgba(3, 88, 106, 0.70)",
													pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
													pointHoverBackgroundColor: "#fff",
													pointHoverBorderColor: "rgba(151,187,205,1)",
													pointBorderWidth: 1,
													data: valoresS
												}	

	            				]
	            			};

	            			

	            			var ctx = $("#linhasTotalAcessos");

	            			barGraph = new Chart(ctx, {
	            				type: 'line',
	            				data: chartdata,
	                            options: {
	                                scales: {
	                                    yAxes: [{
	                                    	scaleLabel: {
										        display: true,
										        labelString: 'Acessos'
										    },
	                                        ticks: {
	                                            beginAtZero: true,

	                                        }
	                                    }],
	                                    xAxes: [{
	                                    	scaleLabel: {
										        display: true,
										        labelString: "Meses"
										    }
	                                    }]
	                                }
	                            }

	            			});
	            		document.getElementById('js-legend3').innerHTML = barGraph.generateLegend();
						$('#loadinglinhasTotalAcessos').hide();
					}
				})
		        
				}

				if ($('#utilizadorAcessosPorPilareteBarras').length) {
					$('#loadingutilizadorAcessosPorPilareteBarras').show();

	                var c = new Date(de)
	                var d = new Date(ate)
	                var de = c.toISOString()
	                var ate = d.toISOString()
					$.ajax({
	            			method: "POST",
	            			url: url + "utilizadorAcessosPorPilareteBarras.php",

	                  data: {de:de,ate:ate,utilizador : utilizador},

	            			success: function(data) {
	            				var valoresE = new Array();
	            						var valoresS = new Array();
	                        var label =new Array();
	                        var posvaloresE= 0;
	                        var posvaloresS= 0;
	                        var x;
													  for (var i in data){
	                        	valoresE.push(parseInt(data[i].entradas));
	            				valoresS.push(parseInt(data[i].saidas));
	            				label.push(data[i].pilarete);
	                        }

	            			var chartdata = {

	            				labels:  label,

	            				datasets : [
	            					{

	            						label: "Total de Entradas",
	            						backgroundColor: "rgba(38, 185, 154, 0.7)",
	            						backgroundColor: "rgba(38, 185, 154, 0.7)",

	            						data: valoresE
	            					},{

										label: "Total de Saídas",
										backgroundColor: "rgba(3, 88, 106, 0.7)",
										backgroundColor: "rgba(3, 88, 106, 0.7)",

									
										data: valoresS

									}	
	            				]	

	            			};
	            			var numberWithCommas = function(x) {
	                  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	                };

	            			var ctx = document.getElementById("utilizadorAcessosPorPilareteBarras").getContext("2d");

	            			 barGraphUtiPilaretes = new Chart(ctx, {
	            				type: 'bar',
	            				data: chartdata,

	            				options: {
												
	            				tooltips: {

	                    mode: 'label',
	                          callbacks: {
	                          label: function(tooltipItem, data) { 
	                            return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
	                          }
	                          }
	                    },            					responsive: true,
	       
	        							scales: {
	                        yAxes: [{
													stacked:true,
	                        scaleLabel: {
										        display: true,
										        labelString: 'Acessos'
										    },
	                         ticks: {
	                                beginAtZero: true,
																	}
	                          }],
	                          xAxes: [{
															stacked:true,
																		}]
																	}
																}
	            		
	            			});
	            	    document.getElementById('js-legend2').innerHTML = barGraphUtiPilaretes.generateLegend();
									  			$('#loadingutilizadorAcessosPorPilareteBarras').hide();

	            		},
	            		error: function(data) {
	            			console.log("erro");
	            		}
		           });
				}
			}else{

				if ($('#tipoUtil').length ){
					$.ajax({
							url: url + "tipoUtilizadorCont.php",
							method: "POST",
							data: {utilizador : utilizador},
							success: function(data) {
								var tipo;
								for(var i in data){
									tipo = data[i].q;
								}
								if (tipo == 0) {
									$("#modalContri").modal()
								}
							},
							error: function(data){
								console.log("erro");
							}
						})

				}
				if($('#tabela').length){
					 $.ajax({
				        url : url + "tabelaUtilizador.php",
				        type : 'POST',
				        data: {utilizador : utilizador},
				        success : function(data) {

				        	for(var i in data){
								$('#tabela tbody').append("<tr><td>" + data[i].nome + "</td><td>" + data[i].morada + "</td><td>" + data[i].localidade +
								"</td><td>" + data[i].contribuinte + "</td><td>"  + data[i].telemovel + "</td><td>" +  data[i].tipo + "</td><td>" 
								+ data[i].email + "</td><td>"  + data[i].processo + "</td></tr>" );							}

								
				        },
				        error : function() {
				            console.log('error');
				        }
				    });
				}
				if ($('#pieChartAcessos2').length ){
					  $('#loadingpieChartAcessos2').show();

	                var c = new Date(de)
	                var d = new Date(ate)
					var de = c.toISOString()
	                var ate = d.toISOString()
					  $.ajax({
							url: url + "utilizadorAcessosNaoConcedidosContri.php",
							method: "POST",
							data: {de: de,ate:ate,utilizador : utilizador},
							success: function(data) {
								var valores = [];
								var razao = [];
								var r = "Viatura fora do local"

								for(var i in data) {
									valores.push(parseInt(data[i].AcessosNaoConcedidos));
									razao.push(data[i].ValidacaoAcesso);
								}

								for (var raz in razao){
									if (razao[raz] == "Acesso Nao Concedido - Loops nao ativo") razao[raz] = r;
									razao[raz]=razao[raz].replace('Acesso Nao Concedido - ','');
									razao[raz]=razao[raz].replace('Acesso Recusado - ','');
								};

								var colors = [
												"#2F4F4F", "#008080", "#2E8B57", "#3CB371", "#90EE90", "#4279a3", "#476c8a", "#49657b", "#7f8e9e"
											];
								
								var chartdata = {
									labels:  razao,
									datasets : [
										{
											label: "Total de Acessos Negados",
											backgroundColor: colors,
											data: valores,
										}
									]
								};

								var ctx = $('#pieChartAcessos2');

								pieChart = new Chart(ctx, {
									data: chartdata,
									type: 'pie'
									
								});
								document.getElementById('js-legend1').innerHTML = pieChart.generateLegend();

												  			$('#loadingpieChartAcessos2').hide();

							},
							error: function(data) {
								console.log("erro");
							}
						});
					  
				  }

				  if ($('#totalacesso').length ){

				  	 $.ajax({

						url: url + "totalAcessosContri.php",
						method: "POST",
						data: {de:de, ate:ate,utilizador : utilizador},
						success: function(data) {
							var total = 0;
							var saidas = 0;
							var entradas = 0;
							var recusados = 0;
							var aceites = 0;
							var especial = 0;
								
							for(var i in data) {
								total = data[i].total;
								saidas = data[i].saidas;
								entradas = data[i].entradas;
								recusados = data[i].recusados;
								aceites = data[i].aceites;
								especial = data[i].especial;
							}if(total!=0){

			  				document.getElementById('totalacesso2').innerHTML = total;
			  				document.getElementById('totalentradas').innerHTML = entradas;
			  				document.getElementById('totalsaidas').innerHTML = saidas;
			  				document.getElementById('totalRecusadas').innerHTML = recusados;
			  				document.getElementById('totalConcedidos').innerHTML = aceites;
			  				document.getElementById('totalEspecial').innerHTML = especial;

							}else{

			  				document.getElementById('totalacesso2').innerHTML = 0;
			  				document.getElementById('totalentradas').innerHTML = 0;
			  				document.getElementById('totalsaidas').innerHTML = 0;
			  				document.getElementById('totalRecusadas').innerHTML = 0;
			  				document.getElementById('totalConcedidos').innerHTML = 0;
			  				document.getElementById('totalEspecial').innerHTML = 0;
							}
				  		}
				  	})

				   }

					if ($('#linhasTotalAcessos').length) {
									  			$('#loadinglinhasTotalAcessos').show();

						var labels=["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	                var tipo=0;
	                var nomeLabel;
	                var c = new Date(de)
	                var d = new Date(ate)
	                var prim = moment(de,'YYYY/MM/DD');
								  var ult = moment(ate,'YYYY/MM/DD');
									var diffDays = ult.diff(prim, 'days');

	                if(diffDays==0){
	                    tipo=1;
	                    nomeLabel="Horas"
	                }

	                else if (diffDays==1){
	                     tipo =2;
	                     nomeLabel="Dias"

	                 }

	                else if (diffDays<=31){
	                     tipo =4;
	                     nomeLabel="Dias"
	                 }

	                else if(diffDays<7){
	                	  tipo =3;
	                      nomeLabel="Dias"
	                }
	                else{
	                    tipo =5;
	                    nomeLabel="Meses"
	                }

	                var de = c.toISOString()
	                var ate = d.toISOString()
								
	                 $.ajax({

	                    type: 'POST',
	            				url: url + "utilizadorAcessosTotaisContri.php",
	                    data: {de : de, ate : ate, utilizador:utilizador, tipo:tipo}, 
	            		success: function(data) {
	            					var valoresE = new Array();
	            			var valoresS = new Array();
	                  var label =new Array();
	                  var posvaloresE=0;
	                  var posvaloresS=0;

	            			for(var i in data) {

	            				if($.inArray(data[i].lab, label)!=-1){

		            				if (data[i].ee=="Entrada"){

		            					 posvaloresE=label.indexOf(data[i].lab);

		            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
		            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
		            					
		            					
		            				}

		            				if (data[i].es=="Saída"){


		            					 posvaloresS=label.indexOf(data[i].lab);

		            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
		            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
		            					
		            					
		            				}
		            			}else{
		            				
		            			   label.push(data[i].lab);
		            				if (data[i].es=="Saída"){

		            						posvaloresS=label.indexOf(data[i].lab);
		            						valoresS.splice(posvaloresS, 0, parseInt(data[i].AcessosConcedidos));
		            				}
		            				if (data[i].ee=="Entrada"){

		            					posvaloresE=label.indexOf(data[i].lab);
		            					valoresE.splice(posvaloresE, 0, parseInt(data[i].AcessosConcedidos));

		            				} 
		            			}

	            				
	            			}
	            			if(tipo==5){

	            				for(var i in label) {
		                            label[i]=labels[i];

	            				}
	            			}



	            			
	            			var chartdata = {
	            				labels:  label,
	            				datasets : [
	            					{
	            						label: "Total de Entradas",
	            						backgroundColor: "rgba(38, 185, 154, 0.31)",
	            						borderColor: "rgba(38, 185, 154, 0.7)",
	            						pointBorderColor: "rgba(38, 185, 154, 0.7)",
	            						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
	            						pointHoverBackgroundColor: "#fff",
	            						pointHoverBorderColor: "rgba(220,220,220,1)",
	            						pointBorderWidth: 1,
	            						data: valoresE
	            					},{
													label: "Total de Saídas",
													backgroundColor: "rgba(3, 88, 106, 0.3)",
													borderColor: "rgba(3, 88, 106, 0.70)",
													pointBorderColor: "rgba(3, 88, 106, 0.70)",
													pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
													pointHoverBackgroundColor: "#fff",
													pointHoverBorderColor: "rgba(151,187,205,1)",
													pointBorderWidth: 1,
													data: valoresS
												}	

	            				]
	            			};

	            			

	            			var ctx = $("#linhasTotalAcessos");

	            			barGraph = new Chart(ctx, {
	            				type: 'line',
	            				data: chartdata,
	                            options: {
	                                scales: {
	                                    yAxes: [{
	                                    	scaleLabel: {
										        display: true,
										        labelString: 'Acessos'
										    },
	                                        ticks: {
	                                            beginAtZero: true,

	                                        }
	                                    }],
	                                    xAxes: [{
	                                    	scaleLabel: {
										        display: true,
										        labelString: "Meses"
										    }
	                                    }]
	                                }
	                            }

	            			});
	            		document.getElementById('js-legend3').innerHTML = barGraph.generateLegend();
									  			$('#loadinglinhasTotalAcessos').hide();

	            		},
	            		error: function(data) {
	            			console.log("erro");
	            		}

		               });	
				}

				if ($('#utilizadorAcessosPorPilareteBarras').length) {
					$('#loadingutilizadorAcessosPorPilareteBarras').show();

	                var c = new Date(de)
	                var d = new Date(ate)
	                var de = c.toISOString()
	                var ate = d.toISOString()
					$.ajax({
	            			method: "POST",
	            			url: url + "utilizadorAcessosPorPilaretesBarrasContri.php",

	                  data: {de:de,ate:ate,utilizador : utilizador},

	            			success: function(data) {
	            				var valoresE = new Array();
	            						var valoresS = new Array();
	                        var label =new Array();
	                        var posvaloresE= 0;
	                        var posvaloresS= 0;
	                        var x;
													  for (var i in data){
	                        	valoresE.push(parseInt(data[i].entradas));
	            				valoresS.push(parseInt(data[i].saidas));
	            				label.push(data[i].pilarete);
	                        }

	            			var chartdata = {

	            				labels:  label,

	            				datasets : [
	            					{

	            						label: "Total de Entradas",
	            						backgroundColor: "rgba(38, 185, 154, 0.7)",
	            						backgroundColor: "rgba(38, 185, 154, 0.7)",

	            						data: valoresE
	            					},{

										label: "Total de Saídas",
										backgroundColor: "rgba(3, 88, 106, 0.7)",
										backgroundColor: "rgba(3, 88, 106, 0.7)",

									
										data: valoresS

									}	
	            				]	

	            			};
	            			var numberWithCommas = function(x) {
	                  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	                };

	            			var ctx = document.getElementById("utilizadorAcessosPorPilareteBarras").getContext("2d");

	            			 barGraphUtiPilaretes = new Chart(ctx, {
	            				type: 'bar',
	            				data: chartdata,

	            				options: {
												
	            				tooltips: {

	                    mode: 'label',
	                          callbacks: {
	                          label: function(tooltipItem, data) { 
	                            return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
	                          }
	                          }
	                    },            					responsive: true,
	       
	        							scales: {
	                        yAxes: [{
													stacked:true,
	                        scaleLabel: {
										        display: true,
										        labelString: 'Acessos'
										    },
	                         ticks: {
	                                beginAtZero: true,
																	}
	                          }],
	                          xAxes: [{
															stacked:true,
																		}]
																	}
																}
	            		
	            			});
	            	    document.getElementById('js-legend2').innerHTML = barGraphUtiPilaretes.generateLegend();
									  			$('#loadingutilizadorAcessosPorPilareteBarras').hide();

	            		},
	            		error: function(data) {
	            			console.log("erro");
	            		}
		           });
				}
			}

		}

function init_checkboxes(){
	if(document.getElementById('horariosID') !== null){
		var p;
		var checkbox;
		var label;
		$.ajax({
			url: url + "checkboxes.php",
			method: "GET",
			success: function(data){
				var horario;

				for(var i in data){
					if(data[i].horarios == 'teste' || data[i].horarios == 'Feira de Velharias' || data[i].horarios == 'Serviços Acção social');
					else {p = document.createElement('p');
						horariosID.appendChild(p);
						checkbox = document.createElement('input');
						label = document.createElement('label');
						horario = data[i].horarios;
						checkbox.type = "checkbox";
						checkbox.name = horario;
						checkbox.value = "value"+i;
						checkbox.id = "id"+i;
						label.htmlFor = "idhtml"+i;
						label.appendChild(document.createTextNode(horario));
						horariosID.appendChild(checkbox);
						horariosID.appendChild(label);}
					
				}
			}
		})
				
				

				
			}
}
		
/* Mapa de pilaretes */
window.onload = function() {


		var contador=0;

        var tileLayer = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png", {maxZoom: 18, minZoom: 15});

        var map = new L.map('mapid', {
            layers: tileLayer

        }).setView([41.552398, -8.422144], 16);

	 $.ajax({

					url: url +"pilareteMapa.php",
					method: "POST",
					success: function(data) {
						for(var i in data) {
							if(contador==0){
								var point = L.point(parseInt(data[i].px)-20,parseInt(data[i].py));
								var circle = L.circle(map.layerPointToLatLng(point), {
														color: 'red',
														fillColor: '#f03',
														fillOpacity: 0.5,
														name: data[i].nome,
														radius: 5
												}).addTo(map).on('click', function(){
															  document.getElementById('Pilarete').innerHTML = this.options.name;
																inicializa_graficos(this.options.name) 
									});
							circle.bindPopup(data[i].nome);
							circle.on('mouseover', function (e) {
									this.openPopup();
							});
							circle.on('mouseout', function (e) {
									this.closePopup();
							});
								contador++;
							}else{

								var point = L.point(parseInt(data[i].px)+20,parseInt(data[i].py));
								var circle = L.circle(map.layerPointToLatLng(point), {
														color: 'red',
														fillColor: '#f03',
														fillOpacity: 0.5,
														name: data[i].nome,
														radius: 5
								}).addTo(map).on('click', function(e){
																document.getElementById('Pilarete').innerHTML = this.options.name;
																inicializa_graficos(this.options.name),
																pilareteSelecionado=this.options.name; 
												});
								circle.bindPopup(data[i].nome);
								circle.on('mouseover', function (e) {
										this.openPopup();
								});
								circle.on('mouseout', function (e) {
										this.closePopup();
								});
							}
							}
			  		}
			  	})

    };

    // FUNÇÃO PARA INICIAR OS ALERTAS!!!
    function init_alertas(){
    	
    	if($('#tabelaAlertas').length){
					 $.ajax({
				        url : url + "alertas.php",
				        type : 'GET',
				        success : function(data) {

				        	for(var i in data){
								$('#tabelaAlertas tbody').append("<tr><td>" + data[i].dhai + "</td><td>" + data[i].ta + "</td><td>" + data[i].p +
								"</td><td>" + data[i].Estado + "</td></tr>" );							}

								
				        },
				        error : function() {
				            console.log('error');
				        }
				    });
				}
				
				if($('#tabelaAlertasUtilizador').length){
					 $.ajax({
				        url : url + "alertasUtilizadores.php",
				        type : 'GET',
				        success : function(data) {
				        	var entradas = [];
				        	var saidas = [];
				        	var dataE;
				        	var dataS;
				        	var horas;
				        	var minutos;
				        	var tempoFinal = "";
				        	for(var i in data){
				        		if(data[i].e =="Entrada" && data[i].s !="Saída") {

				        			entradas.push(data[i].tel);
				        			entradas.push(data[i].nome);
				        			entradas.push(data[i].tu);
				        			entradas.push(data[i].dh);
				        			entradas.push(data[i].tempo);
				        			entradas.push(data[i].pilarete);
				        		}
				        		if(data[i].e != "Entrada" && data[i].s == "Saída"){

				        			saidas.push(data[i].tel);
				        			saidas.push(data[i].dh);
				        		}
				        	}
				        	var flag;
				        	for(var x = 0; x<entradas.length; x+=6){
				        		if(!saidas.includes(entradas[x]))
				        		{
				        			if(entradas[x+4] >= 30) {
				        				horas = Math.floor(entradas[x+4]/60);
				        				minutos = entradas[x+4] % 60;
				        				tempoFinal = horas + "h" + ":" + minutos + "m";
				        				entradas[x+4] = tempoFinal;
				        				$('#tabelaAlertasUtilizador tbody').append("<tr><td>" + entradas[x+1] + "</td><td>" + entradas[x] + "</td><td>" + entradas[x+2] +
								"</td><td>" + entradas[x+5] + "</td><td>" + entradas[x+4] + "</td></tr>" );
				        			}
				        		}
				        		else{
				        			horas = Math.floor(entradas[x+4]/60);
				        			minutos = entradas[x+4] % 60;
				        			tempoFinal = horas + "h" + ":" + minutos + "m";
				        			entradas[x+4] = tempoFinal;
				        			flag = 0;
				        			for(var j = 0; j<saidas.length; j+=2){
				        				dataE = new Date(entradas[x+3]);
				        				dataS = new Date(saidas[j+1]);
				        				if(entradas[x] == saidas[j] && dataE.getTime() < dataS.getTime()) flag=1;
				        			}
				        			if (flag==0 && entradas[x+4]>=30){
				        				$('#tabelaAlertasUtilizador tbody').append("<tr><td>" + entradas[x+1] + "</td><td>" + entradas[x] + "</td><td>" + entradas[x+2] +
								"</td><td>" + entradas[x+5] + "</td><td>" + entradas[x+4] + "</td></tr>" );
				        			}
				        		}
				        	}

								
				        },
				        error : function() {
				            console.log('error');
				        }
				    });
				}
		}

		function inicializa_graficos(e) {
			barGraph1.destroy();
			barGraphContribuintePorPilarete.destroy();
			barGraphTelefonePorPilarete.destroy();
			init_chartsPilaretes(de, ate,e);
			
			}
		/* Checkbox de horários */

		var myEl = document.getElementById('botaoGerar');
		if(myEl!==null){
		myEl.addEventListener('click', function() {
				var array = getCheckedBoxes("1");
					barGraph.destroy();	
		      barGraphPilaretes.destroy();
		      barGraphUtilizador.destroy(); 
					barGraphUtilizadorTelefone.destroy();
				init_charts(de,ate,array);
			}, false);
		}

		// Pass the checkbox name to the function
		function getCheckedBoxes(chkboxName) {
			  var checkboxes = document.getElementsByName(chkboxName);
			  var checkboxesChecked = [];
			  // loop over them all
			  for (var i=0; i<checkboxes.length; i++) {
			     // And stick the checked ones onto an array...
			     if (checkboxes[i].checked) {
			        checkboxesChecked.push(checkboxes[i].className);
			     }
			  }
			  // Return the array if it is non-empty, or null
			  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
			}

		//Calcula string com os seleccionados da checkbox
		function checkboxSelecionados(selecionados) {
			var i,string="",contador=0;
			var tamanho=selecionados.length;
			for(i=0;i<tamanho;i++){
				if(contador<tamanho-1){
					string = string + selecionados[i] + "|";
					contador++;		
				}
				else 
					string = string + selecionados[i]; 
			}
			return string;
		}


		//Gráfico que compara 2 anos seguidos

		function init_graficoAnos(){
			var ano = $('#selecaoano option:selected').val();
			 		$('#loadingcompAnos').show();

				var listados;
				//if(checkedBoxes == null) listados = '.*';
				//if(checkedBoxes!=null) listados = checkboxSelecionados(checkedBoxes);
				listados = '.*';
				if(ano == null ) ano = 2017;
			  var ctx = document.getElementById("compAnos");
			  $.ajax({
	
          type: 'POST',
					url: url +"acessosAnos.php",
          data: {ano: ano, listados: listados},
				success: function(data) {
					var score = [];
					var anoY = [];
					for(var i in data) {
						if (data[i].year==ano)
							{score.push(parseInt(data[i].AcessosConcedidos));}
						else {anoY.push(parseInt(data[i].AcessosConcedidos));}
					}

					var chartdata = {
						labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
						datasets : [
							{
								label: ano,
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								borderColor: "rgba(38, 185, 154, 0.7)",
								pointBorderColor: "rgba(38, 185, 154, 0.7)",
								pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointBorderWidth: 1,
								data: score
							},  {
								label: ano-1,
								backgroundColor: "rgba(3, 88, 106, 0.3)",
								borderColor: "rgba(3, 88, 106, 0.70)",
								pointBorderColor: "rgba(3, 88, 106, 0.70)",
								pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(151,187,205,1)",
								pointBorderWidth: 1,
								data: anoY
								}	
						]
					};

					var ctx = $("#compAnos");

					   compAnos = new Chart(ctx, {
						type: 'line',
						data: chartdata,
						options: {
                     scales: {
                        yAxes: [{
                         scaleLabel: {
									        display: true,
									        labelString: 'Acessos'
									    },
                      ticks: {
                        beginAtZero: true,
                          }
                          }],
                        xAxes: [{
										     	scaleLabel: {
									        display: true,
									        labelString: 'Meses'
									    }
                                    }]
                                }
                            }
					});
				 document.getElementById('js-legend3').innerHTML = compAnos.generateLegend();
			 		$('#loadingcompAnos').hide();

				},
				error: function(data) {
					console.log("erro");
				}
			});
		}
		/* COMPOSE */
		
		function init_compose() {
		
			if( typeof ($.fn.slideToggle) === 'undefined'){ return; }

		
			$('#compose, .compose-close').click(function(){
				$('.compose').slideToggle();
			});
		
		};
	   
	   	/* CALENDAR */
		  
		    function  init_calendar() {

				if( typeof ($.fn.fullCalendar) === 'undefined'){ return; }

				var date = new Date(),
					d = date.getDate(),
					m = date.getMonth(),
					y = date.getFullYear(),
					started,
					categoryClass;
				

				var calendar = $('#calendar').fullCalendar({
				 locale: 'pt',

				  header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay,listMonth'
				  },

				   
				events: url + 'eventos.php',

				 eventRender: function(event, element, view) {
					    if (event.allDay === 'true') {
					     event.allDay = true;
					    } else {
					     event.allDay = false;
					    }
					     var start = moment(event.start, 'YYYY-MM-DD HH:MM:ss').format('HH:mm');
					     element.html( start +' ' + event.title + '<span class="removeEvent glyphicon glyphicon-trash pull-right" id="Delete"></span>');

					     
				},

				  selectable: true,
				  selectHelper: true,

				  select: function(start, end, allDay) {
				  	var idE
					$('#fc_create').click();

					started = start;
					ended = end;
					var title;
					$(".antosubmit").on("click", function() {
					  title = $("#title").val();

					  if (end) {
						ended = end;
					  }

					  categoryClass = $("#event_type").val();

					  if (title) {
						   var start = $.fullCalendar.moment(started, 'YYYY-MM-DD HH:MM:ss').toISOString();
						   var end =  $.fullCalendar.moment(ended, 'YYYY-MM-DD HH:MM:ss').toISOString();
						   var desc = $("#descr").val();
						   $.ajax({
						   url: url + 'addEventos.php',
						   data:{ title:title,start: start, end: end, description:desc },
						   method: "POST",
						   success: function(data){
						   	for(var i in data){
						   		idE = data[0]

						   	}
						   }
						   });
						 calendar.fullCalendar('renderEvent',
						   {
						   id: idE,
						   title: title,
						   start: start,
						   end: end,
						   allDay: event.allDay,
						   description: desc,
						   },
						   true // make the event "stick"
   					);

					  }

					  $('#title').val('');
					  $("#descr").val('');
					  calendar.fullCalendar('unselect');

					  $('.antoclose').click();

					  return false;
					});

					
				  },
				  editable: true,

				  eventDrop: function(event, delta) {
					   var start = $.fullCalendar.moment(event.start, 'YYYY-MM-DD HH:MM:ss').toISOString();
					   var end = $.fullCalendar.moment(event.end, 'YYYY-MM-DD HH:MM:ss').toISOString();
					   $.ajax({
						   url: url + 'updateEventos.php',
						   data: 'title='+ event.title+'&start='+ start +'&end='+ end +'&id='+ event.id + '&desc='+event.description + '&flag=0',
						   type: "POST",
						 
					   });
					},

				  eventResize: function(event) {
					   var start = $.fullCalendar.moment(event.start, 'YYYY-MM-DD HH:MM:ss').toISOString();
					   var end = $.fullCalendar.moment(event.end, 'YYYY-MM-DD HH:MM:ss').toISOString();
					   $.ajax({
					    url: url + 'updateEventos.php',
					    data: 'title='+ event.title+'&start='+ start +'&end='+ end +'&id='+ event.id + '&desc='+event.description + '&flag=0',
					    type: "POST",
				
					   });
					},

					eventClick: function(calEvent, jsEvent,view) {
						if (jsEvent.target.id === 'Delete') {

						  	var decision = confirm("Deseja eliminar o evento " + calEvent.title  + "?"); 
							if (decision) {
								$.ajax({
									method: "POST",
									url: url + 'delEventos.php',
									data: {id:calEvent.id} ,
								});

								$('#calendar').fullCalendar('removeEvents',  calEvent._id);

							}
						}else {
							
							  $('#fc_edit').click();
								$('#title2').val(calEvent.title);
								$('#descr2').val(calEvent.description)
								/*$(".antosubmit2").on("click", function() {
									
								  calEvent.title = $("#title2").val();
								  calEvent.description = $("#descr2").val();
								   $.ajax({
								   	type: "POST",
								    url: url + 'updateEventos.php',
								    data: {id:calEvent.id, title: calEvent.title, desc: calEvent.description, flag: 1},								   
								   });
								   $('#calendar').fullCalendar('rerenderEvents',calEvent._id);
								   alert(calEvent.id);
								  $('.antoclose2').click();
								}
				

							);*/
							
						  
						}
					
					},
				});
				
			};
	   


		/* DATA TABLES */
			
			function init_DataTables() {
				

				
				if( typeof ($.fn.DataTable) === 'undefined'){ return; }

				
				var handleDataTableButtons = function() {
				  if ($("#datatable-buttons").length) {
					$("#datatable-buttons").DataTable({
					  dom: "Bfrtip",
					  buttons: [
						{
						  extend: "copy",
						  className: "btn-sm"
						},
						{
						  extend: "csv",
						  className: "btn-sm"
						},
						{
						  extend: "excel",
						  className: "btn-sm"
						},
						{
						  extend: "pdfHtml5",
						  className: "btn-sm"
						},
						{
						  extend: "print",
						  className: "btn-sm"
						},
					  ],
					  responsive: true
					});
				  }
				};

				TableManageButtons = function() {
				  "use strict";
				  return {
					init: function() {
					  handleDataTableButtons();
					}
				  };
				}();

				$('#datatable').dataTable();

				$('#datatable-keytable').DataTable({
				  keys: true
				});

				$('#datatable-responsive').DataTable();

				$('#datatable-scroller').DataTable({
				  ajax: "js/datatables/json/scroller-demo.json",
				  deferRender: true,
				  scrollY: 380,
				  scrollCollapse: true,
				  scroller: true
				});

				$('#datatable-fixed-header').DataTable({
				  fixedHeader: true
				});

				var $datatable = $('#datatable-checkbox');

				$datatable.dataTable({
				  'order': [[ 1, 'asc' ]],
				  'columnDefs': [
					{ orderable: false, targets: [0] }
				  ]
				});
				$datatable.on('draw.dt', function() {
				  $('checkbox input').iCheck({
					checkboxClass: 'icheckbox_flat-green'
				  });
				});

				TableManageButtons.init();
				
			};
	   
			
	   


		/*TESTE PARA GERAR O PDF */

		var pdf = document.getElementById('pdf');
		if(pdf!==null){
		pdf.addEventListener('click', function() {
				var de = moment().subtract(3, 'month').startOf('month');
				var ate= moment().subtract(3, 'month').endOf('month');
				demoFromHTML(de,ate);
			}, false);
		}

		

var imagemTotaisAcessos='';
var	imagemTotaisContribuinte='';
var imagemTotaisTelefone='';
var imagemTotaisPilarete='';
var imagemTotaisTelefoneNegados='';
var imagemTotaisContribuinteNegados='';


function demoFromHTML(de,ate) {
	
	
	var listados=null;
	var tipo=4;
  var c = new Date(de)
  var d = new Date(ate)
  var de = c.toISOString()
  var ate = d.toISOString()
	
	$.ajax({
				url: url+"acessosPorUtilizador.php",
				method: "POST",
				data: {de:de,ate:ate, listados : listados},
				
				success: function(data) {
					var valores = [];
					var telefone = []
					for(var i in data) {
						valores.push(parseInt(data[i].AcessosConcedidos));
						telefone.push(parseInt(data[i].nContribuinte));

					}

					var chartdata = {
						labels:  telefone,
						datasets : [
							{
								label: "Total de Acessos",
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								data: valores,
								options: {

										responsive: false,
										animation: false,
								  scales: {
									yAxes: [{
									  ticks: {
										beginAtZero: true
									  }
									}]
								  }
								}
							}
						]
					};
					
					var canvas = document.getElementById('demo');
					var ctx = $("#demo");
					canvas.style.display='none';
					canvas.width=600;
					canvas.height=400;
					var barGraphUtilizador1 = new Chart(ctx, {
						type: 'bar',
						data: chartdata,
						 options: {
							responsive: false,
							animation: false
					}
					});

					imagemTotaisContribuinte = canvas.toDataURL();
					
					},
					
					error: function(data) {
						console.log("erro");
				}
			});  
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
					$.ajax({

                    type: 'POST',
            				url: url + "teste.php",
                    data: {de : de, ate : ate, tipo : tipo, listados : listados}, 
            		success: function(data) {
            			
									var valoresE = new Array();
            			var valoresS = new Array();
                  var label =new Array();
                  var posvaloresE=0;
                  var posvaloresS=0;

            			for(var i in data) {

            				if($.inArray(data[i].lab, label)!=-1){

	            				if (data[i].ee=="Entrada"){

	            					 posvaloresE=label.indexOf(data[i].lab);

	            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}

	            				if (data[i].es=="Saída"){


	            					 posvaloresS=label.indexOf(data[i].lab);

	            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}
	            			}else{
	            				
	            			   label.push(data[i].lab);
	            				if (data[i].es=="Saída"){

	            						posvaloresS=label.indexOf(data[i].lab);
	            						valoresS.splice(posvaloresS, 0, parseInt(data[i].AcessosConcedidos));
	            				}
	            				if (data[i].ee=="Entrada"){

	            					posvaloresE=label.indexOf(data[i].lab);
	            					valoresE.splice(posvaloresE, 0, parseInt(data[i].AcessosConcedidos));

	            				} 
	            			}

            				
            			}
            			
            			var chartdata = {
            				labels:  label,
            				datasets : [
            					{
            						label: "Total de Entradas",
            						backgroundColor: "rgba(38, 185, 154, 0.31)",
            						borderColor: "rgba(38, 185, 154, 0.7)",
            						pointBorderColor: "rgba(38, 185, 154, 0.7)",
            						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            						pointHoverBackgroundColor: "#fff",
            						pointHoverBorderColor: "rgba(220,220,220,1)",
            						pointBorderWidth: 1,
            						data: valoresE
            					},{
												label: "Total de Saídas",
												backgroundColor: "rgba(3, 88, 106, 0.3)",
												borderColor: "rgba(3, 88, 106, 0.70)",
												pointBorderColor: "rgba(3, 88, 106, 0.70)",
												pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
												pointHoverBackgroundColor: "#fff",
												pointHoverBorderColor: "rgba(151,187,205,1)",
												pointBorderWidth: 1,
												data: valoresS
											}	

            				]
            			};

            			

									var canvas = document.getElementById('demo2');
									var ctx = $("#demo2");
									canvas.style.display='none';
									canvas.width=600;
									canvas.height=400;
            			barGraph = new Chart(ctx, {
            				type: 'line',
            				data: chartdata,
                    options: {
                         scales: {
                            yAxes: [{
                              	scaleLabel: {
																		display: true,
																		labelString: 'Acessos'
																},
                                ticks: {
                                    beginAtZero: true,
																	
                                  },
																	
                              }],
														xAxes: [{
                              	scaleLabel: {
																		display: true,
																		labelString: 'Dias'
																}
															 
														}]
                          },
													responsive: false,
													animation: false
					
                    }
            			});
													imagemTotaisAcessos = canvas.toDataURL();

            		},
            		error: function(data) {
            			console.log(data);
            		}




	               });
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

$.ajax({
            			url: url + "acessosPorPilarete.php",
            			method: "POST",

                  		data: {de : de, ate : ate,listados : listados},

            			success: function(data) {
            						var valoresE = new Array();
            						var valoresS = new Array();
                        var label =new Array();
                        var posvaloresE;
                        var posvaloresS;
                        var x;
            			for(var i in data) {

            				if($.inArray(data[i].Pilarete, label)!=-1){

								if (data[i].ee=="Entrada"){

	            					 posvaloresE=label.indexOf(data[i].Pilarete);

	            					 if (valoresE[posvaloresE] === undefined) valoresE[posvaloresE]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresE[posvaloresE] = parseInt(valoresE[posvaloresE]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}

	            				if (data[i].es=="Saída"){


	            					 posvaloresS=label.indexOf(data[i].Pilarete);

	            					 if (valoresS[posvaloresS] === undefined) valoresS[posvaloresS]=parseInt((data[i].AcessosConcedidos));
	            					 else valoresS[posvaloresS] = parseInt(valoresS[posvaloresS]) + parseInt((data[i].AcessosConcedidos));
	            					
	            					
	            				}
	            			}else{
	            				label.push(data[i].Pilarete);

	            				if (data[i].es=="Saída"){

	            						posvaloresS=label.indexOf(data[i].Pilarete);
	            						valoresS.splice(posvaloresS, 0, parseInt(data[i].AcessosConcedidos));
	            				}
	            				if (data[i].ee=="Entrada"){

	            					posvaloresE=label.indexOf(data[i].Pilarete);
	            					valoresE.splice(posvaloresE, 0, parseInt(data[i].AcessosConcedidos));

	            				} 

	            			}

            				
            			}
            			var chartdata = {

            				labels:  label,

            				datasets : [
            					{
            						label: "Total de Entradas",
            						backgroundColor: "rgba(38, 185, 154, 0.7)",
            						backgroundColor: "rgba(38, 185, 154, 0.7)",
												hoverBorderWidth: 2,
												hoverBorderColor: 'lightgrey',
            						data: valoresE
            					},{
												label: "Total de Saídas",
												backgroundColor: "rgba(3, 88, 106, 0.7)",
												backgroundColor: "rgba(3, 88, 106, 0.7)",
												hoverBorderWidth: 2,
												hoverBorderColor: 'lightgrey',
												data: valoresS
											}	
            				]	

            			};
											
											var canvas = document.getElementById('pdfpilaretes');
											var ctx = $("#pdfpilaretes");
											canvas.style.display='none';
											canvas.width=600;
											canvas.height=400;
            			 barGraphPilaretes = new Chart(ctx, {
            				type: 'bar',
            				data: chartdata,
            				options: {

            					scales:{
            						  xAxes: [{ 
								          	stacked: true,
								          	gridLines: { display: false },
 
								            }],
            						   yAxes: [{
            						   		stacked: true, 
            							  ticks: {
            								beginAtZero: true,
     				 
            							  },
            							}],

            						  }
 											},
													responsive: false,
													animation: false
            			});
									imagemTotaisPilarete = canvas.toDataURL();

            		},
            		error: function(data) {
            			console.log(data);
            		}
	           });
/*----------------------------------------------------------------------------------------------------------------------------------------*/

$.ajax({
				url: url + "acessosPorUtilizadorTelefone.php",
				method: "POST",
				data: {de : de, ate : ate, listados : listados},
				success: function(data) {
					var valores = [];
					var telefone = []

					for(var i in data) {
						valores.push(parseInt(data[i].AcessosConcedidos));
						telefone.push(parseInt(data[i].telemovel));

					}

					var chartdata = {
						labels:  telefone,
						datasets : [
							{
								label: "Total de Acessos",
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								data: valores,
								options: {
								  scales: {
									yAxes: [{
									  ticks: {
										beginAtZero: true
									  }
									}]
								  }
								}
							}
						]
					};

					var canvas = document.getElementById('pdfConcedidosTelefone');
					var ctx = $("#pdfConcedidosTelefone");
					canvas.style.display='none';
					canvas.width=600;
					canvas.height=400;
					 barGraphUtilizadorTelefone = new Chart(ctx, {
						type: 'bar',
						data: chartdata,
						options:{
													responsive: false,
													animation: false
						}	
				});

					imagemTotaisTelefone = canvas.toDataURL();

				},
				error: function(data) {
					console.log(data);
				}
			});

/* ------------------------------------------------------------------------------------------------------------------------*/


				$.ajax({
						url: url + "acessosNegadosPorTelefone.php",

						method: "GET",
						data: {de : de, ate : ate},
						success: function(data) {
							console.log(data);
							var valores = [];
							var telefone = []

							for(var i in data) {
								valores.push(parseInt(data[i].AcessosNaoConcedidos));
								telefone.push(parseInt(data[i].Telefone));

							}

							var chartdata = {
								labels:  telefone,
								datasets : [
									{
										label: "Total de Acessos Negados",
										backgroundColor: "rgba(38, 185, 154, 0.31)",
										data: valores,
										options: {
										  scales: {
											yAxes: [{
											  ticks: {
												beginAtZero: true
											  }
											}]
										  }
										}
									}
								]
							};

					var canvas = document.getElementById('pdfNegadosTelefone');
					var ctx = $("#pdfNegadosTelefone");
					canvas.style.display='none';
					canvas.width=600;
					canvas.height=400;

							var barGraph = new Chart(ctx, {
								type: 'bar',
								data: chartdata,
									options:{
													responsive: false,
													animation: false
						}	
							});
								imagemTotaisTelefoneNegados = canvas.toDataURL();

						},
						error: function(data) {
							console.log(data);
						}
					});
							  
			

/*-------------------------------------------------------------------------------------------------------------------*/			  

				$.ajax({
						url: url + "acessosNegadosPorContribuinte.php",

						method: "GET",
						data: {de : de, ate : ate},
						success: function(data) {
							console.log(data);
							var valores = [];
							var contribuinte = []

							for(var i in data) {
								valores.push(parseInt(data[i].AcessosNaoConcedidos));
								contribuinte.push(parseInt(data[i].nContribuinte));

							}

							var chartdata = {
								labels:  contribuinte,
								datasets : [
									{
										label: "Total de Acessos Negados",
										backgroundColor: "rgba(38, 185, 154, 0.31)",
										data: valores,
										options: {
										  scales: {
											yAxes: [{
											  ticks: {
												beginAtZero: true
											  }
											}]
										  }
										}
									}
								]
							};

					var canvas = document.getElementById('pdfNegadosContribuinte');
					var ctx = $("#pdfNegadosContribuinte");
					canvas.style.display='none';
					canvas.width=600;
					canvas.height=400;
							var barGraph = new Chart(ctx, {
								type: 'bar',
								data: chartdata,
									options:{
													responsive: false,
													animation: false
						}	
							});
												imagemTotaisContribuinteNegados = canvas.toDataURL();

						},
						error: function(data) {
							console.log(data);
						}
					});

setTimeout(templatePDF(de,ate),5000);

			
}


function templatePDF(de,ate){
					var doc = new jsPDF("p", "pt", "a4");

					var width = doc.internal.pageSize.width/2;    
					var height = doc.internal.pageSize.height/2;
					xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth("Report Mensal") * doc.internal.getFontSize() / 2);  //Tentar por ao centro
	
					doc.setFontType("bold");
					doc.setFontSize(20);

					doc.text("Report Mensal", xOffset, 100);
					doc.text("De " + de.substring(0,10) + " até " + ate.substring(0,10), xOffset-70, 200);

					doc.addPage();
					
          			doc.text('Acessos Concedidos',xOffset,25);
					doc.setFontSize(16);
					doc.text('Total de Acessos',10,60);
          
					var h1=100;
        			var aspectwidth1= ((doc.internal.pageSize.width)*(9/16));
					doc.addImage(imagemTotaisAcessos, 'png',100, h1, aspectwidth1, (height-h1));
					
					doc.text('Total por Utilizador - Contribuinte',10,450);
					doc.addImage(imagemTotaisContribuinte, 'png',100, 500, aspectwidth1, (height-h1));

					doc.addPage();
					doc.text('Total por Utilizador - Telefone',10,60);
					doc.addImage(imagemTotaisTelefone, 'png',100, 100, aspectwidth1, (height-h1));
					doc.addPage();

					doc.text('Total por Pilarete',10,60);
					doc.addImage(imagemTotaisPilarete, 'png',100, 100, aspectwidth1, (height-h1));
				
        			doc.addPage();
					doc.setFontSize(20);
          			doc.text('Acessos Negados',xOffset,25);

					doc.setFontSize(16);
					doc.text('Total por Utilizador - Telefone',10,60);
					doc.addImage(imagemTotaisTelefoneNegados, 'png',100, 100, aspectwidth1, (height-h1));
					doc.text('Total por Utilizador - Contribuinte',10,450);
					doc.addImage(imagemTotaisContribuinteNegados, 'png',100, 500, aspectwidth1, (height-h1));

					doc.save("ReportMes" +de.charAt(5) + de.charAt(6) + ".pdf");
}
			   
	  
	   
	$(document).ready(function() {
 	  var checkedBoxes = getCheckedBoxes("1");
 	  escondeRodas();
		init_chartsPilaretes(de, ate,'.*');
		init_alertas();
	  init_ano();
	  init_Utilizadorano();
	  //init_graficoAnos($('#selecaoano option:selected').val(),checkedBoxes);
	  init_checkboxes();
		init_sidebar();
		init_InputMask();
		init_TagsInput();
		init_parsley();
		init_daterangepickerPilaretes(null);
		init_daterangepickerAcessosNegados();
		init_daterangepickerAcessosUtilizador();
		init_daterangepicker(checkedBoxes);
		init_SmartWizard();
		init_charts(de,ate,checkedBoxes);
		init_DataTables();
		init_PNotify();
		init_calendar();
		init_compose();
		init_CustomNotification();
		init_autosize();
		
		$('#selecaoano').change(function(){

			 compAnos.destroy();
	  		 //init_graficoAnos($('#selecaoano option:selected').val(),checkedBoxes);
	  		 init_graficoAnos();
        });
        $('#selecaoanoUtilizador').change(function(){

			 compAnosUtilizador.destroy();
			 if(tip==1)
	  		 init_utilizdorComp_anos(document.getElementById('Tel').textContent, $('#selecaoanoUtilizador option:selected').val());
	  		else 	 init_utilizdorComp_anos(document.getElementById('Cont').textContent, $('#selecaoanoUtilizador option:selected').val());

        });
				
	});	
	

