import React, { useContext, useEffect } from "react";
import $ from "jquery";
// 카트 리스트 CSS
import "../../css/cart_list.scss";
import { pCon } from "./pCon";
import { addComma } from "../../js/func/common_fn";

function CartList(props) {
  // 컨텍스트 사용
  const myCon = useContext(pCon);

  // 로컬스 데이터 가져오기
  const selData = JSON.parse(myCon.localsCart);
  console.log("로컬스:", selData);

  // 전체 데이터 개수
  const dataCnt = selData.length;
  console.log("데이터수:", dataCnt);
  // 총 합계함수 ////
  const totalFn = () => {
    // 합계금액은 모든 합계 히든필드 값을 더한다
    // 제이쿼리 forEach 는 each((순번,요소)=>{}) 메서드다!
    let result = 0;
    $(".sum-num2").each((idx, ele) => {
      console.log("값:", $(ele).val());
      result += Number($(ele).val());
    });
    return result;
  }; ///////// totalFn /////////

  // 화면 랜더링 구역 : dataCnt 의존성 ///
  useEffect(() => {
    $("#mycart")
      .removeClass("on")
      .delay(500)
      .fadeIn(300, function () {
        // 나타난후 클래스 넣으면 오른쪽이동+작아짐
        $(this).addClass("on");
      }); ///////fadeIn///////////
    // 총합계 찍기
    $(".total-num").text(addComma(totalFn()));
  }, [dataCnt]); ///// -> 숫자값 할당이므로 변함없음
  // },[selData]);///// -> 리랜더링시 객체주소값이 변경되어
  // 매번 새로운값이 업데이트 되기때문에 부적격임!

  // 화면 랜더링구역
  useEffect(() => {}, []);

  ///// 코드리턴구역 /////////////
  return (
    <>
      <section id="cartlist">
        <a
          href="#"
          className="cbtn cbtn2"
          onClick={(e) => {
            e.preventDefault();
            // 오른쪽으로 이동하여 사라짐
            $("#cartlist").animate({ right: "-60vw" }, 400);
          }}
        >
          <span>닫기버튼</span>
        </a>
        <table>
          {/* 항목별 세로 비율설정 */}
          <colgroup>
            <col span="1" style={{ width: "5%" }} />
            <col span="1" style={{ width: "8%" }} />
            <col span="1" style={{ width: "38%" }} />
            <col span="1" style={{ width: "14%" }} />
            <col span="1" style={{ width: "10%" }} />
            <col span="1" style={{ width: "8%" }} />
            <col span="1" style={{ width: "11%" }} />
            <col span="1" style={{ width: "5%" }} />
          </colgroup>
          {/* 테이블 제목 */}
          <caption>
            <h1> 카트 리스트 ({dataCnt})</h1>
          </caption>
          {/* 테이블 상단영역 : 분류항목 출력 */}
          <thead>
            <tr>
              <th>No.</th>
              <th>상품</th>
              <th>상품명</th>
              <th>상품코드</th>
              <th>단가</th>
              <th>수량</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>
          </thead>
          {/* 테이블 메인영역 */}
          <tbody>
            <tr>
              <td colSpan={8}>
                {/* 내부 스크롤박스 div */}
                <div
                  className="scbar"
                  style={{
                    overflowY: "auto",
                    height: "40vh",
                    width: "100%",
                  }}
                >
                  {/* 내부용 스크롤되는 테이블 */}
                  <table
                    style={{
                      margin: "0",
                      width: "100%",
                    }}
                  >
                    <tbody>
                      {/* 카트데이터 연동파트
            **************************
              [데이터 구조정의]
              1. idx : 상품고유번호
              2. cat : 카테고리
              3. ginfo : 상품정보
              4. cnt : 상품개수
            **************************
            */}
                      {selData.map((v, i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            {/* 상품이미지 */}
                          <td>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/images/goods/${v.cat}/${v.ginfo[0]}.png`
                              }
                              alt="item"
                            />
                          </td>
                          <td>{v.ginfo[1]}</td>
                          <td>{v.ginfo[2]} </td>
                          <td>{addComma(v.ginfo[3])}원</td>
                          <td className="cnt-part">
                            <div>
                              <span>
                                <input
                                  type="text"
                                  className="item-cnt"
                                  readOnly
                                  value={v.cnt}
                                  onChange={() => {}}
                                />
                                <button className="btn-insert" data-idx="20">
                                  반영
                                </button>
                                <b className="btn-cnt">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/cnt_up.png"
                                    }
                                    alt="증가"
                                  />
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/cnt_down.png"
                                    }
                                    alt="감소"
                                  />
                                </b>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="sum-num1">
                              {addComma(v.ginfo[3] * v.cnt)}
                            </span>
                            원
                            <input
                              className="sum-num2"
                              type="hidden"
                              defaultValue={v.ginfo[3] * v.cnt}
                            />
                          </td>
                          <td>
                            {/* 데이터 삭제 기능버튼 */}
                            <button className="cfn" 
                            onClick={()=>{
                              // confirm 확인 버튼 시 true
                              if(window.confirm("지운다규??")){
                                console.log("삭제함!!");
                                console.log("현재객체!!",selData);
                                console.log("지울순번!!",i);
                                // console.log("지우기!!",selData.splice(i,1));
                                // console에서도 데이터를 지울수있으므로 주석!!!
                                // 지울 배열 순번은 map()에서 i로 들어옴
                                // 지울 배열은 selData임
                                // 1.데이터 지우기
                                selData.splice(i,1);
                                // 2.데이터 문자화 : 변경된 원본을 문자화
                                let res = JSON.stringify(selData);
                                // 3.로컬스 cart-data 반영하기
                                localStorage.setItem("cart-data",res);
                                // 4.카트리스트 전역상태변수 변경
                                myCon.setLocalsCart(res);
                                // 5.데이터 개수가 0 이면 카트리스트
                                // 상태변수를 false로 변경하여
                                // 카트리스트 출력을 없앤다!
                                if(selData.length == 0){
                                  myCon.setCartSts(false);
                                }


                              }////if///
                            }}>
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
          {/* 테이블 하단영역 */}
          <tfoot>
            <tr>
              <td colSpan="6">총합계 :</td>
              <td>
                <span className="total-num"></span>원
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="8" className="paging">
                <button>Buy Now</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      {/* 카트버튼 이미지 박스 */}
      <div
        id="mycart"
        onClick={(e) => {
          e.preventDefault();
          // 왼쪽으로 이동하여 나타남
          $("#cartlist").animate({ right: "0" }, 400);
        }}
      >
        {/* 카트이미지 */}
        <img
          src={process.env.PUBLIC_URL + "/images/mycart.gif"}
          title={dataCnt + "개의 상품이 있습니다."}
          alt="장바구니"
        />
        {/* 카트 상품개수 출력박스 */}
        <div className="cntBx">{dataCnt}</div>
      </div>
    </>
  );
}

export default CartList;
