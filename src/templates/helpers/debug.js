module.exports.register = function (Handlebars, options)  {
  Handlebars.registerHelper('debug', function (str)  {
    console.log('########################################');
	console.log(str);
    console.log('########################################');
    if(typeof str == 'object' || typeof str == 'array') {
		return JSON.stringify(str, null, 4);
    }
    return str;
  });
};