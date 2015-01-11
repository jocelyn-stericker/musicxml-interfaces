{
    "targets": [
        {
            "target_name": "mxmltojson",
            "sources": [ "main.cpp" ],
            "libraries": [
                "../../dlang/libmusicxml-interfaces.a",
                "-L../../dlang/.env/dmd2/osx/lib/",
                "../../dlang/jsonify/libripieno-musicxml-jsonify.a",
                "-lphobos2",
                "-lxslt",
                "-lxml2",
                "-lz",
                "-lpthread",
                "-lm"
            ]
        }
    ]
}
