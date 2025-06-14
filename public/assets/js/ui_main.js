$(function () {
    /* ===============================
        메인 비쥬얼/슬라이드
    =============================== */
    function mainVisual() {
        const $slider = $(".main-visual .main-visual-list");
        const $controller = $(".main-visual .controller");
        const $power = $controller.find(".power");
        const $numCur = $controller.find(".page-num .cur");
        const $numTotal = $controller.find(".page-num .Total");
        let isPlaying = true;

        // 카운트
        $slider.on("init afterChange", (e, slick) => {
            $numCur.text(slick.currentSlide + 1);
            $numTotal.text(slick.slideCount);
        });

        // 슬릭 옵션
        $slider.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: $controller.find(".prev"),
            nextArrow: $controller.find(".next"),
        });

        // 시작,정지 버튼
        $power.on("click", function () {
            isPlaying = !isPlaying;
            $slider.slick(isPlaying ? "slickPlay" : "slickPause");
            $power
                .toggleClass("play", !isPlaying)
                .toggleClass("stop", isPlaying)
                .find("span")
                .text(isPlaying ? "정지" : "재생");
        });
    }

    /* ===============================
        참여증권사 슬라이드
    =============================== */
    function mainSponsor() {
        const $slider = $(".main-sponsor-list");
        const $power = $(".main-sponsor .controller .power");
        let isPlaying = true;

        // 슬라이드 옵션
        $slider.slick({
            dots: true,
            appendDots: $(".main-sponsor .controller"),
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 6,
            slidesToScroll: 1,
        });

        // 시작,정지 토글
        $power.on("click", function () {
            isPlaying = !isPlaying;
            $slider.slick(isPlaying ? "slickPlay" : "slickPause");
            $power
                .toggleClass("play", !isPlaying)
                .toggleClass("stop", isPlaying)
                .find("span")
                .text(isPlaying ? "정지" : "재생");
        });

        // 페이징 변경시 시작/정지버튼 움찔 거리는 현상을 위함
        // load후 width 고정 및 재정의
        const $dots = $(".main-sponsor .slick-dots");
        const dotsWidth = $dots.outerWidth();
        $dots.css("width", `${dotsWidth}px`);
    }

    mainVisual();
    mainSponsor();
});
