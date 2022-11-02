import expressAsyncHandler from "express-async-handler";
import Subscriber from '../Model/subscriber'

const subscribe = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.body.email) {
          return res.send('Add your email first ')  
      }
      const doc = await Subscriber.findOne({
        email: req.body.email,
      });
      if (!doc) {
        const subscriber = new Subscriber({
          email: req.body.email,
        });
        await subscriber.save();
        return res.send("success ");  
      } else {
           return res.send("Already subscribed");  
      }

    } catch (error) {
          return res.send(error.message);  
    }
})

export { subscribe };