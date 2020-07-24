import Koa from 'koa';
import setConfig from './src/configs';

const app = new Koa();

setConfig(app);
