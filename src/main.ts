import memo from "./data/memo.json"

var reset_btn = document.querySelector('.reset-btn');

reset_btn?.addEventListener('click', function(){
  reset_btn!.parentNode!.querySelector('input')!.value = "";
})

//test data
// const dataList = ["빨간색", "파란색", "노란색", "검정색", "kokomo"];
const dataList = Object.keys(memo);

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
        (<HTMLInputElement>document.querySelector(".search-text")).value = matchDataList[nowIndex] || "";
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