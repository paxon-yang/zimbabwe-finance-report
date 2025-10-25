// ==================== 页面加载动画 ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 统计数字动画
    animateStats();
});

// ==================== 侧边导航 ====================
const sideNav = document.getElementById('sideNav');
const navToggle = document.getElementById('navToggle');
const navItems = document.querySelectorAll('.nav-item');

// 切换导航栏
if (navToggle) {
    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
    });
}

// 点击导航项后在移动端关闭菜单
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sideNav.classList.remove('active');
        }
    });
});

// ==================== 导航高亮 ====================
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = window.innerWidth <= 768 ? 80 : 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 统计数字动画 ====================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // 检查是否包含数字
                if (text.match(/\d+/)) {
                    const number = parseInt(text.match(/\d+/)[0]);
                    animateNumber(element, 0, number, 1500);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // 保留原始文本格式
        element.textContent = originalText.replace(/\d+/, Math.floor(current));
    }, 16);
}

// ==================== 卡片进入动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有卡片
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card, .project-card, .member-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
});

// ==================== 项目卡片点击效果 ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // 添加脉冲效果
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// ==================== 进度条动画 ====================
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ==================== 时间线动画 ====================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    if (index % 2 === 0) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// ==================== 鼠标悬停3D效果 ====================
document.querySelectorAll('.glass-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ==================== 徽章动画 ====================
document.querySelectorAll('.badge, .tag').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ==================== 动态背景 ====================
function animateBackground() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const duration = 20 + index * 5;
        shape.style.animation = `float ${duration}s infinite ease-in-out`;
        shape.style.animationDelay = `-${index * 5}s`;
    });
}

animateBackground();

// ==================== 滚动指示器 ====================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

// ==================== 章节标题动画 ====================
const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            
            // 图标旋转效果
            const icon = entry.target.querySelector('.section-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
            }
            
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateX(-50px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    const icon = header.querySelector('.section-icon');
    if (icon) {
        icon.style.transition = 'transform 0.8s ease';
    }
    
    headerObserver.observe(header);
});

// ==================== 返回顶部按钮 ====================
function createBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 55px;
        height: 55px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.1)';
        button.style.boxShadow = '0 15px 30px rgba(99, 102, 241, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        button.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
            button.style.animation = 'fadeIn 0.3s ease';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

createBackToTop();

// ==================== 打印按钮 ====================
function createPrintButton() {
    const button = document.createElement('button');
    button.className = 'print-button';
    button.innerHTML = '<i class="fas fa-print"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 5rem;
        right: 2rem;
        width: 55px;
        height: 55px;
        background: white;
        color: #6366f1;
        border: 2px solid #6366f1;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.print();
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#6366f1';
        button.style.color = 'white';
        button.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'white';
        button.style.color = '#6366f1';
        button.style.transform = '';
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

createPrintButton();

// ==================== 数据卡片悬停效果 ====================
document.querySelectorAll('.metric-item, .cash-stat, .member-card').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ==================== 组织架构节点动画 ====================
const orgNodes = document.querySelectorAll('.org-node');

orgNodes.forEach((node, index) => {
    setTimeout(() => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.8)';
        node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 0);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'scale(1)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(node);
});

// ==================== 路径项目动画 ====================
document.querySelectorAll('.path-item').forEach(item => {
    const statusIcon = item.querySelector('.path-status i');
    if (statusIcon && statusIcon.classList.contains('fa-spinner')) {
        statusIcon.style.animation = 'spin 2s linear infinite';
    }
});

// 添加旋转动画
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// ==================== 引用卡片效果 ====================
const quoteCards = document.querySelectorAll('.quote-card');

quoteCards.forEach(card => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const quoteText = card.querySelector('.quote-text');
                const quoteEmphasis = card.querySelector('.quote-emphasis');
                
                if (quoteText) {
                    setTimeout(() => {
                        quoteText.style.opacity = '1';
                        quoteText.style.transform = 'translateY(0)';
                    }, 200);
                }
                
                if (quoteEmphasis) {
                    setTimeout(() => {
                        quoteEmphasis.style.opacity = '1';
                        quoteEmphasis.style.transform = 'scale(1)';
                    }, 600);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const quoteText = card.querySelector('.quote-text');
    const quoteEmphasis = card.querySelector('.quote-emphasis');
    
    if (quoteText) {
        quoteText.style.opacity = '0';
        quoteText.style.transform = 'translateY(20px)';
        quoteText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    if (quoteEmphasis) {
        quoteEmphasis.style.opacity = '0';
        quoteEmphasis.style.transform = 'scale(0.9)';
        quoteEmphasis.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    observer.observe(card);
});

// ==================== 成就卡片动画 ====================
const achievementCards = document.querySelectorAll('.achievement-card');

achievementCards.forEach(card => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = card.querySelector('.achievement-icon');
                if (icon) {
                    icon.style.animation = 'bounce 1s ease';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(card);
});

// ==================== 性能优化：防抖 ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScroll = debounce(updateActiveNav, 100);
window.addEventListener('scroll', optimizedScroll);

// ==================== 控制台信息 ====================
console.log('%c津巴布韦项目财务述职汇报', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c🎨 现代化 · 专业 · 精美', 'color: #8b5cf6; font-size: 14px;');
console.log('%c✨ 使用了渐变、毛玻璃、动画等现代设计元素', 'color: #06b6d4; font-size: 12px;');

// ==================== 页面完全加载 ====================
window.addEventListener('load', () => {
    console.log('✅ 页面加载完成');
    
    // 移除加载状态
    document.body.classList.add('loaded');
    
    // 启动所有动画
    setTimeout(() => {
        document.querySelectorAll('.stat-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        });
    }, 500);
});

// ==================== 打印样式 ====================
window.addEventListener('beforeprint', () => {
    // 在打印前做一些调整
    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.breakInside = 'avoid';
    });
});

// ==================== 移动端触摸优化 ====================
if ('ontouchstart' in window) {
    document.querySelectorAll('.glass-card, .project-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}
