var dtsBundle           = require("dts-bundle");
var eventStream         = require("event-stream");
var gulp                = require("gulp");
var path                = require("path");
var typescript          = require("gulp-typescript");

var dirs = {
    build:              path.join(__dirname, "typescript", "dist"),
    partial:            path.join(__dirname, "typescript", "partial"),
    typings:            path.join(__dirname, "typescript", "typings")
};

var files = {
    ts:                 path.join(__dirname, "typescript", "src", "*.ts"),
    typings:            path.join(dirs.typings, "typescript", "**", "*.d.ts")
};

var project = typescript.createProject({
    removeComments:     true,
    noImplicitAny:      true,
    target:             'ES5',
    module:             'commonjs',
    noExternalResolve:  false,
    declarationFiles:   true
});

gulp.task("buildTS", function() {
    var tsResult = gulp.src([files.ts, files.typings])
        .pipe(typescript(project));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest(dirs.partial)),
        tsResult.js.pipe(gulp.dest(dirs.build))
    );
});

gulp.task("bundleDTS", ["buildTS"], function() {
    return dtsBundle.bundle({
        name: "musicxml-interfaces",
        main: "typescript/partial/musicXML_DOM.d.ts",
        baseDir: "typescript",
        out: "dist/musicxml-interfaces.d.ts"
    });
});

gulp.task("build", ["buildTS", "bundleDTS"], function() {
});
