// Initialize Swiper 

const swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    initialSlide: 1,
    spaceBetween: 0,
  //   autoplay: {
  //     delay: 5000,
  //   },
    speed: 600,
  
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1, // 1 слайд на экранах меньше 640px
            spaceBetween: 0,
        },
        769: {
            slidesPerView: 3, // 2 слайда на экранах от 640px до 768px
            spaceBetween: 0,
        },
        1024: {
            slidesPerView: 3, // 3 слайда на экранах больше 768px
            spaceBetween: 0,
        },
    },
    loop: true,
  
    keyboard: {
      enabled: true,
    },
  
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  });


$(document).ready(function() {
    $('#search-icon').on('click', function() {
        $('#header-search-input').toggle(); // Переключаем видимость строки поиска
        $('#header-search-input').focus(); // Устанавливаем фокус на строку поиска
    });
});


$(document).ready(function() {
    var images = $('.swiper-slide img');
    var loadedImagesCount = 0;
  
    // Скрываем слайдер по умолчанию
    $('.swiper-container').hide();
  
    images.each(function() {
        $(this).on('load', function() {
            loadedImagesCount++;
            if (loadedImagesCount === images.length) {
                $('#swiper-preloader').fadeOut(1000, function() {
                    // После скрытия прелоадера показываем слайдер
                    $('.swiper-container').fadeIn(1500); // Показываем слайдер
                });
            }
        }).on('error', function() {
            console.error('Ошибка загрузки изображения:', this.src);
        });
  
        // Проверка для кэшированных изображений
        if (this.complete) {
            loadedImagesCount++;
        }
    });
  
    // Таймер для показа слайдера через 5 секунд
    setTimeout(function() {
        $('#swiper-preloader').fadeOut(1000, function() {
            $('.swiper-container').fadeIn(1500); // Показываем слайдер
        });
    }, 5000); // Измените на 5000, если хотите показать через 5 секунд
  });


$(document).ready(function() {
    var dropdown = $('.billboard-dropdown-content');
    $('.billboard-sort-dropdown').on('click', function() {
        dropdown.toggleClass('block'); // Переключаем класс

        var arrow = $('.dropdown-arrow');
        if (dropdown.hasClass('block')) {
            arrow.addClass('rotate'); // Поворачиваем стрелочку вверх
        } else {
            arrow.removeClass('rotate'); // Поворачиваем стрелочку вниз
        }
    });
    $('.sort-option').on('click', function(event) {
        // Предотвращаем перезагрузку страницы
        event.preventDefault();

        // Получаем критерий сортировки из атрибута data-criteria
        var criteria = $(this).data('criteria');

        // Обновляем текст кнопки
        $('.billboard-dropbutton-text').text('' + criteria.charAt(0).toUpperCase() + criteria.slice(1));

        console.log("Сортировка по:", criteria);
        // Здесь можно добавить логику сортировки
    });
});




// новый бургер

$(document).ready(function () {
    const $header = $('.header');
    const $burger = $('.header-burger');
    const $menu = $('.header-menu');
    const $links = $('.header-menu-link');

    // Клик по бургеру — открытие/закрытие меню
    $burger.on('click', function (e) {
        e.stopPropagation();
        const isOpen = $header.hasClass('open-nav');
        
        // Переключаем класс
        $header.toggleClass('open-nav');
        
        // Устанавливаем корректные ARIA-атрибуты
        $burger.attr('aria-expanded', !isOpen);
        $menu.attr('aria-hidden', isOpen);
        $('.header-menu-link').attr('tabindex', !isOpen ? '0' : '-1');
    });

    // Клик по ссылке в меню — закрываем меню
    $links.on('click', function () {
        $header.removeClass('open-nav');
        $burger.attr('aria-expanded', 'false');
        $menu.attr('aria-hidden', 'true');
        $('.header-menu-link').attr('tabindex', '-1');
    });

    // Клик по документу — закрываем меню, если клик вне бургера и меню
    $(document).on('click', function (e) {
        if ($header.hasClass('open-nav')) {
            // Если клик НЕ по бургеру и НЕ по меню — закрываем
            if (!$(e.target).closest('.header-burger, .header-menu, #header-search-input, #search-icon').length) {
                $header.removeClass('open-nav');
                $burger.attr('aria-expanded', 'false');
                $menu.attr('aria-hidden', 'true');
                $('.header-menu-link').attr('tabindex', '-1');
            }
        }
    });
});

