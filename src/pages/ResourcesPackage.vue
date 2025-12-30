<template>
    <div class="gos-packages-page">
        <Header />

        <div
            v-if="showPopup"
            class="popup-overlay d-flex align-items-center justify-content-center"
        >
            <div class="popup-content bg-white rounded shadow p-4 text-center position-relative">
                <button
                    class="btn-close position-absolute top-0 end-0 m-2"
                    @click="closePopup"
                ></button>
                <img
                    src="https://res.cloudinary.com/springboot-cloud/image/upload/v1766849051/chu-shop_tcdriz.jpg"
                    alt="HuHu DLS"
                    title="HuHu DLS"
                    class="rounded rounded-circle"
                    width="200px"
                />
                <div class="popup-body">
                    <h5 class="fw-bold text-primary-emphasis mb-2">
                        {{ $t('home.popup.title') }}
                    </h5>
                    <template v-if="currentLocale === 'vi'">
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
                    </template>
                    <template v-else>
                        <div>
                            The store will
                            <strong class="text-danger">cancel the non-refundable package</strong>
                            below in the following cases:
                        </div>
                        <ul class="popup-list">
                            <li>Customer accesses the account without notifying the shop</li>
                            <li>Customer uses gold and diamonds without permission</li>
                            <li>Customer automatically cancels the linked account</li>
                        </ul>
                        <div>
                            The grinding time is
                            <strong class="text-danger">45 days</strong> from the time the
                            customer's account is linked and encrypted.
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <section class="hero-section text-center py-4">
            <h1 class="hero-title">{{ $t('resources.title') }}</h1>
            <p class="hero-subtitle">{{ $t('resources.title') }}</p>
        </section>

        <section class="packages-section py-5">
            <div class="container">
                <div class="row g-4 justify-content-center">
                    <div v-for="pkg in packages" :key="pkg.name" class="col-6 col-md-4 col-lg-3">
                        <div class="package-card text-center">
                            <div class="package-tag">{{ $t('resources.promote') }}</div>
                            <div class="package-header">
                                <h3>{{ pkg.name }}</h3>
                            </div>
                            <div class="package-body">
                                <p v-if="pkg.gold">
                                    {{ $t('resources.gold') }}<strong>{{ pkg.gold }}</strong>
                                </p>
                                <p v-if="pkg.kc">
                                    {{ $t('resources.diamond') }}<strong>{{ pkg.kc }}</strong>
                                </p>
                                <p v-if="pkg.price">
                                    {{ $t('resources.price') }}<strong>{{ pkg.price }}</strong>
                                </p>
                                <p v-if="pkg.note" class="package-note">{{ pkg.note }}</p>
                            </div>

                            <div class="package-contact mt-auto">
                                <span> {{ $t('resources.contact') }}</span>
                                <a
                                    href="https://www.facebook.com/hungdao123"
                                    target="_blank"
                                    class="contact-icon fb"
                                    ><i class="fa-brands fa-facebook"></i
                                ></a>
                                <a
                                    href="https://www.tiktok.com/@hungdls97"
                                    target="_blank"
                                    class="contact-icon tt"
                                    ><i class="fa-brands fa-tiktok"></i
                                ></a>
                                <a
                                    href="https://zalo.me/0935678597"
                                    target="_blank"
                                    class="contact-icon zl text-decoration-none fw-bold"
                                    >Z</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import Footer from '../components/Footer.vue'
    import Header from '../components/Header.vue'

    const { locale } = useI18n()
    const currentLocale = computed(() => locale.value)

    const packages = computed(() => {
        if (currentLocale.value === 'vi') {
            return [
                { name: 'Gói VIP', note: 'Giá và vật phẩm theo thỏa thuận' },
                { name: '500K', gold: '180.000', kc: '7.000', price: '500K VNĐ' },
                { name: '400K', gold: '140.000', kc: '5.500', price: '400K VNĐ' },
                { name: '300K', gold: '90.000', kc: '3.000', price: '300K VNĐ' },
                { name: '200K', gold: '65.000', kc: '2.500', price: '200K VNĐ' },
                { name: '150K', gold: '45.000', kc: '1.800', price: '150K VNĐ' },
                { name: '100K', gold: '30.000', kc: '1.200', price: '100K VNĐ' },
                { name: '50K', gold: '15.000', kc: '600', price: '50K VNĐ' }
            ]
        }

        return [
            { name: 'VIP Package', note: 'Price and items are negotiable' },
            { name: '$19', gold: '180,000', kc: '7,000', price: '$19' },
            { name: '$15', gold: '140,000', kc: '5,500', price: '$15' },
            { name: '$11,5', gold: '90,000', kc: '3,000', price: '$11,5' },
            { name: '$7,5', gold: '65,000', kc: '2,500', price: '$7,5' },
            { name: '$6', gold: '45,000', kc: '1,800', price: '$6' },
            { name: '$4', gold: '30,000', kc: '1,200', price: '$4' },
            { name: '$2', gold: '15,000', kc: '600', price: '$2' }
        ]
    })

    const showPopup = ref(true)

    function closePopup() {
        showPopup.value = false
    }

    onMounted(() => {
        showPopup.value = true
    })
