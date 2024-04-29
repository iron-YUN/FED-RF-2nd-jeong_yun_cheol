// 내함수 가져오기
import mFn from "./my_function.js";

// 로고 나오기
// 대상 : .logo a:last-child
const toyLogoA = mFn.qsa(".logo a");
const poster = mFn.qs(".logo a:last-child");
const toyLogoA2 =mFn.qsa(".chars-bg a");
const SUMMARY = mFn.qs(".chars-bg a:last-child");

function showPoster() {
    toyLogoA.forEach((element) => {
      element.addEventListener("click", () => {
        poster.classList.toggle("show");
      });
    });
    toyLogoA2.forEach((element) => {
      element.addEventListener("click", () => {
        SUMMARY.classList.toggle("show");
      });
    });
  }
  showPoster();

