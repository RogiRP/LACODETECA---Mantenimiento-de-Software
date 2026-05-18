<?php
$host = 'localhost:3306';
$usuario = 'root';
$contrasenia = 'BlackRonin9.';
$baseDeDatos = 'registros_php_db1';

// Crear conexión
$conexion = new mysqli($host, $usuario, $contrasenia, $baseDeDatos);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}
?>