var eventStream         = require("event-stream");
var gulp                = require("gulp");
var path                = require("path");
var typescript          = require("gulp-typescript");

var dirs = {
    build:              path.join(__dirname, "typescript", "release"),
    typings:            path.join(__dirname, "typescript", "typings")
};

console.log(dirs.build);

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

gulp.task("build", function() {
    var tsResult = gulp.src([files.ts, files.typings])
        .pipe(typescript(project));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest(dirs.build)),
        tsResult.js.pipe(gulp.dest(dirs.build))
    );
});
