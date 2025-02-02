<p align='center'>
  <img src='./.imgs/logo.png' width='100'/>
</p>


<p align="center">
    <a href="https://github.com/Heonys/topzl-desktop/releases">
        <img src="https://img.shields.io/github/v/release/Heonys/topzl-desktop?style=flat-square" />
    </a>
</p>

## 🚀 Introduction

**Topzl**은 광고 없는 무료 음악 스트리밍을 위한 데스크탑 어플리케이션 입니다. 최신 `Electron` 버전과 `electron-vite`를 기반으로 `React` 환경과 통합하여 개발 되었습니다. 크로스 플랫폼 지원을 통한 호환성과 아름다운 인터페이스 및 다양한 기능을 제공하는 것을 목표로 합니다.

소프트웨어 다운로드는 저장소의 [Releases](https://github.com/Heonys/topzl-desktop/releases) 페이지에서 확인할 수 있습니다. 현재는 `Windows` 환경에서만 안정적으로 동작하기에 `Windows` 전용으로 제공됩니다.

> **notice**: Electron은 크로스 플랫폼을 지원하므로 macOS에서 잘 동작할 것으로 예상되지만, macOS에서는 테스트가 진행되지 않았고, 메뉴와 트레이 기능 등에서 일부 차이가 있을 수 있습니다


## ⚠️**Important**
이 프로젝트는 [猫头猫/MusicFreePlugins](https://gitee.com/maotoumao/MusicFreePlugins) 저장소의 `audiomack` 플러그인을 사용하여 음원의 재생 URL을 가져옵니다. 내부적으로는 [audiomack api](https://audiomack.com/data-api/docs)를 사용하지만 유료 컨텐츠는 필터링되어 있습니다. 이 플러그인은 학습 및 참고 용도로만 제공되며, 상업적 용도로 사용하지 않아야 하고, 반드시 합법적으로 사용해야 한다고 정의되어 있습니다.

`Topzl`역시 동일한 목적으로 개발된 프로젝트 입니다. 프로젝트 사용 과정에서 저작권이 있는 데이터가 생성될 수 있으므로 이에 대한 주의가 필요합니다. 또한, 현재 개인용 및 학습용으로만 사용을 권장하며, 코드 사이닝 없이 배포되고 있기에 설치시 운영 체제에서 경고 메시지가 표시될 수 있습니다.


## ✨ Features
- 음악, 앨범, 아티스트, 플레이리스트 검색
- HLS 기반의 자체 스트리밍,
- 워커 스레드를 사용한 로컬 음악 파일 모니터링 및 동기화
- 음원 다운로드
- 가사 지원 (웹 크롤링 기반으로 정확도가 불안정할 수 있음)
- 로그인 불필요 (AppData에 사용자 데이터 저장)
- PIP 모드 지원


## 📖 Todos
- 설정 페이지는 현재 퍼블리싱만 되어 있으며, 동작하지 않습니다.
- 재생 설정, 다운로드 설정, 단축키 지정, 저장 관리 등 다양한 설정이 추가예정 입니다.
- 현재 윈도우 크기가 고정되어 있으며, 이후 조정될 예정입니다.

