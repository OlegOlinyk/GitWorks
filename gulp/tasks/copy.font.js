'use strict';

module.exports = function() {
    $.gulp.task('copy:font', function() {
        return $.gulp.src('./source/font/**/*.*', { since: $.gulp.lastRun('copy:font') })
            .pipe($.gulp.dest($.config.root + '/assets/font'));
    });
};
