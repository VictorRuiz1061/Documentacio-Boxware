// Fondo 3D animado con three.js
document.addEventListener('DOMContentLoaded', function() {
  // Crear el contenedor para el fondo 3D
  const background3DContainer = document.createElement('div');
  background3DContainer.id = 'background-3d';
  background3DContainer.style.position = 'fixed';
  background3DContainer.style.top = '0';
  background3DContainer.style.left = '0';
  background3DContainer.style.width = '100%';
  background3DContainer.style.height = '100%';
  background3DContainer.style.zIndex = '-1';
  background3DContainer.style.opacity = '0.7';
  background3DContainer.style.overflow = 'hidden';
  document.body.prepend(background3DContainer);

  // Inicializar Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  background3DContainer.appendChild(renderer.domElement);

  // Crear partículas
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Material para las partículas
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x4263eb,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  
  // Crear el sistema de partículas
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Posicionar la cámara
  camera.position.z = 5;
  
  // Crear estrellas adicionales con diferentes colores
  const createStars = (count, color, size, maxDistance) => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * maxDistance;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: size,
      color: color,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);
    
    return starsMesh;
  };
  
  const blueStars = createStars(200, 0x1a73e8, 0.05, 20);
  const purpleStars = createStars(150, 0x7028e4, 0.04, 25);
  const cyanStars = createStars(100, 0x00bcd4, 0.06, 15);
  
  // Manejar redimensionamiento de ventana
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Sin interactividad con el puntero
  // La animación solo tendrá su movimiento automático
  
  // Animación
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotación suave de partículas (sin interactividad con el mouse)
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.001;
    
    // Rotación de estrellas adicionales
    blueStars.rotation.x += 0.0002;
    blueStars.rotation.y += 0.0003;
    
    purpleStars.rotation.x += 0.0003;
    purpleStars.rotation.y += 0.0002;
    
    cyanStars.rotation.x += 0.0004;
    cyanStars.rotation.y += 0.0001;
    
    renderer.render(scene, camera);
  };
  
  animate();
});
