'use strict';

module.exports = function() {
    $.gulp.task('sprite-generate:png', function() {
        var spriteData = $.gulp.src('./source/images/sprite/*.png')
            .pipe($.gp.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
                padding: 20
        }));
        return spriteData.pipe($.gulp.dest('./source/images/sprite/'));
    });
        $.gulp.task('copy:sprite-img', function() {
            return $.gulp.src('./source/images/sprite/sprite.png', { since: $.gulp.lastRun('copy:sprite-img') })
                .pipe($.gulp.dest('./source/images/'));
        });
       $.gulp.task('copy:sprite-scss', function() {
        return $.gulp.src('./source/images/sprite/sprite.scss', { since: $.gulp.lastRun('copy:sprite-scss') })
            .pipe($.gulp.dest('./source/style/'));
    });
     $.gulp.task('sprite:png', $.gulp.series(
         'sprite-generate:png',
         'copy:sprite-img',
        'copy:sprite-scss'
  ));
};