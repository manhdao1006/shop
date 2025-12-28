<template>
    <div
        class="home-container"
        style="background: linear-gradient(135deg, #54bfdd 0%, #033155 100%)"
    >
        <div
            class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-team"
        >
            <!-- <LanguageSwitcher
                class="shadow position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center"
            /> -->

            <div
                v-if="showPopup"
                class="popup-overlay d-flex align-items-center justify-content-center"
            >
                <div
                    class="popup-content bg-white rounded shadow p-4 text-center position-relative"
                >
                    <button
                        class="btn-close position-absolute top-0 end-0 m-2"
                        @click="closePopup"
                    ></button>
                    <img
                        src="https://res.cloudinary.com/springboot-cloud/image/upload/v1766849051/chu-shop_tcdriz.jpg"
                        alt="Ý nghĩa logo"
                        title="Ý nghĩa logo"
                        class="rounded rounded-circle"
                        width="200px"
                    />
                    <div class="popup-body">
                        <h5 class="fw-bold text-primary-emphasis mb-2">
                            👋 Hữu Hưng nổi lên để thông báo
                        </h5>
                        <div>
                            Shop sẽ
                            <strong class="text-danger">hủy gói không hoàn tiền</strong> dưới các
                            trường hợp:
                        </div>
                        <ul class="popup-list">
                            <li>Khách hàng tự ý vào acc khi không thông báo với shop</li>
                            <li>Khách hàng tự sử dụng vàng và kim cương</li>
                            <li>Khách hàng tự ý hủy liên kết acc</li>
                        </ul>
                        <div>
                            Thời hạn cày là <strong class="text-danger">45 ngày</strong> tính từ
                            thời điểm Khách hàng giao mã liên kết
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100 align-items-center">
                <div class="col-12 col-md-5 text-center mb-4 mb-md-0 fade-up">
                    <img
                        src="https://res.cloudinary.com/springboot-cloud/image/upload/v1766846898/HuHu-DLS-removebg-preview_so5iey.png"
                        alt="HuHu DLS"
                        title="HuHu DLS"
                        class="img-fluid mb-3 hover-scale"
                        role="button"
                        style="max-width: 220px"
                        @click="openPopup"
                    />
                    <h4 class="fst-italic text-white">STK: 555575575 (MB Bank)</h4>
                    <h4 class="fst-italic text-white">ZALO: 0935678597</h4>
                    <h3
                        class="fw-bold bg-white text-primary-emphasis px-3 py-2 rounded mt-2 d-inline-block"
                    >
                        Hữu Hưng DLS
                    </h3>

                    <div class="row mt-3">
                        <div class="col-12 d-flex justify-content-center gap-4 fs-1">
                            <a
                                class="text-white"
                                href="https://www.facebook.com/hungdao123"
                                target="_blank"
                                title="Facebook"
                            >
                                <i class="fa-brands fa-facebook"></i>
                            </a>
                            <a
                                class="text-white"
                                href="https://www.tiktok.com/@hungdls97"
                                target="_blank"
                                title="Tiktok"
                            >
                                <i class="fa-brands fa-tiktok"></i>
                            </a>
                        </div>
                    </div>

                    <div class="row">
                        <footer class="text-start text-white py-3 copy-right-mobile">
                            © Copyright 2026 by Hữu Hưng DLS
                        </footer>
                        <footer class="text-start text-white py-1">
                            Dev:
                            <a
                                href="https://linktr.ee/manodev_306620"
                                class="text-danger text-decoration-none fw-bold"
                                target="_blank"
                                >Mạnh Đào</a
                            >
                        </footer>
                    </div>
                </div>

                <div class="col-12 col-md-7 fade-up delay-1">
                    <div class="row justify-content-center">
                        <div v-for="item in menuItems" :key="item.label" class="col-6 mb-3">
                            <div
                                class="menu-card menu-card--glow"
                                role="button"
                                @click="goTo(item.route)"
                                :title="item.label"
                            >
                                <div class="icon-wrapper">
                                    <i :class="item.icon"></i>
                                </div>
                                <h5 class="fw-bold text-uppercase mt-3">{{ item.label }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wave-container">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        d="M0,60 C240,120 480,0 720,40 960,80 1200,20 1440,60 L1440,120 L0,120 Z"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const menuItems = computed(() => [
        {
            label: 'Shop acc DLS',
            icon: 'bi bi-cash-coin',
            route: '/cua-hang'
        },
        {
            label: 'Thu mua acc DLS',
            icon: 'bi bi-cart-plus-fill',
            route: '/thu-mua'
        },
        {
            label: 'Cày vàng + kim cương',
            icon: 'bi bi-gem',
            route: '/tai-nguyen'
        },
        {
            label: 'Cày huyền thoại + sự kiện',
            icon: 'bi bi-calendar-event-fill',
            route: '/su-kien'
        }
    ])

    function goTo(route: string) {
        router.push(route)
    }

    const showPopup = ref(true)
    function openPopup() {
        showPopup.value = true
    }

    function closePopup() {
        showPopup.value = false
    }

    onMounted(() => {
        showPopup.value = true
    })
