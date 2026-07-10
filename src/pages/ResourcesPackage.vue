<template>
    <div class="gos-packages-page">
        <Header />

        <section class="hero-section text-center py-3">
            <p class="hero-subtitle">{{ $t('resources.title') }}</p>
        </section>

        <!-- Donate -->
        <section class="donate-section py-5">
            <div class="container">
                <div class="donate-card">
                    <h3 class="donate-title">
                        ❤️ {{ currentLocale === 'vi' ? 'Ủng hộ mình' : 'Support Me' }}
                    </h3>

                    <p class="donate-text">
                        {{
                            currentLocale === 'vi'
                                ? 'Nếu những mã code này hữu ích, bạn có thể ủng hộ mình một ly cà phê ☕.'
                                : 'If these codes are helpful, you can support me with a cup of coffee ☕.'
                        }}
                    </p>

                    <img
                        src="https://res.cloudinary.com/springboot-cloud/image/upload/v1783596512/qrcode_ed58np.png"
                        alt="Donate QR"
                        class="donate-qr"
                    />

                    <p class="donate-note">
                        {{
                            currentLocale === 'vi'
                                ? 'Quét mã QR để donate hoặc qua đường link'
                                : 'Scan QR code to donate or link'
                        }}
                    </p>
                    <a
                        href="https://www.paypal.com/paypalme/KannaSeto"
                        target="_blank"
                        class="package-link"
                    >
                        Paypal
                    </a>
                </div>
            </div>
        </section>

        <section class="filter-section py-3">
            <div class="container text-center">
                <button
                    v-for="agency in agencies"
                    :key="agency"
                    class="filter-btn"
                    :class="{ active: selectedAgency === agency }"
                    @click="selectedAgency = agency"
                >
                    {{ agency }}
                </button>
            </div>
        </section>

        <section class="packages-section py-2">
            <div class="container">
                <div class="row g-4 justify-content-center">
                    <div v-for="pkg in packages" class="col-6 col-md-4 col-lg-3">
                        <div class="package-card">
                            <a :href="pkg.link_code" target="_blank" class="package-link">
                                <img
                                    :src="pkg.link_image"
                                    :alt="pkg.title_code"
                                    class="package-image"
                                />

                                <div class="package-content">
                                    <div class="package-description">
                                        {{ pkg.title_code }}
                                    </div>

                                    <div>{{ $t('resources.get_code') }}</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import Header from '../components/Header.vue'

    const { locale } = useI18n()
    const currentLocale = computed(() => locale.value)
    const selectedAgency = ref('ALL')

    const allPackages = computed(() => {
        if (currentLocale.value === 'vi') {
            return [
                {
                    link_image:
                        'https://res.cloudinary.com/springboot-cloud/image/upload/v1783642019/SONE-444_cnigju.png',
                    title_code: 'SONE - ??? - (3 số cuối)',
                    link_code: 'https://s.shopee.vn/AKYro7A9KO',
                    agency: 'S1'
                },
                {
                    link_image:
                        'https://res.cloudinary.com/springboot-cloud/image/upload/v1783558603/IPZZ-882_uglj6x.png',
                    title_code: 'IPZZ - ??? - (3 số cuối)',
                    link_code: 'https://s.shopee.vn/3ViW8ZoVPG',
                    agency: 'IP'
                },
                {
                    link_image:
                        'https://res.cloudinary.com/springboot-cloud/image/upload/v1783476050/SNOS-131_cgywcb.png',
                    title_code: 'SNOS - ??? - (3 số cuối)',
                    link_code: 'https://s.shopee.vn/111BASDBiv',
                    agency: 'S1'
                },
                {
                    link_image:
                        'https://res.cloudinary.com/springboot-cloud/image/upload/v1783425743/SNOS-210_beff8t.png',
                    title_code: 'SNOS - ??? - (3 số cuối)',
                    link_code: 'https://s.shopee.vn/40ejvlqfSl',
                    agency: 'S1'
                }
            ]
        }

        return [
            {
                link_image:
                    'https://res.cloudinary.com/springboot-cloud/image/upload/v1783642019/SONE-444_cnigju.png',
                title_code: 'SONE - ??? - (3 last number)',
                link_code: 'https://s.shopee.vn/AKYro7A9KO',
                agency: 'S1'
            },
            {
                link_image:
                    'https://res.cloudinary.com/springboot-cloud/image/upload/v1783558603/IPZZ-882_uglj6x.png',
                title_code: 'IPZZ - ??? - (3 last number)',
                link_code: 'https://s.shopee.vn/3ViW8ZoVPG',
                agency: 'IP'
            },
            {
                link_image:
                    'https://res.cloudinary.com/springboot-cloud/image/upload/v1783476050/SNOS-131_cgywcb.png',
                title_code: 'SNOS - ??? - (3 last number)',
                link_code: 'https://s.shopee.vn/111BASDBiv',
                agency: 'S1'
            },
            {
                link_image:
                    'https://res.cloudinary.com/springboot-cloud/image/upload/v1783425743/SNOS-210_beff8t.png',
                title_code: 'SNOS - ??? - (3 last number)',
                link_code: 'https://s.shopee.vn/40ejvlqfSl',
                agency: 'S1'
            }
        ]
    })

    const packages = computed(() => {
        if (selectedAgency.value === 'ALL') {
            return allPackages.value
        }

        return allPackages.value.filter((item) => item.agency === selectedAgency.value)
    })

    const agencies = computed(() => {
        const list = [...new Set(allPackages.value.map((item) => item.agency))]

        return ['ALL', ...list]
    })
