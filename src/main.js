import memo from "./data/memo.json" with{type: "json"};
var reset_btn = document.querySelector('.reset-btn');
reset_btn === null || reset_btn === void 0 ? void 0 : reset_btn.addEventListener('click', function () {
    reset_btn.parentNode.querySelector('input').value = "";
});
//test data
// const dataList = ["빨간색", "파란색", "노란색", "검정색", "kokomo"];
var dataList = Object.keys(memo);
var $search = document.querySelector(".search-text");
var $autoComplete = document.querySelector(".autocomplete");
var nowIndex = 0;
if ($search) {
    $search.addEventListener("keyup", function (event) {
        var value = $search.value.trim();
        // 리스트 필터링
        var matchDataList = value
            ? dataList.filter(function (label) { return label.includes(value); })
            : [];
        switch (event.keyCode) {
            // UP KEY
            case 38:
                nowIndex = Math.max(nowIndex - 1, 0);
                break;
            // DOWN KEY
            case 40:
                nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
                break;
            // ENTER KEY
            case 13:
                document.querySelector(".search-text").value = matchDataList[nowIndex] || "";
                // 초기화
                nowIndex = 0;
                matchDataList.length = 0;
                break;
            // 그외 다시 초기화
            default:
                nowIndex = 0;
                break;
        }
        // 리스트 보여주기
        showList_1(matchDataList, value, nowIndex);
    });
    var showList_1 = function (data, value, nowIndex) {
        // 정규식으로 변환
        var regex = new RegExp("(".concat(value, ")"), "g");
        $autoComplete.innerHTML = data
            .map(function (label, index) { return "\n          <div class='".concat(nowIndex === index ? "active" : "", "'>\n            ").concat(label.replace(regex, "<mark>$1</mark>"), "\n          </div>\n        "); })
            .join("");
    };
}
var test = '';
