var db = require('./database');

var getData = function(res){
	db.ProductList.find(function(err, data){
    if(err){
        res.send("Error while fetching data.", err);
    }
    res.json(data);
})};

var getProductById = function(req, res){
	var id = req.params.id;
	db.ProductList.findById({'_id': id}, function(err, data){
		if(err){
			res.send("Error while fetching data.");
		}
		res.json(data);
	})
};

var getAllProductList = function(req, res){
	getData(res);
};

var addProduct = function(req, res){
	var postProduct = new db.ProductList(req.body);
	postProduct.save(function(err){
		if(err){
			res.send("Error while saving data.", err);
		}
		getData(res);	
	});
}

 var updateProduct = function(req, res){
	 var id = req.params.id;
	 db.ProductList.findOneAndUpdate({'_id': id}, req.body , function(err){
		 if(err){
			res.send("Error while updating data.", err);
		 }
		 res.sendStatus(200);
	 });
 }

 var deleteProduct = function(req, res){
	 var id = req.params.id;
	 db.ProductList.remove({'_id': id}, function(err){
		 if(err){
			res.send("Error while deleting product.", err);
		 }
		 getData(res);
	 });
 }


exports.getAllProductList = getAllProductList;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;


var getSalesData = function(res){
	db.ProductSales.find(function(err, data){
		if(err){
			res.send("Error while fetching data.", err);
		}
		res.json(data);
	})
};

var getAllProductSales = function(req, res){
	getSalesData(res);
};


var addProductSales = function(req, res){
	var postProductSales = new db.ProductSales(req.body);
	postProductSales.save(function(err){
		if(err){
			res.send("Error while saving data.", err);
		}
		getSalesData(res);
	})
};

var getSalesByProductId = function(req, res){
	var id = req.params.productId;
	db.ProductSales.find({'productId': id}, function(err, data){
		if(err){
			res.send("Error while fetching data.");
		}
		res.json(data);
	})
};


exports.getAllProductSales = getAllProductSales;
exports.addProductSales = addProductSales;
exports.getSalesByProductId = getSalesByProductId;


var getExpenseData = function(res){
	db.ProductExpense.find(function(err, data){
		if(err){
			res.send("Error while fetching data.", err);
		}
		res.json(data);
	})
};

var getAllProductExpenses = function(req, res){
	getExpenseData(res);
};


var addProductExpense = function(req, res){
	var postProductExpense = new db.ProductExpense(req.body);
	postProductExpense.save(function(err){
		if(err){
			res.send("Error while saving data.", err);
		}
		getExpenseData(res);
	})
};

var getExpenseByProductId = function(req, res){
	var id = req.params.productId;
	db.ProductExpense.find({'productId': id}, function(err, data){
		if(err){
			res.send("Error while fetching data.");
		}
		res.json(data);
	})

};

exports.getAllProductExpenses = getAllProductExpenses;
exports.addProductExpense = addProductExpense;
exports.getExpenseByProductId = getExpenseByProductId;


var getHistoryData = function(res){
	db.ProductHistory.find(function(err, data){
		if(err){
			res.send("Error while fetching data.", err);
		}
		res.json(data);
	})
};

var getAllProductHistory = function(req, res){
	getHistoryData(res);
};

var addProductHistory = function(req, res){
	var postProductHistory = new db.ProductHistory(req.body);
	postProductHistory.save(function(err){
		if(err){
			res.send("Error while saving data.", err);
		}
		getHistoryData(res);
	})
};

var getHistoryByProductId = function(req, res){
	var id = req.params.productId;
	db.ProductHistory.find({'productId': id}, function(err, data){
		if(err){
			res.send("Error while fetching data.");
		}
		res.json(data);
	})

};


exports.getAllProductHistory = getAllProductHistory;
exports.addProductHistory = addProductHistory;
exports.getHistoryByProductId = getHistoryByProductId;