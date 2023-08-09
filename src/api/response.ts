import {type LoaiKham, type Profiles, type Thuoc} from '../utils/supabaseTypes'

export interface ExaminationTypeResponse {
    data: {
        bac_sy_loai_khamCollection: {
            edges: Array<{
                node: {
                    loai_kham: {
                        id: string
                        ten: string
                    }
                }
            }>
        }
    }
}

export interface ListDoctorByExaminationTypeResponse {
    data: {
        bac_sy_loai_khamCollection: {
            edges: Array<{
                node: {
                    bac_sy: {
                        profiles: {
                            id: string
                            phone: string | null
                            last_name: string
                            first_name: string
                        }
                        chuyen_khoa: string | null
                        anh_dai_dien: string | null
                    }
                }
            }>
        }
    }
}

export interface ListMedicalExaminationResponse {
    data: {
        kham_benhCollection: {
            edges: Array<{
                node: {
                    id: string
                    so_thu_tu: number
                    loai_kham: LoaiKham
                    ngay_gio: string
                    duration: number
                    benh_nhan: {
                        profiles: Profiles
                    }
                }
            }>
        }
    }
}

export interface ListPatientDetailsResponse {
    data: {
        benh_anCollection: {
            edges: Array<{
                node: {
                    id: string
                    chan_doan: string
                    trieu_chung: string
                    loi_dan: string
                    tai_kham: Date | null
                    created_at: Date
                    bac_sy: {
                        profiles: Profiles
                    }
                    benh_an_thuocCollection: {
                        edges: Array<{
                            node: {
                                thuoc: Thuoc
                                ghi_chu: string
                                so_luong: string
                            }
                        }>
                    }
                }
            }>
        }
    }
}
