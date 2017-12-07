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
  firebaseConfig: {
    apiKey: "AIzaSyBkZwcHxN4MUmpO65iSE23YsAiYgVD7dzg",
    authDomain: "cafe-notes.firebaseapp.com",
    databaseURL: "https://cafe-notes.firebaseio.com",
    projectId: "cafe-notes",
    storageBucket: "cafe-notes.appspot.com",
    messagingSenderId: "279028961414"
  }
};
