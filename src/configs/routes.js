import path from 'path';
import requireAll from 'require-all';
import map from 'lodash/map';

const pathRouters = requireAll(
  path.join(__dirname, '../routes'),
);

export default (app) => {
  map(pathRouters, (router) => {
    app.use(router.routes());
  })
};
