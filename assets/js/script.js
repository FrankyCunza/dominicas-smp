/*!
 * Script
 *
 * @author Ncomunicaciones
 * @version 1.0
 */

  $(document).ready(function() {

      $(".menu").toggle(function(){

  	$('section div.enlacmovil').removeClass('movil');

  }, function(){

  	$('section div.enlacmovil').addClass('movil');

  });
  var flecha = $('<i class="fa fa-caret-right fa-lg"></i>');

  $('.nosotros').find('a.more').on('click', function(){
    $(this).hide();
    $(this).siblings('.taller-more').fadeIn('slow');
    $(this).siblings('a.less').css('display', 'block');
  });
  $('.nosotros').find('a.less').on('click', function(){
    $(this).hide();
    $(this).siblings('.taller-more').fadeOut('slow');
    $(this).siblings('a.more').fadeIn('slow');
  });
  $('.menu-interno').find('a').on('click', function(){
  	$('.menu-interno').find('li').removeClass('active');
  	$('.menu-interno').find('li').remove('.fa-caret-right');
  	$(this).parent('li').addClass('active');
  	$(this).append(flecha);
  });
  $('.agendas-list').find('a.item').on('click', function(){
    $('.agendas-list').find('a.item').removeClass('active');
    $(this).addClass('active');
  });

  //lightbox
  $("a.lightbox-item").each(function(i){
      var url = $(this).find('img').attr("src");
      $(this).attr("href", "#img" + (i+1));
      $(".list-lightbox").append("<div class='lightbox-target' id='img" + (i+1) + "'><img src='" + url + "'/><a class='lightbox-close'></a></div>");
  });
  $("a.lightbox-item").on("click", function(){
      var href = $(this).attr("href").replace('#', '');
      $("div.lightbox-target").each(function(){            
          if($(this).attr("id") == href){
              $(this).css('display', 'block')
              $(this).animate({
                  opacity: 1,
                  duration: 400
              });
          }
      })
  });
  $(".lightbox-close").on("click", function(){
    $(this).closest('.lightbox-target').hide();
    $(this).closest('.lightbox-target').css('opacity', '0');
  })

  $(".contactenos").on("submit", function(e) {
    var $form = $(this),
      $mensaje = $("div.solicitud-mensaje"),
      formData = $form.serialize();
    $form.find("button[type=submit]").attr("disabled", "disabled");
    $mensaje.addClass('col s12');
    $mensaje.html('<p><i class="fa fa-spinner fa-spin"></i> Procesando sus datos</p>');
    e.preventDefault();
    $.ajax("contactenos-handler.php", {
      type: "POST",
      data: formData,
      success: function(response) {
        if(response == '') {
          $form.css("display", "none");
          $form[0].reset();
          $mensaje.html('<p><i class="fa fa-check"></i> Su mensaje fue enviado con éxito.<br>Gracias por escribirnos, le responderemos a la brevedad posible.</p>');
        } else {
          $mensaje.html(response);
          $form.find("button[type=submit]").removeAttr("disabled");
        }
      }
    })
  });

  //go back
  function goBack(){
    window.history.back();
    return false;
  }
  if(document.referrer != ''){
    $("[data-js-back]").on("click", goBack);
  }
  
  //incializando paginado
  $(document).ready(function () {
    var jump = function (e) {
      if (e) {
          var target = $(this).attr("href");
          target = target.substr(target.indexOf("#"));
      } else {
          var target = location.hash;
      }

      if ($(target).length) {

          location.hash = target;

          $('html,body').animate({
              
              scrollTop: $(target).offset().top - 110
              
          }, 300);

          return false;
      }
    }

    $('html, body').hide();
    
    $('a[href*=#]').bind("click", jump);

    if (location.hash) {
        setTimeout(function () {
            $('html, body').scrollTop(0).show();
            jump();
            bx_slider();
        }, 0);
    } else {
        $('html, body').show();
        bx_slider();
    }

    if($('div#items').length){
      $('div#items').easyPaginate({
          step:4
      });
    }

    function bx_slider(){
      if($('.recursos_list').length){
        $('.recursos_list').bxSlider({
            slideWidth: 735,
            minSlides: 1,
            pager: true,                       // true / false - display a pager
            pagerSelector: null,                // jQuery selector - element to contain the pager. ex: '#pager'
            pagerType: 'full',                  // 'full', 'short' - if 'full' pager displays 1,2,3... if 'short' pager displays 1 / 4
            pagerLocation: 'bottom',            // 'bottom', 'top' - location of pager
            pagerShortSeparator: '/',           // string - ex: 'of' pager would display 1 of 4
            pagerActiveClass: 'pager-active',
        });
        $('.bx-viewport').css('height', '');
        $('.bx-controls-direction').find('a.bx-prev').mouseenter(function () { $(this).addClass('hover-prev'); });
        $('.bx-controls-direction').find('a.bx-prev').mouseleave(function () { $(this).removeClass('hover-prev'); });
        $('.bx-controls-direction').find('a.bx-next').mouseenter(function () { $(this).addClass('hover-next'); });
        $('.bx-controls-direction').find('a.bx-next').mouseleave(function () { $(this).removeClass('hover-next'); });
      }
    }
    var menu = $('#menu');
    var contenedor = $('#menu-contenedor');
    var cont_offset = contenedor.offset();

    var redes = $('#menu');
   // var contenedorred = $('.redes');
    var cont_offsetred = redes.offset();
    // Cada vez que se haga scroll en la página
    // haremos un chequeo del estado del menú
    // y lo vamos a alternar entre 'fixed' y 'static'.
    //menu redes
     var main = $('#main');
     var cont = main.offset();
     var y= cont.left;


    $(window).on('scroll', function() {
       //alert($(window).scrollTop());
      if($(window).scrollTop() > cont_offset.top) {
        menu.addClass('menu-fijo');
      } else {
        menu.removeClass('menu-fijo');
      }

      if($(window).scrollTop() > cont_offsetred.top) {
        redes.addClass('menu-fijoredes');
      $('.redes').css('top',"8%"); 
      $('.redes').css('left',y+"px");

      } else {
        redes.removeClass('menu-fijoredes');
      $('.redes').css('top',"1%"); 
      $('.redes').css('left',"0");
      }

    });
  });
});