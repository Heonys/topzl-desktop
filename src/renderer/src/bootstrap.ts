import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";
import { setupPlayer } from "@shared/plugin/setup";
import { syncWithIndexedDB, setupAtomEffect } from "@/core/indexedDB";
import { setupDownloader, setupWatcher } from "@/core/worker";
import { defaultShortcut } from "@/core/shortcut";
import { dropHandler } from "@/core/dragdrop";

async function bootstrap() {
  await Promise.allSettled([
    setupRendererConfig(), // 사용자 설정 동기화
    setupPlayer(), // Player 이벤트 발생시 Atom에 반영하는 EventEmitter 등록
    syncWithIndexedDB(), // IndexedDB 데이터 Atom과 동기화
    setupI18n(), // 다국어 처리를 위한 초기화
  ]);
  setupWatcher(); // 폴더 상태 변경을 모니터링하는 워커 스레드 설정
  setupDownloader(); // 다운로드 경로 및 동시 다운로드 제한 설정
  setupAtomEffect(); // 로컬 스토리지 데이터 Atom과 동기화
  defaultShortcut(); // 어플리케이션 기본 단축키 설정
  dropHandler(); // 로컬 파일을 끌어다 놓을 수 있는 핸들러 추가

  // 숏컷 등록 핸들러? , 그외의 이벤트 핸들러

  window.notification.error((message) => {
    console.error(message);
  });
}

export default bootstrap;
