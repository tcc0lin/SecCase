import { fpcore } from "../core/FPCore";

function main() {
  Interceptor.attach(Module.getExportByName(null, "open"), {
    onEnter(args) {
      const path = args[0].readUtf8String();
      fpcore.log.logToConsole(`open() path6="${path}"`);
    },
  });
}

setImmediate(main);
