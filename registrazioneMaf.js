const mongoose =require('mongoose')
var bodyParser = require('body-parser');
const { Schema } = mongoose;


function salvaMaf (req, res) {
    //prendere dati da risposta
    //salvarli sul db
    var name1=req.query.name
    var surname1=req.query.surname
    var cf1=req.query.cf
    var email1=req.query.email
    console.log(name1+" "+surname1+" "+cf1+" "+email1)
  
    const mafSchema= new Schema({
      name:String,
      surname:String,
      cf:String,
      email:String,
    });
  
    const Maf= mongoose.model('Maf',mafSchema);

    var maf=new Maf({
      name:name1,
      surname:surname1,
      cf:cf1,
      email:email1
    })
  
    maf.save(function (err, maf) {
      if (err) 
        return console.error(err);
      console.log( maf.name+ " saved to bookstore collection.");
    });
  

    res.location(/* link to the resource */)
  }

module.exports = salvaMaf