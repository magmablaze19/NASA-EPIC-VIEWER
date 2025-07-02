import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const apiKey = process.env.API_KEY;

app.use(cors());

app.get("/earth-image", async (req, res) => {
  const dateDashes = req.query.date;
  const dateSlashes = dateDashes.replaceAll("-","/");


  try {
    //pull list of available images for given date
    const imageListUrl = `https://api.nasa.gov/EPIC/api/natural/date/${dateDashes}?api_key=${apiKey}`;
    const response = await fetch(imageListUrl);
    const imageListDict = await response.json();

    //Create list of image source links
    const imageLinkArray = [];
    imageListDict.forEach(element => {
      imageLinkArray.push(`https://api.nasa.gov/EPIC/archive/natural/${dateSlashes}/png/${element.image}.png?api_key=${apiKey}`)
    });
    
    //Send it off
    res.json({ imageLinkArray });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong fetching EPIC data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
