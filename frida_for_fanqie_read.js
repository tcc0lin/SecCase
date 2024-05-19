function printStack() {
    Java.perform(function () {
        var Exception = Java.use("java.lang.Exception");
        var ins = Exception.$new("Exception");
        var straces = ins.getStackTrace();
        if (straces != undefined && straces != null) {
            var strace = straces.toString();
            var replaceStr = strace.replace(/,/g, "\r\n");
            console.log("=============================Stack strat=======================");
            console.log(replaceStr);
            console.log("=============================Stack end=======================\r\n");
            Exception.$dispose();
        }
    });
}

function main() {
    Java.perform(function () {
        Java.openClassFile("/data/local/tmp/r0gson.dex").load();
        const gson = Java.use('com.r0ysue.gson.Gson');
        // 1. 跳过广告直接下载
        var cls1 = Java.use('com.dragon.read.component.NsAdDependImpl');
        cls1.readerIsFreeDownload.implementation = function(){
            var result = this.readerIsFreeDownload.apply(this, arguments);
            result = true;
            return result;
        }
        var cls2 = Java.use('com.dragon.reader.lib.support.b');
        cls2.a.overload('com.dragon.reader.lib.task.info.b', 'com.dragon.reader.lib.support.a.h', 'java.lang.String', 'com.dragon.reader.lib.model.e', 'boolean', 'com.dragon.reader.lib.parserlevel.model.frame.b', 'com.dragon.reader.lib.support.c.b').implementation = function(){
            console.log("a: " + gson.$new().toJson(arguments[0]));
            this.a.apply(this, arguments);
        }
    });
}
setImmediate(main);
