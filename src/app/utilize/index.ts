export const utilize = {
    onlyNumber(value:any){
        if(value){
            return value = value.replace(/[^0-9]/g, '');
        }
        return value
    },

    formatIDR(data:number){
        return data.toLocaleString("id-ID", {style: "currency", currency: "IDR"})
    }
}