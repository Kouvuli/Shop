import _ from "lodash";
import moment from "moment";

const helpers = {
    formatDate(date) {
        return moment(date).format("hh:mm DD/MM/YYYY A");
    },
    formatMoney(x) {
        if (!x) return "";
        return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    },
    resolveStatus(status) {
        switch (status) {
            case "processing":
                return "Đang xử lý";
            case "pending":
            case "shipping":
                return "Đang giao";
            case "delivered":
            case "shipped":
                return "Đã giao";
            case true:
                return "Không bị chặn";
            case false:
                return "Bị chặn";
            default:
                return status;
        }
    },
    prevPage(page) {
        return parseInt(page) - 1;
    },
    nextPage(page) {
        return parseInt(page) + 1;
    },
    showPrev(pagination) {
        return pagination.page > 1;
    },
    showNext(pagination) {
        return pagination.page < pagination.limit;
    },
    showPrevDots(pagination) {
        return pagination.page > 2;
    },
    showNextDots(pagination) {
        return pagination.page < pagination.limit - 1;
    },
    slug(str) {
        str = str.replace(/^\s+|\s+$/g, ""); // trim
        str = str.toLowerCase();
        // remove accents, swap ñ for n, etc
        const from =
            "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆaàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
        const to =
            "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAaaaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
        }

        str = str
            .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
            .replace(/\s+/g, "-") // collapse whitespace and replace by -
            .replace(/-+/g, "-"); // collapse dashes

        return str;
    },
};

export default helpers;
