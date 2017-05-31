// import das dependências
var gulp = require("gulp"),
	imagemin = require("gulp-imagemin"),
	clean = require("gulp-clean"),
	usemin = require("gulp-usemin"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	browserSync = require("browser-sync"),
	jshint = require("gulp-jshint"),
	csslint = require("gulp-csslint");

// copia os arquivos da fonte para distribuição
gulp.task("copy", ["clean"], function(){
	return gulp.src("src/**/*")
		.pipe(gulp.dest("dist"));
});

// remove o diretório dist
gulp.task("clean", function(){
	return gulp.src("dist")
		.pipe(clean());
});

// criação de uma tarefa
gulp.task("minify-img", function(){

	// seleciona os arquivos
	gulp.src("src/img/**/*")
		// realiza a minificação das imagens
		.pipe(imagemin())
		// salva os arquivos minificados na pasta apontada
		.pipe(gulp.dest("src/img"));
});

// concatenação e minificação de arquivos
gulp.task("usemin", function(){
	gulp.src("dist/**/*.html")
	.pipe(usemin({
		"js": [uglify],
		"css": [cssmin]
	}))
	.pipe(gulp.dest("dist"));
});

// comando padrão
gulp.task("default", ["copy"], function(){
	gulp.start(["usemin", "minify-img"]);
});

// atualização automática no navegador
gulp.task("server", function(){
	browserSync.init({
		server:{
			baseDir: "src"

		}
	})

	gulp.watch("src/js/**/*.js").on("change", function(event){
		gulp.src(event.path)
		.pipe(jshint())
		.pipe(jshint.reporter());
	});

	gulp.watch("src/css/**/*.css").on("change", function(event){
		gulp.src(event.path)
		.pipe(csslint())
		.pipe(csslint.reporter());
	});

	gulp.watch("src/**/*").on("change", browserSync.reload);
});

