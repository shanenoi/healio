import {type LoaiKham, type Profiles} from '../utils/supabaseTypes'

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
                    benh_nhan: {
                        profiles: Profiles
                    }
                    created_at: string
                }
            }>
        }
    }
}
