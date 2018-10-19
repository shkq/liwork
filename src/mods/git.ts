import ModeBase from "../lib/ModeBase";
import logger from "../lib/Logger";

export default class extends ModeBase {
    protected helpinfo =
        `-commit
提交本地仓库
    --ang
    按照 Angular 规范生成提交信息`;

    protected async commit_ang() {

    }

    protected async commit(argv: string[]) {

    }
}