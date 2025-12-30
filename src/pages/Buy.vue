<template>
    <div class="gos-buyback-page">
        <Header />

        <section class="hero-section text-center py-4">
            <h1 class="hero-title">{{ $t('buy.title') }}</h1>
            <p class="hero-subtitle">{{ $t('buy.description') }}</p>
        </section>

        <section class="packages-section py-5">
            <div class="container">
                <div class="row g-4 justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="package-card text-left">
                            <div class="package-header text-center">
                                <h3>{{ $t('buy.require') }}</h3>
                            </div>

                            <div class="package-body">
                                <ul class="policy-list" v-if="currentLocale === 'vi'">
                                    <li>📸 Thông tin <strong>chỉ số cầu thủ</strong> trong game</li>
                                    <li>🪪 Thông tin <strong>card name</strong> trong game</li>
                                    <li>💰 Thông tin <strong>vàng & kim cương</strong> hiện có</li>
                                    <li>✅ Ảnh chụp <strong>rõ nét, đầy đủ thông tin</strong></li>
                                    <li>❌ Không chỉnh sửa, không che số liệu</li>
                                    <li>💬 Giá thu mua <strong>theo thỏa thuận</strong></li>
                                </ul>
                                <ul class="policy-list" v-else>
                                    <li>📸 Player <strong>stats information</strong> in game</li>
                                    <li>🪪 Player <strong>card name</strong> information</li>
                                    <li>💰 Current <strong>gold & diamonds</strong></li>
                                    <li>
                                        ✅ Screenshot must be <strong>clear and complete</strong>
                                    </li>
                                    <li>❌ No editing, no covering numbers</li>
                                    <li>💬 Purchase price <strong>by agreement</strong></li>
                                </ul>
                            </div>

                            <div class="package-contact text-center mt-auto">
                                <span>{{ $t('buy.contact') }}</span>
                                <a
                                    href="https://www.facebook.com/hungdao123"
                                    target="_blank"
                                    class="contact-icon fb"
                                >
                                    <i class="fa-brands fa-facebook"></i>
                                </a>
                                <a
                                    href="https://www.tiktok.com/@hungdls97"
                                    target="_blank"
                                    class="contact-icon tt"
                                >
                                    <i class="fa-brands fa-tiktok"></i>
                                </a>
                                <a
                                    href="https://zalo.me/0935678597"
                                    target="_blank"
                                    class="contact-icon zl text-decoration-none fw-bold"
                                >
                                    Z
                                </a>
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
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import Footer from '../components/Footer.vue'
    import Header from '../components/Header.vue'

    const { locale } = useI18n()
    const currentLocale = computed(() => locale.value)
</script>

<style scoped>
    .gos-buyback-page {
        font-family: 'Montserrat', sans-serif;
        background: #ffffff;
    }

    .hero-section {
        background: #d3dbdd;
        border-radius: 15px;
        color: #000;
    }
    .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
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

    .package-card {
        background: linear-gradient(135deg, #033155, #e53d69);
        border-radius: 15px;
        padding: 25px;
        color: #fff;
        position: relative;
        height: 320px;
        display: flex;
        flex-direction: column;
    }

    .package-tag {
        position: absolute;
        top: 15px;
        left: -40px;
        background: linear-gradient(135deg, #ff0000, #ffdd00);
        padding: 5px 60px;
        transform: rotate(-45deg);
        font-weight: bold;
        font-size: 0.75rem;
        box-shadow: 0 0 12px rgba(255, 221, 0, 0.9);
    }

    .policy-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .policy-list li {
        margin-bottom: 10px;
        font-size: 1rem;
    }

    .package-contact {
        margin-top: auto;
    }

    .contact-icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 50%;
        margin: 0 5px;
        color: #fff;
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
    }
</style>
