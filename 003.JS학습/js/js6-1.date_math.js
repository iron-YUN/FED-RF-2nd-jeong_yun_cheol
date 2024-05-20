// JS6-1.Date객체와 Math객체 JS

// 나의함수
import mFn from "./my_function.js";

// 1.요구사항 : 화면에 시간을 찍으시오
// 2.데싱: .tt
const tt = mFn.qsa(".tt");
console.log(tt);

// 3.날짜/시간찍기
// 시간날짜함수 최초호출
showTime();
// 시간날짜함수 인터발호출
setInterval(showTime, 1000);

// 시간날짜 함수 ///////////
function showTime() {
  // 1.날짜 내장객체로 날짜객체인스턴스 생성하기
  const today = new Date();
  // 월을 부르는 이름
  let monthName = [
    "하하월",
    "파파월",
    "카카월",
    "토토월",
    "코코푸월",
    "싹스월",
    "칸단월",
    "차즈민월",
    "라우딘월",
    "차호호월",
    "테테월",
    "상그리아월",
  ];
  // 요일을 부르는 이름과 매칭하기
  let dayName = ["일", "월", "화", "수", "목", "금", "토"];
  // 2.년도 찍기
  tt[0].innerText = today.getFullYear();
  // tt[1].innerText = monthName[today.getMonth()];
  tt[1].innerText = today.getMonth() + 1;
  tt[2].innerText = today.getDate();
  tt[3].innerText = dayName[today.getDay()];
  // 월과 요일은 배열순번으로 리턴됨 - 나라마다 다름
  // 만약 월을 숫자로 출력하려면 1만 더하면 된다!

  // 3.시간/분/초 찍기
  let H = today.getHours();
  let M = today.getMinutes();
  let S = today.getSeconds();
  // 아래는 테스트
  // H = 16;
  // M = 2;
  // S = 5;

  // 12이상이면 오후, 아니면 오전
  tt[4].innerText = H >= 12 ? "오후" : "오전";
  // 12를 24시간제로 12를 빼준다
  H = H > 12 ? H - 12 : H;
  // 시,분,초 에서 한자리숫자를 앞에 0자리수넣기
  // 0붙이기 리턴함수
  const addZero = (x) => (x < 10 ? "0" + x : x);
  tt[5].innerText = addZero(H);
  tt[6].innerText = addZero(M);
  tt[7].innerText = addZero(S);
} ///////////////////// showTime //////////////

/*************************************** 
    [ Math 객체 ]
    - 수학객체로써 다른 객체와 달리
    new키워드 없이 바로 사용할 수 있게 설계됨
    - 이런객체를 정적객체(Static Object)라고함
    -> 정적객체들!
        Array(), Object(), Math()
    ______________________________

    [ 주요 Math 객체의 메서드들 ]
    Math.min(값들) - 최소값
    Math.max(값들) - 최대값
    Math.round(실수값) - 반올림
    Math.floor(실수값) - 내림
    Math.ceil(실수값) - 올림
    Math.abs(양수나 음수값) - 절대값
    ______________________________

    Math.random() - 난수발생
    -> 0~1  사이의 소수점값 17자리수

***************************************/

// 난수 발생시키기
let rdm = Math.random();
console.log(rdm);

// 1~7 사이 난수발생하기
// 방법: 난수에 발생할 최대수 곱하기 -> 올림/내림
rdm = rdm * 7;
console.log("난수*7:", rdm);
console.log("난수*7 내림:", Math.floor(rdm));
console.log("난수*7 올림:", Math.ceil(rdm));
// -> 1부터 최대수는 올림처리 / 0부터 최대수-1은 내림처리

// 중간난수는?
// 예) 4~12 사이 난수는?
// console.log('4~12사이 난수:',
// Math.ceil(Math.random()*9)+3)

/**************************************** 
    [ 내가 원하는 난수 만들기 ]

    1. 먼저 난수를 발생시킨다!
    Math.random()

    2. 1부터 원하는 최대수일 경우 최대수를 곱한다
    Math.random() * 최대수

    3. 원하는 범위의 난수를 올림처림함
    Math.ceil(Math.random() * 최대수)

    ________________________________

    [ 중간 범위의 난수 만들기 ]

    1. 1부터 최대수 랜던수를 먼저구한다
    Math.random() * 최대수

    2. 원하는 범위의 시작수 만큼 더함
    Math.ceil(Math.random() * 최대수) + 시작수만큼

    (만약 0부터 시작수로 하면 내림을 적용!
    -> Math.floor())
    ___________________________________

    예) 4~9 사이의 난수 구하기 : 1~6먼저구함
    -> 최대수는 6, 시작수 만큼 더할 수는 3
    Math.ceil(Math.random() * 최대수) + 시작수만큼
    Math.ceil(Math.random() * 6) + 3
    ________________________________

    [ 중간범위 수 계산 ]
    작은수 ~ 큰수
    1. 최대수 = 큰수 - 작은수 + 1
    2. 시작수차이 = 작은수 - 1;


****************************************/

