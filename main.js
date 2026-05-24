/* ============================================
   ENAFOR - Espace Carriere
   Main JavaScript
   ============================================ */

// ============================================
// DATA STORE (LocalStorage)
// ============================================
const DataStore = {
    // Offers
    getOffers() {
        const offers = localStorage.getItem('enafor_offers');
        return offers ? JSON.parse(offers) : this.getDefaultOffers();
    },

    saveOffers(offers) {
        localStorage.setItem('enafor_offers', JSON.stringify(offers));
    },

    getDefaultOffers() {
        return [
            {
                id: 'AO-2026-001',
                ref: 'AO-2026-001',
                title: 'Ingenieur Forage - Direction Engineering',
                category: 'forage',
                location: 'hassi-messaoud',
                contract: 'cdi',
                deadline: '2026-06-30',
                status: 'ouvert',
                positions: 3,
                description: 'L\'Entreprise Nationale de Forage\'Entreprise Nationale de Forage (ENAFOR) recrute des ingenieurs forage pour renforcer son equipe Engineering.',
                profile: 'Diplome d\'ingenieur en forage, minimum 3 ans d\'experience.',
                createdAt: '2026-05-01'
            },
            {
                id: 'AO-2026-002',
                ref: 'AO-2026-002',
                title: 'Technicien Work Over - Maintenance',
                category: 'workover',
                location: 'ouargla',
                contract: 'cdd',
                deadline: '2026-06-15',
                status: 'ouvert',
                positions: 5,
                description: 'Recrutement de techniciens Work Over pour la maintenance des puits.',
                profile: 'BTS ou DUT en maintenance industrielle.',
                createdAt: '2026-05-05'
            },
            {
                id: 'AO-2026-003',
                ref: 'AO-2026-003',
                title: 'Responsable QHSE',
                category: 'qhse',
                location: 'alger',
                contract: 'cdi',
                deadline: '2026-06-20',
                status: 'ouvert',
                positions: 1,
                description: 'Direction QHSE recherche un responsable pour la gestion du systeme integre.',
                profile: 'Master en QHSE, certification ISO, 5 ans d\'experience.',
                createdAt: '2026-05-10'
            },
            {
                id: 'AO-2026-004',
                ref: 'AO-2026-004',
                title: 'Developpeur Informatique - SI',
                category: 'informatique',
                location: 'alger',
                contract: 'cdi',
                deadline: '2026-07-01',
                status: 'ouvert',
                positions: 2,
                description: 'Developpement et maintenance des applications internes.',
                profile: 'Licence en informatique, maitrise de JavaScript, PHP, SQL.',
                createdAt: '2026-05-12'
            },
            {
                id: 'AO-2026-005',
                ref: 'AO-2026-005',
                title: 'Logisticien - Transport & DTM',
                category: 'logistique',
                location: 'hassi-messaoud',
                contract: 'cdd',
                deadline: '2026-06-10',
                status: 'ouvert',
                positions: 4,
                description: 'Gestion logistique du transport et demontage des appareils.',
                profile: 'BTS logistique, experience dans le transport lourd.',
                createdAt: '2026-05-15'
            },
            {
                id: 'AO-2026-006',
                ref: 'AO-2026-006',
                title: 'Formateur - Drilling School',
                category: 'formation',
                location: 'hassi-messaoud',
                contract: 'cdi',
                deadline: '2026-07-15',
                status: 'ouvert',
                positions: 2,
                description: 'Formateur pour l\'ENAFOR Drilling School.',
                profile: 'Ingenieur forage, experience pedagogique, certification IWCF.',
                createdAt: '2026-05-18'
            }
        ];
    },

    // Candidates
    getCandidates() {
        const candidates = localStorage.getItem('enafor_candidates');
        return candidates ? JSON.parse(candidates) : [];
    },

    saveCandidates(candidates) {
        localStorage.setItem('enafor_candidates', JSON.stringify(candidates));
    },

    addCandidate(candidate) {
        const candidates = this.getCandidates();
        candidates.push(candidate);
        this.saveCandidates(candidates);
    },

    // Admin
    getAdmin() {
        const admin = localStorage.getItem('enafor_admin');
        return admin ? JSON.parse(admin) : { email: 'admin@enafor.dz', password: 'admin123' };
    },

    saveAdmin(admin) {
        localStorage.setItem('enafor_admin', JSON.stringify(admin));
    },

    // Reset all
    resetAll() {
        localStorage.removeItem('enafor_offers');
        localStorage.removeItem('enafor_candidates');
        localStorage.removeItem('enafor_admin');
    }
};

