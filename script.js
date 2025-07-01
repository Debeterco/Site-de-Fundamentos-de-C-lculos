// --- Seletores reutilizáveis ---
const display = document.getElementById('display');
const resultadoBasico = document.getElementById('resultado-basico');

// --- Operações básicas ---
function appendNum(num) {
    if (display.value === "0") display.value = "";
    display.value += num;
}

function appendOp(op) {
    display.value += op;
}

function clearDisplay() {
    display.value = '';
    resultadoBasico.textContent = '';
}

function calculate() {
    const expr = display.value;

    try {
        if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
            resultadoBasico.textContent = 'Expressão inválida.';
            return;
        }

        const valor = Function('"use strict"; return (' + expr + ')')();
        resultadoBasico.textContent = `${expr} = ${valor}`;
        display.value = valor;
    } catch {
        resultadoBasico.textContent = 'Erro ao calcular.';
    }
}

// --- Funções matemáticas extras ---
function square() {
    const value = parseFloat(display.value);
    if (isNaN(value)) return;
    const result = value ** 2;
    display.value = result;
    resultadoBasico.textContent = `${value}² = ${result}`;
}

function squareRoot() {
    const value = parseFloat(display.value);
    if (isNaN(value)) return;
    const result = Math.sqrt(value);
    display.value = result;
    resultadoBasico.textContent = `√${value} = ${result}`;
}

function percent() {
    const value = parseFloat(display.value);
    if (isNaN(value)) return;
    const result = value / 100;
    display.value = result;
    resultadoBasico.textContent = `${value}% = ${result}`;
}

function toggleSign() {
    const display = document.getElementById('display');
    let expr = display.value;

    // Captura o último número, pode ter sinal negativo e decimal
    const regex = /(-?\d*\.?\d+)$/;
    const match = expr.match(regex);

    if (match) {
        let lastNum = match[0];
        let start = expr.slice(0, match.index);

        // Inverte o sinal do último número
        if (lastNum.startsWith('-')) {
            lastNum = lastNum.slice(1); // tira o '-'
        } else {
            lastNum = '-' + lastNum; // adiciona o '-'
        }

        display.value = start + lastNum;
    }
}

function pi() {
    const value = parseFloat(display.value);
    if (isNaN(value)) return;
    const result = value * Math.PI;
    display.value = result.toFixed(8);
    resultadoBasico.textContent = `${value} × π = ${result.toFixed(8)}`;
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// --- Bhaskara ---
function calcularBhaskara() {
    const A = parseFloat(document.getElementById('a2').value);
    const B = parseFloat(document.getElementById('b2').value);
    const C = parseFloat(document.getElementById('c2').value);
    const resultadoEl = document.getElementById('resultado-bhaskara');

    if (A === 0) {
        resultadoEl.textContent = 'Isso não é uma equação de segundo grau (A não pode ser 0)';
        return;
    }

    const delta = B ** 2 - 4 * A * C;

    if (delta < 0) {
        resultadoEl.textContent = 'Delta negativo. Não existem raízes reais.';
    } else {
        const x1 = (-B + Math.sqrt(delta)) / (2 * A);
        const x2 = (-B - Math.sqrt(delta)) / (2 * A);
        resultadoEl.textContent = `Delta = ${delta} | X1 = ${x1} | X2 = ${x2}`;
    }
}

// --- Conversor Romano: Número para Romano ---
function conversorNum() {
    const num = parseInt(document.getElementById('numeros').value);
    const resultado = document.getElementById('resultado-num');

    if (isNaN(num) || num < 1 || num > 3999 || num % 1 !== 0) {
        resultado.textContent = 'Digite um número inteiro válido (1 a 3999)';
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

// --- Conversor Romano: Romano para Número ---
function conversorStr() {
    const str = document.getElementById('letras').value.toUpperCase();
    const resultado = document.getElementById('resultado-str');

    const regexRomanoValido = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (!regexRomanoValido.test(str)) {
        resultado.textContent = 'Número romano inválido.';
        return;
    }

    const mapa = {
        'M': 1000, 'D': 500, 'C': 100,
        'L': 50, 'X': 10, 'V': 5, 'I': 1
    };

    let total = 0;
    let anterior = 0;

    for (let i = str.length - 1; i >= 0; i--) {
        const atual = mapa[str[i]];
        if (atual < anterior) total -= atual;
        else total += atual;
        anterior = atual;
    }

    resultado.textContent = `Letra ${str} → ${total}`;
}
