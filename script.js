pt · JS
// ================================
//   VDAWG - Gaming Channel JS
//   Scroll animations, nav effects,
//   interactions & easter eggs
// ================================
 
document.addEventListener('DOMContentLoaded', () => {
 
    // ---- Navbar Scroll Effect ----
    const navbar = document.querySelector('.navbar');
 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(45, 232, 176, 0.3)';
            navbar.style.background = 'rgba(8, 10, 10, 0.98)';
        } else {
            navbar.style.borderBottomColor = 'rgba(45, 232, 176, 0.15)';
            navbar.style.background = 'rgba(10, 12, 12, 0.92)';
        }
    });
 
    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
 
    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
 
    sections.forEach(section => observerNav.observe(section));
 
    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll(
        '.content-card, .gear-item, .about-content p, .video-wrapper'
    );
 
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
 
    revealElements.forEach(el => {
        el.classList.add('hidden');
        revealObserver.observe(el);
    });
 
    // ---- Smooth Scroll for Nav Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
 
    // ---- Typing Effect on Hero Title ----
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = 'VDAWG';
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
 
        let i = 0;
        const type = () => {
            if (i < text.length) {
                heroTitle.textContent += text[i];
                i++;
                setTimeout(type, 120);
            } else {
                heroTitle.classList.add('typed');
            }
        };
        setTimeout(type, 300);
    }
 
    // ---- Teal Cursor Trail ----
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-trail';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(canvas);
 
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
 
    const particles = [];
    let mouse = { x: 0, y: 0 };
 
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
 
        for (let i = 0; i < 2; i++) {
            particles.push({
                x: mouse.x,
                y: mouse.y,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5,
                alpha: 0.7,
                decay: Math.random() * 0.02 + 0.015
            });
        }
    });
 
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
 
        particles.forEach((p, index) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.alpha -= p.decay;
            p.size *= 0.97;
 
            if (p.alpha <= 0) {
                particles.splice(index, 1);
                return;
            }
 
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#2DE8B0';
            ctx.shadowColor = '#2DE8B0';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
 
        requestAnimationFrame(animateParticles);
    }
 
    animateParticles();
 
    // ---- Gear Items Click to Copy Name ----
    const gearItems = document.querySelectorAll('.gear-item');
    gearItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const name = item.querySelector('.gear-name').textContent;
            navigator.clipboard.writeText(name).then(() => {
                showToast(`Copied: ${name}`);
            }).catch(() => {
                showToast(`${name}`);
            });
        });
    });
 
    // ---- Toast Notification ----
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
 
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #111515;
            color: #2DE8B0;
            border: 1px solid rgba(45,232,176,0.4);
            padding: 0.8rem 1.6rem;
            border-radius: 6px;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 1px;
            z-index: 99999;
            box-shadow: 0 0 20px rgba(45,232,176,0.2);
            transition: all 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(toast);
 
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
 
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
 
    // ---- Subscribe Button Pulse on Hover ----
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('mouseenter', () => {
            subscribeBtn.style.animation = 'btnPulse 0.4s ease';
        });
        subscribeBtn.addEventListener('animationend', () => {
            subscribeBtn.style.animation = '';
        });
    }
 
    // ---- Parallax Hero Glow ----
    const heroGlow = document.querySelector('.hero-glow');
    window.addEventListener('mousemove', (e) => {
        if (!heroGlow) return;
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
        heroGlow.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
    });
 
    // ---- Add CSS for reveal + active nav + btn pulse ----
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .nav-links a.active {
            color: #2DE8B0 !important;
        }
        .nav-links a.active::after {
            width: 100% !important;
        }
        @keyframes btnPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.04); }
            100% { transform: scale(1); }
        }
        .hero-title {
            min-height: 1em;
            opacity: 0;
        }
        .hero-title.typed {
            border-right: none;
        }
    `;
    document.head.appendChild(style);
 
    console.log('%cVDAWG', 'color: #2DE8B0; font-size: 3rem; font-weight: 900; font-family: monospace;');
    console.log('%cGaming Channel Website', 'color: #7a9490; font-size: 1rem;');
});
 
</html>