// 이미지 웹경로 배열
const rimg = [
  "https://img.etnews.com/photonews/2110/1461216_20211007085904_466_0001.jpg",
  "https://i.namu.wiki/i/bFpYClpzX-ErL1Kdad69t09fhPPeVb2VwOB_qpH-9qxQ3Tx2Nz9zVIiLPWSMkvnVG5XWnUdQM5hHrGZ4cWneZA.webp",
  "https://img.imbc.com/adams/Program/202111/132804027350463581.jpg",
  "https://image.ytn.co.kr/general/jpg/2021/0925/202109251350012465_d.jpg",
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MDhfMTE0%2FMDAxNzEyNTQ1NzM5NzY4.CV2JuRLzs91cZq5shllTYdMDo3I1R_4OH1dI_YXcMQUg.f4SqGMxPZxxJK2pM7tWUUACuHuyCc4MagUl-lIgk8ugg.JPEG%2F0.jpg&type=sc960_832",
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5772%2F2024%2F05%2F13%2F0000035704_001_20240513113602787.jpg&type=sc960_832",
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MTlfMTYy%2FMDAxNzEzNTI2MjE5Mzcy.Mys4WMAjK_r6yuPhS51-zQDbUrqOxhceeEYtB5dtKsYg.Sdm58bbJDhJzZ6fhRnPEN2roaXbatSz16IDXe5NhcM0g.JPEG%2F%25BC%25F6%25BB%25E7.JPG&type=sc960_832",
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MDRfMjYy%2FMDAxNzE0Nzk1MjExNzQw._LK_QpLL0eoy7AVSDfW41pO5Fiva-7wQYvgFjkKj5UIg.TK26jlIQKHLgGImBnWxH8LKnDWoXRmvT2YQGSyV9m2Ig.JPEG%2FUPEqlo.jpg&type=sc960_832",

];
// 배열개수
const rimgCnt = rimg.length;

// 1. 요구사항 : 웹경로 이미지를 화면에 넣고 랜덤하게
// 이미지를 칼라로 약간커지게 클래스 on을 주어서 변경함!

// 2.대상선정: .imbx
const imbx = mFn.qs(".imbx");

// 3.이미지넣기
// 배열만큼 이미지 넣기

// map으로 만들기
imbx.innerHTML = rimg
  .map(
    (v) => `
    <div>
      <img src="${v}" alt="드라마 포스터" />
    </div>
`
  )
  .join("");

// forEach로 만들기
// rimg.forEach(v => {
//     imbx.innerHTML += `
//     <div>
//       <img src="${v}" alt="드라마 포스터" />
//     </div>
//     `;
// });

// 4.랜덤 처리대상 div 선택하기
const target = mFn.qsa(".imbx div");
console.log("랜덤대상", target);

// 전에발생한 난수 저장변수 - 함수호출 순서따지기
let beNum = 9999;
// 초기값은 해당 난수범위 외의 수(처음에통과)

// 랜덤처리함수 호출
randomAddOn();
// 인터발호출
setInterval(randomAddOn, 1500);



// 5.랜덤처리함수 만들기
function randomAddOn() {
  // 1.난수발생
  let rdm = Math.floor(Math.random() * rimgCnt);
  console.log("난수", rdm);

  // 2. 전에 발생한 난수와 같으면 다시발생
//   직전난수는 beNum에 저장
    while(rdm == beNum) {
        rdm = Math.floor(Math.random() * rimgCnt);
        console.log("다시난수",rdm);
    }/////////////while////////////
// while문 통과후 결정된 난수를 직전난수변수에 할당
beNum = rdm;
  // 3.랜덤난수에 해당하는 div 클래스 on
  // 나머지는 on제거
  target.forEach((ele, i) => {
    if (i == rdm) ele.classList.add("on");
    else ele.classList.remove("on");
  });/////////////if///////////////
} /////////////// randomAddOn ////////////
