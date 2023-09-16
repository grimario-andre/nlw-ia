import cors from "cors";
import express, { response } from "express";

import { CONVERT } from "./convert.js";
import { DOWNLOAD } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summarize } from "./summarize.js";

const API = (() => {
  const APP = express();

  APP.use(express.json());
  APP.use(cors());
  APP.listen(3333, () => console.log());

  function getUrl() {
    APP.get("/summary/:id", async (request, response) => {
      try {
        await DOWNLOAD(request.params.id);
        let audioConverted = await CONVERT.start();
        let result = await transcribe(audioConverted);

        response.json({ result });
      } catch (error) {
        console.log(`Detalhes: ${error}`);
        return response.json({ error });
      }
    });
  }

  function postUrl() {
    APP.post("/summary", async (request, response) => {
      try {
        const result = await summarize(request.body.text);
        return response.json({ result });
      } catch (error) {
        console.log(`Detalhes: ${error}`);
        return response.json({ error });
      }
    });
  }

  return {
    get: getUrl,
    post: postUrl,
  };
})();

API.get();
API.post();