// ============================================
// LOADING SCREEN
// ============================================
function initLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// ============================================
// LATEST OFFERS (Homepage)
// ============================================
function initLatestOffers() {
    const container = document.getElementById('latestOffers');
    if (!container) return;

    const offers = DataStore.getOffers().filter(o => o.status === 'ouvert').slice(0, 3);

    container.innerHTML = offers.map(offer => `
        <div class="offer-card">
            <span class="offer-status ${offer.status}">${offer.status}</span>
            <div class="offer-ref">${offer.ref}</div>
            <h3>${offer.title}</h3>
            <div class="offer-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${getLocationLabel(offer.location)}</span>
                <span><i class="fas fa-briefcase"></i> ${getContractLabel(offer.contract)}</span>
                <span><i class="fas fa-users"></i> ${offer.positions} poste(s)</span>
            </div>
            <div class="offer-deadline">
                <i class="fas fa-clock"></i>
                Date limite: ${formatDate(offer.deadline)}
            </div>
            <a href="postuler.html?offer=${offer.id}" class="btn btn-primary">
                <i class="fas fa-paper-plane"></i> Postuler
            </a>
        </div>
    `).join('');
}

// ============================================
// OFFERS LIST PAGE
// ============================================
function initOffersList() {
    const container = document.getElementById('offersList');
    if (!container) return;

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const statusFilter = document.getElementById('statusFilter');
    const filterBtn = document.getElementById('filterBtn');
    const resetBtn = document.getElementById('resetBtn');
    const offersCount = document.getElementById('offersCount');

    let currentPage = 1;
    const itemsPerPage = 5;

    function renderOffers() {
        let offers = DataStore.getOffers();

        // Filter
        if (searchInput && searchInput.value) {
            const search = searchInput.value.toLowerCase();
            offers = offers.filter(o => 
                o.title.toLowerCase().includes(search) || 
                o.ref.toLowerCase().includes(search) ||
                o.description.toLowerCase().includes(search)
            );
        }

        if (categoryFilter && categoryFilter.value) {
            offers = offers.filter(o => o.category === categoryFilter.value);
        }

        if (locationFilter && locationFilter.value) {
            offers = offers.filter(o => o.location === locationFilter.value);
        }

        if (statusFilter && statusFilter.value) {
            offers = offers.filter(o => o.status === statusFilter.value);
        }

        // Update count
        if (offersCount) offersCount.textContent = offers.length;

        // Pagination
        const totalPages = Math.ceil(offers.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const paginated = offers.slice(start, start + itemsPerPage);

        container.innerHTML = paginated.map(offer => `
            <div class="offer-list-item">
                <div class="offer-list-info">
                    <span class="offer-ref">${offer.ref}</span>
                    <h3>${offer.title}</h3>
                    <div class="offer-list-meta">
                        <span><i class="fas fa-layer-group"></i> ${getCategoryLabel(offer.category)}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${getLocationLabel(offer.location)}</span>
                        <span><i class="fas fa-file-contract"></i> ${getContractLabel(offer.contract)}</span>
                        <span><i class="fas fa-users"></i> ${offer.positions} poste(s)</span>
                    </div>
                    <p class="offer-list-desc">${offer.description}</p>
                    <div class="offer-list-tags">
                        <span class="offer-status ${offer.status}">${offer.status}</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(offer.deadline)}</span>
                    </div>
                </div>
                <div class="offer-list-actions">
                    <a href="postuler.html?offer=${offer.id}" class="btn btn-primary btn-sm">
                        <i class="fas fa-paper-plane"></i> Postuler
                    </a>
                    <a href="#" class="btn btn-outline btn-sm" onclick="alert('${offer.profile.replace(/'/g, "\'")}'); return false;">
                        <i class="fas fa-info-circle"></i> Profil
                    </a>
                </div>
            </div>
        `).join('');

        // Pagination
        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.innerHTML = '';
            return;
        }

        let html = '';
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
        pagination.innerHTML = html;
    }

    window.goToPage = function(page) {
        currentPage = page;
        renderOffers();
    };

    if (filterBtn) filterBtn.addEventListener('click', () => { currentPage = 1; renderOffers(); });
    if (resetBtn) resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (locationFilter) locationFilter.value = '';
        if (statusFilter) statusFilter.value = '';
        currentPage = 1;
        renderOffers();
    });

    renderOffers();
}

