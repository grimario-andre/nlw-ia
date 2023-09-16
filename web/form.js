import { server } from "./server.js";



/**
 * A função `@formSend` é uma IIFE que lida com o envio e processamento de um formulário específico em uma página da web. Ela é estruturada da seguinte maneira:
 *
 * 1. @formElements : Este objeto contém referências ao formulário, entrada e elementos de conteúdo na página.
 *
 * 2. @removeClassElement (nameClass): Esta função remove uma classe do elemento de conteúdo.
 *
 * 3. @textContent (text): Esta função define o conteúdo de texto do elemento de conteúdo.
 *
 * 4. @validateForm (shortURL): Esta função valida se a URL é uma URL curta. Se não for, exibe uma mensagem de erro e recarrega a página após 2 segundos. Se for, divide a URL e retorna a URL dividida.
 *
 * 5. @splitUrl (shortURL): Esta função divide a URL curta e retorna a URL dividida.
 *
 * 6. @sendShort (): Esta função adiciona um ouvinte de evento ao formulário que impede o comportamento padrão de envio do formulário, valida e divide a URL curta, envia uma solicitação GET para recuperar dados de transcrição, envia uma solicitação POST para obter um resumo dos dados de transcrição, exibe o resumo na página e remove a classe 'placeholder' do elemento de conteúdo.
 *
 * 7. @formSend.send() : Esta linha invoca a função `sendShort` quando o script é executado.
 *
 * Esta IIFE é usada para encapsular todas as variáveis e funções relacionadas dentro de seu próprio escopo, prevenindo quaisquer conflitos potenciais com outros scripts na página. Ela é imediatamente invocada e seus métodos podem ser acessados através do objeto retornado.
 */
const formSend = (() => {
  let formElements = {
    form: document.querySelector("#form"),
    input: document.querySelector("#url"),
    content: document.querySelector("#content"),
  };

  const removeClassElement = (nameClass) => {
    formElements.content.classList.remove(nameClass);
  };

  const textContent = (text) => {
    formElements.content.textContent = text;
  };

  const validateForm = (shortURL) => {
    if (!shortURL.includes("shorts")) {
      textContent("Esse vídeo não é um short");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }

    return splitUrl(shortURL);
  };

  const splitUrl = (shortURL) => {
    let [_, splitUrl] = shortURL.split("/shorts/");
    let [shareSplitShortUrl] = splitUrl.split("?si");

    return shareSplitShortUrl;
  };

  function sendShort() {
    formElements.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let shortURL = formElements.input.value;

      let shareSplitShortUrl = validateForm(shortURL);

      textContent("Convertendo áudio em texto...");

      let transcription = await server.get(`/summary/${shareSplitShortUrl}`);

      textContent("Aguarde o resumo...");

      let summary = await server.post("/summary", {
        text: transcription.data.result,
      });

      textContent(summary.data.result);

      removeClassElement("placeholder");
    });
  }

  return {
    send: sendShort,
  };
})();

formSend.send();
