const fs = require('fs');

listFiles(__dirname + '/files');

function listFiles(path) {

    fs.readdir(path, function(err, data) {
        if(err) {
            console.log(err);
            process.exit();
        }

        var log = path + ' contains ';          // log: string to be logged to the console listing the files.
        for (var file in data) {
            log = log + data[file] + ', ';
            nextDirectory(path, data[file]);    // this is where recursion takes place in this code.
        };
        log = log.substring(0, log.length-2);   // removes last two characters (', ') from log before logging it.
        console.log(log);                       // log file list.

        function nextDirectory(path, file) {

            fs.stat(path + '/' + file, function(err, stats) {

                if(err) {
                    console.log(err);
                    process.exit();
                }

                if (stats.isDirectory()) {
                    listFiles(path + '/' + file);
                };

            });

        }

    });

}
