const express = require('express')
const morgan = require('morgan') 

const app = express()


//---middlewarea----
app.use(morgan('dev'))

app.use(express.json())// para recibir archivos json (post, cuando usan el req.body para traducir lo que se trae)


let products = [ 
    {
        id: 1,
        name: 'laptop',
        price: '3000'
    }
]

app.get('/products', (req, res)=>{
    res.json(products)
})

app.post('/products', (req, res)=>{
   
    const newProducts = { id:products.length+1, ...req.body}
    products.push(newProducts)
    res.send(newProducts)
    
    
})

app.put('/products/:id', (req, res)=>{


    const newData = req.body

    const productsFound = products.find((p)=> p.id === parseInt(req.params.id));

    if(!productsFound) {
        return res.status(404).json({
            message: "product not found"
        });
        
    }

    // p hace como referencia a lo que esta por dentro del array para guiarse
    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)

    res.json({
        message: "product update seccessfully"
    })
})

app.delete('/products/:id', (req, res)=>{

    const productsFound = products.find((p)=> p.id == req.params.id)

    if(!productsFound) {
        return res.status(404).json({
            message: "product not found"
        })
        
    }

    //devuelve un nuevo array con el producto elim
    products = products.filter(p => p.id !== parseInt(req.params.id))

    console.log(products)

    res.sendStatus('204')
})

app.get('/products/:id', (req, res)=>{
    //console.log(req.params.id)
    //               funcion de flecha (se puede sin return explicito)
    //  p es com un parametro del array  para poder recorerlo con el find
    const productsFound = products.find((p)=> p.id == req.params.id)

    if(!productsFound) {
        return res.status(404).json({
            message: "product not found"
        })
        
    }

    //console.log(productsFound)
    res.json(productsFound)
})


//------------------
app.listen(3000)
console.log(`server on port ${3000}`)