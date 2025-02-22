import { Log } from "../modules/Log";
class FPCore {
  private _logModule = new Log();

  public get log() {
    return this._logModule;
  }
}

export const fpcore = new FPCore();
