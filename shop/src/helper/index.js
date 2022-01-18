import _ from "lodash";
import moment from "moment";
import { Types } from "mongoose";
const helpers = {
    each_upto(ary, max, options) {
        if (!ary || ary.length == 0) return options.inverse(this);

        var result = [];
        for (var i = 0; i < max && i < ary.length; ++i)
            result.push(options.fn(ary[i]));
        return result.join("");
    },
    compare(arg1, arg2, options) {
        if (!arg1 || !arg2) return options.inverse(this);
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
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
            case "cancelled":
                return "Đã hủy";
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
    genId() {
        const timestamp = (Date.now() / 1000).toString(16).substr(0, 8);
        return (
            timestamp +
            "xx"
                .replace(/[x]/g, () => Math.random().toString(16).substr(2, 8))
                .toLowerCase()
        );
    },
    //const ObjectId = require('mongoose').Types.ObjectId;
    isValidObjectId(id) {
        if (Types.ObjectId.isValid(id)) {
            if (String(new Types.ObjectId(id)) === id) return true;
            return false;
        }
        return false;
    },
};

export default helpers;
