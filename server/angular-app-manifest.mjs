
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://haneenakram.github.io/todo-angular/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/todo-angular/tasks",
    "route": "/todo-angular"
  },
  {
    "renderMode": 2,
    "route": "/todo-angular/tasks"
  },
  {
    "renderMode": 2,
    "route": "/todo-angular/auth/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/todo-angular/tasks",
    "route": "/todo-angular/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5145, hash: '938a4e4b1d51883225481f623aa659d1cf96e1271f012124e111a01bc66755e9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1051, hash: '35b9ffd01dfdd22d624fc4e3f158097033541b12815dff34bf4a03cb88a02131', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 16344, hash: '22de6716ccb270d1db068e2a8f35f23e08329d3c039c7ad57e6f155ad5e9db16', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'tasks/index.html': {size: 16344, hash: '22de6716ccb270d1db068e2a8f35f23e08329d3c039c7ad57e6f155ad5e9db16', text: () => import('./assets-chunks/tasks_index_html.mjs').then(m => m.default)},
    'styles-ROTSJRP7.css': {size: 4766, hash: 'mUJnBfsM7M8', text: () => import('./assets-chunks/styles-ROTSJRP7_css.mjs').then(m => m.default)}
  },
};
