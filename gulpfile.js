// import das dependências
var gulp = require("gulp"),
	imagemin = require("gulp-imagemin");

// criação de uma tarefa
gulp.task("minify-img", function(){

	// seleciona os arquivos
	gulp.src("src/img/**/*")
		// realiza a minificação das imagens
		.pipe(imagemin())
		// salva os arquivos minificados na pasta apontada
		.pipe(gulp.dest("src/img"));
});