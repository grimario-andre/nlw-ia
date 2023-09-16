// JS
import './form.js';


// CSS
import './styles/base.css';
import './styles/app.css';
import './styles/form.css';

/**
 * A função @getDate é uma função JavaScript que obtém o ano atual e o define como o conteúdo de texto de um elemento HTML com o ID 'anoAtual'. Aqui está uma explicação detalhada:
 *
 * 1. **const anoAtual = new Date().getFullYear();**: Esta linha cria um novo objeto Date e usa o método `getFullYear()` para obter o ano atual.
 *
 * 2. **document.getElementById('anoAtual').textContent = anoAtual;**: Esta linha seleciona o elemento HTML com o ID 'anoAtual' e define seu conteúdo de texto para o ano atual.
 *
 * 3. **getDate();**: Esta linha chama a função `getDate()`. 
 *
 * Portanto, quando você chama a função `getDate()`, ela obtém o ano atual e o insere no elemento HTML com o ID 'anoAtual'. Isso pode ser útil para exibir dinamicamente o ano atual em uma página da web.
 */

function getDate() {
    // Obtém o ano atual
    const anoAtual = new Date().getFullYear();
    
    // Define o ano atual no elemento span
    document.getElementById('anoAtual').textContent = anoAtual;
}

getDate();