module.exports.register = function (Handlebars, options)  {

    Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        op = options.hash.op || "==";

        var operators = {
            '==':       function(l,r) { return l == r; },
            '===':      function(l,r) { return l === r; },
            '!=':       function(l,r) { return l != r; },
            '<':        function(l,r) { return l < r; },
            '>':        function(l,r) { return l > r; },
            '<=':       function(l,r) { return l <= r; },
            '>=':       function(l,r) { return l >= r; },
            '%':        function(l,r) { return l%r == 0; },
            '%1':        function(l,r) { return l%r == 1; },
            'typeof':   function(l,r) { return typeof l == r; }
        };

        if (!operators[op]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + op);
        }

        var result = operators[op](lvalue, rvalue);

        if( result ) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });


    // Handlebars.registerHelper('compare', function(lvalue, operator, rvalue) {

    //     if (arguments.length < 3) {
    //         throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    //     }

    //     op = operator;

    //     var operators = {
    //         '==':       function(l,r) { return l == r; },
    //         '===':      function(l,r) { return l === r; },
    //         '!=':       function(l,r) { return l != r; },
    //         '<':        function(l,r) { return l < r; },
    //         '>':        function(l,r) { return l > r; },
    //         '<=':       function(l,r) { return l <= r; },
    //         '>=':       function(l,r) { return l >= r; },
    //         '%':        function(l,r) { return l%r == 0; },
    //         '%1':        function(l,r) { return l%r == 1; },
    //         'typeof':   function(l,r) { return typeof l == r; }
    //     };

    //     if (!operators[op]) {
    //         throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + op);
    //     }

    //     var result = operators[op](lvalue, rvalue);

    //     if( result ) {
    //         return options.fn(this);
    //     } else {
    //         return options.inverse(this);
    //     }

    // });

};
