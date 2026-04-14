<?php
session_start();
error_reporting(0);
$sesion = $_SESSION['nombre_s'];
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cursos - La Codeteca</title>
    <link rel="stylesheet" href="menu.css">
    <link rel="stylesheet" href="cursos.css">
    <link rel="stylesheet" href="dark.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="shortcut icon" href="imagenes/code-6127616_960_720 (1).webp">
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
</head>

<body>
    <header>
        <nav>
            <svg class="svg-icon" viewBox="0 0 24 24">
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <h5>La Codeteca</h5>
            <ul>
                <li><a href="index.php">Inicio</a></li>
                <li><a href="libros.php">Libros</a></li>
                <li><a href="comunidad.php">Comunidad</a></li>
                <li><a href="cursos.php">Cursos</a></li>

                <li class="dropdown">
    <?php if ($sesion): ?>
        <button class="dropdown-button">
            <?php if (file_exists("uploads/" . htmlspecialchars($sesion) . ".jpg")): ?>
                <div id="profilePicContainer" style="display:inline-block; margin-right: 10px;">
                    <img src="uploads/<?php echo htmlspecialchars($sesion); ?>.jpg?<?php echo time(); ?>"
                         alt="Foto de perfil" id="profilePic"
                         style="width: 32px; height: 32px; border-radius: 50%;" />
                </div>
            <?php endif; ?>
            <?php echo htmlspecialchars($sesion); ?>
        </button>
        <div class="dropdown-content">
            <a href="cerrarSesion.php">Cerrar sesión</a>
            <a href="Perfil.php">Modificar perfil</a> 
            <?php if (!file_exists("uploads/" . htmlspecialchars($sesion) . ".jpg")): ?>
                <a href="subirFoto.php">Subir Foto de Perfil</a>
            <?php else: ?>
                <a href="subirFoto.php">Cambiar Foto de Perfil</a>
            <?php endif; ?>
        </div>
    <?php else: ?>
        <button class="dropdown-button">Invitado</button>
        <div class="dropdown-content">
            <a href="login.php">Iniciar Sesión</a>
            <a href="Registro.php">Registrarse</a>
        </div>
    <?php endif; ?>
</li>
            </ul>
            <button class="switch" id="switch">
                <span><i class="fas fa-sun"></i></span>
                <span><i class="fas fa-moon"></i></span>
            </button>
        </nav>
    </header>

    <div class="hero">
        <div class="container">
            <h1>Aprende a tu ritmo</h1>
            <p>Cursos estructurados para desarrolladores de todos los niveles</p>
            <div class="search-container">
                <input type="text" id="searchInput" class="search-input" placeholder="Buscar cursos...">
            </div>
        </div>
    </div>

    <main class="container">
        <div class="filters" id="filterButtons">
            <button class="filter-btn active" data-filter="all">Todos los cursos</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
            <button class="filter-btn" data-filter="devops">DevOps</button>
        </div>

        <div class="courses-grid" id="coursesGrid">
            <!-- Los cursos se insertarán aquí dinámicamente -->
        </div>
    </main>

    <div class="modal" id="courseModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle"></h2>
                <button class="close-button" id="closeModal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="course-stats">
                    <div class="stat-item">
                        <span class="stat-label">Módulos</span>
                        <span id="modalModules"></span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Duración</span>
                        <span id="modalHours"></span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Nivel</span>
                        <span id="modalLevel"></span>
                    </div>
                </div>
                <h3>Descripción del curso</h3>
                <p id="modalDescription" class="course-description"></p>
                <h3>Lo que aprenderás</h3>
                <div class="topics-grid" id="modalTopics"></div>
                <div class="course-footer">
                    <div>
                        <div id="modalPrice" class="price"></div>
                        <div id="modalStudents" class="stat-label"></div>
                    </div>
                    <button class="view-btn" id="inscribirseBtn">Inscribirse</button>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div>
                    <h4>La Codeteca</h4>
                    <p>Tu fuente de recursos para aprender programación</p>
                </div>
                <div>
                    <h4>Contacto</h4>
                    <p>LaCodeteca@gmail.com</p>
                </div>
                <div>
                    <h4>Enlaces</h4>
                    <ul class="footer-links">
                        <li><a href="#">Sobre Nosotros</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Términos y Condiciones</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 La Codeteca. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script>
        // Variable para verificar si el usuario está loggeado
        const usuarioLoggeado = <?php echo $sesion ? 'true' : 'false'; ?>;
    </script>
    <script src="script.js"></script>
    <script src="cursos.js"></script>


</body>

</html>