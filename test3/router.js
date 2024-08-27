export default function createRouter() {
  const routes = []; //경로
  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g; // 경로를 구분하여 가져오기 위한 정규표현식
  const URL_REGEXP = "([^\\/]+)";
  const router = {
    // 경로 저장
    addRoute(fragment, component) {
      // 이 부분에서 name과 song을 추출해서 params에 넣는 것이 문제인데, 정규식을 채 이해하지 못했기 때문에 필요한 부분만 추출해서 저장할 수 없었다.
      const params = [];
      // 정규표현식과 replace 함수를 이용하여 name과 song 추출
      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (name, song) => {
          params.push(name);
          params.push(song);
          return URL_REGEXP;
        })
        .replace(/\//g, "\\/");

      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });
      return this;
    },

    // 변경된 경로에 따라 html 그리기
    start: () => {
      // 경로 해쉬 가져오기
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);

        matches.shift();
        matches.forEach((paramValue, index) => {
          const paramName = route.params[index];
          params[paramName] = paramValue;
        });

        return params;
      };
      const checkRoutes = () => {
        // 경로 검사+ 정규표현식 검사
        const currentRoute = routes.find((route) => {
          return route.fragmentRegExp.test(window.location.hash || "#/");
        });
        // 더 그릴 요소(params)가 있을 때 경로에서 데이터를 가져와서 그리기 || 그냥 그리기
        if (currentRoute.params.length) {
          // 해쉬 가져오기
          const urlParams = getUrlParams(currentRoute, window.location.hash);
          // html 그리기
          currentRoute.component(urlParams);
        } else {
          // html 그리기
          currentRoute.component();
        }
      };
      // 페이지 이동 시 html 그리기
      window.addEventListener("hashchange", checkRoutes);
      checkRoutes();
    },
    // replace로 페이지 이동 / push로 페이지 이동
    navigate: (fragment, replace = true) => {
      if (replace) {
        // 이동할 경로 저장
        const href = window.location.href.replace(
          window.location.hash,
          "#" + fragment
        );
        // 페이지 이동
        window.location.replace(href);
      } else {
        window.location.hash = fragment;
      }
    },
  };
  return router;
}
