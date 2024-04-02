import memo from "./data/memo.json" with {type:"json"};
var dataList = Object.keys(memo);
$('.login-btn').on('click', function () {
    var login_key = document.querySelector(".login-id").value;
    var login_pw = document.querySelector(".login-pw").value;
    if (login_key && login_pw &&
        memo[login_key][0] == login_pw || memo[login_key][1] == login_pw) {
        $('.login-bg').addClass('hide-modal');
        $('.main-page').removeClass('hide-modal');
    }
});
$('.login-pw-btn').on("click", function () {
    var pw_type = document.querySelector(".login-pw").type;
    if (pw_type == "password") {
        document.querySelector(".login-pw").type = "text";
        $('#pw-peek').attr("class", "fa-regular fa-eye-slash");
    }
    else {
        document.querySelector(".login-pw").type = "password";
        $('#pw-peek').attr("class", "fa-regular fa-eye");
    }
});
var reset_btn = document.querySelector('.reset-btn');
reset_btn === null || reset_btn === void 0 ? void 0 : reset_btn.addEventListener('click', function () {
    reset_btn.parentNode.querySelector('input').value = "";
    document.querySelector(".result-id").value = "";
    document.querySelector(".result-pw").value = "";
});
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
                var result = matchDataList[nowIndex];
                document.querySelector(".search-text").value = result || "";
                document.querySelector(".result-id").value = memo[result][0] || "";
                document.querySelector(".result-pw").value = memo[result][1] || "";
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
