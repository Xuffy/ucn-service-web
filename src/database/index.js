import language from '../language/index';
import workbench from './workbench/index';
import product from './product/index';
import logistic from './logistic';

import order from './order/index';
import supplier from './supplier/index';
import setting from './setting/index';
import common from './common/index';
import message from './message/index';
import payment from './payment/index';
import logs from './logs/index';

import warehouse from './warehouse/index'

import {database} from 'ucn-tool/src/index';

const db = {
  common,
  workbench,
  product,
  logistic,
  order,
  supplier,
  setting,
  message,
  payment,
  logs,
  warehouse
  // inbound,
};
export default database(_, language, db);
