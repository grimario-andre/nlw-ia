import { pipeline } from "@xenova/transformers";
import { transcriptionExample } from "./utils/transcription.js";

/**
 * A função @transcribe é uma função assíncrona que transcreve áudio para texto. Aqui está uma explicação detalhada:
 *
 * 1. **console.log("Executando transcrição ....");**: Esta linha registra uma mensagem no console indicando que a transcrição está sendo executada.
 *
 * 2. **let transcribe = await pipeline("automatic-speech-recognition", "Xenova/whisper-small");**: Esta linha cria uma instância do pipeline de reconhecimento automático de fala usando o modelo 'Xenova/whisper-small'.
 *
 * 3. **let transcription = await transcribe(params, {...});**: Esta linha executa a transcrição do áudio fornecido nos parâmetros. A transcrição é feita em pedaços de 30 segundos com um passo de 5 segundos. O idioma da transcrição é definido como 'português'.
 *
 * 4. **console.log(`Transcrição finalizada ${transcription}`);**: Esta linha registra uma mensagem no console indicando que a transcrição foi concluída.
 *
 * 5. **return transcription?.text.replace('[Música]', '');**: Esta linha retorna o texto da transcrição, removendo todas as ocorrências de '[Música]'.
 *
 * 6. **catch (error) { throw new Error(error); }**: Este bloco captura e relança quaisquer erros que possam ocorrer durante a execução da função.
 *
 * Portanto, quando você chama a função `transcribe(params)`, ela transcreve o áudio fornecido para texto e retorna a transcrição.
 */
export async function transcribe(params) {
  try {
    // return transcriptionExample;
    console.log("Executando transcrição ....");

    let transcribe = await pipeline(
        "automatic-speech-recognition",
        "Xenova/whisper-small"
        );

    let transcription = await transcribe(params, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: "portuguese",
        task: "transcribe",
    });

    console.log(`Transcrição finalizada ${transcription}`);

    return transcription?.text.replace('[Música]', '');
  } catch (error) {
    throw new Error(error);
  }
}
