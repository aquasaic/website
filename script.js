// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavLinks = document.querySelector('.mobile-nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('active');
    });
}

// FAQ Data
const faqData = [
    {
        category: 'company',
        question: "What is Aquasaic?",
        answer: "Aquasaic is a biotechnology company focused on revolutionizing wastewater treatment using engineered yeast."
    },
    {
        category: 'technology',
        question: "How does Aquasaic's technology work?",
        answer: "Our proprietary yeast absorbs heavy metals from wastewater using metal-binding proteins on its surface."
    },
    {
        category: 'technology',
        question: "What types of contaminants can Aquasaic's technology remove?",
        answer: "We specialize in removing heavy metals like cobalt, lead, and more, depending on industry needs."
    },
    {
        category: 'technology',
        question: "Is Aquasaic's solution environmentally friendly?",
        answer: "Yes, we eliminate harsh chemicals and enable water reuse, minimizing environmental impact."
    },
    {
        category: 'applications',
        question: "What industries can benefit from Aquasaic's technology?",
        answer: "Mining, manufacturing, energy production—any sector generating contaminated wastewater."
    },
    {
        category: 'business',
        question: "What is the expected timeline for implementing Aquasaic's technology?",
        answer: "Timelines vary by project, but pilot tests are underway to bring our solution to market soon."
    },
    {
        category: 'technology',
        question: "Can Aquasaic's technology integrate with existing systems?",
        answer: "Yes, it's designed to be a drop-in solution, enhancing existing wastewater treatment setups."
    },
    {
        category: 'business',
        question: "What are the economic benefits of using Aquasaic's technology?",
        answer: "It reduces treatment costs, recovers valuable metals, and creates new revenue streams."
    },
    {
        category: 'company',
        question: "How can I get involved with Aquasaic?",
        answer: "Contact us for partnerships, collaborations, or investment opportunities."
    },
    {
        category: 'business',
        question: "Is Aquasaic seeking investment?",
        answer: "Yes, we welcome investors to support scaling our technology and operations."
    },
    {
        category: 'company',
        question: "Where is Aquasaic located?",
        answer: "Our R&D is based in Somerville, Massachusetts, USA."
    },
    {
        category: 'company',
        question: "How can I stay updated on Aquasaic's progress?",
        answer: "Subscribe to our newsletter or follow our social media channels for the latest news."
    }
];

const faqContainer = document.querySelector('.faq-container');
const faqCategoriesContainer = document.querySelector('.faq-categories');
const faqSearch = document.getElementById('faqSearch');

const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'company', label: 'Company' },
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'applications', label: 'Applications' }
];

// Render categories
if (faqCategoriesContainer) {
    faqCategoriesContainer.innerHTML = categories.map(cat => `
        <button class="faq-category ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
            ${cat.label}
        </button>
    `).join('');
}

let currentCategory = 'all';

function renderFAQs() {
    const searchTerm = faqSearch ? faqSearch.value.toLowerCase() : '';
    const filteredFAQs = faqData.filter(faq => {
        const matchesCategory = currentCategory === 'all' || faq.category === currentCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm) || faq.answer.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (faqContainer) {
        if (filteredFAQs.length === 0) {
            faqContainer.innerHTML = `
                <div class="no-results">
                    <p>No questions found matching "${searchTerm}"</p>
                    <button class="button primary" onclick="clearSearch()">Clear Search</button>
                </div>
            `;
            return;
        }

        faqContainer.innerHTML = filteredFAQs.map((faq, index) => `
            <div class="faq-item">
                <div class="faq-question">
                    ${faq.question}
                    <span class="faq-icon">+</span>
                </div>
                <div class="faq-answer">${faq.answer}</div>
            </div>
        `).join('');

        // Add click events
        document.querySelectorAll('.faq-question').forEach(q => {
            q.addEventListener('click', () => {
                const answer = q.nextElementSibling;
                const icon = q.querySelector('.faq-icon');

                // Close other FAQs
                document.querySelectorAll('.faq-answer').forEach(a => {
                    if (a !== answer) {
                        a.style.maxHeight = null;
                        a.classList.remove('active');
                        a.previousElementSibling.classList.remove('active');
                        a.previousElementSibling.querySelector('.faq-icon').textContent = '+';
                    }
                });

                q.classList.toggle('active');
                answer.classList.toggle('active');
                if (answer.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.textContent = '−';
                } else {
                    answer.style.maxHeight = null;
                    icon.textContent = '+';
                }
            });
        });
    }
}

function clearSearch() {
    if (faqSearch) {
        faqSearch.value = '';
        renderFAQs();
    }
}

// Category filtering
document.querySelectorAll('.faq-category').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.faq-category').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.dataset.category;
        renderFAQs();
    });
});

// Search filtering
if (faqSearch) {
    faqSearch.addEventListener('input', () => {
        renderFAQs();
    });
}

renderFAQs();

// Contact Form Submission
const contactForm = document.querySelector('.contact-form-wrapper form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        // Gather form data
        const formData = new FormData(contactForm);
        const fullName = formData.get('Full Name') || '';
        const email = formData.get('Email Address') || '';
        const company = formData.get('Company') || '';
        const message = formData.get('Message') || '';

        // Construct the mailto link with form data in the body
        const subject = encodeURIComponent('Contact Aquasaic Inquiry');
        const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`);
        const mailtoLink = `mailto:founders@aquasaic.com?subject=${subject}&body=${body}`;

        // Redirect user to mailto link
        window.location.href = mailtoLink;

        // Reset the form
        contactForm.reset();
    });
}
