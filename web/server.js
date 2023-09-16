import axios from "axios";

/**
 * A constante @server é uma instância do cliente HTTP `axios` com uma configuração predefinida.
 *
 * 1. @axios .create({baseURL: "http://localhost:3333"}): Este método cria uma nova instância do `axios` com a configuração fornecida. A propriedade `baseURL` é usada para definir a URL base para todas as solicitações feitas usando esta instância do `axios`.
 *
 * Portanto, todas as solicitações feitas usando `server` serão automaticamente prefixadas com "http://localhost:3333". Isso é útil quando você está interagindo com a mesma API em muitos lugares diferentes em seu aplicativo.
 */
export const server = axios.create({
    baseURL: "http://localhost:3333",
});