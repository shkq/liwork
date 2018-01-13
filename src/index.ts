import processCenter from './processCenter'
import processInteraction from './processInteraction'

// 初始化处理模块
const center = new processCenter();
// 初始化交互器
const interaction = new processInteraction(center);
// 注册处理模块
