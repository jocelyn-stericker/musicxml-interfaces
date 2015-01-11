#include <node.h>
#include <v8.h>
#include <cstring>

#include "../dlang/musicxml-interfaces.h"

using namespace v8;

Handle<Value> Method(const Arguments& args) {
    HandleScope scope;
    String::Utf8Value source(args[0]->ToString());
    const char* buffer = musicxml_xmlToJson(*source, strlen(*source));
    Local<v8::String> local = scope.Close(String::New(buffer));
    musicxml_freeString(buffer);
    return local;
}

void init(Handle<Object> exports) {
    musicxml_init();
    exports->Set(String::NewSymbol("parseXML"),
        FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(mxmltojson, init)
