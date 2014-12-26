var bodyparser          = require("body-parser");
var browserify          = require("browserify");
var express             = require("express");
var fs                  = require("fs");
var gulp                = require("gulp");
var gutil               = require("gulp-util");
var path                = require("path");
var source              = require("vinyl-source-stream");
var streamify           = require("gulp-streamify");
var typescript          = require("gulp-typescript");
var uglify              = require("gulp-uglify");
var watchify            = require("watchify");

var packageJSON         = require("./package.json");

var browserifyOpts = {
    debug: {
        debug:          false,
        cache:          {},
        packageCache:   {},
        fullPaths:      true
    }
};

var dirs = {
    build:              path.join(__dirname, ".partialBuild"),
    typings:            path.join(__dirname, "references")
};

var files = {
    ts:                 path.join(__dirname, "src", "**", "*.ts"),
    typings:            path.join(dirs.typings, "*.d.ts"),
    allSrc:             path.join(__dirname, "src", "**", "*.{js,json,ts}"),
    mainWebapp:         "./.partialBuild/main.js"
};

gulp.task("watch", ["watch-prebuild"], function() {
    var app = express();
    app.use(express.static("static"));
    app.use(bodyparser.json({limit: '50mb'}));
    app.get("/spec", function(req, res) {
        fs.readFile("../musicXML.json", "utf8", function(err, data) {
            res.setHeader("Content-Type", "application/json");
            res.send(data);
        });
    });
    app.post("/spec", function(req, res) {
        fs.writeFile("../musicXML.json", JSON.stringify(req.body, null, 2), function(err, data) {
            res.setHeader("Content-Type", "application/json");
            res.send({ok: !err});
        });
    });
    app.listen(4000);

    gulp.watch(files.allSrc, ["typescript"]);
});

gulp.task("watch-prebuild", ["typescript"], function() {
    watch(files.mainWebapp, "browser-bundle.js");
});

function watch(main, output) {
    var webappBundler       = watchify(browserify(browserifyOpts.debug))
                                .add(main);

    webappBundler.on("error", gutil.log.bind(gutil, "Browserify Error"))
        .on("update", function () {
            var before      = new Date;
            bundlerShare(webappBundler);
            var after       = new Date;
            console.log("Rebundled in " + (after - before) + "msec...");
        });

    bundlerShare(webappBundler);

    function bundlerShare(bundler) {
        bundler
            .bundle()
            .pipe(source(output))
            .pipe(gulp.dest("./static/build"));
    }
}


var sharedTypescriptProject = typescript.createProject({
    removeComments:     true,
    noImplicitAny:      true,
    target:             'ES5',
    module:             'commonjs',
    noExternalResolve:  false
});

gulp.task("typescript", function() {
    var ts = gulp.src([files.ts, files.typings])
        .pipe(typescript(sharedTypescriptProject)).js
        .pipe(gulp.dest(dirs.build));

    return ts;
});

gulp.task("build", ["typescript"], function() {
    return browserify("./.partialBuild/main.js", browserifyOpts.prod).bundle()
        .on("error", gutil.log.bind(gutil, "Browserify Error"))
        .on("end", gutil.log.bind(gutil, "Built release bundle"))
        .pipe(source("browser-bundle.js"))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest("./build"));
});
