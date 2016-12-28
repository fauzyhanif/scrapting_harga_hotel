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
	request('https://www.tiket.com/hotel', function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    
	    var $ = cheerio.load(html);
	    
	    var nama = $('.detail-hotel a strong').map(function() {
		    var judul = $(this).html(); 
			return judul;
		}); 

		var harga = $('.harga-hotel .duit').map(function() {
		    var judul = $(this).html(); 
			return judul;
		}); 



		for (var i = 0; i <= nama.length-1 ; i++) {	
	    	connection.query('INSERT INTO `hotel`( `nama_hotel`, `harga`) VALUES ("'+nama[i]+'", "'+harga[i]+'")', function(err, res) {
			  if (err) throw err;
			  	console.log('Last insert ID:', res.insertId);
			});
		}


	  }
	});
}


scrapt();