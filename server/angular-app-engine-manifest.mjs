
export default {
  basePath: 'https://haneenakram.github.io/todo-angular',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
