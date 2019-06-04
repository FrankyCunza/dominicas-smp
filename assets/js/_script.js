/*!
 * Script
 *
 * @author ...
 * @version 1.0
 */

! function() {

    if ($('.caracteristicas-list').length) $('.caracteristicas-list').lksMenu();

    if ($('#banner').length) {
        $('#banner').bjqs({
            //'height': 'auto',
            'width': '100%',
            'automatic': true, // automatic
            'responsive': true,
            'nexttext': '', // text/html inside next UI element
            'prevtext': '', // text/html inside previous UI element
            'usecaptions': true, // show captions for images using the image title tag
            'randomstart': true // start slider at random slide
        });
    }

    $("#banner").find("*").not('ol').not('ol li').not('ol li a').not('ul.bjqs-controls.v-centered').add("#banner").css("height", "auto");

    $(window).on("resize", function()
    {
      var height = $("#banner").find("li:visible").innerHeight();
      if(height > 400) {
        $("#banner").find("ul").not('ul.bjqs-controls.v-centered').add("#banner").height(height);
      } else {
        $("#banner").find("ul").not('ul.bjqs-controls.v-centered').add("#banner").height(400);
      }
    }).trigger("resize");

    $("#contactenos-form").on("submit", function(e) {
        var $form = $(this),
            $mensaje = $("div.solicitud-mensaje"),
            formData = $form.serialize();
            response_1 = '<p><i class="fa fa-check"></i> Su mensaje fue enviado con éxito.<br>Gracias por escribirnos, le responderemos a la brevedad posible.</p>';
            response_2 = '<p><i class="fa fa-wrench"></i> Lo sentimos.<br>No se pudieron enviar sus datos debido a un problema con el servidor.</p>';
        $form.find("input[type=submit]").attr("disabled", "disabled");
        $mensaje.html('<p><i class="fa fa-spinner fa-spin"></i> Procesando sus datos</p>');
        e.preventDefault();
        $.ajax("contactenos-handler.php", {
            type: "POST",
            data: formData,
            success: function(response) {
                $mensaje.html(response);
                if(response == response_1){
                  $("input[type=submit]").hide();
                }
                if(response == response_2 || response != response_1){
                  $form.find("input[type=submit]").removeAttr("disabled");
                }
            }
        });
    });
    $('i.fa-bars').rotate({bind:{
      click: function(){
        $(this).rotate({
          angle: 0,
          animateTo:360
          })
        }
      }
    });
    $('li.mostrar-menu i').rotate({bind:{
      click: function(){
        $(this).rotate({
          angle: 0,
          animateTo:360
          })
        }
      }
    });
    $('li.mostrar-menu').rotate({bind:{
      click: function(){
        $('li.mostrar-menu i').rotate({
          angle: 0,
          animateTo:360
          })
        }
      }
    });
    $('i.fa-bars').on('click', function(){
        $(this).animate({opacity : 'hide'}, 200);
        $('ul.menu-movil').show();
    });
    $('li.mostrar-menu').on('click', function(){
        $('ul.menu-movil').animate({opacity : 'hide'}, 200);
        $('i.fa-bars').show();
    });

}();
