// mongoose password: password1234
// mongo cluster: mongodb+srv://Priest:<password>@cluster0-iuer3.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const Thing = require('./models/thing');

const app = express();

mongoose.connect('mongodb+srv://Priest:password1234@cluster0-iuer3.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully onnected to MongoDB Atlas');        
    })
    .catch((error) => {
        console.log('Unable to onnect to MongoDB Atlass');
        console.error(error);
        
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/api/stuff', (req, res, next) => {
      const thing = new Thing({
          title: req.body.title,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          userId: req.body.userId,
          price: req.body.price          
      });
      thing.save().then(
          () => {
              res.status(201).json({
                  message: 'Post saved succesfully'
              })
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
    });

    app.get('/api/stuff/:id', (req, res, next) => {
        Thing.findOne({
            _id: req.params.id
        }).then(
            (thing) => {
            res.status(200).json(thing);
            }
        ).catch(
            (error) => {
            res.status(404).json({
                error: error
            });
            }
        );
    });

    app.put('/api/stuff/:id', (req, res, next) => {
        const thing = new Thing({
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId,
            price: req.body.price          
        });
        Thing.updateOne({_id:req.params.id}, thing).then(
            () => {
                res.status(201).json({
                    message: "Things created successfully"
                })
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error:error
                })
            }
        )
    })

    app.delete('/api/stuff/:id', (req, res, next) => {
        Thing.deleteOne({_id:req.params.id}).then(
            () => {
                res.status(200).json({
                    message:'Deleted'
                })
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        )
    })

    app.use('/api/stuff',(req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
    });

module.exports = app;



/*
MongoClient.connect('mongodb+srv://Priest:password1234@cluster0-iuer3.mongodb.net/test?retryWrites=true&w=majority')
(err, client) => {
    if (err){
        return console.log(err);        
    }
    require('./app/routes')(app, client);
    app.listen(port, () => {
        console.log("we re live on " + port);
    })
})
*/