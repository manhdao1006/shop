<template>
    <div class="acc-page" style="background: linear-gradient(135deg, #e53d69, #033155)">
        <Header />

        <div class="container-fluid mt-4">
            <h2 class="fw-bold mb-3 text-white text-uppercase">{{ $t('shop.title') }}</h2>

            <div v-if="loading" class="loading-overlay">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">{{ $t('home.popup.loading') }}</span>
                </div>
                <p class="mt-2">{{ $t('home.popup.loading') }}</p>
            </div>

            <div v-else class="row">
                <div class="col-lg-3 col-md-4 mb-3">
                    <div class="card p-3 filter-box">
                        <h5 class="fw-bold mb-3">{{ $t('shop.search') }}</h5>

                        <div class="mb-3">
                            <label class="form-label small fw-bold">{{ $t('shop.keyword') }}</label>
                            <input
                                v-model="filters.keyword"
                                type="text"
                                class="form-control form-control-sm"
                                :placeholder="$t('shop.placeholder')"
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-bold">{{ $t('shop.accType') }}</label>
                            <select v-model="filters.loaiAcc" class="form-select form-select-sm">
                                <option value="">{{ $t('shop.all') }}</option>
                                <option value="QG">{{ $t('shop.national') }}</option>
                                <option value="TD">{{ $t('shop.free') }}</option>
                            </select>
                        </div>

                        <button class="btn btn-outline-secondary btn-sm w-100" @click="resetFilter">
                            {{ $t('shop.reset') }}
                        </button>
                    </div>
                </div>

                <div class="col-lg-9 col-md-8">
                    <div class="row g-3">
                        <div
                            v-for="acc in paginatedAccs"
                            :key="acc.maAcc"
                            class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                        >
                            <div class="card acc-card h-100">
                                <div class="acc-img-wrapper">
                                    <img :src="acc.hinhAnhList[0]" class="acc-img" />

                                    <div class="acc-overlay"></div>

                                    <span class="badge acc-type">
                                        {{ acc.loaiAccLabel }}
                                    </span>

                                    <span class="acc-code">#{{ acc.maAcc }}</span>
                                </div>

                                <div class="card-body d-flex flex-column">
                                    <h5 class="fw-bold mb-1 acc-title">
                                        {{ acc.tenAccText }}
                                    </h5>

                                    <p class="text-muted small acc-desc">
                                        {{ acc.moTaText }}
                                    </p>

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

                                    <div class="mt-3">
                                        <p v-if="currentLocale === 'vi'" class="hero-subtitle">
                                            {{ acc.giaTienViet }} VNĐ
                                        </p>

                                        <p v-else class="hero-subtitle">${{ acc.giaTienDo }}</p>
                                    </div>

                                    <div class="mt-auto">
                                        <button
                                            class="btn btn-danger w-100 btn-sm mt-3 acc-btn"
                                            @click="goDetail(acc)"
                                        >
                                            {{ $t('shop.viewDetail') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="paginatedAccs.length === 0" class="text-center py-5">
                            {{ $t('shop.notExist') }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-4 mb-4 text-white">
                <button
                    class="btn btn-outline-secondary btn-sm me-2 text-white"
                    :disabled="page === 1"
                    @click="page--"
                >
                    {{ $t('shop.previous') }}
                </button>

                <span class="mx-2 fw-bold"> Trang {{ page }} / {{ totalPages }} </span>

                <button
                    class="btn btn-outline-secondary btn-sm ms-2 text-white"
                    :disabled="page === totalPages"
                    @click="page++"
                >
                    {{ $t('shop.next') }}
                </button>
            </div>
        </div>

        <Footer />
    </div>
</template>
<script>
    import Footer from '../components/Footer.vue'
    import Header from '../components/Header.vue'

    export default {
        name: 'Shop',
        components: { Header, Footer },

        data() {
            return {
                accs: [],
                loading: true,
                sheetId: '1i0_6_WnX2rLZw4Uxc_Af4CViFFxVvK8VDoTH1eegyvo',
                apiKey: 'AIzaSyBJOLTWvnRRegbkw1rRvr0K2dzV9SZ_Mwk',
                rangeAcc: 'acc!A:L',
                page: 1,
                pageSize: 9,
                filters: {
                    keyword: '',
                    loaiAcc: ''
                }
            }
        },

        computed: {
            currentLocale() {
                return this.$i18n.locale
            },

            filteredAccs() {
                return this.accs.filter((acc) => {
                    const keyword = this.filters.keyword.toLowerCase()

                    const matchKeyword =
                        !keyword ||
                        acc.maAcc.toLowerCase().includes(keyword) ||
                        acc.tenAcc.toLowerCase().includes(keyword) ||
                        acc.moTaText.toLowerCase().includes(keyword)

                    const matchLoai = !this.filters.loaiAcc || acc.loaiAcc === this.filters.loaiAcc

                    return matchKeyword && matchLoai
                })
            },

            totalPages() {
                return Math.ceil(this.filteredAccs.length / this.pageSize)
            },

            paginatedAccs() {
                const start = (this.page - 1) * this.pageSize
                return this.filteredAccs.slice(start, start + this.pageSize)
            }
        },

        async created() {
            await this.fetchAccs()
        },

        methods: {
            resetFilter() {
                this.filters = {
                    keyword: '',
                    loaiAcc: ''
                }
                this.page = 1
            },
            goDetail(acc) {
                this.$router.push({
                    name: 'ShopDetail',
                    params: { maAcc: acc.maAcc },
                    state: { acc }
                })
            },

            async fetchAccs() {
                try {
                    const res = await fetch(
                        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.rangeAcc}?key=${this.apiKey}`
                    )
                    const data = await res.json()

                    const rows = data.values
                    const header = rows[0]
                    const LOAI_ACC_MAP = {
                        QG: 'Tuyển quốc gia',
                        TD: 'Tự do'
                    }

                    let accList = rows.slice(1).map((r) => {
                        const obj = {}
                        header.forEach((h, i) => (obj[h] = r[i] || ''))

                        try {
                            obj.hinhAnhList = JSON.parse(obj.hinhAnh || '[]')
                        } catch {
                            obj.hinhAnhList = []
                        }

                        obj.daBan = Number(obj.daBan || 0)

                        obj.loaiAccLabel = LOAI_ACC_MAP[obj.loaiAcc]

                        obj.tenAccText = obj.tenAcc?.replace(/<[^>]+>/g, '').slice(0, 30) + ' ...'
                        obj.moTaText = obj.moTa?.replace(/<[^>]+>/g, '').slice(0, 80) + '...'

                        return obj
                    })

                    this.accs = accList.filter((acc) => acc.daBan === 0)
                } catch (e) {
                    console.error('Fetch acc failed:', e)
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>
<style scoped>
    .filter-box {
        border-radius: 12px;
        position: sticky;
        top: 80px;
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        z-index: 9999;
    }

    .acc-card {
        border-radius: 16px;
        overflow: hidden;
        border: none;
        background: #fff;
        transition: 0.25s ease;
    }

    .acc-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
    }

    .acc-img-wrapper {
        position: relative;
    }

    .acc-img {
        width: 100%;
        height: 210px;
        object-fit: cover;
    }

    .acc-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.65) 100%);
    }

    .acc-type {
        position: absolute;
        top: 12px;
        left: 12px;
        background: #ffdd00;
        color: #000000;
        font-size: 11px;
        padding: 6px 10px;
        border-radius: 999px;
    }

    .acc-code {
        position: absolute;
        bottom: 10px;
        left: 12px;
        font-size: 12px;
        color: #000000;
        background: #ffdd00;
        padding: 4px 8px;
        border-radius: 6px;
    }

    .acc-title {
        font-size: 16px;
        line-height: 1.3;
        height: 50px;
    }

    .acc-desc {
        height: 50px;
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

    .acc-btn {
        border-radius: 10px;
        font-weight: 600;
    }

    .hero-subtitle {
        width: 50%;
        border-radius: 15px;
        margin: 0 auto;
        font-size: 1.2rem;
        color: #ffffff;
        background: linear-gradient(135deg, #ff0000, #ffdd00);
        box-shadow:
            0 0 15px rgba(255, 221, 0, 0.9),
            0 0 10px rgba(255, 0, 0, 0.7);
        animation: subtitleTag 1s infinite;
        text-align: center;
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
</style>
