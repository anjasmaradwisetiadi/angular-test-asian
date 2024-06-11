export interface dataEmployeeInterface{
    id: string,
    user_name: string,
    first_name: string,
    last_name: string,
    email: string,
    birth_date: any,
    basic_salary: number,
    status: string,
    group: string,
    description: string,
}

export interface dataSortingAndFilterInterface{
    filter: {
        user_name: string,
        email: string,
        status: string,
        basic_salary: number
    },
    sorting: object
}
