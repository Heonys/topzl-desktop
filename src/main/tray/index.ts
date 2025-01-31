import { Menu, nativeImage, Tray } from "electron";
import { ipcMainOn, ipcMainSendMainWindow } from "@/ipc/main";
import { showMainWindow } from "@/window/mainWindow";
import { getResourcePath } from "@/utils/path";

let tray: Tray;

if (process.platform === "darwin") {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      //
    ]),
  );
} else {
  // 기존 메뉴에 존재하던 숏컷까지 지워짐
  // Menu.setApplicationMenu(null);
}

export function setupTray() {
  tray = new Tray(
    nativeImage.createFromPath(getResourcePath("logo.png")).resize({
      width: 32,
      height: 32,
    }),
  );

  setupTrayMenu();

  if (process.platform === "linux") {
    tray.on("click", () => showMainWindow());
  } else {
    tray.on("double-click", () => showMainWindow());
  }

  tray.setToolTip("Topzl");
  ipcMainOn("current-track", (track) => {
    if (track) {
      tray.setToolTip(`${track.artist} - ${track.title}`);
    } else {
      tray.setToolTip("Topzl");
    }
  });

  ipcMainOn("proxy-command", (command) => {
    sendTrayCommand(command);
  });
}

function setupTrayMenu() {
  if (!tray) return;

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "재생 및 정지",
        click: () => sendTrayCommand("TogglePlayAndPause"),
      },
      {
        label: "이전 트랙",
        click: () => sendTrayCommand("Skip-Previous"),
      },
      {
        label: "다음 트랙",
        click: () => sendTrayCommand("Skip-Next"),
      },
      {
        label: "반복모드 선택",
        type: "submenu",
        submenu: [
          {
            label: "반복 없음",
            type: "radio",
            checked: true,
            click: () => sendTrayCommand("Repeat-None"),
          },
          {
            label: "전체 반복",
            type: "radio",
            click: () => sendTrayCommand("Repeat-Queue"),
          },
          {
            label: "한곡 반복",
            type: "radio",
            click: () => sendTrayCommand("Repeat-Loop"),
          },
        ],
      },
      {
        label: "셔플모드 활성화",
        type: "checkbox",
        checked: false,
        click: ({ checked }) => sendTrayCommand(checked ? "Shuffle-On" : "Shuffle-Off"),
      },
      {
        type: "separator",
      },
      {
        label: "설정",
        click: () => navigateTo("/setting"),
      },
      {
        label: "도움말",
        click: () => navigateTo("/guideline"),
      },
      {
        label: "종료",
        role: "quit",
      },
    ]),
  );
}

function sendTrayCommand(command: Command) {
  ipcMainSendMainWindow("tray-command", command);
}

function navigateTo(route: string) {
  showMainWindow();
  ipcMainSendMainWindow("change-route", route);
}
