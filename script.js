// Variáveis temporárias para operação calculadora
let tempA = null;
let tempB = null;
let tempOperacao = null;

// Função para reutilizar seu operar adaptado para os valores temporários
function operarInterno() {
    const resultadoEl = document.getElementById('resultado-basico');

    if (tempA === null || tempB === null || tempOperacao === null) {
        resultadoEl.textContent = 'Erro na operação.';
        return;
    }

    const a = tempA;
    const b = tempB;
    const operacao = tempOperacao;

    let resultado;
    let texto = '';

    switch (operacao) {
        case 'soma':
            resultado = a + b;
            texto = `Resultado da soma: ${resultado}`;
            break;
        case 'sub':
            resultado = a - b;
            texto = `Resultado da subtração: ${resultado}`;
            break;
        case 'mult':
            resultado = a * b;
            texto = `Resultado da multiplicação: ${resultado}`;
            break;
        case 'div':
            if (b === 0) {
                texto = 'Não é possível dividir por zero!';
            } else {
                resultado = a / b;
                texto = `Resultado da divisão: ${resultado}`;
            }
            break;
    }

    resultadoEl.textContent = texto;
    // Reset temporário
    tempA = null;
    tempB = null;
    tempOperacao = null;
}

// Funções para controlar o display da calculadora

function appendNum(num) {
    const display = document.getElementById('display');
    if (display.value === "0") display.value = "";
    display.value += num;
}

function appendOp(op) {
    const display = document.getElementById('display');
    const lastChar = display.value.slice(-1);

    // Evita dois operadores seguidos
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else if (display.value.length > 0) {
        display.value += op;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
    document.getElementById('resultado-basico').textContent = '';
}

// Função para calcular: interpreta display, separa operandos e operação e chama operarInterno

function calculate() {
    const display = document.getElementById('display');
    const expr = display.value;

    // Regex para separar números e operação (+ - * /)
    const match = expr.match(/^(-?\d*\.?\d+)([\+\-\*\/])(-?\d*\.?\d+)$/);

    if (!match) {
        document.getElementById('resultado-basico').textContent = 'Expressão inválida. Use formato: número operador número';
        return;
    }

    let a = parseFloat(match[1]);
    let op = match[2];
    let b = parseFloat(match[3]);

    if (isNaN(a) || isNaN(b)) {
        document.getElementById('resultado-basico').textContent = 'Por favor, insira números válidos.';
        return;
    }

    // Ajusta operação para usar nomes da sua função operar
    switch(op) {
        case '+': op = 'soma'; break;
        case '-': op = 'sub'; break;
        case '*': op = 'mult'; break;
        case '/': op = 'div'; break;
        default:
            document.getElementById('resultado-basico').textContent = 'Operação inválida.';
            return;
    }

    tempA = a;
    tempB = b;
    tempOperacao = op;

    operarInterno();
}

// --- SEGUEM AS SUAS FUNÇÕES ORIGINAIS ---

// Bhaskara
function calcularBhaskara() {
    const A = parseFloat(document.getElementById('a2').value);
    const B = parseFloat(document.getElementById('b2').value);
    const C = parseFloat(document.getElementById('c2').value);
    const resultadoEl = document.getElementById('resultado-bhaskara');

    if (A === 0) {
        resultadoEl.textContent = 'Isso não é uma equação de segundo grau (A não pode ser 0)';
        return;
    }

    const delta = B * B - 4 * A * C;

    if (delta < 0) {
        resultadoEl.textContent = 'Delta negativo. Não existem raízes reais.';
    } else {
        const x1 = (-B + Math.sqrt(delta)) / (2 * A);
        const x2 = (-B - Math.sqrt(delta)) / (2 * A);
        resultadoEl.textContent = `Delta = ${delta} | X1 = ${x1} | X2 = ${x2}`;
    }
}

// Conversor Romano: Número para Romano
function conversorNum() {
    const num = parseInt(document.getElementById('numeros').value);
    const resultado = document.getElementById('resultado-num');

    if (isNaN(num) || num < 1 || num > 3999) {
        resultado.textContent = 'Digite um número válido (1 a 3999)';
        return;
    }

    const numeros = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanos = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

    let romano = '';
    let numero = num;

    for (let i = 0; i < numeros.length; i++) {
        while (numero >= numeros[i]) {
            romano += romanos[i];
            numero -= numeros[i];
        }
    }

    resultado.textContent = `Número ${num} → ${romano}`;
}

// Conversor Romano: Romano para Número
function conversorStr() {
    const str = document.getElementById('letras').value.toUpperCase();
    const resultado = document.getElementById('resultado-str');

    const mapa = {
        'M': 1000,
        'D': 500,
        'C': 100,
        'L': 50,
        'X': 10,
        'V': 5,
        'I': 1
    };

    let total = 0;
    let anterior = 0;

    for (let i = str.length - 1; i >= 0; i--) {
        const atual = mapa[str[i]];

        if (!atual) {
            resultado.textContent = 'Letra inválida. Digite um número romano válido.';
            return;
        }

        if (atual < anterior) {
            total -= atual;
        } else {
            total += atual;
        }

        anterior = atual;
    }

    resultado.textContent = `Letra ${str} → ${total}`;
}