// ============================================
// APPLICATION FORM
// ============================================
function initApplicationForm() {
    const form = document.getElementById('applicationForm');
    if (!form) return;

    // Populate offers dropdown
    const offerSelect = document.getElementById('offerSelect');
    if (offerSelect) {
        const offers = DataStore.getOffers().filter(o => o.status === 'ouvert');
        offers.forEach(offer => {
            const option = document.createElement('option');
            option.value = offer.id;
            option.textContent = `${offer.ref} - ${offer.title}`;
            offerSelect.appendChild(option);
        });

        // Pre-select from URL
        const urlParams = new URLSearchParams(window.location.search);
        const preselect = urlParams.get('offer');
        if (preselect) offerSelect.value = preselect;
    }

    // File input display
    document.querySelectorAll('.file-input-wrapper input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const display = this.parentElement.querySelector('.file-input-display span');
            if (this.files.length > 0) {
                display.textContent = this.files[0].name;
                display.style.color = 'var(--success)';
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const candidate = {
            id: 'CAND-' + Date.now(),
            trackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            offerId: formData.get('offerId'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            birthDate: formData.get('birthDate'),
            birthPlace: formData.get('birthPlace'),
            nationality: formData.get('nationality'),
            gender: formData.get('gender'),
            familyStatus: formData.get('familyStatus'),
            numChildren: formData.get('numChildren'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            wilaya: formData.get('wilaya'),
            diploma: formData.get('diploma'),
            specialty: formData.get('specialty'),
            graduationYear: formData.get('graduationYear'),
            university: formData.get('university'),
            experience: formData.get('experience'),
            currentJob: formData.get('currentJob'),
            experienceDetails: formData.get('experienceDetails'),
            motivation: formData.get('motivation'),
            status: 'nouveau',
            submittedAt: new Date().toISOString()
        };

        DataStore.addCandidate(candidate);

        // Show success modal
        const modal = document.getElementById('successModal');
        if (modal) {
            document.getElementById('trackingNumber').textContent = candidate.trackingNumber;
            document.getElementById('submissionDate').textContent = new Date().toLocaleDateString('fr-FR');
            modal.classList.add('active');
        }

        form.reset();
    });
}

// ============================================
// ADMIN DASHBOARD
// ============================================
function initAdmin() {
    const loginScreen = document.getElementById('loginScreen');
    const adminDashboard = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('loginForm');

    if (!loginScreen || !adminDashboard) return;

    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem('enafor_admin_loggedin');
    if (isLoggedIn === 'true') {
        loginScreen.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        initAdminDashboard();
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            const admin = DataStore.getAdmin();

            if (email === admin.email && password === admin.password) {
                sessionStorage.setItem('enafor_admin_loggedin', 'true');
                loginScreen.classList.add('hidden');
                adminDashboard.classList.remove('hidden');
                initAdminDashboard();
            } else {
                alert('Email ou mot de passe incorrect!');
            }
        });
    }
}

