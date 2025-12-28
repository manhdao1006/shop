export function generateTourCode() {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const randomNum = String(Math.floor(Math.random() * 1000)).padStart(3, '0')

    return `TOUR-${year}${month}${day}-${randomNum}`
}
