const  Drink  = require('../Models/sequelize').Drink;

//Função que permite selecionar todos dados da tabela drink
exports.getDrinks = function (req, res, next) {
    Drink.findAll()
        .then(drinks => {
            res.send(JSON.stringify(drinks,null,4));
        });
};

//Função que permite selecionar os dados por parametro id da tabela drink
exports.getDrinksbyID = function (req, res, next) {
    Drink.findOne({
        where :{
            id : req.params.id
        }
    }).then(result =>{
        res.send(JSON.stringify(result,null,4))
    })
};

//Função que permite criar dados na tabela drink
exports.createDrink = function (req, res, next) {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var { name } = req.body
  var { preco } = req.body;
  var { quantidade } = req.body;

  Drink.findOne({
    where: {
      name:name
    }
  }).then(result => {
    if (result == null) {
        Drink.create({'name': name,'preco' : preco,'quantidade':quantidade,'createdAt':date, 'updatedAt':date}).then(drink => {
            console.log("Bebida Criada !");
            res.send(JSON.stringify(drink,null,4));
     });
    }
    else {
        res.send("Nome da Bebida inserido ja está a ser utilizado !")
      }
  })
};
//Função que permite fazer update em dados na tabela drink
exports.updateDrink = function(req,res,next){

    var { name } = req.body
    var { preco} = req.body
   
        Drink.update({ name: name, preco: preco},{where:{id:req.params.id}}).then( (drink) =>{
            Drink.findOne({
                where :{
                    id : req.params.id
                }
            }).then(result =>{
                res.send(JSON.stringify(result,null,4))
            })
                
        })     
}
//Função que permite fazer delete em dados na tabela drink
exports.deleteDrink = function(req,res,next){
       
        Drink.findOne({
            where:{
                id: req.params.id
            }
        }).then(result => {
            if(result != null){
            Drink.destroy({where:{id:req.params.id}}).then(()=> {
                res.send("Bebida apagada.");  
                });         
            }
            else{
                res.send("Bebida que tentou apagar não existe na base de dados")
            }
        })
            
}

