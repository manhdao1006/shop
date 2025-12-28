import { LOAI_SU_KIEN } from './constants'

export function getLoaiSuKienLabel(value: string) {
    const found = LOAI_SU_KIEN.find((x) => x.value === value)
    return found ? found.label : ''
}

export function generateEventCode() {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const randomNum = String(Math.floor(Math.random() * 1000)).padStart(3, '0')

    return `EV-${year}${month}${day}-${randomNum}`
}
