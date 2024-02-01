

//----------VAMOS ORGANIZAR O CODIGO PARA FICAR MAIS LEGÍVEL E COMPREENSIVEL-----------------

const form = document.getElementById('form-atividade');//criei uma constante com nome form p chamar do elemento form-atividade
const imgAprovado = '<img src = "./images/aprovado.png" alt= "emoji celebrando" />';
const imgReprovado = '<img src = "./images/reprovado.png" alt = "emoji decepcionado" />';
const atividades = [];// array para receber as atividades digitadas 
const notas = [];// array par receber as notas digitadas
const spanAprovado = '<span class= "resultado aprovado"> Aprovado</span>';
const spanReprovado = '<span class= "resultado reprovado"> Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a média mínima para aprovação ?'));

let linhas = '';//variavel linha começa vazia

form.addEventListener('submit', function (e) { //aqui o form escuta sempre que o submit for apertado e roda função e para não recarregar a pag
    e.preventDefault(); 

    adicionarLinha ();
    atualizaTabela();
    atualizaMediaFinal ();

});

function adicionarLinha () {
    const inputNomeAtividade = document.getElementById('nome-atividade');//const chama o elemento pelo id
    const inputNotaAtividade = document.getElementById('nota-atividade');//const chama o elemento pelo id
    
    if (atividades.includes (inputNomeAtividade.value)) {
        alert (`A atividade '${inputNomeAtividade.value}' já foi inserida e não pode ser repetida.`);
    } else {

    atividades.push (inputNomeAtividade.value);
    notas.push (parseFloat(inputNotaAtividade.value));// converti o resultado para float

    let linha = '<tr>';//criei variavel linha
    linha += `<td>${inputNomeAtividade.value} </td>`;//linha += é o mesmo que linha mais linha (concatenação)
    linha += `<td>${inputNotaAtividade.value} </td>`;//criamos uma coluna com atributo nota atividade
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado} </td>`;//aqui é uma função ternária, onde 
    // ? representa if (positivo) e : else (negativo). Coloquei as opções aprovado e reprovado 
    linha += '</tr>';//fecho o tr que abri em cima

    linhas += linha;// depois de escrever a linha concatenamos com linhas
}   
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody');//criei a const corpo tabela para chamar o elemento tbody
    corpoTabela.innerHTML= linhas;// corpo tabela vai receber o conteudo de linhas
}

function atualizaMediaFinal () { // essa função vai 
    const mediaFinal = calculaMediaFinal ();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}

function calculaMediaFinal () {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas+= notas[i];
    }
    return somaDasNotas / notas.length;
}
    