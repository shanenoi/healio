interface KhamBenhPayloadType {
    benhNhanID: string
    bacSyID: string
    ngayGio?: Date
    thoiLuong?: number
    loaiKhamID: string
    note: string
}

interface BenhNhanPayloadType {
    email: string
    firstName: string
    lastName: string
    phone: string
}

export type {
    KhamBenhPayloadType,
    BenhNhanPayloadType
}