</script>

<style scoped>
    .gos-packages-page {
        font-family: 'Montserrat', sans-serif;
        background: #ffffff;
    }

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

    .hero-section {
        background: #d3dbdd;
        color: #000000;
    }
    .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    .hero-subtitle {
        width: 93%;
        border-radius: 15px;
        margin: 0 auto;
        font-size: 1.2rem;
        color: #ffffff;
        background: linear-gradient(135deg, #ff0000, #ffdd00);
        box-shadow:
            0 0 15px rgba(255, 221, 0, 0.9),
            0 0 10px rgba(255, 0, 0, 0.7);
        animation: subtitleTag 1s infinite;
    }
    @keyframes subtitleTag {
        0%,
        100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.85;
        }
    }

    .packages-section {
        padding: 50px 0;
    }
    .package-card {
        background: linear-gradient(135deg, #033155, #e53d69);
        border-radius: 15px;
        padding: 20px;
        position: relative;
        transition:
            transform 0.3s,
            box-shadow 0.3s;
        color: #fff;
        overflow: hidden;
        height: 200px;
    }
    .package-card:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
    }
    .package-tag {
        position: absolute;
        top: 15px;
        left: -40px;
        background: linear-gradient(135deg, #ff0000, #ffdd00);
        color: #fff;
        font-weight: bold;
        font-size: 0.75rem;
        padding: 5px 60px;
        text-transform: uppercase;
        transform: rotate(-45deg);
        box-shadow:
            0 0 15px rgba(255, 221, 0, 0.9),
            0 0 10px rgba(255, 0, 0, 0.7);
        animation: blinkTag 1s infinite;
        z-index: 10;
    }

    @keyframes blinkTag {
        0%,
        100% {
            transform: rotate(-45deg) scale(1);
            opacity: 1;
        }
        50% {
            transform: rotate(-45deg) scale(1.05);
            opacity: 0.85;
        }
    }
    .package-contact {
        margin-top: 10px;
    }
    .contact-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        margin: 0 5px;
        color: #fff;
        font-weight: bold;
        text-align: center;
        transition: transform 0.3s;
    }
    .contact-icon.fb {
        background: #1877f2;
    }
    .contact-icon.tt {
        background: #010101;
    }
    .contact-icon.zl {
        background: #54bfdd;
    }

    .contact-icon:hover {
        transform: scale(1.2);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    }

    .package-header h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 15px;
    }
    .package-body p {
        font-size: 1rem;
        margin: 5px 0;
    }
    .package-note {
        color: #ffdd57;
        font-style: italic;
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 1.8rem;
        }
        .hero-subtitle {
            font-size: 1rem;
        }
        .package-header h3 {
            font-size: 1.2rem;
        }
        .package-body p {
            font-size: 0.9rem;
        }
    }
</style>
