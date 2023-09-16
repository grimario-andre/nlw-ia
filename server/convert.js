import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

export const CONVERT = (() => {
    const fileObj = {
      filePath: "./temp/audio.mp4",
      outputPath: "",
      fileDecoded: null,
      audioData: null,
      floatArray: null,
    };
  
    fileObj.outputPath = fileObj.filePath.replace(".mp4", ".wav");
  
    function convertFile() {
      return new Promise((resolve, reject) => {
        console.log("Convertendo o vídeo...");
  
        ffmpeg.setFfmpegPath(ffmpegStatic);
        ffmpeg()
          .input(fileObj.filePath)
          .audioFrequency(16000)
          .audioChannels(1)
          .format("wav")
          .on("end", () => {
            const file = fs.readFileSync(fileObj.outputPath);
            fileObj.fileDecoded = wav.decode(file);
            fileObj.audioData = fileObj.fileDecoded.channelData[0];
            fileObj.floatArray = new Float32Array(fileObj.audioData);
  
            console.log("Vídeo convertido com sucesso!");
  
            resolve(fileObj.floatArray);
            fs.unlinkSync(fileObj.outputPath);
          })
          .on("error", (error) => {
            console.log("Erro ao converter o vídeo", error);
            reject(error);
          })
          .save(fileObj.outputPath);
      });
    }
  
    return {
      start: convertFile,
    };
  })();