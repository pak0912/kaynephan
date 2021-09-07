var express = require('express');
var app = express();
var fs = require('fs');
var bodyparser = require('body-parser');
var books = fs.readFileSync('./book.json');
var methodOverride = require('method-override');
var data = JSON.parse(books);
var urlencodebodyparser = bodyparser.urlencoded({extended:true});
app.set('views','./views');
app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.get("/",function(req,res){
    var arr = [];
    for(x in data){
        arr.push(data[x]);
    }
    res.render('list',{data:arr});
})
app.get('/add',function(req,res){
    res.render('add');
})
app.post('/them',urlencodebodyparser,function(req,res){
    var id = req.body.id;
    var reid = req.body.reid;
    if(id != reid){
    var book = {
        "acc":{
            "id":req.body.id,
            "reid":req.body.reid,
            "point":100
        }
    }
    data['acc'+req.body.id] = book["acc"];
    var reid = req.body.reid;
    for(x in data){
        if(data[x].id == reid){
            data[x].point = data[x].point+30;
           var temp = data[x].reid;
            for(x in data){
                if(data[x].id == temp){
                    data[x].point = data[x].point+20;
                    var temp1 = data[x].reid;
                    for(x in data){
                        if(data[x].id == temp1){
                            data[x].point = data[x].point+10;
                        }
                    }
                }
            }
        }
    }
    var json = JSON.stringify(data,null,2);
    fs.writeFile('book.json',json,function(err){
        if(err) throw err
        console.log("Them thanh cong");
    })
    res.redirect('/')
}
else  res.redirect('/');
})
// app.get('/delete',function(req,res){
//     res.render('delete');
// })
// app.delete('/delete',urlencodebodyparser,function(req,res){
//     var id = req.body.id;
//     for(x in data){
//         if(data[x].id == id){
//             delete(data[x]);
//         }
//     }
//     var json = JSON.stringify(data,null,2);
//     fs.writeFile('book.json',json,function(err){
//         if(err) throw err
//         console.log('Da xoa');
//     })
//     res.redirect('/');
// })



// app.get('/update',function(req,res){
//     res.render('update');
// })
// app.put('/sua',urlencodebodyparser,function(req,res){  
//     var id = req.body.id;
//     var name = req.body.name;
//     var page = req.body.page;
//     for(x in data){
//         if(data[x].id == id){
//             data[x].name = name;
//             data[x].page = page;
//         }
//     }
//     var json = JSON.stringify(data,null,2);
//     fs.writeFile('book.json',json,function(err){
//         if(err) throw err
//         console.log('Da cap nhat');
//     })
//     res.redirect('/');
// })
app.listen(8080);