import type { ForgeConfig } from "@electron-forge/shared-types";
import path from "node:path";

const config: ForgeConfig = {
  packagerConfig: {
    appBundleId: "com.heonys.topzl", // appId
    extraResource: [path.resolve(__dirname, "resources")], // extraResources
    icon: path.resolve(__dirname, "resources", "logo.png"), // icon
    ignore: [
      /^\/(src)|(tools)|(.github)|(.vscode)/,
      /\/(.eslintrc.json)|(.gitignore)|(.gitattributes)|(electron.vite.config.ts)|(forge.config.ts)|(tsconfig.json)|(bindl.config.js)|(bindl.config.js)|(README.md)$/,
    ],
  },
  rebuildConfig: {},
  // makers: [],
};

export default config;
