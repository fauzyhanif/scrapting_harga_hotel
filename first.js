var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'scrapting'
});


function scrapt(page){
	request('http://www.goal.com/id-ID', function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    
	    var $ = cheerio.load(html);
	    
	    var berita = $('.column .module module-topstories .story h3 a').map(function() {
		    var judul = $(this).html(); 
			return judul;
		}); 

		var tgl_post = $('.column .module module-topstories .story h4 a').map(function() {
		    var tgl = $(this).html();
		    return tgl;
		});

		for (var i = 0; i <= berita.length-1 ; i++) {	
	    	connection.query('INSERT INTO `latihan_2`( `judul`, `tgl_post`) VALUES ("'+berita[i]+'","'+tgl_post[i]+'")', function(err, res) {
			  if (err) throw err;
			  	console.log('Last insert ID:', res.insertId);
			});
		}


	  }
	});
}


scrapt();