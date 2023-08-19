function hook_dlopen(soName = '') {
    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"),
        {
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr !== undefined && pathptr != null) {
                    var path = ptr(pathptr).readCString();
                    if (path.indexOf(soName) >= 0) {
                        this.is_can_hook = true;
                    }
                }
            },
            onLeave: function (retval) {
                if (this.is_can_hook) {
                    hook_JNI_OnLoad()
                }
            }
        }
    );
}
 
function hook_JNI_OnLoad(){
    let module = Process.findModuleByName("libJDMobileSec.so")
    Interceptor.attach(module.base.add(0x56BC + 1), {
        onEnter(args){
            console.log("call JNI_OnLoad")
            // hook_pthread_create()
            bypass()
            replace_str()
        }
    })
}

function hook_pthread_create(){
    var base = Process.findModuleByName("libJDMobileSec.so").base
    console.log("libJDMobileSec.so --- " + base)
    Interceptor.attach(Module.findExportByName("libc.so", "pthread_create"),{
        onEnter(args){
            let func_addr = args[2]
            console.log("The thread function address is " + func_addr + " offset:" + (func_addr-base).toString(16))
        }
    })
}

function nop(addr) {
    Memory.patchCode(ptr(addr), 4, code => {
        const cw = new ThumbWriter(code, { pc: ptr(addr) });
        cw.putNop();
        cw.putNop();
        cw.flush();
    });
}
 
function bypass(){
    let module = Process.findModuleByName("libJDMobileSec.so")
    nop(module.base.add(0x688A))
    nop(module.base.add(0x623A))
    nop(module.base.add(0x634A))
}

function replace_str() {
    var pt_strstr = Module.findExportByName("libc.so", 'strstr');
 
    Interceptor.attach(pt_strstr, {
        onEnter: function (args) {
            var str1 = args[0].readCString();
            var str2 = args[1].readCString();
            console.log("strstr-->", str1, str2);
            console.log('strstr called from:\\n' + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\\n') + '\\n');
            // console.log('strstr called from:\\n' + Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\\n') + '\\n');
        }
    }); 
}

setImmediate(hook_dlopen,"libJDMobileSec.so")

// frida -U -f com.jingdong.app.mall --no-pause -l libJDMobileSec.js
