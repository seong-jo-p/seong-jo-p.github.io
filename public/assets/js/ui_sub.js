$(function () {
    /* ===============================
   snb
   =============================== */
    function snb() {
        const $snb = $("#snb");

        $snb.on("click", ".cur-menu", function (e) {
            e.preventDefault();

            const $this = $(this);

            if (!$this.hasClass("on")) {
                $("#snb .cur-menu").removeClass("on");
                $("#snb .depth-menu > ul").stop().slideUp(400);

                $this.addClass("on");
                $this.next().stop().slideDown(400);
            } else {
                $this.removeClass("on");
                $this.next().stop().slideUp(400);
            }
        });

        // 리스트 바깥 클릭 시 모든 리스트 닫기
        $(document).on("click", function (e) {
            // e.target이 #snb 또는 그 하위 요소가 아니면 메뉴 닫기
            if (!$(e.target).closest("#snb").length) {
                $("#snb .cur-menu").removeClass("on");
                $("#snb .depth-menu > ul").stop().slideUp(400);
            }
        });
    }

    /* ===============================
   FAQ
   =============================== */
    function faqList() {
        const $faqList = $(".faq-list");

        $faqList.on("click", ".faq-Q", function () {
            const $clickedQ = $(this);
            const $targetA = $clickedQ.closest(".faq-list-body").find(".faq-A");

            // 이미 열려있는 경우: 닫기
            if ($clickedQ.hasClass("on")) {
                $clickedQ.removeClass("on");
                $targetA.stop().slideUp();
            } else {
                // 모든 .faq-Q에서 .on 제거, 모든 답변 닫기
                $faqList.find(".faq-Q").removeClass("on");
                $faqList.find(".faq-A").stop().slideUp();

                // 현재 클릭한 것만 열고, .on 추가
                $clickedQ.addClass("on");
                $targetA.stop().slideDown();
            }
        });

        // 필터
        $(".faq-filter a").on("click", function (e) {
            const targetCategory = $(this).data("category");
            const $faqList = $(".faq-list li");

            if (targetCategory === "all") {
                $faqList.fadeIn(0); // 전체 보기
            } else {
                $faqList.each(function () {
                    if ($(this).hasClass(targetCategory)) {
                        $(this).fadeIn(0);
                    } else {
                        $(this).fadeOut(0);
                    }
                });
            }
        });
    }

    /* ===============================
   Histroy
   =============================== */
    function history() {
        const $historyBtns = $(".history-btns li");
        const $historyItems = $(".history-wrap .history-item");
        const itemTops = $historyItems.map((_, el) => $(el).offset().top).get();
        let isScrolling = false;

        // 버튼 클릭 시 스크롤 이동
        $historyBtns.find("a").on("click", function (e) {
            e.preventDefault();
            const targetOffset = $($(this).attr("href")).offset().top;

            isScrolling = true; // 애니메이션 시작
            $("html, body")
                .stop()
                .animate({ scrollTop: targetOffset }, 1000, "easeInOutCubic", function () {
                    isScrolling = false; // 애니메이션 끝
                    updateOnClass(); // 최종 on 클래스 갱신
                });
        });

        // on 클래스 갱신 함수
        function updateOnClass() {
            const sTop = $(window).scrollTop();
            let activeIdx = 0;

            // 현재 스크롤 위치에 맞는 인덱스 계산
            for (let i = 0; i < itemTops.length; i++) {
                if (sTop >= itemTops[i] - 300) activeIdx = i;
                else break;
            }

            // on 클래스 갱신 (불필요한 반복 제거)
            $historyBtns.removeClass("on").eq(activeIdx).addClass("on");
        }

        // 스크롤 이벤트: 애니메이션 중에는 무시
        $(window).on("scroll load", function () {
            if (!isScrolling) updateOnClass();
        });
    }

    faqList();
    snb();
    history();
});
