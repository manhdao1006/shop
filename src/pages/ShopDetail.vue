<template>
    <div class="acc-page">
        <Header />

        <div class="container-fluid pt-3">
            <nav class="breadcrumb-custom">
                <RouterLink to="/cua-hang" class="breadcrumb-link"> Danh sách </RouterLink>
                <span class="breadcrumb-sep">›</span>
                <span class="breadcrumb-current">
                    {{ acc?.tenAcc }}
                </span>
            </nav>
        </div>

        <div class="container-fluid py-4">
            <div v-if="loading" class="text-center text-white py-5">
                <div class="spinner-border"></div>
                <p class="mt-2">Đang tải chi tiết acc...</p>
            </div>

            <div v-else-if="acc" class="acc-detail">
                <div class="row g-4">
                    <div class="col-12 col-md-4 col-lg-5">
                        <div class="acc-info card h-100">
                            <h2 class="fw-bold mb-3 text-uppercase">
                                {{ acc.tenAcc }}
                            </h2>
                            <div class="acc-meta">
                                <span class="acc-code">
                                    Mã acc: <b>#{{ acc.maAcc }}</b>
                                </span>
                                <span class="acc-type-text">
                                    Loại: <b>{{ acc.loaiAcc }} - {{ loaiAccText }}</b>
                                </span>
                            </div>

                            <div class="acc-stats">
                                <div>
                                    ⚽
                                    <span>{{ acc.soLuongCauThu }}</span>
                                </div>
                                <div>
                                    💰
                                    <span>{{ acc.vang }}</span>
                                </div>
                                <div>
                                    💎
                                    <span>{{ acc.kimCuong }}</span>
                                </div>
                            </div>

                            <hr />

                            <div class="desc" v-html="acc.moTa"></div>

                            <hr />

                            <div class="acc-contact">
                                <span class="contact-title">Liên hệ:</span>

                                <a
                                    class="contact-item fb"
                                    href="https://www.facebook.com/hungdao123"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <i class="fa-brands fa-facebook-f"></i>
                                    Facebook
                                </a>

                                <a
                                    class="contact-item tt"
                                    href="https://www.tiktok.com/@hungdls97"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <i class="fa-brands fa-tiktok"></i>
                                    TikTok
                                </a>

                                <a
                                    class="contact-item zl"
                                    href="https://zalo.me/0935678597"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <span class="fw-bold">Z</span>
                                    Zalo
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-8 col-lg-7">
                        <div class="acc-images card h-100">
                            <div class="main-image" @click="openPreview">
                                <button class="nav prev" @click.stop="prevImage">‹</button>

                                <img :src="currentImage" />

                                <button class="nav next" @click.stop="nextImage">›</button>
                            </div>

                            <div class="thumb-list">
                                <img
                                    v-for="(img, index) in acc.hinhAnhList"
                                    :key="index"
                                    :src="img"
                                    :class="{ active: index === currentIndex }"
                                    @click="selectImage(index)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="preview" class="preview-overlay" @click.self="preview = false">
            <button class="close-btn" @click="preview = false">✕</button>

            <button class="nav prev" @click.stop="prevImage">‹</button>

            <img :src="currentImage" class="preview-img" />

            <button class="nav next" @click.stop="nextImage">›</button>

            <div class="preview-desc">
                {{ acc.tenAcc }} ({{ currentIndex + 1 }}/{{ acc.hinhAnhList.length }})
            </div>
        </div>

        <Footer />
    </div>
