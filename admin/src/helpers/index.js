import moment from "moment"

const helpers = {

    formatDate(date) {
        return moment(date).format('hh:mm DD/MM/YYYY A')
    },
    formatMoney(x) {
        if (!x) return ""
        return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    },
    resolveStatus(status) {
        switch (status) {
            case 'processing':
                return "Đang xử lý"
            case 'pending':
            case 'shipping':
                return "Đang giao"
            case 'delivered':
            case 'shipped':
                return "Đã giao"
            default:
                return status
        }
    },
    prevPage(page) {
        return parseInt(page) - 1
    },
    nextPage(page) {
        return parseInt(page) + 1
    },
    showPrev(pagination) {
        return pagination.page > 1
    },
    showNext(pagination) {
        return pagination.page < pagination.limit
    },
    showPrevDots(pagination) {
        return pagination.page > 2
    },
    showNextDots(pagination) {
        return pagination.page < pagination.limit - 1
    }


}

export default helpers