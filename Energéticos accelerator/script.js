const formulario = document.querySelector("#dados");
const button = document.querySelector("#buttonDados");
const dadosTotais = document.querySelector("#dadosTotais");
const icms = 0.18;
const ipi = 0.04;
const pis = 0.0186;
const cofins = 0.0854;
let precoUnit = 4.50;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let arrayTotalGeral = [];
let arrayTotalImpostos = [];
let arrayTotalMercadorias = [];

button.addEventListener("click", gerarRelatorio);

function gerarRelatorio(event) {
  event.preventDefault();

  let nome = formulario.nome.value;
  let qtde = parseFloat(formulario.quantidade.value);
  let icmsCalc = parseFloat((qtde*precoUnit*icms).toFixed(2));
  let ipiCalc = parseFloat((qtde*precoUnit*ipi).toFixed(2));
  let pisCalc = parseFloat((qtde*precoUnit*pis).toFixed(2));
  let cofinsCalc = parseFloat((qtde*precoUnit*cofins).toFixed(2));
  
  // faço push nos arrays dos valores totais para depois somar os totais com reduce
  arrayTotalImpostos.push(parseFloat((icmsCalc + ipiCalc + pisCalc + cofinsCalc).toFixed(2)));
  arrayTotalMercadorias.push(precoUnit*qtde);
  arrayTotalGeral.push(parseFloat((precoUnit*qtde + icmsCalc + ipiCalc + pisCalc + cofinsCalc).toFixed(2)));

  let nomeCliente = document.createElement("h2");
  let icmsCliente = document.createElement("span");
  let ipiCliente = document.createElement("span");
  let pisCliente = document.createElement("span");
  let cofinsCliente = document.createElement("span");
  let totalCliente = document.createElement("span");
  let totalImpostos = document.createElement("span");
  totalImpostos.classList.add("dadosTotalImpostos");
  let totalMercadorias = document.createElement("span");
  totalMercadorias.classList.add("dadosTotalMercadorias");
  let totalGeral = document.createElement("span");
  totalGeral.classList.add("dadosTotal");

  nomeCliente.textContent = `Cliente: ${nome}`; 
  icmsCliente.textContent = `ICMS: R$ ${icmsCalc}`;
  ipiCliente.textContent = `IPI: R$ ${ipiCalc}`;
  pisCliente.textContent = `PIS: R$ ${pisCalc}`;
  cofinsCliente.textContent = `COFINS: R$ ${cofinsCalc}`;
  totalCliente.textContent = `Total: R$ ${parseFloat((precoUnit*qtde + icmsCalc + ipiCalc + pisCalc + cofinsCalc).toFixed(2))}`;
  totalImpostos.textContent = `Total de impostos: R$ ${arrayTotalImpostos.reduce(reducer)}`;
  totalMercadorias.textContent = `Total de mercadorias: R$ ${arrayTotalMercadorias.reduce(reducer)}`;
  totalGeral.textContent = `Total geral: R$ ${arrayTotalGeral.reduce(reducer)}`;

  formulario.appendChild(nomeCliente);
  formulario.appendChild(icmsCliente);
  formulario.appendChild(ipiCliente);
  formulario.appendChild(pisCliente);
  formulario.appendChild(cofinsCliente);
  formulario.appendChild(totalCliente);
  dadosTotais.appendChild(totalImpostos);
  dadosTotais.appendChild(totalMercadorias);
  dadosTotais.appendChild(totalGeral);

  corrigirDadosTotais();
}   

//Função para remover totais de clientes com valores desatualizados (valor total antes de adicionar um novo cliente)
function corrigirDadosTotais() {
  let dadosTotalImpostos = document.querySelectorAll(".dadosTotalImpostos");
  let dadosTotalMercadorias = document.querySelectorAll(".dadosTotalMercadorias");
  let dadosTotal = document.querySelectorAll(".dadosTotal");

  if(dadosTotalImpostos.length >= 2){
    dadosTotalImpostos[dadosTotalImpostos.length-2].remove();
  }

  if(dadosTotalMercadorias.length >= 2){
    dadosTotalMercadorias[dadosTotalMercadorias.length-2].remove();
  }

  if(dadosTotal.length >= 2){
    dadosTotal[dadosTotal.length-2].remove();
  }
}



  
