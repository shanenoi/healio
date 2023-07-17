export interface KhamBenhPayloadType {
    patientID: string
    doctorID: string
    ngayGio?: Date
    thoiLuong?: number
    examinationTypeID: string
    note: string
}

export interface PatientData {
    email: string
    firstName: string
    lastName: string
    phone: string
}

export interface LoginPayloadType {
    email: string
    password: string
}
