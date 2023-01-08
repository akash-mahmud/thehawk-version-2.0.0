import expressAsyncHandler from "express-async-handler";
import SiteInfo from "../Model/siteinfo";
const getSiteInfo = expressAsyncHandler(async (req, res) => {
  try {
    const siteinfo = await SiteInfo.findOne({})
      .sort({
        $natural: -1,
      })
      .limit(1);
    res.send(siteinfo);
  } catch (error) {
    res.send(error.message);
  }
});

const createSiteInfo = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const siteinfo = new SiteInfo({
      title,
      description,
      tags,
    });
    await siteinfo.save();
    res.send("success");
  } catch (error) {
    res.send(error.message);
  }
});
const updateSiteInfo = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, tags, _id } = req.body;
    if (!_id) {
      return res.send("send the id");
    }
    const filter = { _id };
    const siteinfo = {
      title,
      description,
      tags,
    };
    await SiteInfo.findOneAndUpdate(filter, siteinfo);
    return res.send("success");
  } catch (error) {
    res.send(error.message);
  }
});
export { getSiteInfo, createSiteInfo, updateSiteInfo };
