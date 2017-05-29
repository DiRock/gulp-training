// import das dependências
var gulp = require("gulp"),
	imagemin = require("gulp-imagemin"),
	clean = require("gulp-clean");

// copia os arquivos da fonte para distribuição
gulp.task("copy", ["clean"], function(){
	gulp.src("src/**/*")
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