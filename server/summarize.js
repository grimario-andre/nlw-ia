import {pipeline} from '@xenova/transformers';
import { summaryExample } from './utils/summary.js';

export async function summarize(text) {
    try {
        // return summaryExample;
        console.log("Prerando o resumo ...");
        
        let summary = await pipeline(
            "summarization",
            "Xenova/distilbart-cnn-12-6",
            );
        
            let outPut = await summary(text);
        
        console.log("Resumo finalizado!");

        return outPut[0].summary_text;
    } catch (error) {
        console.log(`Destalhes: ${error}`);
        throw new Error(error);
    }
};