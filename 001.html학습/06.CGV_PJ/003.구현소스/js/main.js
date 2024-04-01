// CGV PJ 메인 페이지 JS - main.js

/* ************************************************
    [요구사항분석]
    1. 영화포스터 메뉴 클릭시 해당 예고편을 
    메인 아이프레임에 상영되도록 아이디를 매칭
    하여 src 속성을 변경해준다!
    2. 이때 자동재생 옵션을 추가하여 src 변경시
    바로 동영상이 재생되게함!
    3. 영상이 끝나면 다시 처음부터 재생되게
    옵견을 추가해준다! 
*************************************************/
//1. 대상선정
// 1-1.이벤트대상 : .poster-menu a
const pMenu = document.querySelectorAll('.poster-menu a');
// 1-2. 변경대상 : #ifr
const ifr = document.querySelector('#ifr');

console.log('대상:',pMenu,ifr);

//2.영화아이디 정보 객체로 구성하기
const movieId = {
    듄2:"4JElrZ1WB40",
    파묘:"rjW9E1BR_30",
    윙카:"Bldf9SWRPFM",
    "귀멸의 칼날-인연의 기적":"TFsD_eWkIuQ",
    "사운드 오브 프리덤":"RoRwyrz7S1Y",
    오펜하이머:"UigvImy-GbE",
}

// 3. 이벤트설정 및 기능구현
// 포스터 버튼에 forEach() 메서드로 순회한다!
pMenu.forEach((ele,idx)=>{
    // ele -각 a요소 / idx - 각요소의 순번
    ele.onclick = ()=>{
        // 클릭된a요소를 구분하기 위해 하위img
        // 포스터의 alt 속성을 읽어오기
        // 속성읽기 내장함수 : getAttribute(속성명)
        let txt = ele.querySelector('img').getAttribute('alt');
        console.log('나클릭!',txt); 

        //  2. 아이프레임 src 변경하기
        // 속성변경 JS내장함수
        // -> setAttribute(속성명,값)
        // 대상 : 아이프레임 (#ifr -> ifr변수)
        //  영화아이디값 -> movieId 객체
        //객체호출법 : moviwId[영화이름속성명]
        // 영화이름속성명은 txt변수에 할당되어있음
        // 객체호출 코드 : movieId[txt]
        ifr.setAttribute(
            "src",
            `https://www.youtube.com/embed/${movieId[txt]}?autoplay=1`);
        //  __________________________________________________________________
        //  3.클린된 a의 부모인 li 에클래스 on넣지
        // forEach  문 사용해보자
        pMenu.forEach( (x,i)=>{ // x -a요소 / i -순번
            // x.parentElement 는 a요소 상위 부모 li요소
            if(i===idx){ //해당순번은 on넣기
                x.parentElement.classList.add('on');
            }//// if /////
            else{ /// 나머지는 on빼기
                x.parentElement.classList.remove('on');
            }///// else //////
        } );////// forEach///////////////


    };////click////////////
});//////////for each/////////