function initAdminDashboard() {
    // Navigation
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');

            navItems.forEach(n => n.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(section + 'Section').classList.add('active');
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('enafor_admin_loggedin');
            window.location.reload();
        });
    }

    // Update stats
    updateAdminStats();

    // Render tables
    renderOffersTable();
    renderCandidatesTable();
    renderRecentItems();

    // Add offer
    const addOfferBtn = document.getElementById('addOfferBtn');
    if (addOfferBtn) {
        addOfferBtn.addEventListener('click', function() {
            openOfferModal();
        });
    }

    // Offer form
    const offerForm = document.getElementById('offerForm');
    if (offerForm) {
        offerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveOffer();
        });
    }

    // Modal close
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Settings
    const resetDataBtn = document.getElementById('resetDataBtn');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', function() {
            if (confirm('Attention! Cette action supprimera toutes les donnees. Continuer?')) {
                DataStore.resetAll();
                alert('Donnees reinitialisees!');
                window.location.reload();
            }
        });
    }

    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function() {
            const data = {
                offers: DataStore.getOffers(),
                candidates: DataStore.getCandidates(),
                admin: DataStore.getAdmin()
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'enafor_data_' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
        });
    }

    // Change password
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;

            if (newPass !== confirmPass) {
                alert('Les mots de passe ne correspondent pas!');
                return;
            }

            const admin = DataStore.getAdmin();
            admin.password = newPass;
            DataStore.saveAdmin(admin);
            alert('Mot de passe modifie avec succes!');
            changePasswordForm.reset();
        });
    }
}

function updateAdminStats() {
    const offers = DataStore.getOffers();
    const candidates = DataStore.getCandidates();

    const totalOffers = document.getElementById('totalOffers');
    const totalCandidates = document.getElementById('totalCandidates');
    const pendingCandidates = document.getElementById('pendingCandidates');
    const openOffers = document.getElementById('openOffers');

    if (totalOffers) totalOffers.textContent = offers.length;
    if (totalCandidates) totalCandidates.textContent = candidates.length;
    if (pendingCandidates) pendingCandidates.textContent = candidates.filter(c => c.status === 'nouveau').length;
    if (openOffers) openOffers.textContent = offers.filter(o => o.status === 'ouvert').length;
}

