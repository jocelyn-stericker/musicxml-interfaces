#include <node.h>
#include <nan.h>
#include <v8.h>
#include <cstring>

#include "../dlang/musicxml-interfaces.h"

using namespace v8;

NAN_METHOD(ParseXML) {
    NanScope();

    NanUtf8String source(args[0]->ToString());
    const char* buffer = musicxml_xmlToJson(*source, strlen(*source));
    Local<String> local = NanNew<String>(buffer);
    musicxml_freeString(buffer);
    NanReturnValue(local);
}

void init(Handle<Object> exports) {
    musicxml_init();
    exports->Set(NanNew<String>("xmlToJSON"),
        NanNew<FunctionTemplate>(ParseXML)->GetFunction());
}

NODE_MODULE(mxmltojson, init)