</script>

<style scoped>
    .popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        z-index: 9999;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;

        animation: popupZoom 0.3s ease-out;
    }

    @keyframes popupZoom {
        from {
            opacity: 0;
            transform: scale(0.85);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    .popup-body {
        text-align: left;
        font-size: 0.95rem;
        margin-top: 20px;
    }

    .popup-list {
        padding-left: 18px;
        margin: 0;
    }

    .popup-list li {
        margin-bottom: 6px;
    }

    .fade-up {
        animation: fadeUp 0.8s ease-out both;
    }

    .delay-1 {
        animation-delay: 0.2s;
    }
    .delay-2 {
        animation-delay: 0.4s;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .menu-card {
        transition: all 0.3s ease;
        position: relative;
    }

    .menu-card:hover {
        transform: translateY(-8px) scale(1.05);
        box-shadow: 0 15px 35px rgba(84, 191, 221, 0.4);
    }
    .menu-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(84, 191, 221, 0.6);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .menu-card:hover::after {
        opacity: 1;
    }

    .home-container {
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .bg-team {
        min-height: 100vh;
        position: relative;
        background-image: url('https://res.cloudinary.com/springboot-cloud/image/upload/v1766825196/bg-home-shop_m42jgf.jpg');
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }

    .bg-team::before {
        content: '';
        position: absolute;
        inset: -20%;
        background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255, 255, 255, 0.12),
            transparent 70%
        );
        animation: lightSweep 10s linear infinite;
    }

    @keyframes lightSweep {
        from {
            transform: translateX(-30%) rotate(0deg);
        }
        to {
            transform: translateX(30%) rotate(360deg);
        }
    }
    .wave-container {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 120px;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
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

    .hover-scale {
        transition: transform 0.2s ease-in-out;
    }
    .hover-scale:hover {
        transform: scale(1.05);
    }

    .menu-card--glow {
        background: #fff;
        border-radius: 16px;
        padding: 16px;
        text-align: center;
        transition: all 0.35s ease;
        position: relative;
        overflow: hidden;
    }
    .menu-card--glow > h5 {
        color: #033155;
    }

    .menu-card--glow::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(84, 191, 221, 0.35),
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .menu-card--glow:hover::before {
        opacity: 1;
    }

    .menu-card--glow:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0 20px 40px rgba(3, 49, 85, 0.35);
    }

    .icon-wrapper {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: linear-gradient(135deg, #54bfdd, #033155);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        color: #fff;
        font-size: 32px;
        box-shadow: 0 8px 20px rgba(3, 49, 85, 0.35);
        transition: transform 0.3s ease;
    }

    .menu-card--glow:hover .icon-wrapper {
        transform: rotate(6deg) scale(1.1);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @media (min-width: 1025px) {
        .bg-team {
            background-size: cover;
        }
        .menu-card {
            width: 350px;
        }

        .popup-content {
            max-width: 600px;
        }
        .popup-content img {
            max-width: 550px;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .bg-team {
            background-size: contain;
        }
        .menu-card {
            width: 250px;
            margin: auto;
        }
        .team-img > img {
            max-width: 180px !important;
        }

        .popup-content {
            max-width: 550px;
        }
        .popup-content > img {
            max-width: 500px;
        }
    }

    @media (max-width: 768px) {
        .bg-team {
            background-size: cover;
            background-position: top;
        }
        .menu-card {
            width: 170px;
            margin: auto;
            height: 170px;
        }
        .team-img img {
            max-width: 140px !important;
        }
        h3 {
            font-size: 1.2rem;
        }
        h5 {
            font-size: 0.9rem;
        }

        .popup-content {
            max-width: 350px;
            padding: 1rem;
        }
        .popup-content img {
            max-width: 300px;
            height: auto;
        }
    }
</style>
