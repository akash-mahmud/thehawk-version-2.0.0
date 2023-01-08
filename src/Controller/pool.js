import expressAsyncHandler from 'express-async-handler';
import Pool from '../Model/pool'
const getCurrentPool = expressAsyncHandler(async(req, res) => {
    try {
        const pool = await Pool.findOne({})
          .sort({
            $natural: -1,
          })
          .limit(1);
        res.send(pool)
    } catch (error) {
             res.send(error.message);
    }
})

const createPool = expressAsyncHandler(async (req, res) => {
    try {
        const {
            title, 
            question
        } = req.body
        const pool = new Pool({
          title,
          question,
        });
        await pool.save()
        res.send('success')
    } catch (error) {
        res.send(error.message);  
    }
})

export { getCurrentPool, createPool };