export function handleUrlScheme(url?: string) {
  if (!url) return;

  const urlObject = new URL(url);
  if (!urlObject.protocol.startsWith("topzl:")) return;

  /* hostname에 따른 분기처리 */
  console.log(urlObject.hostname);
}
