import * as dayjs from "dayjs";

export const utilize = {
    onlyNumber(value:any){
        if(value){
            return value = value.replace(/[^0-9]/g, '');
        }
        return value
    },

    formatIDR(data:number){
        return data.toLocaleString("id-ID", {style: "currency", currency: "IDR"})
    },

    convertTimeDate(data:any){
        if(dayjs(data).isValid()){
            const date = data.toString().length === 10 ? data * 1000 : data;
            return dayjs(date).format('DD MMMM YYYY');
        }
        return '';
    },

}