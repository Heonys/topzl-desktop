<p align='center'>
  <img src='./.imgs/logo.png' width='150'/>
</p>

<p align="center">
    <a href="https://github.com/Heonys/topzl-desktop/releases">
        <img src="https://img.shields.io/github/v/release/Heonys/topzl-desktop" />
    </a>
    <a href="https://github.com/Heonys/topzl-desktop/actions/workflows/release.yml">
        <img src="https://github.com/Heonys/topzl-desktop/actions/workflows/release.yml/badge.svg" />
    </a>
</p>

<div align="center">

![Main Page][main-screenshot]
</div>

## 🚀 Introduction

**Topzl**은 광고 없는 무료 음악 스트리밍을 위한 데스크탑 어플리케이션 입니다. 최신 `Electron` 버전과 `electron-vite`를 기반으로 UI는 `React` 환경과 통합하여 개발 되었습니다. 크로스 플랫폼 지원을 통한 호환성과 아름다운 인터페이스 및 다양한 기능을 제공하는 것을 목표로 합니다.

소프트웨어 다운로드는 저장소의 [Releases](https://github.com/Heonys/topzl-desktop/releases) 페이지에서 확인할 수 있습니다. 현재는 `Windows` 환경에서만 안정적으로 동작하기에 `Windows` 전용으로 제공됩니다.

> **notice**: 현재 릴리즈 버전은 `Windows` 만을 제공하지만 [클라이언트 패키징](#클라이언트-패키징)을 통해서 다른 플랫폼에서 직접 패키징이 가능합니다. 다만 이 경우 메뉴, 트레이 등 일부 기능에서 차이가 있을 수 있습니다.


## ⚠️**Important**
이 프로젝트는 [猫头猫/MusicFreePlugins](https://gitee.com/maotoumao/MusicFreePlugins) 저장소의 `audiomack` 플러그인을 사용하여 음원의 재생 URL을 가져옵니다. 내부적으로는 [audiomack api](https://audiomack.com/data-api/docs)를 사용하지만 유료 컨텐츠는 필터링되어 있습니다. 이 플러그인은 학습 및 참고 용도로만 제공되며, 상업적 용도로 사용하지 않아야 하고, 반드시 합법적으로 사용해야 한다고 정의되어 있습니다.

`Topzl`역시 동일한 목적으로 개발된 프로젝트 입니다. 프로젝트 사용 과정에서 저작권이 있는 데이터가 생성될 수 있으므로 이에 대한 주의가 필요합니다. 또한, 현재 개인용 및 학습용으로만 사용을 권장하며, 코드 사이닝 없이 배포되고 있기에 설치시 운영 체제에서 경고 메시지가 표시될 수 있습니다.


## ✨ Features
- 크로스 플랫폼 지원 (Windows, macOS, Linux)
- 음악, 앨범, 아티스트, 플레이리스트 검색
- HLS 기반의 자체 스트리밍
- 로컬 음악 재생 지원
- 음원 다운로드 지원
- 워커 스레드를 활용한 로컬 폴더 모니터링 및 동기화
- 가사 지원 (웹 크롤링 기반, 정확도 불안정)
- 로그인 없이 사용 가능 (스토리지 및 AppData에 사용자 데이터 저장)
- 다국어 지원 (한국어, 영어)
- 사용자 지정 단축키 지원 (In-App, Global)
- 세부 설정 지원 (일반, 재생, 다운로드, 가사, 백업 및 복원)
- PIP 모드 지원


## 🎉 Getting Started

- #### 개발 환경 셋업
```sh
# 저장소 클론
git clone https://github.com/Heonys/topzl-desktop.git

# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```
- #### 클라이언트 패키징
현재 릴리즈된 버전은 안정적인 `Windows`만 제공되지만 `macOS`와 `Linux`를 클라이언트에서 직접 패키징 할 수 있도록 설정되어 있습니다. 이를 통해 다른 운영체제 에서도 직접 패키징하여 실행이 가능합니다. `electron-builder.json` 파일 에서 빌드 옵션을 수정할 수 있습니다.

> **Note**: 자세한 빌드 설정은 [electron-builder](https://www.electron.build/) 문서 에서 확인 가능합니다.

```json
// electron-builder.json
"win": {
  "target": ["nsis", "zip"],
},
"mac": {
  "target": ["dmg"],
},
"linux": {
  "target": ["AppImage"],
},
```

```sh
yarn dist:{flatform} # [win, mac, linux]
```

## 🧩 Technical Detail

### (작성중)

<details>
  <summary style="font-size: 1.3em;">
    <strong>🔖 목차 (Table of contents)</strong>
  </summary>
</details>

- Electorn의 기본적인 프로세스간 통신 구조 및 동작 원리
- 워커 스레드 로컬 폴더 모니터링 (Comlink)
- 워커 스레드 다운로드 동기화 (웹스트림과 노드스트림 동기화 및 상태 추적)
- 가상 스크롤 (useVirtualScroll)
- 드래그앤 드랍 구현
- intersection obserber 사용 (설정 페이지)
- focus, blur 이벤트 핸들링 + tabIndex (퀵서치)
- 컨텍스트 메뉴 관리 (좌표계산)
- eventEmitter 사용
- 오디오맥 플러그인 사용
- HLS 사용
- 다국어 처리
- 단축키 등록 (인앱, 글로벌)
- 가사 크롤링 (genius-api)
- 로컬 데이터베이스 (스토리지, IndexDB)
- 메시지 채널 (다중 윈도우간 데이터 전달)


## 🖼️ Screenshot

<details>
<summary>스크린샷을 확인 하려면 펼쳐주세요</summary>

![Main][main-screenshot]
![Search][search-screenshot]
![Search Album][seach_album-screenshot]
![Detail][detail-screenshot]
![Libray][library-screenshot]
![Palylist][playlist-screenshot]
![Local][local-screenshot]
![Download][download-screenshot]
![Pipmode][pipmode-screenshot]
![Setting1][settings1-screenshot]

</details>



<!-- Markdown links and Images -->

[main-screenshot]: ./.imgs/main.png
[detail-screenshot]: ./.imgs/detail.png
[download-screenshot]: ./.imgs/download.png
[library-screenshot]: ./.imgs/library.png
[local-screenshot]: ./.imgs/local.png
[pipmode-screenshot]: ./.imgs/pipmode.png
[playlist-screenshot]: ./.imgs/playlist.png
[search-screenshot]: ./.imgs/search.png
[seach_album-screenshot]: ./.imgs/seach_album.png
[settings1-screenshot]: ./.imgs/settings1.png






