// 02. 컴포넌트 연습2 JS= 부모변수를 자식에게 전달!
// ->>> Props Down 프롭스 다운!

// 뷰JS 인스턴스 생성용 함수 : x는 대상요소
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
// Vue.component(케밥케이스 컴포넌트 태그명, {옵션})
// 이것으로 생성함!
// 같은이름의 태그 구성요소에 실제 template 값이 들어감!
Vue.component("tit-comp", {
   template: `
    <strong>
        <span>
            😊Vue JS😜 컴포넌트 :
        </span>
        쇼핑모~~~올 갤러리 리스트
    </strong>
    `,
}); //// 전역 컴포넌트 1 ////////

// 컴포넌트를 먼저 만들고 뷰 인스턴스 생성함 !

// 뷰인스턴스 생성하기 : 타이틀 컴포넌트
makeVue(".tit");
// [ 갤러리 리스트용 변수 셋팅 ] /////
// (1) 갤러리 이미지번호용 변수
let inum = 0;
// (2) 상품명 배열
// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

Vue.component("list-comp", {
   // 2-1. template 옵션 : 태그구성
   // v-bind:속성 디렉티브 (src 앞에  v-bind:src 이렇게 한것)
   // 변수를 사용할 수 있는 속성 재구성해줌!(따옴표자리가 따옴표가아니라 문법자리가 되게끔=중괄호처럼)
   template: `
    <div>
      
       <img 
       v-bind:src="gsrc" 
       v-on:click="goPapa('나야나!')"
       v-on:mouseover="goMama({이름:'김치갓',나이:'30살'})"
       alt="의류아이템"
       >
       <aside>
          <h2 v-text="gname"></h2>
          <h3 v-text="gprice"></h3>
       </aside>
    </div>
    `, // template ///
   //  자식컴포넌트에서 부모컴포넌트의 메서드를 
   // 바로호출할수 없다! 따라서 자신의 메서드를
   // 만들고 그곳에서 호출방식에 따라 부모메서드를 호출함!!

   // [ 상위 컴포넌트 전달변수 설정 속성 : props ]
   props: [
      "list-num",
      "my-seq",
      "end-let",
   ] /* 이렇게 프롭스로 써야 내부전달용으로 전달되어 태그에서는 보이지않음 */,

   // 배열형은 설정한 변수명을 문자형으로 나열만 하면 되고
   // 만약 각 변수의 데이터형(type)을 특정하고싶다면
   // 객체형을 사용하여 아래와같이 표현한다! (타입스크립트너낌)
   // props:{변수명:변수형}
   // props:{
   //    "list-num":Number,
   //    "my-seq":Number,
   //    "end-let":String
   // },

   // 이 변수를 사용할때는 캐믈케이스 변수로 사용함!
   // "list-num" -> this.listNum
   // -> 내부용 변수이므로 this키워드 반드시 사용!

   // 2-2. data 옵션 : 컴포넌트 내부 변수 셋팅
   // 실행원리 : 컴포넌트가 빌드할 때
   // data 속성의 '함수를 호출'한다!
   // 그래서 '함수의 리턴되는 객체값'이
   // 컴포넌트 내부에 전달된다!
   // data: function (){}

   data() {
      // <- 여기는 함수구역임
      // **** 객체 리턴 필수(중요!!) ****
      return {
         // <- 여기가 객체지
         // 이미지 src
         gsrc: `./images/${this.listNum}.jpg`,
         /* listNum 프롭스다운 안할때는 this.setNum()로 출력했었음  */
         // 상품명
         gname: this.setName() + " " + this.endLet + this.mySeq,
         // 상품가격
         gprice: this.setPrice(),
      };
   }, //// data ////
   // 2-3. methods 속성 : 컴포넌트 내부 메서드 셋팅
   methods: {
      // (1) 이미지번호 만들기 함수
      // 외부 전역변수 inum을 1 증가하여 리턴함
      setNum() {
         return ++inum;
      },

      // (2) 상품명 만들기 함수
      setName() {
         return goods[Math.floor(Math.random() * 4)];
      },

      // (3) 가격만들기 함수
      setPrice() {
         let rdm = Math.ceil(Math.random() * 17) + 3;
         return this.addCommas(20000 * rdm) + "원";
      },
      // (4)세자리콤마 함수
      addCommas(x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      // (5) 부모컴포넌트 메서드 호출을 위한 함수
      goPapa(txt){
         console.log("내꺼니까 호출가능",txt,this);
         // 부모 메서드 직접 호출불가!!
         // goMsg(txt);
         this.$emit("hull",txt);
         // [ 부모 메서드 호출방법 ]
         // this.$emit(생성이벤트명,전달값)
         // -> 생성이벤트명이란? 내가 만든 이벤트명으로
         // 서브 컴포넌트 태그에 이벤트르르 등록하여 호출하는 방식이다!
         // 아래와 같이 click 이벤트가 아니고.....
         // <list-app v-on:click="함수명"></list-app>
         // 아래와 같이 내가 만든 이벤트명이다!!
         // <list-app v-on:hulleng="함수명"></list-app>
         // -> 이벤트명을 내가 만든 이유는 .. 이 이벤트명으로
         // 특정한 일을 해주기 위함이다!
         // -> 여기서 특정한 일은 부모함수의 호출!!!
      },
      // (6) 부모메서드 호출함수 하나더!
      goMama(pm){
         console.log("갓김치 호출함수");
       this.$emit("oh-my-godkimchi",pm);
      }
   },
}); ///// components /////

// 뷰인스턴스 생성하기 :리스트 컴포넌트 <- 인스턴스화 하기전에 v-for="(n,i) in 50 는 진짜 아무것도 아닌 글씨임
// makeVue(".grid");

// list-comp 자식 컴포넌트의 부모 컴포넌트!
new Vue({
   // 1. 대상
   el:".grid",
   // 2. 메서드
   methods: {
      // 자식 이벤트전달 후 실행 메서드!
      goMsg(txt){
         alert("자식이 부모에게 이벤트 전달 성공!!!"+txt)
      }
   },
   // 자식 컴포넌트의 오버 이벤트가 전달되어 호출하는 메서드
   // 호출하는 메서드
   overMsg(pm){
      // pm 전달받을 객체값 {이름:"어쩌구",나이:"저쩌구"}
      alert("오 마이 갓김치!" +pm.이름+"나이는" +pm.나이);
   },
})

// 3. 유튜브 동영상 컴포넌트 만들기
Vue.component("ifr-comp", {
   template: `
    <iframe width="49%" style="aspect-ratio: 16/9;" 
    v-bind:src="ifrSrc" title="#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    `,
   props: ["video-code"],
   // -> 사용시 this.videoCode

   // 3-2 data옵션
   data() {
      //객체를리턴한다
      return {
         ifrSrc: this.getIframeSrc(this.videoCode) /* 넣을 동영상 뒷자리 */,
      };
   }, //// data ////
   // 3-3. methods 속성
   methods: {
      // 동영상 정보 리턴함수
      getIframeSrc(code) {
         // 동영상코드

         return `https://www.youtube.com/embed/${code}?autoplay=1&mute=1&loop=1&playlist=${code}`;
      },
   },
});
// 뷰 인스턴스 생성하기 : 유튜브 동영상 컴포넌트
makeVue(".you-box");

// 1) 뉴뷰 인스턴스 생성하고
// 2) <만들컴포이름>으로 html에 생성하고
// 2) Vue.component('만든이름',{ template: `<div>컴포내용</div>` ,data(){ return {키:값,...} }}); 으로 컴포넌트만들기

// 하단영역 컴포넌트 구성하기

Vue.component("footer-comp", {
   template: `
    <div style="text-align:center; background:lightblue; height:100px; line-height:100px;">
    {{this.content}}
    <div v-html="text"></div>
    </div>
    `,
   data() {
      return {
         content: "Discovery Expedition",
         text: `<span>상세정보</span>`,
      };
   },
});

// makeVue(".you-box"); 아래랑같은거
new Vue({ el: ".tit2" });
