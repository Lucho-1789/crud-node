const path = require('path');
const express= require('express');
const hbs = require('hbs');
//const bodyParser = ('body-parser');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false})); 
app.use('/assets', express.static (__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Conexion a base de datos
const conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'fullstack'

})

conn.connect ((err) => {
    if(err) throw err;
    console.log('Conexion establecida..')
});




//Routes 
app.get('/', (req, res) => {
    let sql ="SELECT * FROM productos";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.render('productos', {
            results
        })
    }
    )
}
)

// SELECT 
app.get('/',(req, res)=>{
    // producto o productos??
    let sql ="SELECT * FROM productos";
    let query = conn.query(sql, (err, results)=>{
        if(err) throw err;
        res.render('producto',{
            
            results: results
        });
    });
});

//Insertar
app.post('/save', (req, res) => {
    //guardar la sentencia para despues insertar un dato
    let data = {producto_nombre: req.body.producto_nombre, producto_precio: req.body.producto_precio};
    let sql = "INSERT INTO productos SET ? ";
    let query = conn.query(sql, data, (err, results) =>{
        if (err) throw err;
        res.redirect('/');
    });
});

// Update 
// app.post('/update',(req, res) => {
//     let sql = "UPDATE product SET producto_nombre='"+ req.body.producto_nombre+"', producto_precio='"+req.body.producto_precio+"' WHERE producto_id="+ req.body.id;
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//       res.redirect('/');
//     });
//   });

  app.post('/update', (req, res) => {
    let sql = "UPDATE productos SET producto_nombre='" +req.body.producto_nombre+ "', producto_precio='" +req.body.producto_precio+ "' WHERE producto_id=" +req.body.id;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });


  app.post('/delete',(req, res) => {
    let sql = "DELETE FROM productos WHERE producto_id=" +req.body.producto_id+"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});


  


app.listen(8000, () => {
    console.log('Server is running');
});