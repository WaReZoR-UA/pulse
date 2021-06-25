$(document).ready(function(){
    $('.slider__inner').slick(
        {
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/arrow_left.svg"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/arrow_right.svg"></img></button>',
        autoplay: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                arrows: false,
                dots: true
      }
            }
        ]
        }
    );
    $('ul.catalog__tabs').on('click', 'li.catalog__tab:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.card').removeClass('card_active').eq($(this).index()).addClass('card_active');
      });
    function toggleCardSlide(link){
        $(link).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.card-box__content').eq(i).toggleClass('card-box__content_active');
                $('.card-box__fulldescr').eq(i).toggleClass('card-box__fulldescr_active');
            })
        })
    };
    toggleCardSlide('.card-box__link')
    toggleCardSlide('.card-box__fulldescr-back')

    //modals windows

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay').fadeIn(600);
        $('#consultation').slideDown(1000);
    });
    $('.modal__close').on('click', function() {
        $('.overlay').fadeOut(1000),
        $('#consultation, #buy, #thenks').slideUp(600);
    });
    $('.button_card').each(function(i){
        $(this).on('click', function(){
            $('#buy .modal__subtitle').text($('.card-box__title').eq(i).text()),
            $('.overlay').fadeIn(600),
            $('#buy').slideDown(1000);

        });
    });

    //Form Validate

    formId('#consultation-form')
    formId('#buy form')
    formId('#consultation form')

    function formId(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                  required: true,
                  email: true
                }
            },
            messages: {
                name: "Пожалуйста введите Ваше Имя",
                phone: "Пожалуйста введите Ваш номер телефона",
                email: {
                  required: "Пожалуйста введите Вашу почту",
                  email: "Введите Вашу почту корректно в формате name@domain.com"
                }
            }
        })
    };
    $('.feed-form [name=phone]').mask("+7 (999) 999-9999");

//mail function to post and manipulate with popups

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #buy').slideUp(400),
            $('.overlay').fadeIn(400),
            $('#thenks').slideDown(1200)
            $('form').trigger('reset');
        });
        return false;
    });

//page-up button hide and show

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn(1000)
        } else {
            $('.pageup').fadeOut(600)
        }
    });

//smoothing scrollin to ID's

    $('a[href^=#pageup]').click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

});