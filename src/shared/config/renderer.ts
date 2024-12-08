export async function setupRendererConfig() {
  window.appConfig.syncAppConfig((config) => {
    console.log("syncAppConfig ::", config);
  });
  const config = await window.appConfig.getAppConfig();
  console.log(config);
}
