const prompt = require("prompt-sync")(); 
const fetch = require("node-fetch");    

async function converterMoeda() {
    const valorReais = parseFloat(prompt("Insira um valor em R$: "));

    const moeda = prompt(
        "Selecione a moeda para conversão:\n" +
        "USD - Dólar Americano\n" +
        "EUR - Euro\n" +
        "GBP - Libra\n" +
        "MXN - Peso Mexicano\n" +
        "BRL - Real\n"
    ).toLowerCase();
    try {
        const resp = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/brl.json");
        const dados = await resp.json();
        const taxas = dados.brl;

        if (taxas[moeda]) {
            const convertido = valorReais * taxas[moeda];
            const formatado = convertido.toLocaleString("en-US", {
                style: "currency",
                currency: moeda.toUpperCase()
            });
            console.log(`Resultado: ${formatado}`);
        } else {
            console.log("Moeda inválida.");
        }
    } catch (erro) {
        console.log("Erro ao buscar as taxas de câmbio:", erro.message);
    }
}
converterMoeda();