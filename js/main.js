document.addEventListener('DOMContentLoaded', function() {

    // Chope button – confetti + parachute
    const chopeBtn = document.getElementById('chopeButton');
    if (chopeBtn) {
        chopeBtn.addEventListener('click', function() {
            const parachute = document.getElementById('parachuteTissue');
            if (parachute) {
                parachute.classList.add('drop');
                parachute.addEventListener('animationend', () => parachute.classList.remove('drop'), {once: true});
            }
            launchConfetti();
            // Random tissue rain
            for (let i = 0; i < 10; i++) {
                createTissueRain();
            }
        });
    }

    // Confetti
    function launchConfetti() {
        const canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        const colors = ['#D43F3F', '#F9A826', '#2B2D42', '#FFFFFF', '#FF8C42'];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 8 + 4,
                d: Math.random() * 30 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 5,
            });
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let remaining = 0;
            for (let p of particles) {
                p.y += Math.cos(p.d) + 1 + p.r / 2;
                p.x += Math.sin(p.d);
                if (p.y <= canvas.height + 20) {
                    remaining++;
                    ctx.beginPath();
                    ctx.lineWidth = p.r / 3;
                    ctx.strokeStyle = p.color;
                    ctx.moveTo(p.x + p.r / 4, p.y);
                    ctx.lineTo(p.x, p.y + p.r / 4);
                    ctx.stroke();
                }
            }
            if (remaining > 0) requestAnimationFrame(draw);
            else document.body.removeChild(canvas);
        }
        draw();
    }

    // Tissue rain
    function createTissueRain() {
        const rain = document.createElement('div');
        rain.classList.add('tissue-rain');
        rain.innerHTML = '🧻';
        rain.style.left = Math.random() * window.innerWidth + 'px';
        rain.style.animationDuration = Math.random() * 2 + 2 + 's';
        rain.style.fontSize = Math.random() * 20 + 20 + 'px';
        document.body.appendChild(rain);
        rain.addEventListener('animationend', () => rain.remove());
    }

    // Cart simulation
    const cartBtns = document.querySelectorAll('.add-to-cart');
    cartBtns.forEach(btn => {
        btn.addEventListener('click', () => alert('🛒 Simulated: Item added to your cart! (Educational demo)'));
    });

    // Thumbnail switcher
    const thumbnails = document.querySelectorAll('.thumbnail-row img');
    const mainImg = document.querySelector('.product-gallery .main-image');
    if (thumbnails.length && mainImg) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImg.src = this.src;
                mainImg.alt = this.alt;
            });
        });
    }

    // Scroll fade-in
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2 };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // Form submit simulation
    const form = document.querySelector('.simulated-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('📩 Message sent! (This is a simulated contact form for an educational project.)');
            form.reset();
        });
    }
});
