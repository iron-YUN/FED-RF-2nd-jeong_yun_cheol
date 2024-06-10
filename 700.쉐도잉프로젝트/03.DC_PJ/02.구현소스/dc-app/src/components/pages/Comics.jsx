// 코믹스페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import VidIntro from "../modules/VidIntro";

export default function Comics() {
    return (
      <>
        {/* 1.배너 컴포넌트 */}
        <Banner catName="COMICS" />
                   {/* 1.비디오 소개 컴포넌트 */}
      <VidIntro catName="COMICS" clsName="on" />
      </>
    );
  } ////////////// Comics /////////////