</template>
<script setup>
    import { computed, onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import Footer from '../components/Footer.vue'
    import Header from '../components/Header.vue'

    const route = useRoute()

    const acc = ref(null)
    const currentIndex = ref(0)
    const loading = ref(false)
    const preview = ref(false)

    const sheetId = '1i0_6_WnX2rLZw4Uxc_Af4CViFFxVvK8VDoTH1eegyvo'
    const apiKey = 'AIzaSyBJOLTWvnRRegbkw1rRvr0K2dzV9SZ_Mwk'
    const rangeAcc = 'acc!A:J'

    const currentImage = computed(() => acc.value?.hinhAnhList?.[currentIndex.value])

    const selectImage = (i) => (currentIndex.value = i)
    const nextImage = () =>
        (currentIndex.value = (currentIndex.value + 1) % acc.value.hinhAnhList.length)
    const prevImage = () =>
        (currentIndex.value =
            (currentIndex.value - 1 + acc.value.hinhAnhList.length) % acc.value.hinhAnhList.length)

    const openPreview = () => (preview.value = true)

    const loaiAccText = computed(() => {
        return { QG: 'Tuyển quốc gia', TD: 'Tự do' }[acc.value?.loaiAcc] || ''
    })

    async function fetchAccDetail() {
        loading.value = true
        const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeAcc}?key=${apiKey}`
        )
        const data = await res.json()
        const rows = data.values || []
        const header = rows[0]

        const list = rows.slice(1).map((r) => {
            const o = {}
            header.forEach((h, i) => (o[h] = r[i] || ''))
            o.hinhAnhList = JSON.parse(o.hinhAnh || '[]')
            return o
        })

        acc.value = list.find((a) => a.maAcc === route.params.maAcc)
        loading.value = false
    }

    onMounted(fetchAccDetail)
</script>
<style scoped>
    .breadcrumb-custom {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #666;
    }

    .breadcrumb-link {
        color: #033155;
        text-decoration: none;
        font-weight: 500;
    }

    .breadcrumb-link:hover {
        text-decoration: none;
    }

    .breadcrumb-sep {
        color: #999;
    }

    .breadcrumb-current {
        color: #333;
        font-weight: 600;
    }

    .card {
        background: #fff;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
    }

    .main-image {
        position: relative;
        height: 420px;
        border-radius: 12px;
        overflow: hidden;
        cursor: zoom-in;
    }

    .main-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s ease;
        padding: 0;
        z-index: 2;
    }

    .nav:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: translateY(-50%) scale(1.08);
    }

    .nav.prev {
        left: 10px;
        align-items: baseline;
    }

    .nav.next {
        right: 10px;
        align-items: baseline;
    }

    .thumb-list {
        display: flex;
        gap: 10px;
        margin-top: 12px;
        overflow-x: auto;
        overflow-y: hidden;

        padding-bottom: 6px;
        scrollbar-width: thin;
    }

    .thumb-list img {
        width: 140px;
        height: 70px;
        border-radius: 10px;
        cursor: pointer;
        opacity: 0.5;
    }

    .thumb-list img.active {
        opacity: 1;
        border: 2px solid #409eff;
    }

    .preview-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .preview-img {
        max-width: 80%;
        max-height: 80%;
    }

    .preview-desc {
        position: absolute;
        bottom: 24px;
        color: #fff;
    }

    .close-btn {
        position: absolute;
        top: 20px;
        right: 24px;
        font-size: 28px;
        background: none;
        color: #fff;
        border: none;
        cursor: pointer;
    }

    .acc-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding: 10px 0;
        border-top: 1px dashed #eee;
        border-bottom: 1px dashed #eee;
        font-size: 13px;
    }

    .acc-stats div {
        text-align: center;
        flex: 1;
    }

    .acc-stats span {
        display: block;
        font-weight: 600;
    }
    .acc-meta {
        display: flex;
        gap: 16px;
        font-size: 13px;
        color: #666;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .acc-code,
    .acc-type-text {
        background: #f5f7fa;
        padding: 4px 10px;
        border-radius: 6px;
    }

    .acc-code b,
    .acc-type-text b {
        color: #333;
    }

    .acc-contact {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 12px;
    }

    .contact-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
    }

    .contact-item {
        display: flex;
        align-items: center;
        gap: 6px;

        padding: 6px 12px;
        border-radius: 20px;

        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .contact-item i {
        font-size: 14px;
    }

    .contact-item.fb {
        background: #eef3ff;
        color: #1877f2;
    }

    .contact-item.fb:hover {
        background: #1877f2;
        color: #fff;
    }

    .contact-item.tt {
        background: #f1f1f1;
        color: #000;
    }

    .contact-item.tt:hover {
        background: #000;
        color: #fff;
    }

    .contact-item.zl {
        background: #eef3ff;
        color: #54bfdd;
    }

    .contact-item.zl:hover {
        background: #54bfdd;
        color: #fff;
    }
</style>
