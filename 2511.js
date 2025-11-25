//3  ------------------------------------------------появление фикс афиши при 800px и откл при достижении видеосекции
$(window).on('scroll', throttle(function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const visibleFooter = $('.footer:visible'); // Запоминаем только видимый футер

    if (visibleFooter.length) {
        const footerTop = visibleFooter.offset().top; // Верхняя граница футера
        const footerBottom = footerTop + visibleFooter.outerHeight(); // Нижняя граница футера

        const isAtFooter = (scrollTop + windowHeight >= footerTop && scrollTop < footerBottom);
        const isScrollingUp = (scrollTop + windowHeight < footerTop);
        const bannerVisible = $('.afisha-fixed-wrap').hasClass('visible');

        // Скрываем баннер при достижении футера
        if (isAtFooter) {
            if (bannerVisible) {
                $('.afisha-fixed-wrap').removeClass('visible');
                console.log("block hidden due to reaching footer");
            }
        } else if (isScrollingUp && !bannerVisible && (scrollTop > 800)) {
            // Показываем баннер, если пользователь скроллит вверх
            $('.afisha-fixed-wrap').addClass('visible');
            console.log("block visible when scrolling up from footer");
        }

        // Скрываем баннер, если прокрутка меньше 800 пикселей
        if (scrollTop < 800 && bannerVisible) {
            $('.afisha-fixed-wrap').removeClass('visible');
            console.log("block hidden due to scroll < 800");
        }
    }
}, 1200));
