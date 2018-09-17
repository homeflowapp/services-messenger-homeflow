'use strict';
import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import del from 'del'
import cleanCSS from 'gulp-clean-css'
import server from 'gulp-server-livereload';
import sassVariables from 'gulp-sass-variables';

const paths = {
	dest: 'build',
	src: '.src',
	packages: {
		src: './*.json'
	},
	html: {
		src: '.src/**/*.html',
		dest: 'build/.src',
		watch: '.src/**/*.html',
	},
	styles: {
		src: '.src/assets/scss/style.scss',
		dest: 'build/.src/assets/css',
		watch: '.src/assets/scss/**/*.scss',
	},
	scripts: {
		src: '.src/**/*.js',
		dest: 'build/.src',
		watch: '.src/**/*.js',
	},
	mp3: {
		src: '.src/**/*.mp3',
		dest: 'build/.src',
	},
	webfonts: {
		src: '.src/assets/webfonts/**/*.ttf',
		dest: 'build/.src/assets/webfonts'
	},
	webfontswoff: {
		src: '.src/assets/webfonts/**/*.woff2',
		dest: 'build/.src/assets/webfonts'
	},
	img: {
		src: '.src/**/*.png',
		dest: 'build/.src',
		watch: '.src/**/*.png',
	}
};

export const clean = () => del(['build/.src/assets/css']);

export function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sassVariables({
			$env: process.env.NODE_ENV === 'development' ? 'development' : 'production',
		}))
		.pipe(sass({
			includePaths: [
				'./node_modules',
				'../node_modules',
			],
		}).on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.styles.dest))
}


export function scripts() {
	return gulp.src(paths.scripts.src, {sourcemaps: false})
		.pipe(babel())
		.pipe(gulp.dest(paths.scripts.dest))
}

export function mp3() {
	return gulp.src(paths.mp3.src, {sourcemaps: false})
		.pipe(gulp.dest(paths.mp3.dest))
}

export function webfonts() {
	return gulp.src(paths.webfonts.src, {sourcemaps: false})
		.pipe(gulp.dest(paths.webfonts.dest))
}

export function webfontswoff() {
	return gulp.src(paths.webfontswoff.src, {sourcemaps: false})
		.pipe(gulp.dest(paths.webfontswoff.dest))
}

export function img() {
	return gulp.src(paths.img.src, {sourcemaps: false})
		.pipe(gulp.dest(paths.img.dest))
}

export function html() {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest))
}

export function mvpackage() {
	return gulp.src(['./package.json'])
		.pipe(gulp.dest(paths.dest))
}

export function version() {
	return gulp.src(paths.version.src)
		.pipe(gulp.dest(paths.version.dest))
}

export function src() {
	return gulp.src(
		[
			`${paths.src}/*`,
			`${paths.src}/*/**`,
			`!${paths.scripts.watch}`,
			`!${paths.src}/assets/scss/**`,
		], {since: gulp.lastRun(src)})
		.pipe(gulp.dest(paths.dest))
}

export function watch() {
	gulp.watch(paths.scripts.watch, scripts);
	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.html.watch, html);
	gulp.watch(paths.img.watch, html);
	gulp.watch(paths.packages.src, mvpackage);
}

export function webserver() {
	gulp.src([
		paths.dest,
	])
		.pipe(server({
			livereload: true,
			port: 8000
		}));
}

const build = gulp.series(clean, gulp.parallel(mvpackage), gulp.parallel(html, webfonts, webfontswoff, img, styles, scripts, mp3));
export {build}

const dev = gulp.series(build, gulp.parallel(webserver, watch));
export {dev}