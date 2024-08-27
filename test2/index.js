import createRouter from "./router.js";

// html 그리기 함수가 담긴 객체 선언
const container = document.querySelector("main");
const pages = {
  home: () => {
    container.innerText = "home페이지로 왔습니다";
  },
  rara: () => {
    container.innerText = "rara페이지로 왔습니다";
  },
};

// 페이지 그리기 함수가 담긴 router 객체 불러오기
const router = createRouter();

// 클릭 이벤트 시 페이지 이동
window.addEventListener("click", (event) => {
  // 이동할 경로 지정
  if (event.target.matches("[data-navigate")) {
    if (event.target.dataset.navigate === "/") {
      // html 그리기
      container.innerText = "";
      pages.home();
    } else if (event.target.dataset.navigate === "/rara") {
      // html 그리기
      container.innerText = "";
      pages.rara();
    }
    // 페이지 이동
    router.navigate(event.target.dataset.navigate);
  }
});
