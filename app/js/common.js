$(document).ready(function(){
    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    /**
     * FORMS
     */

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });
    /**
     * end FORMS
     */

    $('.about-images').photoswipe();

    $('.teachers-slider').owlCarousel({
        loop:true,
        margin:15,
        responsive : {
            0 : {
                items: 1,
                dotsEach: 1
            },
            480 : {
                items: 2,
                dotsEach: 2
            },
            768: {
                items: 3,
                dotsEach: 3
            },
            992: {
                items: 4,
                dotsEach: 3
            },
            1200 : {
                items: 5,
                dotsEach: 3
            }
        }
    });


    function heightses() {
        if ($(window).width()>480) {
            $('.check-item-title').height('auto').equalHeights();
            $('.teacher-slide-title').height('auto').equalHeights();
            $('.teacher-slide-post').height('auto').equalHeights();
            $('.event-item-title').height('auto').equalHeights();
        }

        if ($(window).width()>=768) {
            $('.textcom-item-name').height('auto').equalHeights();
        }

    }

    $(window).resize(function() {
        heightses();
    });

    heightses();


    $(function() {
        $("a[href='#teacher-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    $("a[href='#teacher-form']").on('click', function(){
        var name = $(this).data('name');
        $('#teacher-form h3 span').text(name);
        $('#teacher-form #name').val(name);
    });

    /**
     * YOUTUBE SCRIPT
     */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoPlayer;
    var videoPlayers = [];
    var i = 0;

    onYouTubeIframeAPIReady = function () {
        $('.video-player .you-player').each(function(){
            var $playerID = $(this).attr("id");
            var $videoID = $(this).parents('.video-player').data("video");
            var $start = $(this).siblings('.start-video');

            $start.attr("data-playern", i);

            // videoPlayers[i] = new YT.Player($playerID, {
            //     videoId: $videoID,
            //     playerVars: {
            //         'autoplay': 0,
            //         'rel': 0,
            //         'showinfo': 0
            //     },
            //     events: {
            //         'onStateChange': onPlayerStateChange
            //     }
            // });
            //
            // $start.on('click', function(){
            //     var playerN = $(this).attr("data-playern");
            //     $(this).hide();
            //     $(this).siblings('.you-player').show();
            //     $(this).siblings('.thumbnail-container').hide();
            //     videoPlayers[playerN].playVideo();
            // });

            $start.on('click', function(){
                var playerN = $(this).attr("data-playern");
                $(this).hide();
                $(this).siblings('.you-player').show();
                $(this).siblings('.thumbnail-container').hide();


                videoPlayers[i] = new YT.Player($playerID, {
                    videoId: $videoID,
                    playerVars: {
                        'autoplay': 0,
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });

                if(videoPlayers[i])
                {
                    var fn = function(){ videoPlayers[i].playVideo(); };
                    setTimeout(fn, 1500);
                }

            });
            i++;
        });
    };

    var p = document.getElementsByClassName("you-player");
    $(p).hide();

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $('.you-player').hide();
            $('.start-video').fadeIn('normal');
            $('.thumbnail-container').fadeIn('normal');
        }
    };
    /**
     * end YOUTUBE SCRIPT
     */


    /**
     * TEXTCOMS FUNCTIONALITY
     */
     $('.textcom-item').each(function(){
        var th = $(this),
            link = th.find('.textcom-item-roll');

        link.on('click', function(e){
            e.preventDefault();

            th.toggleClass('active');

            link.text(function(i, text){
                return text === "Раскрыть отзыв" ? "Свернуть отзыв" : "Раскрыть отзыв";
            })

            // if (!th.hasClass('active')){
            //     th.addClass('active');
            //     link.text('Свернуть отзыв');
            // } else {
            //     th.removeClass('active');
            //     link.text('Раскрыть отзыв');
            // }


        })




     });
    /**
     * end TEXTCOMS FUNCTIONALITY
     */

    // $('img.svg').each(function(){
    //     var $img = jQuery(this);
    //     var imgID = $img.attr('id');
    //     var imgClass = $img.attr('class');
    //     var imgURL = $img.attr('src');
    //
    //     jQuery.get(imgURL, function(data) {
    //         // Get the SVG tag, ignore the rest
    //         var $svg = jQuery(data).find('svg');
    //
    //         // Add replaced image's ID to the new SVG
    //         if(typeof imgID !== 'undefined') {
    //             $svg = $svg.attr('id', imgID);
    //         }
    //         // Add replaced image's classes to the new SVG
    //         if(typeof imgClass !== 'undefined') {
    //             $svg = $svg.attr('class', imgClass+' replaced-svg');
    //         }
    //
    //         // Remove any invalid XML tags as per http://validator.w3.org
    //         $svg = $svg.removeAttr('xmlns:a');
    //
    //         // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    //         if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
    //             $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    //         }
    //
    //         // Replace image with new SVG
    //         $img.replaceWith($svg);
    //     }, 'xml');
    // });


    /**
     * YA-MAPS
     */
    //Переменная для включения/отключения индикатора загрузки
    var spinner = $('.loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    //var myMapTemp, myPlacemarkTemp;


    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init () {
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            marker = mapId.data("marker"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['zoomControl'],
                zoom: zoom
            }),

            myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: marker,
                // Размеры метки.
                iconImageSize: [32.768, 43],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-16, -40]
            });

        map.geoObjects.add(myPlacemark);
        map.behaviors.disable('scrollZoom');


        var position = map.getGlobalPixelCenter();

        map.setGlobalPixelCenter([ position[0] - 350, position[1] ]);

        if ($(window).width() <= 1500) {
            map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
        }

        if ($(window).width() < 992) {
            map.setGlobalPixelCenter([ position[0]-200, position[1]]);
        }

        if ($(window).width() < 767) {
            map.setGlobalPixelCenter([ position[0], position[1] - 200]);
        }


        if ($(window).width() < 480) {
            map.behaviors.disable('drag');
            map.setGlobalPixelCenter([ position[0], position[1] - 150]);
        }


        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = map.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.removeClass('is-active');
        });
    }


    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }


    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    var ymap = function() {
        $('.s-map').on( "mouseenter", function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                });
            }
        });
    };

    ymap();
    /**
     * end YA-MAPS
     */



    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Заявка отправлена!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
            }, 2000);
        });
        return false;
    });
});
