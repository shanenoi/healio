export interface KhamBenhPayloadType {
    benhNhanID: string
    doctorID: string
    ngayGio?: Date
    thoiLuong?: number
    examinationTypeID: string
    note: string
}

export interface BenhNhanPayloadType {
    email: string
    firstName: string
    lastName: string
    phone: string
}

export interface LoginPayloadType {
    email: string
    password: string
}