function renderOffersTable() {
    const tbody = document.getElementById('offersTableBody');
    if (!tbody) return;

    const offers = DataStore.getOffers();
    tbody.innerHTML = offers.map(offer => `
        <tr>
            <td><strong>${offer.ref}</strong></td>
            <td>${offer.title}</td>
            <td>${getCategoryLabel(offer.category)}</td>
            <td>${getLocationLabel(offer.location)}</td>
            <td>${formatDate(offer.deadline)}</td>
            <td><span class="status-badge ${offer.status}">${offer.status}</span></td>
            <td>${countCandidatesForOffer(offer.id)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-view" onclick="viewOffer('${offer.id}')" title="Voir"><i class="fas fa-eye"></i></button>
                    <button class="btn-edit" onclick="editOffer('${offer.id}')" title="Modifier"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteOffer('${offer.id}')" title="Supprimer"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderCandidatesTable() {
    const tbody = document.getElementById('candidatesTableBody');
    if (!tbody) return;

    let candidates = DataStore.getCandidates();
    const statusFilter = document.getElementById('candidateStatusFilter');
    const searchFilter = document.getElementById('candidateSearch');

    if (statusFilter && statusFilter.value) {
        candidates = candidates.filter(c => c.status === statusFilter.value);
    }

    if (searchFilter && searchFilter.value) {
        const search = searchFilter.value.toLowerCase();
        candidates = candidates.filter(c => 
            c.firstName.toLowerCase().includes(search) || 
            c.lastName.toLowerCase().includes(search) ||
            c.trackingNumber.toLowerCase().includes(search)
        );
    }

    tbody.innerHTML = candidates.map(candidate => {
        const offer = DataStore.getOffers().find(o => o.id === candidate.offerId);
        return `
        <tr>
            <td><strong>${candidate.trackingNumber}</strong></td>
            <td>${candidate.firstName} ${candidate.lastName}</td>
            <td>${offer ? offer.title : 'N/A'}</td>
            <td>${formatDate(candidate.submittedAt)}</td>
            <td>${getDiplomaLabel(candidate.diploma)}</td>
            <td>${getExperienceLabel(candidate.experience)}</td>
            <td><span class="status-badge ${candidate.status}">${candidate.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-view" onclick="viewCandidate('${candidate.id}')" title="Voir"><i class="fas fa-eye"></i></button>
                    <button class="btn-edit" onclick="editCandidateStatus('${candidate.id}')" title="Statut"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteCandidate('${candidate.id}')" title="Supprimer"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `}).join('');
}

function renderRecentItems() {
    const recentCandidates = document.getElementById('recentCandidates');
    const recentOffers = document.getElementById('recentOffers');

    const candidates = DataStore.getCandidates().slice(-5).reverse();
    const offers = DataStore.getOffers().filter(o => o.status === 'ouvert').slice(-5).reverse();

    if (recentCandidates) {
        recentCandidates.innerHTML = candidates.length > 0 ? candidates.map(c => `
            <div class="recent-item">
                <div class="recent-item-info">
                    <strong>${c.firstName} ${c.lastName}</strong>
                    <span>${formatDate(c.submittedAt)}</span>
                </div>
                <span class="recent-item-status status-badge ${c.status}">${c.status}</span>
            </div>
        `).join('') : '<p style="color:var(--gray);text-align:center;padding:20px;">Aucune candidature</p>';
    }

    if (recentOffers) {
        recentOffers.innerHTML = offers.length > 0 ? offers.map(o => `
            <div class="recent-item">
                <div class="recent-item-info">
                    <strong>${o.title}</strong>
                    <span>${o.ref}</span>
                </div>
                <span class="recent-item-status status-badge ${o.status}">${o.status}</span>
            </div>
        `).join('') : '<p style="color:var(--gray);text-align:center;padding:20px;">Aucun appel d\'offres</p>';
    }
}

// Admin actions
window.viewOffer = function(id) {
    const offer = DataStore.getOffers().find(o => o.id === id);
    if (offer) {
        alert(`Titre: ${offer.title}
Ref: ${offer.ref}
Description: ${offer.description}
Profil: ${offer.profile}`);
    }
};

window.editOffer = function(id) {
    const offer = DataStore.getOffers().find(o => o.id === id);
    if (offer) {
        openOfferModal(offer);
    }
};

window.deleteOffer = function(id) {
    if (confirm('Supprimer cet appel d\'offres?')) {
        const offers = DataStore.getOffers().filter(o => o.id !== id);
        DataStore.saveOffers(offers);
        renderOffersTable();
        updateAdminStats();
    }
};

window.viewCandidate = function(id) {
    const candidate = DataStore.getCandidates().find(c => c.id === id);
    if (candidate) {
        const content = document.getElementById('candidateDetailContent');
        if (content) {
            content.innerHTML = `
                <div style="display:grid;gap:15px;">
                    <p><strong>Nom:</strong> ${candidate.firstName} ${candidate.lastName}</p>
                    <p><strong>Email:</strong> ${candidate.email}</p>
                    <p><strong>Telephone:</strong> ${candidate.phone}</p>
                    <p><strong>Diplome:</strong> ${getDiplomaLabel(candidate.diploma)} - ${candidate.specialty}</p>
                    <p><strong>Experience:</strong> ${getExperienceLabel(candidate.experience)}</p>
                    <p><strong>Motivation:</strong> ${candidate.motivation}</p>
                    <p><strong>Date:</strong> ${formatDate(candidate.submittedAt)}</p>
                </div>
            `;
            document.getElementById('candidateModal').classList.add('active');
        }
    }
};

window.editCandidateStatus = function(id) {
    const statuses = ['nouveau', 'en-cours', 'retenu', 'refuse'];
    const newStatus = prompt('Nouveau statut (' + statuses.join(', ') + '):');
    if (newStatus && statuses.includes(newStatus)) {
        const candidates = DataStore.getCandidates();
        const candidate = candidates.find(c => c.id === id);
        if (candidate) {
            candidate.status = newStatus;
            DataStore.saveCandidates(candidates);
            renderCandidatesTable();
            updateAdminStats();
        }
    }
};

window.deleteCandidate = function(id) {
    if (confirm('Supprimer cette candidature?')) {
        const candidates = DataStore.getCandidates().filter(c => c.id !== id);
        DataStore.saveCandidates(candidates);
        renderCandidatesTable();
        updateAdminStats();
    }
};

function openOfferModal(offer = null) {
    const modal = document.getElementById('offerModal');
    const form = document.getElementById('offerForm');
    const title = document.getElementById('offerModalTitle');

    if (offer) {
        title.innerHTML = '<i class="fas fa-edit"></i> Modifier Appel d\'Offres';
        document.getElementById('offerId').value = offer.id;
        document.getElementById('offerRef').value = offer.ref;
        document.getElementById('offerTitle').value = offer.title;
        document.getElementById('offerCategory').value = offer.category;
        document.getElementById('offerLocation').value = offer.location;
        document.getElementById('offerContract').value = offer.contract;
        document.getElementById('offerDeadline').value = offer.deadline;
        document.getElementById('offerDescription').value = offer.description;
        document.getElementById('offerProfile').value = offer.profile || '';
        document.getElementById('offerStatus').value = offer.status;
        document.getElementById('offerPositions').value = offer.positions;
    } else {
        title.innerHTML = '<i class="fas fa-plus"></i> Nouvel Appel d\'Offres';
        form.reset();
        document.getElementById('offerId').value = '';
    }

    modal.classList.add('active');
}

function saveOffer() {
    const id = document.getElementById('offerId').value;
    const offers = DataStore.getOffers();

    const offerData = {
        id: id || 'AO-' + new Date().getFullYear() + '-' + String(offers.length + 1).padStart(3, '0'),
        ref: document.getElementById('offerRef').value,
        title: document.getElementById('offerTitle').value,
        category: document.getElementById('offerCategory').value,
        location: document.getElementById('offerLocation').value,
        contract: document.getElementById('offerContract').value,
        deadline: document.getElementById('offerDeadline').value,
        description: document.getElementById('offerDescription').value,
        profile: document.getElementById('offerProfile').value,
        status: document.getElementById('offerStatus').value,
        positions: parseInt(document.getElementById('offerPositions').value),
        createdAt: new Date().toISOString()
    };

    if (id) {
        const index = offers.findIndex(o => o.id === id);
        if (index !== -1) {
            offers[index] = { ...offers[index], ...offerData };
        }
    } else {
        offers.push(offerData);
    }

    DataStore.saveOffers(offers);
    document.getElementById('offerModal').classList.remove('active');
    renderOffersTable();
    updateAdminStats();
}

function countCandidatesForOffer(offerId) {
    return DataStore.getCandidates().filter(c => c.offerId === offerId).length;
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function getCategoryLabel(category) {
    const labels = {
        'forage': 'Forage',
        'workover': 'Work Over',
        'maintenance': 'Maintenance',
        'engineering': 'Engineering',
        'qhse': 'QHSE',
        'administration': 'Administration',
        'informatique': 'Informatique',
        'logistique': 'Logistique',
        'formation': 'Formation'
    };
    return labels[category] || category;
}

function getLocationLabel(location) {
    const labels = {
        'hassi-messaoud': 'Hassi Messaoud',
        'alger': 'Alger',
        'ouargla': 'Ouargla',
        'illizi': 'Illizi',
        'national': 'National',
        'international': 'International'
    };
    return labels[location] || location;
}

function getContractLabel(contract) {
    const labels = {
        'cdi': 'CDI',
        'cdd': 'CDD',
        'stage': 'Stage',
        'apprentissage': 'Apprentissage'
    };
    return labels[contract] || contract;
}

function getDiplomaLabel(diploma) {
    const labels = {
        'bac': 'Baccalaureat',
        'bts': 'BTS/DUT',
        'licence': 'Licence',
        'master': 'Master',
        'ingenieur': 'Ingenieur',
        'doctorat': 'Doctorat',
        'autre': 'Autre'
    };
    return labels[diploma] || diploma;
}

function getExperienceLabel(exp) {
    const labels = {
        '0': 'Sans experience',
        '1-3': '1 a 3 ans',
        '3-5': '3 a 5 ans',
        '5-10': '5 a 10 ans',
        '10+': 'Plus de 10 ans'
    };
    return labels[exp] || exp;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initNavigation();
    initCounters();
    initLatestOffers();
    initOffersList();
    initApplicationForm();
    initAdmin();
});