$('.billboard-event-cards-div').masonry({
    // options
    horizontalOrder: true,
    itemSelector: '.billboard-event-card',
    columnWidth: 300,
    gutter: 15,
    isFitWidth: true
  });

// старый бургер

// $(document).on('click', function(e) {
//     // Проверяем, открыто ли меню
//     if ($('.header').hasClass('open-nav')) {
//         $('.header-burger').attr('aria-expanded', 'true');
//         $('.header-menu').attr('aria-hidden', 'false');
//         // menuLinks.forEach(link => link.setAttribute('tabindex', '0'));
//         // Проверяем, что клик был НЕ по бургеру и НЕ внутри навигации
//         if (!$(e.target).closest('.header-burger, .navigation').length) {
//             $('.header').removeClass('open-nav');
//             $('.header-burger').attr('aria-expanded', 'false');
//             $('.header-menu').attr('aria-hidden', 'true');
//         }
//     }
// });

// // Оригинальный код для бургера
// $('.header-burger').click(function(e) {
//     e.stopPropagation(); // Предотвращаем всплытие события
//     $('.header').toggleClass('open-nav');
// });

// // Оригинальный код для закрытия при клике на ссылку
// $('.main_h li a').click(function() {
//     $('.header').removeClass('open-nav');
// });

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Использование:
$(window).on('scroll', throttle(function() {
    
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 100) {
        if (!$('.header').hasClass('scrolling')) {
            $('.header').addClass('scrolling');
            console.log("scroll");
        }
    } else {
        if ($('.header').hasClass('scrolling')) {
            $('.header').removeClass('scrolling');
        }
    }
}, 1200));
$(window).on('scroll', throttle(function() {
    
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 1000) {
        if (!$('.afisha-fixed').hasClass('visible')) {
            $('.afisha-fixed').addClass('visible');
            console.log("block");
        }
    } else {
        if ($('.afisha-fixed').hasClass('visible')) {
            $('.afisha-fixed').removeClass('visible');
        }
    }
}, 1200));


$(document).ready(function() {
    function checkVisibility() {
        $('.billboard-event-card, .news-card, .event-card').each(function() {
            var $element = $(this);
            
            // Если класс уже добавлен - пропускаем элемент
            if ($element.hasClass('visible')) return;

            var elementTop = $element.offset().top;
            var elementHeight = $element.outerHeight();
            var windowTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            // Проверяем, виден ли элемент
            var isVisible = (elementTop < windowTop + windowHeight) && 
                            (elementTop + elementHeight > windowTop);

            if (isVisible) {
                $element.addClass('visible'); // Добавляем класс только если элемент виден
            }
        });
    }

    // Вызываем checkVisibility при прокрутке и изменении размера окна
    $(window).on('scroll resize', checkVisibility);
    
    // Вызываем checkVisibility один раз при загрузке, чтобы проверить видимость
    checkVisibility();
});









// $(document).ready(function() {
//     $('.about-us-achive-card-number').each(function() {
//         var $this = $(this);
//         var target = $this.data('target');
        
//         $({ countNum: $this.text()}).animate({ countNum: target }, {
//             duration: 3000, // время анимации в миллисекундах
//             easing: 'swing', // эффект анимации, по умолчанию 'swing'
//             step: function() {
//                 $this.text(Math.floor(this.countNum));
//             },
//             complete: function() {
//                 $this.text(this.countNum); // установить точное значение в конце
//             }
//         });
//     });
// });
