var koa =require('koa');
var controller=require('koa-route');
var app=koa();
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
app.listen(3001);
console.log('mb');