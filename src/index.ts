import processCenter from './processCenter'
import processInteraction from './processInteraction'
// mods
import mdSyn from './mods/syn/mdSynchronous'

// 初始化处理模块
const center = new processCenter();
// 注册处理模块
const syn = new mdSyn(center);
// 初始化交互器
const interaction = new processInteraction(center).load();
