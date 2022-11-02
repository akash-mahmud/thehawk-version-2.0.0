import expressAsyncHandler  from "express-async-handler";
import  axios from "axios"
import Parser from 'rss-parser';
let parser = new Parser();
import Rss from "../Model/rssModel.js"

const addRss = expressAsyncHandler(async (req, res) => {
    const rss = new Rss({
    
      name:req.body.title,
      rssUrl:req.body.url,
      category: {
        name: req.body.category,
        id: req.body.categoryId,
      },
    })
    await rss.save()
    
    res.status(202).send("sucess")
    });
  const getRss = expressAsyncHandler(async (req, res) => {
      const singleRss = await Rss.findOne({ _id: req.params.id } )
      // const data = await Rss.find();
      let feed = await parser.parseURL(`${singleRss.rssUrl}`);
    
      res.send(feed)
      // res.send(data)
    });
  const allRss = expressAsyncHandler(async (req, res) => {
    
      const data = await Rss.find();
    
      res.send(data)
    
    });
    
  const editRss = (async (req, res) => {
    
      const filter = await Rss.findOne({  _id: req.params.id  });
      
    
      
      const updatedRss ={
        name:req.body.title,
        rssUrl:req.body.url,
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
      };
      let doc = await Rss.updateOne(filter, updatedRss);
          if(doc){
      
            res.send(doc);
          }
      
      })
      
  const deleteRss = expressAsyncHandler(async (req, res) => {
        const rss = await Rss.findById(req.params.id);
        if (rss) {
          const deleteRss = await rss.remove();
          res.send({ message: "Post Deleted", Rss: deleteRss });
        } else {
          res.status(404).send({ message: "Rss Not Found" });
        }
      });
    


export  {addRss,getRss ,allRss ,editRss,deleteRss}
