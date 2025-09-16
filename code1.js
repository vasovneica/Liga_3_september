// ------------------------------------------------------------------новый бургер
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



// -------------------------------------------------------------бордер нижний хедера при скролле
$(window).on('scroll', throttle(function () {

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
}, 300));




// ---------------------------------------------------------Initialize Swiper Main Page
$(document).ready(function () {
    try {
        const swiper = new Swiper('.mySwiper .swiper', {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 3,
            initialSlide: 1,
            spaceBetween: 0,
              autoplay: {
                delay: 5000,
              },
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
    }
    catch (error) {
        console.error("Ошибка инициализации Swiper:", error);
        // Можно добавить дополнительную обработку
        // Например, показать пользователю сообщение об ошибке
    }
});




//-------------------------------------------------------- прелодер для слайдера
$(document).ready(function () {
    try {
        var images = $('.swiper-slide img');
        var loadedImagesCount = 0;

        // Скрываем слайдер по умолчанию
        $('.swiper-container').hide();

        try {
            images.each(function () {
                $(this).on('load', function () {
                    try {
                        loadedImagesCount++;
                        if (loadedImagesCount === images.length) {
                            $('#swiper-preloader').fadeOut(1000, function () {
                                $('.swiper-container').fadeIn(1500);
                            });
                        }
                    } catch (loadError) {
                        console.error('Ошибка при обработке загрузки изображения:', loadError);
                    }
                }).on('error', function () {
                    console.error('Ошибка загрузки изображения:', this.src);
                });

                // Проверка для кэшированных изображений
                if (this.complete) {
                    loadedImagesCount++;
                }
            });
        } catch (imagesError) {
            console.error('Ошибка при работе с изображениями:', imagesError);
        }

        // Таймер для показа слайдера через 5 секунд
        try {
            setTimeout(function () {
                $('#swiper-preloader').fadeOut(1000, function () {
                    $('.swiper-container').fadeIn(1500);
                });
            }, 5000);
        } catch (timeoutError) {
            console.error('Ошибка с таймером:', timeoutError);
        }
    } catch (globalError) {
        console.error('Глобальная ошибка инициализации:', globalError);
        // Аварийный план показа слайдера
        $('.swiper-container').show();
        $('#swiper-preloader').hide();
    }
});




// ---------------------------------------------------------демо работы сортировки мероприятии
$(document).ready(function () {
    var dropdown = $('.billboard-dropdown-content');
    $('.billboard-sort-dropdown').on('click', function () {
        dropdown.toggleClass('block'); // Переключаем класс

        var arrow = $('.dropdown-arrow');
        if (dropdown.hasClass('block')) {
            arrow.addClass('rotate'); // Поворачиваем стрелочку вверх
        } else {
            arrow.removeClass('rotate'); // Поворачиваем стрелочку вниз
        }
    });
    $('.sort-option').on('click', function (event) {
        // Предотвращаем перезагрузку страницы
        event.preventDefault();

        // Получаем критерий сортировки из атрибута data-criteria
        var criteria = $(this).data('criteria');

        // Обновляем текст кнопки
        $('.billboard-dropbutton-text').text('' + criteria.charAt(0).toUpperCase() + criteria.slice(1));

        console.log("Сортировка по:", criteria);

    });
});




//  ------------------------------------------------появление фикс афиши при 800px и откл при достижении видеосекции
$(window).on('scroll', throttle(function () {

    const scrollTop = $(window).scrollTop();
    var targetBlock = $('.footer');
    var targetOffset = targetBlock.offset().top; // Позиция блока от верхней части страницы
    var targetHeight = targetBlock.outerHeight(); // Высота блока

    if (scrollTop > 800) {
        // Проверяем, если прокрутка меньше верхней границы целевого блока
        if (scrollTop < (targetOffset - targetHeight - 220)) {
            if (!$('.afisha-fixed-wrap').hasClass('visible')) {
                $('.afisha-fixed-wrap').addClass('visible');
                console.log("block visible");
            }
        } else {
            if ($('.afisha-fixed-wrap').hasClass('visible')) {
                $('.afisha-fixed-wrap').removeClass('visible');
                console.log("block hidden");
            }
        }
    } else {
        // Скрываем баннер, если прокрутка меньше 800 пикселей
        if ($('.afisha-fixed-wrap').hasClass('visible')) {
            $('.afisha-fixed-wrap').removeClass('visible');
            console.log("block hidden due to scroll < 800");
        }
    }
}, 1200));





// -----------------------------------------------------------------появление карточек снизу
$(document).ready(function () {
    function checkVisibility() {
        $('.billboard-event-card, .news-card, .event-card').each(function () {
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




// ----------------------------------------------------------------тротлинг
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}


//--------------------------------------------------initial slider services page
$(document).ready(function () {
    try {

        var swiper = new Swiper(".mySwiperServicesFullDetails .swiper", {
            effect: 'slide',
            navigation: {
                nextEl: '.mySwiperServicesFullDetails .swiper-button-next',
                prevEl: '.mySwiperServicesFullDetails .swiper-button-prev',
            },
          });
    }
    catch (error) {
        console.error("Ошибка инициализации Swiper:", error);
    }
});
