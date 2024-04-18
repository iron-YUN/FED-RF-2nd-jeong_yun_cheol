// 슬라이드 드래그 모듈 JS slide_drag.js

// 나의함수 불러오기
import mFn from "./my_function.js";

/*************************************** 
    [ 드래그 기능 구현을 위한 이벤트 ]
    1. 딸 -> 마우스 포인터 누름 -> mousedown

    2. 각 -> 마우스 포인터 올라옴 -> mouseup

    3. 질질 -> 마우스 움직일때 -> mousemove
    -> 드래그 상태는 "딸"상태에서 "질질"하는것!
    
    mousedown 할때 드래그 상태변수값을 true(1)로 변경
    mouseup 할때 드래그 상태변수값을 false(0)으로 변경
    _______________________________________

    [ 드래그 기능구현 원리 ]

    1. 마우스 포인터 위치에 따른 변화 수치를
    계산하여 요소의 top,left 위치값으로 반영한다!

    2. 프로세스
    (1) mousedown 이벤트에서는 시작위치값 저장
    -> 모바일 이벤트 : touchstart
    (2) mousemove 이벤트에서는 움직인위치와 시작위치 차이저장
    -> 모바일 이벤트 : touchmove
    (3) mousemove에서 차이값을 타겟요소의 left,top값에 반영
    (4) mouseup 이벤트에서는 다음 이동을 위한 마지막위치 저장
    -> 모바일 이벤트 : touchend
    (5) mousemove 이벤트에서 마지막위치로 부터의 이동을 계산함
***************************************/

/* ********************************************
        [ 드래그 다중적용 호출함수 ]
        함수명 : setDrag
        기능 : 드래그 적용 요소 함수호출하기
******************************************** */
function setDrag(clsName){
       // ele - 드래그 대상요소 클래스 이름 받는 변수
    console.log(clsName);

    // 1.받은 클래스이름으로 요소를 수집한다!
    let ele = mFn.qsa("."+clsName);

    // 2.드래그 함수 호출
    // html 컬렉션 이므로 forEach메서드로 호출
    // forEach((요소,순번,전체)=>{})
    ele.forEach((x)=>goDrag(x));
    // goDrag(ele);
} ////////////// setDrag ///////////////


