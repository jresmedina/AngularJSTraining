var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1/inventory');
var db = mongoose.connection;
db.on('error', function(err){
console.log("Connection error: ", err);
});
db.once('open', function(){
console.log("Connected.")
});
var ProductSchema = Schema({
	productName: {type: String, required: true, trim: true},
	description: {type: String, trim: true},
	productCode: {type: String, trim: true},
	availableQty: {type: Number},
	soldQty: {type: Number, default: 0},
	unitPrice: {type: Number},
	supplier: {type: String, trim: true},
	totalAmount: {type: Number},
	datePurchased: {type: Date},
	type: {type: String, trim: true},
	createdDate: {type: Date, default: Date.now()},
	// modifiedDate: {type: Date, default: Date.now()}
}, {collection: 'product'}); 
var ProductList = mongoose.model("Product", ProductSchema);
exports.ProductList = ProductList;

var ProductSalesSchema = Schema({
	productId: {type: String, required: true},
	soldQty: {type: Number},
	totalAmount: {type: Number},
	notes: {type: String, trim: true},
	datePurchased: {type: Date, default: Date.now()}
},{collection: 'productsales'});
var ProductSales = mongoose.model("ProductSales", ProductSalesSchema);
exports.ProductSales = ProductSales;

var ProductExpenseSchema = Schema({
	productId: {type: String, required: true},
	qty: {type: Number},
	totalAmount: {type: Number},
	datePurchased: {type: Date, default: Date.now()}
},{collection: 'productexpense'});
var ProductExpense = mongoose.model("ProductExpense", ProductExpenseSchema);
exports.ProductExpense = ProductExpense;


var ProductHistorySchema = Schema({
	productId: {type: String, required: true},
	field: {type:String, trim: true},
	oldValue: {type: String, trim: true},
	newValue: {type: String, trim: true},
	dateModified: {type: Date, default: Date.now()}
},{collection: 'producthistory'});
var ProductHistory = mongoose.model("ProductHistory", ProductHistorySchema);
exports.ProductHistory = ProductHistory;


