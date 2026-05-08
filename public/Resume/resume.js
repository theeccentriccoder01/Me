// Resume Interactive Enhancements
// Sagnik Chakraborty - Resume Script

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 
    // 1. SMOOTH ANIMATIONS ON LOAD
    // ====================
    
    const resumeContainer = document.querySelector('.resume-container');
    if (resumeContainer) {
        resumeContainer.style.opacity = '0';
        resumeContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resumeContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            resumeContainer.style.opacity = '1';
            resumeContainer.style.transform = 'translateY(0)';
        }, 100);
    }

    // ====================
    // 2. PRINT FUNCTIONALITY
    // ====================
    
    // Add keyboard shortcut for printing (Ctrl+P)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            handlePrint();
        }
    });

    function handlePrint() {
        // Ensure all styles are loaded before printing
        if (document.readyState === 'complete') {
            window.print();
        } else {
            window.addEventListener('load', () => {
                window.print();
            });
        }
    }

    // ====================
    // 3. LINK TRACKING (Optional)
    // ====================
    
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log(`Link clicked: ${href}`);
            // Add analytics tracking here if needed
        });
    });

    // ====================
    // 4. RESPONSIVE FONT SIZING
    // ====================
    
    function adjustFontSize() {
        const container = document.querySelector('.resume-container');
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const baseWidth = 210 * 3.7795275591; // 210mm in pixels
        const scaleFactor = containerWidth / baseWidth;

        if (window.innerWidth < 768) {
            // Mobile view - don't scale
            container.style.fontSize = '10pt';
        } else if (scaleFactor < 1 && window.innerWidth >= 768) {
            // Scale down for smaller screens
            const newSize = Math.max(8, 10 * scaleFactor);
            container.style.fontSize = `${newSize}pt`;
        }
    }

    // Run on load and resize
    adjustFontSize();
    window.addEventListener('resize', debounce(adjustFontSize, 250));

    // ====================
    // 5. SKILL TAG HOVER EFFECT
    // ====================
    
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ====================
    // 6. SECTION FADE-IN ON SCROLL (Optional)
    // ====================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in effect (optional, disabled for print)
    if (window.matchMedia('screen').matches) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(10px)';
            section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            sectionObserver.observe(section);
        });
    }

    // ====================
    // 7. PRINT BUTTON HANDLER
    // ====================
    
    // Create floating print button for screen view
    if (window.matchMedia('screen').matches) {
        const printButton = document.createElement('button');
        printButton.innerHTML = `
            <svg style="width: 16px; height: 16px; margin-right: 6px; vertical-align: middle;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
            </svg>
            <span>Print to PDF</span>
        `;
        printButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 12px 20px;
            background-color: #1E90FF;
            color: white;
            border: none;
            border-radius: 5px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        printButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#1873CC';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 16px rgba(30, 144, 255, 0.4)';
        });

        printButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#1E90FF';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(30, 144, 255, 0.3)';
        });

        printButton.addEventListener('click', handlePrint);

        // Hide button on print
        window.addEventListener('beforeprint', function() {
            printButton.style.display = 'none';
        });

        window.addEventListener('afterprint', function() {
            printButton.style.display = 'block';
        });

        document.body.appendChild(printButton);
    }

    // ====================
    // 8. EMAIL OBFUSCATION (Security)
    // ====================
    
    // Prevent email harvesting bots (optional)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email clicks if needed
            console.log('Email link clicked');
        });
    });

    // ====================
    // 9. UTILITY FUNCTIONS
    // ====================
    
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

    // ====================
    // 10. CONSOLE CREDITS
    // ====================
    
    console.log('%c👨‍💻 Sagnik Chakraborty', 'color: #1E90FF; font-size: 20px; font-weight: bold;');
    console.log('%cFront-End Developer | Deep Learning Enthusiast', 'color: #666; font-size: 14px;');
    console.log('%c🌐 Portfolio: https://theeccentriccoder01.github.io/Me', 'color: #1E90FF; font-size: 12px;');
    console.log('%c💼 LinkedIn: https://linkedin.com/in/eccentricexplorer', 'color: #1E90FF; font-size: 12px;');
    console.log('%c---', 'color: #ccc;');
    console.log('%cPress Ctrl+P (or Cmd+P) to print this resume as PDF', 'color: #333; font-size: 11px; font-style: italic;');

    // ====================
    // 11. PAGE LOAD COMPLETE
    // ====================
    
    console.log('%c✅ Resume loaded successfully!', 'color: green; font-weight: bold;');
    
    // Dispatch custom event for external tracking
    const loadEvent = new CustomEvent('resumeLoaded', {
        detail: {
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        }
    });
    document.dispatchEvent(loadEvent);
});

// ====================
// 12. PRINT EVENT HANDLERS
// ====================

window.addEventListener('beforeprint', function() {
    console.log('� Preparing resume for printing...');
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    console.log('✅ Print dialog closed');
    document.body.classList.remove('printing');
});

// ====================
// 13. EXPORT FUNCTION (Optional)
// ====================

window.printResume = function() {
    window.print();
};

// ====================
// 14. DARK MODE TOGGLE (Optional - for future)
// ====================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

