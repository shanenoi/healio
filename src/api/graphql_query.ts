import {type GraphQLQueryProps} from './graphql'

export const QueryListDoctorByExaminationType = (loaiKhamID: string) => {
    const q: GraphQLQueryProps = {
        query: `
            query($loai_kham_id: UUIDFilter){
              bac_sy_loai_khamCollection(first: 1000, filter: {loai_kham_id: $loai_kham_id}) {
                edges {
                  node {
                    bac_sy {
                      chuyen_khoa
                      anh_dai_dien
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
                }
            `,
        variables: {}
    }
    return q
}
