// 함수 선언
export default function createRouter() {
  const routes = []; //경로
  const router = {
    // 경로 저장
    addRoute(fragment, component) {
      routes.push({ fragment, component });
      return this;
    },

    // 경로에 따라 html 그리기
    start: () => {
      const checkRoutes = () => {
        // 경로 검사
        const currentRoute = routes.find(
          (route) => route.fragment === (window.location.hash || "#/")
        );
        // html 그리기
        currentRoute.component() || [];
      };
      // 페이지 이동 시 html 그리기
      window.addEventListener("hashchange", checkRoutes);
      checkRoutes();
    },
  };
  return router;
}
