export async function setupRendererConfig() {
  window.appConfig.syncAppConfig((config) => {
    console.log("Changed App Config ::", config);
  });
  const config = await window.appConfig.getAppConfig();
  /* 전역 상태관리 추가 */
  console.log(config);
}
