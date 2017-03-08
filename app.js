var koa =require('koa');
var controller=require('koa-route');
var app=koa();
var service= require('./service/webAppService.js');
//渲染
var views=require('co-views');
var render= views('./view',{
	map:{html:'ejs'}
});


app.use(controller.get('/route_test',function(){
	this.body='Hello World';
}));

app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('test',{test:'biubiu'});
}));


app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));

app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var queryString=require('queryString');
	var params= queryString.parse(this.req._parsedUrl.query);
	var start=params.start;
	var end=params.end;
	var keyword=params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));

app.listen(3001);
console.log('mb');