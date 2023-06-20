const express = require("express")
const path = require('path')
const app = express()
const ejs = require('ejs')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


let comments = [
    {
        id: uuidv4(),
        username: 'Sample User',
        text: 'Sample Comment.'
    },

]

app.use(express.static(path.join(__dirname,'public/')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/blogs',(req,res)=>{
    res.render('index',{comments})
})

app.get('/',(req,res)=>
{
    res.redirect('/blogs')
})

app.get('/blog/new',(req,res)=>
{
    res.render('addcomment')
})

app.post('/blogs',(req,res)=>
{
    console.log(req.body)
    const {username,text} = req.body;
    const newitem = {
        id: uuidv4(),
        username: username,
        text: text
    }
    comments.push(newitem)
    res.redirect('/blogs')
})

app.get('/blogs/:id',(req,res)=>
{   
    const {id} = req.params
    const comment = comments.filter((element)=>{return element.id == id})
    res.render('show',{comment})
})

app.get('/blogs/:id/edit',(req,res)=>
{
    console.log('Hello')
    const {id} = req.params
    const comment = comments.filter((element)=>{return element.id == id})
    res.render('edit',{comment :comment[0]})
})

app.patch('/blogs/:id',(req,res)=>
{   
    const {id} = req.params
    const {text} = req.body
    comments.map((element)=>
    {
        if (element.id == id) {
            element.text = text
        }
    })
 
    res.redirect(`/blogs/${id}`)
})


app.delete('/blogs/:id',(req,res)=>
{
    const {id} = req.params
    comments = comments.filter((element)=>
    {
        if(element.id != id)
        {
            return element;
        }
    })

    res.redirect('/blogs')
})

app.listen(5000,()=>
{
    console.log('Server is up')
})