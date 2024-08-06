// 스타일 난다 사이트 구성 JS

/****************************************** 
    [ 뷰 JS 라이프사이클 속성 사용하기 ]
     -> 뷰인스턴스 생성자 메서드 객체 셋팅시 사용
     -> new Vue({
            created(){},
            mounted(){},
                })

    1.뷰 인스턴스 초기화 완료단계 : created
    -> 이 단계활용법 : 데이터 셋팅을 많이한다! (useLayouteffect 와 비슷)
    -> 사용법 : 
    created: function(){코드}
    created: ()=>{코드}
    created(){코드}

    2.뷰랜더링 완료단게 : mounted
    -> 이 단계활용법 : JS,제이쿼리 등 DOM에 그려진 후 
    코딩해야하는 부분을 여기에 연결한다! (useEffect 와 비슷)
    -> 사용법 : 
    mounted: function(){코드}
    mounted: ()=>{코드}
    mounted(){코드}

******************************************/

// 상품정보 생성을 위한 클래스 
// 클래스는 객체 템플릿이다
// 따라서 클래스 생성자함수를 호출하면
// 객체 인스턴스가 생성된다.
// 인스턴스는 메모리상에 실제 객체가 생성됨을 의미!!!!!!!
class GetList {
    // 생성자 메서드
    constructor(idx,name,img,price){
        // idx : 일력번호 // name : 상품명
        // img : 이미지이름 // price : 상품가격
        this.idx = idx;
        this.name = name;
        this.img = img;
        this.price = price;
        // this 는 GetList 인스턴스 자신을 의미한다
    }
}///////////// GetList //////////////



// 1. 뷰JS 인스턴스 생성하기
const vm = new Vue({
  // 1. 대상선정
  el: "#vue-app",
  // 대상은 꼭 아이디일 필요는 없다
  // 클래스를 사용하면 첫번쨰 만나는 요소를 대상으로 함

  // 2.데이터 설정하기
  data: {
    // 2-1. 샵명 데이터
    bigTit: "Style NANDA",
    // 2-2. 로고 태그정보
    logo: `<img src="./images/logo_3ce.png" alt="nanda logo"></img>`,
    // 2-3. 배너 데이터
    content: `
            나는 날고 싶어~!
            <h2>오늘도 당신은 날고 싶다~!</h2>
            <img src="./images/sub_banner_e.jpg" alt="banner">
    `,
    // 2-4. 상품정보 배열
    // 데이터를 클래스를 통해 생성하차
    itemData : [], // -> 리터럴 배열(고정된 값)
    // ((예시데이터 셋팅))
    // itemData:[
    //     {
    //         idx:1,
    //         name:"vans와우",
    //         img:"vans_1.jpg"
    //     },
    //     {
    //         idx:2,
    //         name:"vans올레이",
    //         img:"vans_2.jpg"
    //     },
    //     {
    //         idx:3,
    //         name:"vans코코넛",
    //         img:"vans_3.jpg"
    //     },
    //     {
    //         idx:4,
    //         name:"vans마크로",
    //         img:"vans_4.jpg"
    //     },
    // ],
  },

    // 3. 메서드 설정 /////////////
    methods: {
        // 이미지 태그를 만들어서 리턴함
    makeImg(val) {
        // val - 이미지명만 들어옴!
        // 오버시 이미지까지 2개의 이미지를 리턴함!
        return `
              <img src="./images/fashion1/${val}.jpg" alt="item">
              <img src="./images/fashion2/${val}.png" alt="item">
              `;
      },
      //정규식함수(숫자 세자리마다 콤마해주는 기능)
      addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },///////////methods/////////

    // 4.뷰인스턴스 초기화 완료단계 : created
    // -> 이 단계에서 데이터 셋팅함!!
    created(){
        // 상품 데이터 클래스를 호출하여 객체를 생성하자!
        // 1. 상품명 배열
        const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];
        // 2. 상품정보 객체 클래스를 for 문으로 호출
        // 1~18 번 이미지 까지 생성
        for(let i=1; i<19; i++){
            // 2-1. 정해진 상품명 시작부분 랜덤하게 넣기
            // 위의 배열 4가지중 한가지 랜덤(0~3)
            let rdm1 = Math.floor(Math.random()*4);
            // 2-2. 다양한 가격을 위해 4~20사이의 난수곱
            let rdm2 = Math.ceil(Math.random()*17)+3;
            // 먼저 1~17난수를 만들고 3을 더해 4~20 으로 만듬
            // console.log("램덤1",rdm1,"/n램덤2",rdm2);
            // 2-3. 뷰인스턴스의 itemData 배열값 넣기
            // this키워드로 접근한다 this.itemData
            this.itemData.push(
                new GetList(
                    i, // 일련번호
                    goods[rdm1], // 상품명
                    `nanda_${i}`, // 이미지명
                    2000 * rdm2 // 상품가격
                )
            );/////// psuh /////
            // 생성된 데이터 출력
            console.log("itemData",this.itemData);
        }///// for /////
    },////created////   

    // [ 5. 뷰 랜더링 완료 단계 : mounted]
    mounted() {
        // 랜더링후 자동실행구역 ////
        // 1.제목 숨겼다 보이기
        $(".tit").hide().delay(1000).slideDown(300);

        // 2. 로고 왼쪽에서 날아오기
        $(".logo").css({translate:"-100vw"}).delay(2000).animate({translate:"0"},800,"easeOutElastic",
            // 애니메이션 후 실행구역
            ()=>{
                // 3.상품리스트로 스크롤 이동하기
                // ->상품리스트 박스위치로 이동
                // $(상품리스트박스).offset().top
                $("html,body").animate({scrollTop:$(".gwrap").offset().top+"px"},600,"easeInOutExpo")
            }

        );
    },////mounted///
}); ////////// Vue ////////////////



