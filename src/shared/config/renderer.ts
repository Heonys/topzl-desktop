export async function setupRendererConfig() {
  window.appConfig.syncAppConfig((config) => {
    console.log("render :: syncAppConfig ::", config);
  });
  const config = await window.appConfig.getAppConfig();
  console.log(config);
}
