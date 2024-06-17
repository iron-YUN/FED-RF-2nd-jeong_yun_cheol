// DC PJ 캐릭터 상세페이지
// -> 캐릭터 리스트로 부터 라우팅 이동하여 보이는 페이지

import React from "react"; //rsf
// 라우터로 전달한 state값을 읽기위한 객체
import { useLocation } from "react-router-dom";

import Banner from "../modules/Banner";
import CatList from "../modules/CatList";

// css불러오기
import "../../css/cat_detail.scss";

function CatDetail() {
  // 라우터 호출시 전달한 값을 받는다!
  const loc = useLocation();
const cname = loc.state.cname;
const cdesc = loc.state.cdesc;
const facts = loc.state.facts;
console.log(facts,cname,cdesc);

  return (
    <>
      {/* 1.배너모듈  */}
      <Banner catName={cname} />
      {/* 2.상세정보박스 */}
      <div className="detail">
        {/* 2-1. 캐릭터 설명박스 */}
        <div className="desc-box">
          {/* 캐릭터명  */}
          <h2>{cname}</h2>
          {/* 캐릭터소개  */}
          <div className="cdsc">
            <p>{cdesc}</p>
          </div>
        </div>
        {/* 2-2.캐릭터명세  */}
        <div className="facts">
          <div>
            <h3>CHARACTER FACTS</h3>
            {/* 테이블 */}
            <table>
              <tbody>
                <tr>
                  <td>{facts}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 3. 캐릭터리스트 모듈 */}
      <CatList />
    </>
  );
}

export default CatDetail;
