// 08.재귀호출 JS -call_myself.js
import mFn from "./my_function.js";

//////////////////////////////////////////////////////////////
// 프로그래스 바 퍼센트 증가하기 재귀호출함수 만들기 ///
// 퍼센트 증가 숫자변수
let percent = 0;
// 숫자출력박스 : .pNum
const pNum = mFn.qs(".pNum");
// 퍼센트바 : .bar
const bar = mFn.qs(".bar");
increasePercent();

// 재귀호출함수 만들기
function increasePercent() {
  // 1. pNum에 숫자출력
  pNum.innerText = ++percent+ "%";
  // 2. 퍼센트바 width값 동시에 증가하기
  bar.style.width = percent + "%";

  // 3.증가숫자가 100보다 작을때까지 계속 재귀호출
  if (percent < 100) {
    setTimeout(increasePercent, 60);
  } else {
    // 5.바색 변경하기
    bar.style.backgroundColor = "red";
    // 6.슬라이드 이동함수 호출하기
    moveGallery();
  }///// else /////
} ////////////// increasePercent ///////////////////
