import createRouter from "./router.js";

const container = document.querySelector("main");

// html 그리기 함수가 담긴 객체 선언하기
const pages = {
  home: () => {
    container.innerText = "home페이지로 왔습니다";
  },
  rara: () => {
    container.innerText = "rara페이지로 왔습니다";
  },
  board: (params) => {
    container.innerText = `${params.name}${params.song}`;
  },
};

//페이지 이동 함수가 담긴 객체 불러오기
const router = createRouter();

// 클릭 이벤트 시 페이지 이동
window.addEventListener("click", (event) => {
  // 이동할 경로 지정
  if (event.target.matches("[data-navigate")) {
    // 페이지 이동
    router.navigate(event.target.dataset.navigate);
  }
});

// 경로 저장하고 html 그리기
router
  .addRoute("#/", pages.home)
  .addRoute("#/rara", pages.rara)
  .addRoute("#/rara/IU/love", pages.board)
  .start();
