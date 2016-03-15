var express = require('express');
var express = express();
express.listen(3000);
console.log('Server is listening to port 3000.');
var service = require('./service');
var bodyParser = require('body-parser');

express.use(bodyParser.json());
express.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin",  "http://localhost:5000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
 });

// express.all('*', function(req, res, next) {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  // res.set('Access-Control-Allow-Credentials', true);
  // res.set('Access-Control-Allow-Methods', 'POST');
  // res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  // if ('OPTIONS' == req.method) return res.send(200);
  // next();
// });

express.get('/product', service.getAllProductList);
express.get('/product/:id', service.getProductById);
express.post('/product', service.addProduct);
express.put('/product/:id', service.updateProduct);
express.delete('/product/:id', service.deleteProduct);

express.get('/productsales', service.getAllProductSales);
express.get('/productsales/:productId', service.getSalesByProductId);
express.post('/productsales', service.addProductSales);

express.get('/productexpense', service.getAllProductExpenses);
express.get('/productexpense/:productId', service.getExpenseByProductId);
express.post('/productexpense', service.addProductExpense);

express.get('/producthistory', service.getAllProductHistory);
express.get('/producthistory/:productId', service.getHistoryByProductId);
express.post('/producthistory', service.addProductHistory);