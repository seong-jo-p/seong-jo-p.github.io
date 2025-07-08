$(function () {
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
   팝업 닫기
   =============================== */
    function popupClose() {
        $(".popup-close").on("click", function () {
            $(".popup-container").hide();
        });
    }

    faqList();
    popupClose();
});
