	var koa =require('koa');
	var controller=require('koa-route');
	var app=koa();

	//渲染
	var views=require('co-views');
	var koa_static=require('koa-static-server');
	var render= views('./view',{
		map:{html:'ejs'}
	});

    //访问静态文件
	app.use(koa_static({
	    rootDir:'./static/',
		rootPath:'/static/',
		maxage : 0
	}));

	app.use(controller.get('/route_test',function*(){
		this.set('Cache-Control','no-cahe');
		this.body='Hello koa';
	}));
	//模板渲染
	app.use(controller.get('/ejs_test',function*(){
		this.set('Cache-Control','no-cache');
		this.body = yield render('test',{test:'title_test'});
	}));
    app.use(controller.get('/index',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('index1',{title:'书城首页'});
    }));
    app.use(controller.get('/rank',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('rank',{title:'书城排行'});
    }));
    app.use(controller.get('/channel',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('channel',{title:'频道页面'});
    }));
    app.use(controller.get('/category',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('category',{title:'title_test'});
    }));
    app.use(controller.get('/female',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('female',{title:'女频'});
    }));
    app.use(controller.get('/male',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('male',{test:'男频'});
    }));
    app.use(controller.get('/book',function*(){
        this.set('Cache-Control','no-cache');
        var queryString=require('queryString');
        //http>object
        var params= queryString.parse(this.req._parsedUrl.query);
        var bookId=params.id;
        this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
    }));
    app.use(controller.get('/search',function*(){
        this.set('Cache-Control','no-cache');
        this.body = yield render('search',{test:'搜素页面'});
    }));


    var service= require('./service/webAppService.js');
	app.use(controller.get('/api_test',function*(){
		this.set('Cache-Control','no-cache');
		this.body = service.get_test_data();
	}));

	app.use(controller.get('/ajax/search',function*(){
		this.set('Cache-Control','no-cache');
		var queryString=require('queryString');
		//http>object
		var params= queryString.parse(this.req._parsedUrl.query);
		var start=params.start;
		var end=params.end;
		var keyword=params.keyword;
		this.body = yield service.get_search_data(start,end,keyword);
	}));

    /**
	 * 任务代码
     */
	//home.json
    app.use(controller.get('/ajax/index',function*(){
        this.set('Cache-Control','no-cache');
        this.body =  service.get_index_data();
    }));
	//rank.json
    app.use(controller.get('/ajax/rank',function*(){
        this.set('Cache-Control','no-cache');
        this.body =  service.get_rank_data();
    }));
    //category.json
    app.use(controller.get('/ajax/category',function*(){
        this.set('Cache-Control','no-cache');
        this.body =  service.get_category_data();
    }));

    app.use(controller.get('/ajax/male',function*(){
        this.set('Cache-Control','no-cache');
        this.body =  service.get_male_data();
    }));
    app.use(controller.get('/ajax/female',function*(){
        this.set('Cache-Control','no-cache');
        this.body =  service.get_female_data();
    }));
    app.use(controller.get('/ajax/bookbacket',function*(){
        this.set('Cache-Control','no-cache');
        this.body =  service.get_bookbacket_data();
    }));
   //book
    app.use(controller.get('/ajax/book',function*(){
        this.set('Cache-Control','no-cache');
        var queryString=require('queryString');
        //http>object
        var params= queryString.parse(this.req._parsedUrl.query);
        var id=params.id;
        if(!id){
        	id="";
		}
        this.body =  service.get_book_data(id);
    }));

	app.listen(3001);
	console.log('koa service start');