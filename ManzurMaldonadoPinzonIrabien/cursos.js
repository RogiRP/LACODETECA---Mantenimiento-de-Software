// Datos de los cursos
const courses = [
    {
        id: 1,
        title: "React.js: De cero a experto",
        category: "frontend",
        price: 49.99,
        rating: 4.9,
        description: "Aprende React.js desde las bases hasta conceptos avanzados",
        modules: 8,
        hours: 24,
        level: "Todos los niveles",
        students: 1234,
        topics: ["Hooks", "Context API", "Redux", "Next.js", "Testing"]
    },
    {
        id: 2,
        title: "Node.js y Express: API REST",
        category: "backend",
        price: 39.99,
        rating: 4.8,
        description: "Construye APIs robustas con Node.js y Express",
        modules: 6,
        hours: 18,
        level: "Intermedio",
        students: 856,
        topics: ["Express.js", "MongoDB", "JWT", "Testing", "Deployment"]
    },
    {
        id: 3,
        title: "Introducción a DevOps",
        category: "devops",
        price: 59.99,
        rating: 4.7,
        description: "Docker, CI/CD y despliegue en la nube",
        modules: 10,
        hours: 30,
        level: "Avanzado",
        students: 645,
        topics: ["Docker", "Kubernetes", "Jenkins", "AWS", "Monitoring"]
    },
    {
        id: 4,
        title: "Flutter: Desarrollo móvil multiplataforma",
        category: "mobile",
        price: 44.99,
        rating: 4.9,
        description: "Crea aplicaciones nativas para iOS y Android con Flutter",
        modules: 12,
        hours: 36,
        level: "Principiante",
        students: 978,
        topics: ["Widgets", "State Management", "APIs", "Firebase", "Animations"]
    },
    {
        id: 5,
        title: "Vue.js 3 Masterclass",
        category: "frontend",
        price: 45.99,
        rating: 4.8,
        description: "Domina Vue.js 3 y el Composition API",
        modules: 7,
        hours: 20,
        level: "Intermedio",
        students: 723,
        topics: ["Composition API", "Vuex", "Vue Router", "Testing", "Optimización"]
    }
];

// Función para crear una tarjeta de curso
function createCourseCard(course) {
    return `
        <div class="course-card" data-category="${course.category}" data-id="${course.id}">
            <img src="imagenes/whatsapp_image_2024-02-26_at_7.20.35_am.jpeg" alt="${course.title}" class="course-image">
            <div class="course-content">
                <div class="course-header">
                    <span class="category-tag">${course.category}</span>
                    <span class="rating">★ ${course.rating}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>${course.modules} módulos</span>
                    <span>${course.hours} horas</span>
                </div>
                <div class="course-footer">
                    <span class="price">$${course.price}</span>
                    <button class="view-btn" onclick="openModal(${course.id})">Ver detalles</button>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar los cursos
function displayCourses(filterCategory = 'all') {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';

    const filteredCourses = filterCategory === 'all'
        ? courses
        : courses.filter(course => course.category === filterCategory);

    filteredCourses.forEach(course => {
        coursesGrid.innerHTML += createCourseCard(course);
    });
}

// Variable para controlar si una notificación está activa
let toastActive = false;

// Función para mostrar notificación Toast
function showToast(message, duration = 5000) {
    // Evitar múltiples toasts superpuestos
    if (toastActive) return;
    toastActive = true;

    // Crear el contenedor del toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">✓</span>
            <span>${message}</span>
        </div>
        <button class="toast-close" aria-label="Cerrar notificación">×</button>
    `;

    // Agregar el toast al DOM
    document.body.appendChild(toast);

    // Evento para cerrar el toast manualmente
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        removeToast(toast);
    });

    // Remover automáticamente después de la duración
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);

    // Función para remover el toast
    function removeToast(toastElement) {
        clearTimeout(timeout);
        toastElement.classList.add('removing');
        
        // Esperar a que termine la animación
        setTimeout(() => {
            toastElement.remove();
            toastActive = false;
        }, 300); // Duración de la animación
    }
}

// Función para abrir el modal
function openModal(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    document.getElementById('modalTitle').textContent = course.title;
    document.getElementById('modalModules').textContent = `${course.modules} módulos`;
    document.getElementById('modalHours').textContent = `${course.hours} horas`;
    document.getElementById('modalLevel').textContent = course.level;
    document.getElementById('modalDescription').textContent = course.description;
    document.getElementById('modalPrice').textContent = `$${course.price}`;
    document.getElementById('modalStudents').textContent = `${course.students} estudiantes`;

    const topicsGrid = document.getElementById('modalTopics');
    topicsGrid.innerHTML = course.topics
        .map(topic => `<div class="topic-item">${topic}</div>`)
        .join('');

    // Mostrar el modal
    document.getElementById('courseModal').classList.add('active');

    // Asignar evento al botón de inscripción
    const inscribirseBtn = document.getElementById('inscribirseBtn');
    inscribirseBtn.onclick = () => {
        if (!usuarioLoggeado) {
            showToast('Debes iniciar sesión para inscribirte a un curso', 4000);
            return;
        }
        showToast(`¡Inscrito exitosamente al curso: ${course.title}!`, 5000);
        closeModal(); // Cierra el modal después de mostrar el toast
    };
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('courseModal').classList.remove('active');
}


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todos los cursos inicialmente
    displayCourses();

    // Configurar filtros
    const filterButtons = document.getElementById('filterButtons');
    filterButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Actualizar botones activos
            filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            // Filtrar cursos
            displayCourses(e.target.dataset.filter);
        }
    });

    // Configurar búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const coursesGrid = document.getElementById('coursesGrid');

        coursesGrid.querySelectorAll('.course-card').forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const description = card.querySelector('.course-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Configurar cierre del modal
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera
    document.getElementById('courseModal').addEventListener('click', (e) => {
        if (e.target.id === 'courseModal') {
            closeModal();
        }
    });
});
