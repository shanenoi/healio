interface ExaminationTypeResponse {
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

interface ListDoctorByExaminationTypeResponse {
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

export type {
    ListDoctorByExaminationTypeResponse,
    ExaminationTypeResponse
}
