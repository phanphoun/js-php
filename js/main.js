// ==================== Main JavaScript Functionality ==================== //

document.addEventListener('DOMContentLoaded', function () {
    console.log('Main module loaded');
    initializeApp();
});

function initializeApp() {
    setupScrollBehavior();
    setupCodeHighlighting();
    setupTableEnhancements();
}

// ==================== Scroll Behavior ==================== //
function setupScrollBehavior() {
    // Scroll to top button
    const scrollTopBtn = createScrollToTopButton();

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
}

function createScrollToTopButton() {
    let button = document.getElementById('scrollToTop');

    if (!button) {
        button = document.createElement('button');
        button.id = 'scrollToTop';
        button.innerHTML = '↑';
        button.className = 'scroll-to-top';
        button.style.display = 'none';
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(button);
        addScrollTopStyles();
    }

    return button;
}

function addScrollTopStyles() {
    if (!document.getElementById('scrollTopStyles')) {
        const style = document.createElement('style');
        style.id = 'scrollTopStyles';
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: #2563eb;
                color: white;
                border: none;
                padding: 12px 16px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .scroll-to-top:hover {
                background-color: #1e40af;
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            }
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 20px;
                    right: 20px;
                    padding: 10px 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== Code Highlighting ==================== //
function setupCodeHighlighting() {
    const codeBlocks = document.querySelectorAll('.code-block code');

    codeBlocks.forEach(block => {
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.addEventListener('click', () => copyToClipboard(block, copyBtn));

        const codeBlockContainer = block.closest('.code-block');
        if (codeBlockContainer) {
            codeBlockContainer.style.position = 'relative';
            codeBlockContainer.appendChild(copyBtn);
        }
    });

    addCodeBlockStyles();
}

function copyToClipboard(element, button) {
    const text = element.innerText;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Copied!';
            button.style.backgroundColor = '#10b981';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        button.innerHTML = '✓ Copied!';
    }
}

function addCodeBlockStyles() {
    if (!document.getElementById('codeBlockStyles')) {
        const style = document.createElement('style');
        style.id = 'codeBlockStyles';
        style.textContent = `
            .code-block {
                position: relative;
            }
            .copy-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #3b82f6;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.3s ease;
                z-index: 10;
            }
            .copy-btn:hover {
                background-color: #2563eb;
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== Table Enhancements ==================== //
function setupTableEnhancements() {
    const tables = document.querySelectorAll('.comparison-table');

    tables.forEach(table => {
        // Add zebra striping
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index % 2 === 1) {
                row.style.backgroundColor = '#f9fafb';
            }
        });
    });
}

// ==================== Search Functionality ==================== //
function searchInPage(query) {
    const bodyText = document.body.innerText;
    return bodyText.toLowerCase().includes(query.toLowerCase());
}

// ==================== Page Analytics ==================== //
function trackPageView(pageName) {
    console.log(`Page viewed: ${pageName}`);
    // Can be connected to analytics service
}

// ==================== Accessibility Enhancements ==================== //
function enhanceAccessibility() {
    // Ensure all images have alt text
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', 'Content image');
    });

    // Ensure all links have text
    document.querySelectorAll('a:empty').forEach(link => {
        if (!link.querySelector('img')) {
            link.textContent = 'Link';
        }
    });

    // Add skip to content link
    addSkipToContentLink();
}

function addSkipToContentLink() {
    if (!document.getElementById('skipToContent')) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skipToContent';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 8px;
            z-index: 10000;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Call accessibility enhancements
enhanceAccessibility();

// ==================== Export for use in other modules ==================== //
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupCodeHighlighting,
        setupTableEnhancements,
        trackPageView,
        searchInPage
    };
}
