import * as readline from 'readline'
import * as print from './lib/print'
import ProcessCenter from './processCenter'

export default class createProcessInteraction {
  constructor(center: ProcessCenter) {
    this.center = center;
  }

  load() {
    // 初始化
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    print.wri("liwork 已经启动");
    print.wri('请输入需要执行的命令,输入help获取帮助');
    rl.on('line', (line: string) => {
      this.center.accept(line);
    }).on('close', () => {
      this.center.accept(ProcessCenter.exit);
    });
  }

  private center: ProcessCenter = null
}