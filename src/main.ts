import memo from "./data/memo.json"

const dataList = Object.keys(memo);

$('.login-btn').on('click', function() {
  var login_key = (<HTMLInputElement>document.querySelector(".login-id")).value;
  var login_pw = (<HTMLInputElement>document.querySelector(".login-pw")).value;
  if (login_key && login_pw &&
      memo[login_key][0] == login_pw || memo[login_key][1] == login_pw) {
    $('.login-bg').addClass('hide-modal');
    $('.main-page').removeClass('hide-modal');
  }
})

$('.login-pw-btn').on("click", function() {
  var pw_type = (<HTMLInputElement>document.querySelector(".login-pw")).type;
  if (pw_type == "password") {
    (<HTMLInputElement>document.querySelector(".login-pw")).type = "text";
    $('#pw-peek').attr("class", "fa-regular fa-eye-slash");
  }
  else {
    (<HTMLInputElement>document.querySelector(".login-pw")).type = "password";
    $('#pw-peek').attr("class", "fa-regular fa-eye");
  }
})

var reset_btn = document.querySelector('.reset-btn');
reset_btn?.addEventListener('click', function(){
  reset_btn!.parentNode!.querySelector('input')!.value = "";
  (<HTMLInputElement>document.querySelector(".result-id")).value = "";
  (<HTMLInputElement>document.querySelector(".result-pw")).value = "";
})

const $search = (<HTMLInputElement>document.querySelector(".search-text"));
const $autoComplete = document.querySelector(".autocomplete");

let nowIndex = 0;

if ($search) {
  $search.addEventListener("keyup", (event: KeyboardEvent) => {
    const value = $search.value.trim();
  
    // 리스트 필터링
    const matchDataList = value
      ? dataList.filter((label) => label.includes(value))
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
        const result = matchDataList[nowIndex];
        (<HTMLInputElement>document.querySelector(".search-text")).value = result || "";
        (<HTMLInputElement>document.querySelector(".result-id")).value = memo[result][0] || "";
        (<HTMLInputElement>document.querySelector(".result-pw")).value = memo[result][1] || "";
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
    showList(matchDataList, value, nowIndex);
  });
  
  const showList = (data, value, nowIndex) => {
    // 정규식으로 변환
    const regex = new RegExp(`(${value})`, "g");
    
    $autoComplete!.innerHTML = data
      .map(
        (label, index) => `
          <div class='${nowIndex === index ? "active" : ""}'>
            ${label.replace(regex, "<mark>$1</mark>")}
          </div>
        `
      )
      .join("");
  };
}