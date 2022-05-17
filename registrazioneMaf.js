const mongoose =require('mongoose')
var bodyParser = require('body-parser');
const { Schema } = mongoose;

app.use(bodyParser.urlencoded());  
app.use(bodyParser.json());


function salvaMaf (req, res) {

    var name1=req.query.name
    var surname1=req.query.surname
    var cf1=req.query.cf
    var email1=req.query.email
    //console.log(name1+" "+surname1+" "+cf1+" "+email1)
  
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
  
    maf.save( (err, maf) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          err:error
        })
      }
        
      console.log( "\n"+maf.name+ " MAF saved ");
    });
  

    res.location("/api/v1/maf").send("maf saved")
  }

module.exports = salvaMaf