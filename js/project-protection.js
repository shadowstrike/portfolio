// Project Protection for NDA Projects
// Uses SHA-256 hashing with salt for password verification

(function() {
    'use strict';

    // Configuration
    const SALT = 'cf1nt_pr0j3ct_2026_s3cur3';
    // Pre-computed hash of password + salt using SHA-256
    const PASSWORD_HASH = '20cb939ffd853b26f4a95fd7708eaeb4bf212e2052efc1916e3f152a53e1acfd';
    const SESSION_KEY = 'confluent_project_access';

    // Check if already authenticated in this session
    if (sessionStorage.getItem(SESSION_KEY) === 'authenticated') {
        return;
    }

    // Create password modal
    function createPasswordModal() {
        const modal = document.createElement('div');
        modal.id = 'project-password-modal';
        modal.innerHTML = `
            <div class="password-modal-overlay">
                <div class="password-modal-content">
                    <div class="password-modal-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                    </div>
                    <h2>Protected Project</h2>
                    <div class="nda-notice">
                        <p><strong>⚠️ NDA Protected Content</strong></p>
                        <p>These Confluent projects contain confidential design work under NDA. Detailed walkthroughs are available during face-to-face discussions.</p>
                        <p>If you have been provided with access credentials, please enter the password below.</p>
                    </div>
                    <form id="password-form">
                        <div class="password-input-group">
                            <input
                                type="password"
                                id="project-password"
                                placeholder="Enter password"
                                autocomplete="off"
                                required
                            >
                            <button type="submit" class="password-submit-btn">Unlock</button>
                        </div>
                        <div id="password-error" class="password-error"></div>
                    </form>
                    <div class="password-modal-footer">
                        <a href="../index.html#work" class="back-to-portfolio">← Back to Portfolio</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Focus on password input
        setTimeout(() => {
            document.getElementById('project-password').focus();
        }, 100);

        // Handle form submission
        document.getElementById('password-form').addEventListener('submit', handlePasswordSubmit);
    }

    // SHA-256 hash function
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Handle password submission
    async function handlePasswordSubmit(e) {
        e.preventDefault();

        const passwordInput = document.getElementById('project-password');
        const errorDiv = document.getElementById('password-error');
        const password = passwordInput.value.trim();

        if (!password) {
            showError('Please enter a password');
            return;
        }

        // Hash the entered password with salt
        const hashedPassword = await sha256(password + SALT);

        // Compare with stored hash
        if (hashedPassword === PASSWORD_HASH) {
            // Correct password
            sessionStorage.setItem(SESSION_KEY, 'authenticated');

            // Remove modal with animation
            const modal = document.getElementById('project-password-modal');
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        } else {
            // Wrong password
            showError('Incorrect password. Please try again.');
            passwordInput.value = '';
            passwordInput.focus();

            // Add shake animation
            passwordInput.parentElement.classList.add('shake');
            setTimeout(() => {
                passwordInput.parentElement.classList.remove('shake');
            }, 500);
        }
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.getElementById('password-error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';

        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }

    // Initialize protection
    createPasswordModal();

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #project-password-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        .password-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            backdrop-filter: blur(10px);
        }

        .password-modal-content {
            background: var(--color-card-bg);
            border-radius: var(--radius-lg);
            padding: 3rem 2.5rem;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--color-border);
            animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .password-modal-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--color-accent), #5B9FFF);
            border-radius: 50%;
            color: white;
        }

        .password-modal-content h2 {
            text-align: center;
            margin-bottom: 1.5rem;
            color: var(--color-text);
            font-size: 1.75rem;
        }

        .nda-notice {
            background: linear-gradient(to right, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05));
            border-left: 4px solid #FF9800;
            border-radius: var(--radius-md);
            padding: 1.5rem;
            margin-bottom: 2rem;
        }

        .nda-notice p {
            margin-bottom: 0.75rem;
            font-size: 0.9375rem;
            line-height: 1.6;
            color: var(--color-text);
        }

        .nda-notice p:last-child {
            margin-bottom: 0;
        }

        .nda-notice strong {
            color: #FF9800;
            font-weight: 600;
        }

        .password-input-group {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        #project-password {
            flex: 1;
            padding: 0.875rem 1rem;
            border: 2px solid var(--color-border);
            border-radius: var(--radius-md);
            font-size: 1rem;
            background: var(--color-bg);
            color: var(--color-text);
            transition: all 0.2s ease;
        }

        #project-password:focus {
            outline: none;
            border-color: var(--color-accent);
            box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }

        .password-submit-btn {
            padding: 0.875rem 2rem;
            background: var(--color-accent);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }

        .password-submit-btn:hover {
            background: #005CE6;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        }

        .password-submit-btn:active {
            transform: translateY(0);
        }

        .password-error {
            display: none;
            color: #EF4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            text-align: center;
            padding: 0.5rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: var(--radius-sm);
        }

        .shake {
            animation: shake 0.5s ease;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .password-modal-footer {
            margin-top: 2rem;
            text-align: center;
        }

        .back-to-portfolio {
            color: var(--color-text-light);
            font-size: 0.9375rem;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .back-to-portfolio:hover {
            color: var(--color-accent);
        }

        /* Dark mode adjustments */
        [data-theme="dark"] .nda-notice {
            background: linear-gradient(to right, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.08));
        }

        @media (max-width: 480px) {
            .password-modal-content {
                padding: 2rem 1.5rem;
            }

            .password-input-group {
                flex-direction: column;
            }

            .password-submit-btn {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
})();
