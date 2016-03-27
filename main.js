(function ( global ) {
    'use strict';

    /**
     * Test distribution and bias of randomizer engine.
     *
     * @param {Function} engine randomizer
     * @param {number} digits amount of random digits for test
     * @param {Function} stdout output engine
     */
    function testRandoms ( engine, digits, stdout ) {
        var randomsMatrix = '0000000000'.split('').map(Number),
            output = '',
            eof = '\n',
            acc = 0,
            i = digits,
            max,
            randomDigit,
            truncRandomDigit;

        while ( i-- ) {
            randomDigit = engine();
            truncRandomDigit = ~~(randomDigit * 10);
            randomsMatrix[truncRandomDigit] += 1;
            acc += randomDigit;
        }

        max = Math.max.apply(null, randomsMatrix);

        while ( max ) {
            for ( i = 0; i < 10; i += 1) {
                output += (randomsMatrix[i] < max ? ' ' : '*');
            }
            max -= 1;
            output += eof;
        }

        output += 'Average: ' + acc / digits + eof;

        stdout(output);
    }

    if ( typeof define === 'function' && define.amd ) {
        define(function () {
            return testRandoms;
        });
    } else if ( typeof module !== 'undefined' && typeof require === 'function' ) {
        module.exports = testRandoms;
    } else {
        global.testRandoms = testRandoms;
    }
}( window ));