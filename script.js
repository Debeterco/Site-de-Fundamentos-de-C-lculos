// Operações Básicas
function operar(operacao) {
    const a = parseFloat(document.getElementById('a1').value);
    const b = parseFloat(document.getElementById('b1').value);
    const resultadoEl = document.getElementById('resultado-basico');

    if (isNaN(a) || isNaN(b)) {
        resultadoEl.textContent = 'Por favor, preencha os dois valores.';
        return;
    }

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
}

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