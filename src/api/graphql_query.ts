import {type GraphQLQueryProps} from '../utils/supabaseClient'

export const QueryListDoctorByExaminationType = (loaiKhamID: string) => {
    const q: GraphQLQueryProps = {
        query: `
            query($loai_kham_id: UUIDFilter){
              bac_sy_loai_khamCollection(first: 1000, filter: {loai_kham_id: $loai_kham_id}) {
                edges {
                  node {
                    bac_sy {
                      chuyen_khoa
                      profiles {
                        id
                        first_name
                        last_name
                        phone
                      }
                    }
                  }
                }
              }
            }`,
        variables: {loai_kham_id: {eq: loaiKhamID}}
    }
    return q
}

export const QueryListExaminationType = () => {
    const q: GraphQLQueryProps = {
        query: `
            query{
              bac_sy_loai_khamCollection(first: 1000) {
                edges {
                  node {
                    loai_kham {
                      id
                      ten
                    }
                  }
                }
              }
            }`,
        variables: {}
    }
    return q
}

export const QueryListMedicalExamination = (basiID: string) => {
    const markDate = new Date()
    markDate.setDate(markDate.getDate() - 1)
    markDate.setHours(23)
    markDate.setMinutes(59)
    markDate.setSeconds(59)

    const q: GraphQLQueryProps = {
        query: `
            query ($yt: Datetime, $basiID: UUID) {
              kham_benhCollection(
                orderBy: {
                  ngay_gio: AscNullsLast,
                  so_thu_tu: AscNullsLast,
                }
                filter: {
                  ngay_gio: {gt: $yt},
                  bac_sy_id: {eq: $basiID},
                  trang_thai: {eq: ""}
                }
              ) {
                edges {
                  node {
                    id
                    so_thu_tu
                    ngay_gio
                    duration
                    loai_kham {
                      ten
                    }
                    benh_nhan {
                      profiles {
                        id
                        first_name
                        last_name
                        phone
                        email
                      }
                    }
                  }
                }
              }
            }`,
        variables: {yt: markDate.toISOString(), basiID}
    }
    return q
}

export const QueryListPatientDetails = (benhNhanID: string) => {
    const q: GraphQLQueryProps = {
        query: `
            query($benh_nhan_id: UUIDFilter) {
              benh_anCollection(filter: {benh_nhan_id: $benh_nhan_id}) {
                edges {
                  node{
                    id
                    chan_doan
                    trieu_chung
                    loi_dan
                    tai_kham
                    created_at
                    bac_sy {
                      profiles {
                        id
                        first_name
                        last_name
                        email
                      }
                    }
                    benh_an_thuocCollection(filter: {deleted_at: {is: NULL}}) {
                      edges {
                        node {
                          so_luong
                          ghi_chu
                          thuoc {
                            ten
                            don_vi
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`,
        variables: {benh_nhan_id: {eq: benhNhanID}}
    }
    return q
}
