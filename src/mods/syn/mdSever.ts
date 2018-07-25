/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows

 * UseTo: 
 * Author: lijj
 * Remark: 
 *  
 */

import * as Express from "express"
import * as Path from "path"
import * as ExpressCore from "express-serve-static-core"

import { MdBase } from "../mdBase"
import { CommandLike } from "../../lib/node/commandGetter"
import elucidator from "../../lib/js/elucidator"

const logger = new elucidator("mdSever");
const mainName = "-sev"
const subPat = "--path"

export class mdSever extends MdBase {

    static mainName = mainName

    constructor(command: CommandLike) {
        super(command);
    }

    private severPath: string = ""
    private app: ExpressCore.Express = null

    public async run() {
        if (this.command.getSub(subPat)) {
            this.severPath = Path.normalize(this.command.getSub(subPat).argv);
        }
        else {
            this.severPath = process.cwd();
        }
        this.initSever();
    }

    public initSever() {
        this.app = Express();
        this.app.use(Express.static(this.severPath));
        let sever = this.app.listen(6868, function () {
            logger.log(`Sever start at http://${sever.address().address}${sever.address().port}`);
        })
    }
}