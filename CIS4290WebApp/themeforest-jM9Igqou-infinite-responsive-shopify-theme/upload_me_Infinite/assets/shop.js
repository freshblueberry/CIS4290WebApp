
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});
var qvthumbnails;
var cookieName = "wishlistList";
$(document).ready(function () {
  $('#siteloader').fadeOut();
  $('#spin-wrapper').fadeOut();
        lazyLoadInstance.update();

 
  //fixed header
  (function($) {
    function mediaSize() { 
      if (window.matchMedia('(min-width: 992px)').matches) {
        var headerHeight = $('#header').height();
        var navHeight = $('#header .site-header-inner').height();
        $(window).scroll(function(){
            if ($(window).scrollTop() > headerHeight) {
                $('.navfullwidth').addClass('fixed-header');
            }
            else {
                $('.navfullwidth').removeClass('fixed-header');
            }
        });
      }
    };
    mediaSize();
    window.addEventListener('resize', mediaSize, false);  
  })(jQuery);
  
  var headerHeight = $('#header').height();
  var navHeight = $('#header .mobile-width').height();
  $(window).scroll(function(){
      if ($(window).scrollTop() > headerHeight) {
          $('.mobile-width').addClass('fixed-header');
      }
      else {
          $('.mobile-width').removeClass('fixed-header');
      }
  });

  
   //services specific JS
  if($("#header-layout2").length > 0 || $("#header-layout4").length > 0) {
    $('.servicetopbar-service').html($('.move-to-topbar').html());
    $('.move-to-topbar').html("");
  }

  //parallax countdown timer
   if($('.ishiparallaxbanner .parallax-block').data('deal') == '1') {
        var time = $('.ishiparallaxbanner .parallax-block').data('counter');
        var container = $(this).find('#parallaxcountdown');
        $(container).countdown(time, function(event) {
            $(this).find(".countdown-days .data").html(event.strftime('%D'));
            $(this).find(".countdown-hours .data").html(event.strftime('%H'));
            $(this).find(".countdown-minutes .data").html(event.strftime('%M'));
            $(this).find(".countdown-seconds .data").html(event.strftime('%S'));
            ;
        });
    }
  
   //special deals timer 
    $('.specialdealcarousel .productdeal').each(function() {
      var time = $(this).data('dealcounter');
      var container = $(this).find('.productcountdown');

      $(container).countdown(time, function(event) {
        if(event.strftime('%D') > 100) {
          $(this).find(".countdown-days").addClass("data-large");
        }
        $(this).find(".countdown-days .data").html(event.strftime('%D'));
        $(this).find(".countdown-hours .data").html(event.strftime('%H'));
        $(this).find(".countdown-minutes .data").html(event.strftime('%M'));
        $(this).find(".countdown-seconds .data").html(event.strftime('%S'));
        ;
      });
    });

  $("#SortTags").on("click", "a", function(e){

    if($(this).hasClass("selected")) {
      var tagName = $(this).data("tagname");
      var url = decodeURIComponent(window.location.href);
      var tagStart = url.indexOf(tagName);
      var tagEnd = tagStart + tagName.length;

      e.preventDefault();
      if(url.charAt(tagStart-1) == "/") {
        var url = url.replace(tagName,'');
        url = url.replace("+",'');
        window.location = url;
      }else if(url.charAt(tagEnd+1) == "") {
       var url = url.replace(tagName,'');
       url = url.substring(0, (url.length-1));
       window.location = url;
      } else {      
        var url1 = url.substring(0, (tagStart));
        var url2 = url.substring((tagEnd+1));
        var url = url1 + url2;
        window.location = url;
      }
    }     
  });
  
  $( ".owl-carousel.slider-with-options" ).each(function( index ) {
   		$(this).owlCarousel({
            lazyLoad:true,
            navText: [
              '<i class=\'material-icons\'></i>',
              '<i class=\'material-icons\'></i>'
            ],
           	loop:($(this).data("loop")) ? true :false,
            rewind: ($(this).data("rewind")) ? true :false,
            nav:($(this).data("nav")) ? true :false,
            rewind: ($(this).data("rewind")) ? true :false,
            autoplay:($(this).data("autoplay")) ? true :false,
            dots:($(this).data("dots")) ? true :false,
            autoplayTimeout:($(this).data("autoplaytimeout")) ? $(this).data("autoplaytimeout") :4000,
            smartSpeed: ($(this).data("smartspeed")) ? $(this).data("smartspeed") :500,
            margin:($(this).data("margin")) ? $(this).data("margin") : 0,
            responsive: {
              0: {
                items: $(this).data("small"),
                margin:($(this).data("rmargin")) ? $(this).data("rmargin") : 0,
              },
              544: {
                items: $(this).data("mobile")
              },
              768: {
                items: $(this).data("tablet")
              },
              992: {
                items: $(this).data("laptop")
              },
              1200: {
                items: $(this).data("desktop")
              }
            }
          });
	});
 
  $('#product-thumbnails-carousel').owlCarousel({
    nav: true, // Show next and prev buttons
    navText: [
      '<i class=\'material-icons\'></i>',
      '<i class=\'material-icons\'></i>'
    ],
    dots: false,
    loop: false,
    margin:15,
    rewind:true,
    responsive: {
      0: {
        items: 3
      },
      544: {
        items: 4
      },
      768: {
        items: 3
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  });

  qvthumbnails = $('#qv-thumbnails').owlCarousel({
    nav: true,
    loop: false,
    navText: [
      '<i class=\'material-icons\'></i>',
      '<i class=\'material-icons\'></i>'
    ],
    responsive: {
      0: {
        items: 3
      },
      544: {
        items: 5
      },
      768: {
        items: 4
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  $('.megamenu-header').html($('.megamenu-section').html());
  $('.megamenu-section').html("");

  $('input.update-cart').on('input',function(e){
    setTimeout( function(){
      $(".update-qty").trigger('click');
     },800);
  });

  //slide to top 
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('#slidetop').fadeIn(500);
    } else {
      $('#slidetop').fadeOut(500);
    }
  });
  $('#slidetop').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  //quantity selector quickview-modal and product-page
 $(document).on( "click",".product-form__item--quantity .button",function() {
    var n = $(".product-form__item--quantity .quantity").val();
    if($(this).text() == "+"){
      var r = parseInt(n) + 1
    } else{
      if(n == 1)
        return;
      var r = parseInt(n) - 1
    }
    $('input.quantity').val(r);
    $(".update-qty").trigger('click');
  });

  //quantity selector for cart-page
 $(document).on( "click",".cart-qty-btns .button",function() {
     var n =  $(this).siblings( ".quantity" ).val();
      if($(this).text() == "+"){
      var r = parseInt(n) + 1
    } else{
      if(n == 1)
        return;
      var r = parseInt(n) - 1
    }
    $(this).siblings( ".quantity" ).val(r);
    $(".update-qty").trigger('click');
  });


 

  //for change grid to list view
  $(document).on('click', '.list-img', function(e){
    if($(this).hasClass('checked')){
        return;
    }
    else{
      $('#list-img').addClass('checked');
      $('#grid-img').removeClass('checked');
      $('.products-display-collection .grid__item').each(function () {
        $(this).removeClass('small--one-half');
        $(this).removeClass('lg-up--one-third');
        $(this).removeClass('grid__item');
        $(this).removeClass(' medium-up--one-quarter');
        $(this).addClass('one-whole');
        $(this).addClass('list__item');
        $(this).removeClass('col-sm-6 col-md-6 col-lg-4');
        initWishlistButtons();
      });
      $('.products-display-collection .grid-view-item__image-wrapper').each(function () {
        $(this).addClass('col-sm-4');
      });
      $('.products-display-collection .product-description').each(function () {
        $(this).addClass('col-sm-8');
      });
      
      $('#Collection').fadeOut(0);
      $('#Collection').fadeIn(500);
    }
  });
  //for change list to grid view
  $(document).on('click', '.grid-img', function(e){
    if($(this).hasClass('checked')){
      return;
    }
    else {
      $('#list-img').removeClass('checked');
      $('#grid-img').addClass('checked');
      $('.products-display-collection .list__item').each(function () {
        $(this).addClass('small--one-half');
        $(this).addClass('grid__item');
        $(this).addClass('lg-up--one-third');
        $(this).removeClass('one-whole');
        $(this).removeClass('list__item');
        $(this).addClass('col-sm-6 col-md-6 col-lg-4');
        initWishlistButtons();
      });
      $('.products-display-collection .grid-view-item__image-wrapper').each(function () {
        $(this).removeClass('col-sm-4');
      });
      $('.products-display-collection .product-description').each(function () {
        $(this).removeClass('col-sm-8');
      });
      
      $('#Collection').fadeOut(0);
      $('#Collection').fadeIn(500);
    }
  });

  //JS FOR LEFT COLUMN
  if($('#left-column-category').length > 0) {
    $('#left-column-category').html($('#_desktop_top_menu').html());
    $('#left-column-category').find('.dropdown-inner').css('width','auto');
  } 
   
  //to distinguish category tree id from the main menu.  
  $('.category-tree').each(function() {
    function myFunction() {
          var str = document.getElementById("top-menu").innerHTML; 
          var res = str.replace(/_n_/g, "_m_");
          document.getElementById("top-menu").innerHTML = res;
      }
      myFunction();
  });


  $(document).on( "click",".nm-addToCart.enable",function() {
      var variantID = $(this).parents(".add_to_cart_main").find('input[name="prduct-variant"]').val();
      var qty =  $(this).parents(".add_to_cart_main").find('input[name="product-quantity"]').val();
       $(this).addClass('adding');
      productAddToCart(variantID, qty);
      if($(".cart-display #cart-container").hasClass('in')){
        $(".cart-display #cart-container").removeClass('in');
        $(".cart-display .cart-title").addClass('collapsed');
        $(".cart-display .cart-title").attr("aria-expanded", "false");
      }
  });
      
  if($(window).width() < 992) {
    convertToMobile();
    lazyLoadInstance.update();
  }

  $('#menu-icon').on('click', function() {
    $("#mobile_top_menu_wrapper").animate({
      width: "toggle"
    });
    $('.mobile-menu-overlay').toggleClass("active");
  });

  $('#top_menu_closer i').on('click', function() {
    $("#mobile_top_menu_wrapper").animate({
      width: "toggle"
    });
    $('.mobile-menu-overlay').toggleClass("active");
  });
  
  $('.mobile-menu-overlay').on('click', function() {
    $("#mobile_top_menu_wrapper").animate({
      width: "toggle"
    });
    $('.mobile-menu-overlay').toggleClass("active");
  });
 

  $( "#_desktop_top_menu .category" ).each(function( index ) {
      var subdiv = $(this).find('.sub-menu .sub-category').length;
      var submenu = $(this).find('.sub-menu');
      switch(subdiv) {
        case 1 : submenu.css('width','230px');
                submenu.css('left',calculateLeft(submenu.offset(),230));
        break;
        case 2 : submenu.css('width','430px');
        submenu.css('left',calculateLeft(submenu.offset(),430));
        break;
        case 3 : submenu.css('width','630px');
        submenu.css('left',calculateLeft(submenu.offset(),630));
        break;
        case 4 : submenu.css('width','830px');
                 submenu.css('left',calculateLeft(submenu.offset(),830));
                 break;
      }
    });

    function calculateLeft(offset, width) {
      var totalDivSpace = offset.left + width;
      var difference = $(window).width() - totalDivSpace;
      if (difference < 0) {
        return difference - 15;
      }
      return 0;
    }
 
  //JS FOR cart dropdown
  $(document).on( "click","#cart-container a.remove",function() {
    var variantID = $(this).data("variantid");
    productRemoveFormCart(variantID);
    
  });

  $(document).on( "change","#ProductSection-product-template select.single-option-selector",function() {
    adjustProductInventory();
  });

  adjustCartDropDown();
  adjustProductInventory();

  updateWishlistButtons();
  initWishlistButtons();

    function initWishlistButtons() {
      if($(".add-in-wishlist-js").length == 0) {
        return false;
      }
      $(".add-in-wishlist-js").each(function(){
        $(this).unbind();
        $(this).click(function(event){
          event.preventDefault();
          try
          {
            var id = $(this).data('href');
            if($.cookie(cookieName) == null) {
              var str = id;

          
            } else {
              if($.cookie(cookieName).indexOf(id) == -1) {
                var str = $.cookie(cookieName) + '__' + id;
              }
            }
            $.cookie(cookieName, str, {expires:14, path:'/'});
            jQuery('.loadding-wishbutton-'+id).show();
            jQuery('.default-wishbutton-'+id).remove();
            setTimeout(function(){ jQuery('.loadding-wishbutton-'+id).remove(); jQuery('.added-wishbutton-'+id).show();

            var imessage = $("#wishlistmessage .title-success").text();
            $.notify({message:imessage},{type:"success",offset:0,placement:{from:"top",align:"center"},z_index: 9999,animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"},template:'<div data-notify="container" class="col-xs-12 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'});
          

             }, 2000);
            $(this).unbind();
          }
              catch (err) {} // ignore errors reading cookies
            })
      });
    }

    function updateWishlistButtons() {
      try
      {
        if($.cookie(cookieName) != null && $.cookie(cookieName) != '__' && $.cookie(cookieName) != '') {
          var str = String($.cookie(cookieName)).split("__");
          for (var i=0; i<str.length; i++) {
            if (str[i] != '') {
              jQuery('.added-wishbutton-'+str[i]).show();
              jQuery('.default-wishbutton-'+str[i]).remove();
              jQuery('.loadding-wishbutton-'+str[i]).remove();

            }
          }
        }
      }
      catch (err) {}
    }

});


function convertToMobile(){
  //interchange sections
  $(document).find('.responsive-sidebar').append('<div class="shopify-section" id="shopify-section-Ishi_sidebar">'+ $(document).find('.normal-sidebar .shopify-section').html() + '</div>');
  $(document).find('.normal-sidebar').find('.shopify-section').remove();
  
  $("*[id^='_desktop_']").each(function(index, element) {
        var target = $('#' + element.id.replace('_desktop_', '_mobile_'));
        swapElements($(this), target);
  });
}
function converToDesktop() {
  //interchange sections
  $(document).find('.normal-sidebar').append('<div class="shopify-section" id="shopify-section-Ishi_sidebar">'+ $(document).find('.responsive-sidebar .shopify-section').html() + '</div>');
  $(document).find('.responsive-sidebar').find('.shopify-section').remove();
}

function swapElements(source, destination) {
  destination.html(source.html());
  source.html('');
}

function productRemoveFormCart(variantID) {
  jQuery.ajax({
    type: "post",
    url: "/cart/change.js",
    data: "quantity=0"  + "&id=" + variantID,
    dataType: "json",
    beforeSend: function() {
        
    },
    success: function(n) {
        adjustCartDropDown();
    },
    error: function(n, r) {
    }
  })
}
function adjustCartDropDown() {
  Shopify.getCart(function(e) {
        var productList = $("#cart-container .product-list");
        productList.html('');
        var cartempty = $("#cart-container .cart__empty");
        var cartfooter = $("#cart-container .cart__footer");
        $('.cart__subtotal').html(Shopify.formatMoney(e.total_price, Shopify.money_format));
        $('.cart-qty').html(e.item_count);
        if(e.items.length > 0) {
          $.each(e.items, function( index, value ) {
            var product =$("<div class='product'></div>");
            var productimg =$("<div class='product-img'></div>");
            var productdata =$("<div class='product-data'></div>");
            productimg.append("<img src='"+ value.image+"' alt='"+ value.title+"''>");
            productdata.append("<a href='" + value.url + "' class='product-title'>" + value.title+ "</a>");
            productdata.append("<span class='product-price'>" + value.quantity + " x "+ Shopify.formatMoney(value.discounted_price, Shopify.money_format)+ "</span>");
            product.append(productimg);
            product.append(productdata);
            product.append("<a class='remove' data-variantid=" +value.variant_id + "><i class='material-icons'>delete</i></a>")
            productList.append(product);
          });
          cartfooter.removeClass('hide');
          productList.removeClass('hide');
          cartempty.addClass('hide');
          productList.slimScroll({
            height: e.items.length > 1 ? '262px' : '100%'
          });
      } else {
          cartempty.removeClass('hide');
          cartfooter.addClass('hide');
          productList.addClass('hide');
      }
  });
}



function adjustProductInventory() {
   var attr = $('#AddToCart-product-template').attr('disabled');

    if (typeof attr !== typeof undefined && attr !== false) {
        $('#inventory span.instock').hide();
        $('#inventory span.outstock').show();
    } else {
        $('#inventory span.instock').show();
        $('#inventory span.outstock').hide();
    }
}


    /*****************start animation script*******************/
    jQuery(window).scroll(function () {
        hb_animated_contents();
    });

    function hb_animated_contents() {
        jQuery(".hb-animate-element:in-viewport").each(function (i) {
            var $this = jQuery(this);
            if (!$this.hasClass('hb-in-viewport')) {
                setTimeout(function () {
                    $this.addClass('hb-in-viewport');
                }, 200 * i);
            }
        });
    }
    /*****************end animation script*******************/
