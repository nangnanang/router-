import createRouter from "./router.js";

// html 그리기 함수가 담긴 객체 선언
const container = document.querySelector("main");
const pages = {
  // html 그리기
  home: () => {
    container.innerText = "home페이지로 왔습니다";
  },
  // html 그리기
  rara: () => {
    container.innerText = "rara페이지로 왔습니다";
  },
};

// 페이지 이동 함수가 담긴 객체 불러오기
const router = createRouter();

// 경로 저장하고, 경로 이동 시 html 그리기
router.addRoute("#/", pages.home).addRoute("#/rara", pages.rara).start();
