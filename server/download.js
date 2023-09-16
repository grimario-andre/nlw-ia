import ytdl from "ytdl-core";
import fs from "fs";

/**
 * A função `@DOWNLOAD(idVideo)` é uma função que retorna uma nova Promise. Ela é usada para baixar um vídeo do YouTube.
 *
 * 1. @VIDEOURL Esta constante armazena a URL do vídeo do YouTube.
 *
 * 2. @SHORTSURL Esta constante armazena a URL do vídeo curto (shorts) do YouTube.
 *
 * 3. @ytdl (SHORTSURL, { quality: "lowestaudio", filter: "audioonly" }): Esta função usa a biblioteca `ytdl` para baixar o vídeo. Ela está configurada para baixar apenas o áudio na qualidade mais baixa.
 *
 * 4. @on ("info", (info) => {...}): Este manipulador de eventos é acionado quando as informações do vídeo são recebidas. Ele verifica se a duração do vídeo é maior que 60 segundos e, se for, lança um erro.
 *
 * 5. @on ("end", () => {...}): Este manipulador de eventos é acionado quando o download do vídeo é concluído. Ele registra uma mensagem no console e resolve a Promise.
 *
 * 6. @on ("error", (error) => {...}): Este manipulador de eventos é acionado se ocorrer um erro durante o download do vídeo. Ele registra uma mensagem de erro no console e rejeita a Promise.
 *
 * 7. @pipe (fs.createWriteStream("./temp/audio.mp4")): Este método direciona o fluxo de dados para um arquivo chamado 'audio.mp4' no diretório 'temp'.
 */
export const DOWNLOAD = (idVideo) => 
  new Promise((resolve, reject)=> {
    const VIDEOURL = `https://www.youtube.com/watch?v=${idVideo}`;
    const SHORTSURL = `https://www.youtube.com/shorts/${idVideo}`;

    ytdl(SHORTSURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const SECONDS = info.formats[0].approxDurationMs / 1000;
        console.log(SECONDS);
        if (SECONDS > 60) {
          throw new Error("Este vídeo não é um Shorts");
        }
      })
      .on("end", () => {
        console.log("Donwload finalizado");
        resolve();
      })
      .on("error", (error) => {
        console.log(`Problema ao fazer o download do video, detahes: ${error}`);
        reject(error);
      })
      .pipe(fs.createWriteStream("./temp/audio.mp4"));
});
