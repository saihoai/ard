/*
Theme Name: ARD
Description: Architecture Template
Author: Rafava
Version: 1.0
*/

/* ==================================================================
 
 * Table of Contents:
 *
 * 1.0 - Add #first on load
 * 2.0 - Loader (Mobile)
 * 3.0 - Menu features
 * 4.0 - Build or destroy multiscroll
 * 5.0 - Detect mobile
 * 6.0 - Multiscroll
 * 7.0 - Resize
 * 8.0 - Reverse sections (Mobile)
 * 9.0 - Section image background
 * 10.0- Fade in-out projects sections
 * 11.0- Bigtext
 * 12.0- Homeheight owl-carousel
 * 13.0- Design owl-carousel
 * 14.0- Scroll down-up
 * 15.0- Team lightbox
 * 16.0- Design lightbox
 * 17.0- Map lightbox
 * 18.0- Google map
 * 19.0- Contact form

================================================================== */
( function( $ ) {

    "use strict";

    $(window).load(function() {

        //ADD #FIRST ON LOAD
        if ($(window).width() > 991) {if(window.location.hash) {} else {window.location.hash = $( '.menu-left [href^="#"]' ).attr( 'href' );}}
      
        //LOADER (MOBILE)
        if ($(window).width() <= 991) {
            $(".loader-frame").fadeOut();
            $(".loader-background").delay(200).animate({width:'0%'},600,'swing').fadeOut();
        }

    });

    $(document).ready(function() {
        "use strict";

        if( !$( '.ms-section' ).length )
        {
            $(".loader-frame").fadeOut();
            return false;
        }

        //MENU FEATURES
        function homeheightmenu() {
            $(".home-link").css({
                "margin-top": -1 * $(".home-link").height() / 2 + "px"
            });
            $(".home-height").css({
                height: $(window).outerHeight(true)
            });
        }
        homeheightmenu();
        
        //DESTROY (MOBILE),BUILD (DESKTOP) MULTISCROLL
        function buildordestroy() {
            if ($(window).width() <= 991) {
                $('#main-container').multiscroll.destroy();
            }else{
                $('#main-container').multiscroll.build();
            }
        }

        //DETECT MOBILE (SCROLL IOS FIX)
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if(isMobile.any()) {
            if(top != self) {
            window.open(self.location.href, '_top');//ONLY DEMO
            }
        } else{

            // CACHE: BACKGROUND IMAGE
            $( '.sp-page-builder .page-content .ms-section' ).each( function() {
                var e = $( this );
                e.attr( 'data-img', e.css( 'background-image' ).replace(/url\("|"\)|url\('|'\)/g, '') );
            } );

        //MULTISCROLL
        var ars = [];
        $( '.menu-left [href^="#"]' ).each(function() {
            ars.push( $( this ).attr( 'href' ).replace('#', '') );
        } );
        
        $('#main-container').multiscroll({
            sectionsColor: ['white','white','white','white','white','white'],
            anchors: ars,
            easing:'easeInOutCubic',
            menu:'.menu-left',
            scrollingSpeed: 1000,
            afterLoad: function(anchorLink, index) {
                $(".loader-frame").fadeOut();
                if (index == 1){
                    $(".loader-background").animate({width:'40%'},600,'swing').fadeOut();
                    $('.updown-navigation').fadeOut(450);
                    $('.menu-left').fadeOut(450);
                } else{
                    $(".loader-background").animate({width:'100%'},600,'swing').fadeOut();
                    $('.updown-navigation').fadeIn(450);
                    $('.menu-left').fadeIn(450);
                }
                sectionimage(anchorLink, index);
                naviclose(anchorLink, index);
            }
        });
        //RESIZE
        $(window).resize(function(){
           buildordestroy();
           reverseSection(); 
           homeheightmenu();
           $(".active .vegas-slide-inner").css("animation","0");
        });
        }
        
        //FADE OUT CLOSE WHEN CHANGE SECTION
        function naviclose(anchorLink, index) {
            if ($(window).width() >= 991) {
                if (index == 4){
                    $('.section-projects .navigation').fadeIn('slow');
                } else{
                    $('.section-projects .navigation').fadeOut('slow');
                }
            }
        }
        
        //REVERSE SECTIONS (MOBILE)
        function reverseSection() {
            if ($(window).width() <= 991) {
                $("#right2").insertAfter("#right1");
                $("#right3").insertAfter("#right2");
                $("#right4").insertAfter("#right3");
                $("#right5").insertAfter("#right4");
                $("#right6").insertAfter("#right5");
            } else {
                $("#right2").insertBefore("#right1");
                $("#right3").insertBefore("#right2");
                $("#right4").insertBefore("#right3");
                $("#right5").insertBefore("#right4");
                $("#right6").insertBefore("#right5");
            }
        }
        //reverseSection();  

        //SECTION IMAGE BACKGROUND
        function sectionimage(anchorLink, index){
            var 
                lb = $( '[data-menuanchor="' + anchorLink + '"] img' ).attr( 'src' ),
                r = $( '.ms-right .ms-section[data-anchor="' + anchorLink + '"]' ),
                rb = r.attr( 'data-img' )
            ;

            lb && $( '.ms-left [data-anchor="' + anchorLink + '"]' ).vegas({
                slides: [
                { src:  lb  },
                ],
                delay: 7000,
                cover:false,
                align:'right',
                timer:false,
                animation: [ 'kenburns' ]
            });
            rb && r.vegas({
                slides: [
                { src: rb },
                ],
                delay: 7000,
                cover:false,
                align:'left',
                timer:false,
                animation: [ 'kenburns' ]
            });

            return false;
        }

        //FADE IN-OUT PROJECTS SECTIONS
        (function() {

            function ra()
            {
                var 
                    slides = this.p.vegas('options', 'slides'),
                    i = this.s ? 1 : 0
                ;
                if( slides.length )
                {
                    this.s && ( slides[1] = { src: this.s } );
                    this.p
                        .vegas('options', 'slides', slides)
                        .vegas('options', 'transition', this.transition )
                        .vegas('jump', i )
                    ;
                }
            }
                
            // Action: open;
            $( document ).delegate ( '.ms-right .projects-link', 'click', function() {

                var a = $( this.hash )
                ;
                $('.ms-right .section-one').fadeOut( 650, function(){
                    a.addClass('active-section').hide().fadeIn(850);
                    if( $(window).width() >= 991 )
                    {
                        var 
                            r = a.find( '.bgright img' ).attr( 'src' ),
                            rpa = a.closest( '[data-anchor]' ),
                            l = a.find( '.bgleft img' ).attr( 'src' ),
                            lpa = $( '.ms-left [data-anchor="' + rpa.attr( 'data-anchor' ) + '"]' )
                        ;

                        $.each( [
                            { p: lpa, s: l, transition: 'slideLeft2' },
                            { p: rpa, s: r, transition: 'slideRight2' }
                        ], function() {
                            this.s && ra.call( this );
                        } );
                        
                    }
                });
                return false;
            } );

            // Action: close
            $('.close-projects').on("click", function(e) {
                var 
                    ar = $( this ).closest( '[data-anchor]' ),
                    al = $( '.ms-left [data-anchor="' + ar.attr( 'data-anchor' ) + '"]' )
                ;
                $('.active-section').fadeOut( 650, function(){

                    // SELF
                    $(this).removeClass('active-section');
                    $('.section-one').hide().fadeIn(850);

                    //MAIN BACKGROUND
                    $(window).width() >= 991 && $.each( [
                        { p: al, transition: 'slideLeft2' },
                        { p: ar, transition: 'slideRight2' }
                    ], function() {
                        ra.call( this );
                    } );
                });
                return false;
            });
        })();

        //BIGTEXT
        $('.home-name').bigtext({
            maxfontsize: 115
        });
        $('.home-sub-a').bigtext({
            maxfontsize: 85
        });
        
        //HOMEHEIGHT OWL-CAROUSEL
        var homeheight = $("#home-carousel");
        homeheight.owlCarousel({
            navigation: false,
            slideSpeed: 500,
            items: 3,
            pagination: false,
            autoHeight: true,
            itemsDesktop : [1200,2]
        });
        $(".home-navigation ul .next").on("click", function() {
            homeheight.trigger("owl.next");
        });
        $(".home-navigation ul .prev").on("click", function() {
            homeheight.trigger("owl.prev");
        });
        
        //DESIGN OWL-CAROUSEL
        var design = $("#design-carousel");
        design.owlCarousel({
            navigation: false,
            slideSpeed: 500,
            items: 3,
            pagination: false,
            itemsDesktop : [1200,3]
        });
        $(".navigation ul .next").on("click", function() {
            design.trigger("owl.next");
        });
        $(".navigation ul .prev").on("click", function() {
            design.trigger("owl.prev");
        });

        //SERVICES OWL-CAROUSEL
        var services = $("#services-carousel");
        services.owlCarousel({
            navigation: false,
            slideSpeed: 500,
            items: 3,
            pagination: false,
            itemsDesktop : [1400,2]
        });
        $(".navigation ul .next").on("click", function() {
            services.trigger("owl.next");
        });
        $(".navigation ul .prev").on("click", function() {
            services.trigger("owl.prev");
        });
       
        //SCROLL DOWN-UP
        $(".updown-navigation ul .up").on("click", function() {
            $('#main-container').multiscroll.moveSectionUp();
        });
        $(".updown-navigation ul .down").on("click", function() {
            $('#main-container').multiscroll.moveSectionDown();
        });

        //TEAM LIGHTBOX
        $('.about-popup-link').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 400
        });
       
        //DESIGN IMAGES LIGHTBOX
        $('.design-popup-link').magnificPopup({
            type:'image',
            mainClass: 'mfp-fade',
            removalDelay: 400
        });
        
        //GOOGLE MAP LIGHTBOX
        $('.map-popup-link').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 400,
            callbacks: {
                open: function () {
                    initializeMap(config, markersCode, stylesCode, boxStyles);
                },
                close: function () {
                }
            }
        });
       

    });
} )( jQuery );
