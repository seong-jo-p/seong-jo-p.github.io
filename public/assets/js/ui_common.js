$(function () {
    const $header = $("#header");
    const $footer = $("#footer");

    /* ===============================
        Header 메인 or 서브시 스타일 따로 적용
    =============================== */
    $header.addClass($("#container").hasClass("sub") ? "sub-head" : "");

    /* ===============================
        Header 네비게이션 GNB
    =============================== */
    function gnb() {
        const $gnb = $("#gnb");
        const $depth2 = $gnb.find(".depth2");
        const $depth1Li = $gnb.find(".depth1 > li");
        const $gnbBg = $(".gnb-bg");

        // 초기너비 저장 및 설정
        // 초기너비 미지정시 width변경 이벤트에 transition이 적용 안됨
        const depth1LiWidth = $depth1Li.map((_, el) => $(el).outerWidth());
        $depth1Li.each(function (idx) {
            $(this).css("width", `${depth1LiWidth[idx] + 1}px`);
        });

        const gnbWidth = $gnb.outerWidth();
        $gnb.css("width", `${gnbWidth}px`);

        // 이벤트 핸들러 등록
        $gnb.on("mouseenter focusin", function () {
            $(this).css("width", "100%");
            $depth1Li.each(function () {
                $(this).css("width", `calc(100% / ${$depth1Li.length})`);
            });

            $header.addClass("on");
            $depth2.stop().slideDown();
            $gnbBg.stop().slideDown();
        });

        $gnb.on("mouseleave focusout", function () {
            $(this).css("width", `${gnbWidth}px`);
            $depth1Li.each(function (idx) {
                $(this).css("width", `${depth1LiWidth[idx] + 1}px`);
            });

            $header.removeClass("on");
            $depth2.stop().slideUp();
            $gnbBg.stop().slideUp();
        });

        // .depth2, .gnb-bg 높이 맞추기
        let maxHeight = 0;

        $depth2.each(function () {
            const thisHeight = $(this).outerHeight();

            if (thisHeight > maxHeight) {
                maxHeight = thisHeight;
            }
        });

        $depth2.css("height", `${maxHeight}px`);
        $gnbBg.css("height", `${maxHeight}px`);

        // 헤더 fixed로 인해 좌/우 스크롤시 짤리는 현상을 위함
        $(window).on("scroll resize", function () {
            const scrollLeft = $(this).scrollLeft();
            $header.css("left", -scrollLeft + "px");
        });
    }

    /* ===============================
        Header Search
    =============================== */
    function HeaderSearchToggle() {
        const $headerSearch = $(".header-saerch");
        const $headerSearchOpen = $(".header-saerch .search-open");
        const $headerSearchClose = $(".header-saerch .search-close");
        const $headerSearchBg = $(".header-saerch-bg");

        $headerSearchOpen.on("click", function () {
            $headerSearch.addClass("on");
            $("body").css("overflow", "hidden");
        });

        $headerSearchClose.on("click", function () {
            $headerSearch.removeClass("on");
            $("body").css("overflow", "");
        });

        $headerSearchBg.on("click", function () {
            $headerSearch.removeClass("on");
            $("body").css("overflow", "");
        });
    }

    function quickMenuPosition() {
        const $quick = $("#quick-menu");

        $(window)
            .on("scroll resize", function () {
                const scrollTop = $(window).scrollTop();
                $quick.css("transform", `translateY(${scrollTop}px)`);
            })
            .trigger("scroll");
    }

    /* ===============================
        푸터 탑 버튼
    =============================== */
    function footerTop() {
        const $topBtn = $footer.find(".go-top");

        $topBtn.on("click", "a", function (e) {
            e.preventDefault();

            $("html, body").animate({ scrollTop: 0 }, 300);
        });

        $(window)
            .on("scroll resize", function () {
                const scrollTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                const footerOffsetTop = $footer.offset().top;
                const isView = 200 > scrollTop ? false : true;

                // 초기에 안보이도록
                isView ? $topBtn.fadeIn(100) : $topBtn.fadeOut(100);

                // 현재 뷰포트 하단 위치
                const viewportBottom = scrollTop + windowHeight;

                // 버튼이 footer와 겹치는지 여부 판단
                const overlap = viewportBottom - footerOffsetTop;

                if (overlap > 0) {
                    // 겹치기 시작하면 그만큼 버튼을 위로 올림
                    $topBtn.css("bottom", `${overlap + 50}px`);
                } else {
                    // 겹치지 않으면 기본값 유지
                    $topBtn.css("bottom", `50px`);
                }
            })
            .trigger("scroll");
    }

    /* ===============================
        푸터 패밀리사이트/유관기관
    =============================== */
    function footerUtilBtns() {
        const $utils = $footer.find(".more-info");

        $utils.each(function () {
            const $util = $(this);
            const $list = $util.find(".info-list");
            const $btn = $util.find("button");

            $btn.on("click", function (e) {
                e.stopPropagation();

                $utils.find("button").removeClass("on");
                $(this).toggleClass("on");

                $utils.not($util).find(".info-list").slideUp(200);
                $list.slideToggle(200);
            });
        });

        // 리스트 바깥 클릭 시 모든 리스트 닫기
        $(document).on("click", function (e) {
            $footer.find(".info-list").slideUp(200);
            $utils.find("button").removeClass("on");
        });
    }

    /* ===============================
        탭 컨텐츠 버튼
    =============================== */
    function tabContent() {
        const $tab = $(".tab-wrap");

        $tab.each(function () {
            // 초기 설정 - 첫 번째 버튼에 .on
            $(this).find(".tab-btns a").first().addClass("on");

            $(this)
                .find(".tab-btns a")
                .on("click", function (e) {
                    if (!$(this).hasClass("page-move")) {
                        e.preventDefault();
                    }

                    $(this).closest(".tab-btns").find("a").removeClass("on");
                    $(this).toggleClass("on");
                });
        });
    }

    gnb();
    HeaderSearchToggle();
    quickMenuPosition();
    footerTop();
    footerUtilBtns();
    tabContent();
});
