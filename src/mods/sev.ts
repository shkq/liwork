/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows

 * UseTo: 
 * Author: lijj
 * Remark: 
 *  
 */

import * as Express from "express";
import * as Path from "path";
import * as ExpressCore from "express-serve-static-core";

import ModeBase from "../lib/ModeBase";
import logger from "../lib/Logger";

export default class extends ModeBase {

    private severPath: string = "";
    private app: ExpressCore.Express = null

    protected async onLoad() {
        this.severPath = process.cwd();
    }

    protected async path(argv: string[]) {
        this.severPath = Path.normalize(argv[0]);
    }

    protected async onMain() {
        this.app = Express();
        this.app.use(Express.static(this.severPath));
        let sever = this.app.listen(6868, function () {
            logger.log(`Sever start at http://${sever.address().address}${sever.address().port}`);
        })
    }
}