</script>

<style scoped>
    .gos-packages-page {
        font-family: 'Montserrat', sans-serif;
        background: #ffffff;
    }

    .hero-section {
        background: #d3dbdd;
        color: #000000;
    }
    .hero-subtitle {
        width: 93%;
        border-radius: 15px;
        margin: 0 auto;
        font-size: 30px;
        font-weight: 700;
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
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 420px;
        background: linear-gradient(135deg, #ff0000, #ffdd00);
        border-radius: 15px;
        padding: 10px;
        transition: 0.3s;
        overflow: hidden;
    }

    .package-image {
        width: 100%;
        aspect-ratio: 2 / 3;
        object-fit: cover;
        display: block;
        border-radius: 10px;
    }

    .package-content {
        padding: 15px 15px 0 15px;
    }

    .package-description {
        font-size: 15px;
        color: #333;
    }

    .package-link {
        display: inline-block;
        color: #0d6efd;
        text-decoration: none;
        word-break: break-all;
    }

    .package-link:hover,
    .package-description:hover {
        text-decoration: none;
    }

    .filter-section {
        padding: 20px 0;
    }

    .filter-btn {
        margin: 5px;
        padding: 8px 18px;
        border: none;
        border-radius: 30px;
        background: #eee;
        cursor: pointer;
        transition: 0.3s;
        font-weight: 600;
    }

    .filter-btn:hover {
        background: #ffdd00;
    }

    .filter-btn.active {
        background: #ff0000;
        color: #fff;
    }

    /* Donate */

    .donate-section {
        background: #f8f9fa;
    }

    .donate-card {
        max-width: 420px;
        margin: auto;
        padding: 30px;
        text-align: center;
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .donate-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 15px;
    }

    .donate-text {
        color: #666;
        margin-bottom: 20px;
    }

    .donate-qr {
        width: 250px;
        max-width: 100%;
        border-radius: 12px;
        border: 5px solid #fff;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }

    .donate-note {
        margin-top: 15px;
        color: #999;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        .donate-card {
            padding: 20px;
        }

        .donate-title {
            font-size: 22px;
        }

        .donate-qr {
            width: 200px;
        }
    }

    @media (max-width: 991px) {
        .packages-section {
            padding: 35px 0;
        }

        .hero-subtitle {
            width: 96%;
            font-size: 22px;
            padding: 10px 15px;
        }

        .package-card {
            min-height: 360px;
        }

        .package-content {
            padding: 12px 12px 0 12px;
        }

        .package-description {
            font-size: 14px;
        }
    }

    @media (max-width: 767px) {
        .packages-section {
            padding: 20px 0;
        }

        .hero-section {
            padding: 15px 10px;
        }

        .hero-subtitle {
            width: 100%;
            font-size: 18px;
            padding: 10px;
            border-radius: 10px;
        }

        .package-card {
            min-height: auto;
            padding: 8px;
            border-radius: 12px;
        }

        .package-content {
            padding: 8px 8px 0 8px;
        }

        .package-description {
            font-size: 13px;
            margin-bottom: 6px;
        }

        .package-content p:last-child {
            font-size: 12px;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding-left: 10px;
            padding-right: 10px;
        }

        .hero-subtitle {
            font-size: 16px;
        }

        .package-description {
            font-size: 12px;
        }

        .package-content p:last-child {
            font-size: 11px;
        }
    }
</style>
