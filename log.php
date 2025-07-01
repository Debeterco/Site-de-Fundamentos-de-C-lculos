<?php
date_default_timezone_set('America/Sao_Paulo');

// Captura informações do visitante
$ip = $_SERVER['REMOTE_ADDR'];
$agente = $_SERVER['HTTP_USER_AGENT'];
$data = date("Y-m-d H:i:s");

// Linha de log
$linha = "[$data] IP: $ip | Navegador: $agente" . PHP_EOL;

// Cria ou adiciona ao arquivo
file_put_contents("acessos.log", $linha, FILE_APPEND);
?>
