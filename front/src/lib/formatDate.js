import moment from "moment";

export default function formatDate(date) {
    return moment(new Date(date)).format("DD/MM/YY à HH:mm");
}
