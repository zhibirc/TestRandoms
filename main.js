/**
 * @file Module that provides randomizer engines quality tool.
 * @author Yaroslav Surilov
 */
(function ( global ) {
    'use strict';

    /**
     * Test distribution and bias of randomizer engine.
     *
     * @param {Function} engine randomizer
     * @param {number} digits amount of random digits for test
     * @param {Function} stdout output engine
     * @param {string} graphDirection output graphic orientation
     */
    function testRandoms ( engine, digits, stdout, graphDirection ) {
        var randomsMatrix = '0000000000'.split('').map(Number),
            output = '',
            eol = '\n',
            acc = 0,
            i = digits,
            max,
            randomDigit,
            truncRandomDigit;

        graphDirection = graphDirection || 'h';

        while ( i-- ) {
            randomDigit = engine();
            truncRandomDigit = ~~(randomDigit * 10);
            randomsMatrix[truncRandomDigit] += 1;
            acc += randomDigit;
        }

        max = Math.max.apply(null, randomsMatrix);

        if ( graphDirection === 'h' ) {
            for ( i = 0; i < 10; i += 1) {
                output += Array(randomsMatrix[i] + 1).join('\u25ac')+ eol;
            }
        } else {
            while ( max ) {
                for ( i = 0; i < 10; i += 1) {
                    output += (randomsMatrix[i] < max ? ' ' : '\u25ae');
                }
                max -= 1;
                output += eol;
            }
        }

        output += eol + 'Average: ' + acc / digits + eol;

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