// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  config: {
    "API_URL": "http://localhost:8000",
    "VAPID_PUBLIC_KEY": "BHe82datFpiOOT0k3D4pieGt1GU-xx8brPjBj0b22gvmwl-HLD1vBOP1AxlDKtwYUQiS9S-SDVGYe_TdZrYJLw8"
  },
  // Firebase configuration
  firebaseConfig: {
    apiKey: "AIzaSyBuw6t9X5ng_r1b_Bor-H8VbCBQodh87Nc",
    authDomain: "cafe-project-769a2.firebaseapp.com",
    databaseURL: "https://cafe-project-769a2.firebaseio.com",
    projectId: "cafe-project-769a2",
    storageBucket: "",
    messagingSenderId: "319050038110"
  }
};
