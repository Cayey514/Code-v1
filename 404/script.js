document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00f3ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f3ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Efecto de scroll reveal mejorado
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const checkIfInView = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    };
    
    // Asignar clase scroll-reveal a los elementos que deben aparecer
    document.querySelector('.astronaut-container').classList.add('scroll-reveal');
    document.querySelector('.error-content').classList.add('scroll-reveal');
    
    // Verificar al cargar y al hacer scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Estrellas fugaces aleatorias
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Posición aleatoria
        const startX = Math.random() * 100;
        const startY = Math.random() * 30;
        
        // Tamaño y duración aleatorios
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 3 + 2;
        
        shootingStar.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, white, #00f3ff);
            border-radius: 50%;
            top: ${startY}%;
            left: ${startX}%;
            animation: shootingStar ${duration}s linear infinite;
            filter: blur(0.5px);
            box-shadow: 0 0 10px 1px #00f3ff;
            opacity: 0;
        `;
        
        document.querySelector('.shooting-stars-container').appendChild(shootingStar);
        
        // Eliminar después de la animación para evitar acumulación
        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }
    
    // Crear estrellas fugaces periódicamente
    setInterval(createShootingStar, 2000);
    
    // Crear algunas estrellas fugaces al inicio
    for (let i = 0; i < 3; i++) {
        setTimeout(createShootingStar, i * 500);
    }
    
    // Efecto de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Crear efecto de partículas al mover el cursor
        if (Math.random() > 0.7) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            document.body.appendChild(particle);
            
            // Animación y eliminación
            setTimeout(() => {
                particle.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`;
                particle.style.opacity = '0';
                setTimeout(() => particle.remove(), 500);
            }, 10);
        }
    });
    
    // Estilo para el cursor personalizado
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,243,255,0.8) 0%, rgba(0,243,255,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        }
        
        .cursor-particle {
            position: fixed;
            width: 4px;
            height: 4px;
            background-color: #00f3ff;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9998;
            transition: all 0.5s ease-out;
            box-shadow: 0 0 5px 1px rgba(0, 243, 255, 0.7);
        }
        
        .shooting-star {
            position: absolute;
            z-index: -1;
        }
    `;
    document.head.appendChild(style);
    
    // Efecto de sonido opcional (descomentar para activar)
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playSpaceSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
        oscillator.stop(audioContext.currentTime + 1);
    }
    
    document.querySelector('.home-button').addEventListener('mouseover', playSpaceSound);
    
});