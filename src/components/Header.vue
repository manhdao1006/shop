<template>
    <nav class="navbar navbar-expand-lg navbar-dark w-100 navbar-wave">
        <div class="container-fluid">
            <router-link class="navbar-brand fw-bold text-black d-flex align-items-center" to="/">
                <img
                    src="https://res.cloudinary.com/springboot-cloud/image/upload/v1783424756/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1_xoxail.png"
                    alt="Seto Kanna Vietsub"
                    class="logo-navbar"
                />
                <span class="ms-3 brand-title">Seto Kanna Vietsub</span>
            </router-link>

            <language-switcher />
        </div>

        <div class="wave-container">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,60 C240,120 480,0 720,40 960,80 1200,20 1440,60 L1440,120 L0,120 Z" />
            </svg>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import LanguageSwitcher from '../views/LanguageSwitcher.vue'
</script>

<style scoped>
    .navbar-wave {
        position: relative;
        background: linear-gradient(135deg, #ffffff 0%, #033155 35%, #54bfdd 100%);
    }

    .navbar-wave .brand-title,
    .navbar-wave .nav-link {
        color: #ffffff;
    }

    .navbar-wave .nav-link:hover {
        color: #ffdd57 !important;
    }

    .wave-container {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 80px;
        overflow: hidden;
        pointer-events: none;
    }

    .wave-container svg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        display: block;
        animation: waveMove 10s linear infinite;
    }

    .wave-container path {
        fill: rgba(255, 255, 255, 0.15);
    }

    @keyframes waveMove {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
    }
    .logo-navbar {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 50%;
    }

    .brand-title {
        font-size: 1.2rem;
        color: #ffffff;
    }

    .nav-link {
        font-weight: 500;
        color: #000000;
        transition: color 0.3s ease;
    }

    .nav-link:hover {
        color: red !important;
    }

    @media (max-width: 768px) {
        .logo-navbar {
            width: 50px;
            height: 50px;
        }

        .brand-title {
            font-size: 1rem;
        }

        .nav-link {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .logo-navbar {
            width: 70px;
            height: 70px;
        }

        .brand-title {
            font-size: 1.3rem;
        }

        .nav-link {
            font-size: 1rem;
        }
    }

    @media (min-width: 1025px) {
        .logo-navbar {
            width: 100px;
            height: 100px;
        }

        .brand-title {
            font-size: 1.5rem;
        }

        .nav-link {
            font-size: 1.05rem;
        }
    }
</style>
