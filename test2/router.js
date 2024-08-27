export default function createRouter() {
  const router = {
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
