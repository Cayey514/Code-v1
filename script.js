// Datos de proyectos (puedes reemplazar con tus propios proyectos)
const projectsData = [
    {
        id: 1,
        title: "EDITOR",
        description: "Un editor completamente responsive construida con HTML, CSS y JavaScript.",
        image: "img/editor.png",
        tags: ["HTML", "CSS", "JavaScript"],
        demoLink: "/codigos-descargar/editor/index.html",
        codeLink: "https://drive.google.com/drive/folders/1N-E_EHqbS2-MMXGKPoVsmI5_pJSXvPKE?usp=drive_link",
        demoLink2: "/404/index.html"
    },
   /* {
        id: 2,
        title: "Aplicación de Tareas",
        description: "Una aplicación para gestionar tareas con funcionalidad de arrastrar y soltar.",
        image: "https://via.placeholder.com/600x400?text=Proyecto+2",
        tags: ["JavaScript", "React", "LocalStorage"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 3,
        title: "Clima App",
        description: "Aplicación que muestra el clima actual utilizando una API de pronóstico del tiempo.",
        image: "https://via.placeholder.com/600x400?text=Proyecto+3",
        tags: ["API", "JavaScript", "CSS"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 4,
        title: "Juego de Memoria",
        description: "Juego de memoria con cartas que se voltean para encontrar pares coincidentes.",
        image: "https://via.placeholder.com/600x400?text=Proyecto+4",
        tags: ["JavaScript", "CSS Animations", "Game"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 5,
        title: "Calculadora Avanzada",
        description: "Calculadora con funciones científicas y modo oscuro/claro.",
        image: "https://via.placeholder.com/600x400?text=Proyecto+5",
        tags: ["JavaScript", "CSS", "Responsive"],
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 6,
        title: "Galeria de Fotos",
        description: "Galeria de fotos con lightbox y filtros por categorías.",
        image: "https://via.placeholder.com/600x400?text=Proyecto+6",
        tags: ["JavaScript", "CSS Grid", "Lightbox"],
        demoLink: "#",
        codeLink: "#"
    }*/
];

// Cargar proyectos en la página
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="btn btn-outline">Ver Demo</a>
                    <a href="${project.codeLink}" class="btn" download>codigo</a>
                    <a href="${project.demoLink2}" class="btn btn-outline">Pronto...</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Menu toggle para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Efecto de scroll para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .contact-form, .about-image, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar animaciones
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar la página
});

// Función para descargar archivos (puedes personalizar según tus necesidades)
function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


//contactame

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const formData = {
        from_name: document.getElementById('from_name').value,
        reply_to: document.getElementById('reply_to').value,
        message: document.getElementById('message').value
    };
    
    // Enviar el email usando EmailJS
    emailjs.send('service_0t1re9a', 'template_4wvfvdv', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Mostrar mensaje de éxito
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            
            // Opcional: resetear el formulario
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        });
});