/* ********************************************
        [ 드래그 다중적용 함수 만들기 ]
        함수명 : goDrag
        기능 : 다중 드래그 기능 적용
        수정필요사항 체크
        1) 드래그시 위치이동 안되는 버그
        (원인:top,left 초기값 셋팅안될경우 에러)
******************************************** */
function goDrag (ele){
    // ele - 호출시 보내준 대상을 받는 변수
     // -> 하나씩 전달된 드래그 대상 요소임!
    console.log(ele);


// 드래그 적용 대상 및 이벤트설정하기 ////
// 1. 대상선정 : 보내준 대상 hrml컬렉션
const dtg = ele;
// const dtg = mFn.qs(".dtg2");

// 드래그할 대상의 CSS 기본값을 셋팅한다!
// 필수셋팅요소는 position relative / top 0 / left 0
dtg.style.position = "relative";
// 배너가 left 값 -220% 기준박스에서 이동함
// .banbx의 width 값 곱하기 2.2
// 기준위치값 변수에 할당!
let leftVal = mFn.qs('.banbx').offsetWidth*-2.2;
console.log('left셋팅값',leftVal)
// left 위치값 최초셋없! -> px단위 필수!!!
dtg.style.left = leftVal + 'px';


// 2. 변수셋팅 ////////////////////
// (1) 드래그 상태 변수 만들기
let dragSts = false;
// false 는 드래그 아님, true 는 드래그 상태!
// (2) 첫번쨰 위치 포인트 : first x ,first y
let firstX;
// (3) 마지막 위치 포인트 : last x ,last y
// -> 최초위치 셋팅값으로 프리셋팅
let lastX = leftVal;
// 중첩된 최종위치가 처음에는 계산되지 않았으므로
// 출발위치인 0값으로 초기값을 넣어준다!
// 초기값을 안넣으면 최초에 값을 더할때 애러가 발생한다!

// (4) 움직일때 위치포인트 : move x ,move y
let moveX;
// (5) 위치이동 차이계산 결과변수 : result x , result y
let resultX;

///////////////////////////////////////////////////
// 3. 함수 만들기 ///////////////////
// 할당형 함수를 만들경우 이벤트 설정보다 위에서 만들어준다!

// (1) 드래그 상태 true로 변경하는 함수
const dTrue = () => (dragSts = true);
// (2) 드래그 상태 false로 변경하는 함수
const dFalse = () => (dragSts = false);
// (3) 드래그 상태시 처리함수
const dMove = (e) => {
  // e - 이벤트 객체 전달변수
  // 드래그 상태는 dragSts값이 true인 경우에만 허용!
  if (dragSts) {
    // console.log('드래그중~!');

    // 1. 드래그 상태에서 움직일때 포인터 위치값
    // - 브라우저용 포인터 위치 pageX , pageY
    // - 모바일용 터치스크린 터치위치는 
    //e.touches[0].screenX ,e.touches[0].screenY
    // -> 윈도우&모바일 두가지를 모두사용하는방법은 or문 할당법
    // -> 변수 = 할당문1 || 할당문2
    // ->>> 두 할당문중 값이 유효한(true)값이 할당됨!
    // 윈도우&모바일 동시에 셋팅가능
    moveX =e.pageX || e.touches[0].screenX;
    // console.log(e.touches[0]); -> 에러나서 죽임
    // moveX = e.pageX;
    // moveY = e.pageY;

    // 2. 움직일 위치 결과값
    // 움직일때 위치 포인트 - 첫번째 위치 포인트
    //   moveX - firstX
    //   moveY - firstY
    resultX = moveX - firstX;
    // -> 순수하게 움직인 거리를 계산함!
    // -> 움직인위치 - 첫번쨰위치 순으로 빼준 이유는
    // ->>> top,left 위치이동 양수 음수 차를 고려한 순서!!

    // 3. 이동차를 구한 resultX,resultY값을 대상 위치값 적용
    // 대상 : 드래그요소 dtg
    dtg.style.left = resultX + lastX + "px";
    // 처음엔 lastX,lastY값이 0으로 들어오고
    // 두번째부터는 mpuseup 이벤트 발생부터 저장된
    // 최종 이동위치값이 더해진다!

    // 값 확인
    console.log(`moveX:${moveX}`);
    console.log(`resultX:${resultX}`);

    // 드래그중일떄 grabbing, 아닐때 grab
} //////// if //////
// dtg.style.cursor = dragSts ? 'grabbing' : 'grab';
// -> 아래에서 중복
}; //////////// dMove함수 //////////

// (4) 첫번째 위치포인트 셋팅변수 : firstX, firstY 값 셋팅
const firstPoint = (e) => {
  // DT용값과 mobile값을 동시에 or문으로 할당함!
  firstX = e.pageX || e.touches[0].screenX;
  // firstX = e.pageX;
  // firstY = e.pageY;
  console.log("첫포인트:", firstX);
}; ////////// firstPoint함수 /////////////
// (5) 마지막 위치포인트 셋팅변수 : lastX, lastY 값 셋팅
// -> 왜필요하지? 이동후 결과위치를 저장하여 다음 드래그 이동시
// 그 결과를 중첩하여 반영하기 위해 필요함!!!
const lastPoint = () => {
  // 이동결과 계싼되 최종값을 기존값에 더함 (+=)
  lastX += resultX;
  console.log("끝포인트:", lastX);
}; ////////// lastPoint함수 /////////////

// 4. 드래그 이벤트 설정하기 //////////////////
// (1) 마우스 다운 이벤트 함수연결
mFn.addEvt(dtg, "mousedown", (e) => {
  // 드래그 상태값 true 로 변경!
  dTrue();
  // 첫번째 위치포인트 셋팅!

  // 과도한 드래그 -> 누른상태로 leave 시 dFalse 되게함
 



  firstPoint(e);
  // 단독할당되지않고 내부 함로 연결되어있으므로
  // 이벤트 전달을 토스해줘야한다!(전달변숲 e)
  dtg.style.cursor ='grabbing'; //주먹손
  
  console.log("마우스 다운", dragSts);
}); /////////////// mousedown ////////////
// (2) 마우스 다운 이벤트 함수연결
mFn.addEvt(dtg, "mouseup", (e) => {
  // 드래그 상태값 false 로 변경!
  dFalse();
  // 마지막 위치포인트 셋팅!
  lastPoint(e);
  console.log("마우스 업", dragSts);
  dtg.style.cursor = 'grab';
}); /////////////// mouseup ////////////
// (3) 마우스 무브 이벤트 함수연결하기
mFn.addEvt(dtg, "mousemove", dMove);
//////////// mousemove ////////////
// (4) 마우스가 대상을 벗어나면 드래그상태값 false 처리하기
mFn.addEvt(dtg, "mouseleave", () => {
  // 드래그 상태값 false 로 변경
  dFalse();
    // 과도한 드래그로 아웃되면 lastX,lastY값이
    // 셋팅되지 못한다! 이것을 기존 요소의 위치값으로 보저함!
    // 단, style위치값 코드는 'px' 단위가 있으므로 parseTnt처리!
    lastX = parseInt(dtg.style.left); 
  console.log("마우스 나감!!", dragSts);
}); /////////// mouseleave ////////////

//////////// 모바일 이벤트 처리구역 ////////////
// (1) 터치스타트 이벤트 함수연결
mFn.addEvt(dtg, "touchstart", (e) => {
  // 드래그 상태값 true 로 변경!
  dTrue();
  // 첫번째 위치포인트 셋팅!
  firstPoint(e);
  // 단독할당되지않고 내부 함로 연결되어있으므로
  // 이벤트 전달을 토스해줘야한다!(전달변숲 e)
  
  
  console.log("터치스타트", dragSts);
}); /////////////// touchstart ////////////
// (2) 터치앤드 이벤트 함수연결
mFn.addEvt(dtg, "touchend", () => {
  // 드래그 상태값 false 로 변경!
  dFalse();
  // 마지막 위치포인트 셋팅!
  lastPoint();
  console.log("터치앤드", dragSts);
}); /////////////// touchend ////////////
// (3) 터치무브 이벤트 함수연결하기
mFn.addEvt(dtg, "touchmove", dMove);
//////////// touchmove ////////////

}/////////////////// goDrag ///////////////
////////////////////////////////////////////

// 내보내기 셋팅
export default setDrag;