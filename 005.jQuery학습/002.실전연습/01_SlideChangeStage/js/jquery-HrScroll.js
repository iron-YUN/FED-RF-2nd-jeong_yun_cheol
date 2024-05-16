// 가로방향 스크롤 구현 JS

// 1.대상요소 : html,body
const scTarget = $("html,body");
// 제이쿼리에서 전체스크롤/휠 이벤트작성시 대상은 항상
// html,body로 두개모두 잡아준다
// document 나window 는 사용안됨!
// 이벤트메서드 : on(이벤트명,함수)

// 유의사항 : 휠이벤트는 모바일과 무관
// 따라서 모바일 터치 가로스크롤은 그냥
// 가로스크롤바 만 살려주면 자연스럽게 된다!

// 스크롤 위치값 변수
let scPos = 0;
let pgCnt = $(".page").length;
let winW, maxLimit;

// 한번에 움직일 스크롤 이동크기
// 상수는 모두 대문자로 쓰고 중간에 언더바로 구분함
const MOVE_NUM = 100;

// 한계값 계산함수
const chgLimit = () => {
  winW = $(window).width();
  // 최대한계값 : 전체박스크기 - 화면크기

  maxLimit = winW * pgCnt - winW;
  console.log("윈도우크기", winW, "/페이지수", pgCnt, "/최대한계", maxLimit);
}; /////// chgLimit 함수 ////////
chgLimit();

// 윈도우 사이즈 변경시 한계값 업데이트
// 꼭해야지 화면사이즈가 중간에 줄어들어도 업데이트됨
$(window).resize(chgLimit);
//resize() 메서드 : 리사이즈 이벤트함수

///////////////////////////////////////////////////////////
// 스크롤 이벤트함수 구현하기 ///////////////////////////////
///////////////////////////////////////////////////////////

scTarget.on("wheel", (e) => {
  // 스크롤이동을 위한 제이쿼리 속성
  // 1.scrollTop : 세로스크롤바 위치
  // 2.scrollLeft : 가로스크롤바 위치

  // 휠방향 알아내기(전체이벤트객체로부터 얻어옴)
  // (1) event.wheelDelta 값 :
  // 기본이동 100px + 앞뒤예비공백 10px*2=20px
  // 전체표시수치 120 -> 120px 을 의미
  // 방향은 마이너가스 아래
  // let delta = event.wheelDelta;
  // (2) event.deltaY;
  // 기본이동크기만 표시함, 100px
  // 방향은 양수가 아래
  // -> wheelDelta보다 나중에 나온 실질적인 표시객체임
  let delta = event.deltaY;

  // 방향이따를 증감은 deltaY 는 양수가 아랫방향
  // wheelDelta는 음수가 아랫방향
  if (delta > 0) scPos += MOVE_NUM;
  else scPos -= MOVE_NUM;

  // 한계값체크
  // (1)최소한계
  if (scPos < 0) scPos = 0;
  // (2)최대한계
  if (scPos >= maxLimit) scPos = maxLimit;

  // scPos = scPos + 200;
  console.log("스위", scPos, delta);

  // stop() 메서드 : 규에쌓인 애니메이션을 지운다!
  // 중간에 쌓인 애니를 지우고 최종애니면 실행한다!
  scTarget.stop().animate(
    {
      scrollLeft: scPos + "px",
    },
    2000,
    "easeOutExpo"
  );
  // https://easings.net/ko
}); ////////// wheel 이벤트구역 ///////////
// 스택 : LIFO 나중에 온것이 먼저나옴
// 큐 : FIFO 처음온것이 먼저나옴
