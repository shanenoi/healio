import MedicalRegisterPopup from '../components/MedicalRegisterPopup'
import PatientVisitContainer from '../components/PatientVisitContainer'
import PersonalInfoPopup, {type DataType} from '../components/PersonalInfoPopup'
import React, {type FunctionComponent, useEffect, useState} from 'react'
import {CtrlPopupVisibility} from '../utils/utils'
import {Modal, Table} from 'antd'
import {QueryListPatientDetails} from '../api/graphql_query'
import {getAuthUser, GraphQLClient} from '../utils/supabaseClient'
import {type ColumnsType} from 'antd/es/table'
import {type ListPatientDetailsResponse} from '../api/response'
import {v4 as uuidv4} from 'uuid'

const MedicalRegister: FunctionComponent = () => {
    const popupMedicalRegisterVisibility = CtrlPopupVisibility()
    const medicalRegisterBlurBackgroundRef = popupMedicalRegisterVisibility.blurBackgroundRef
    const medicalRegisterShowMedicalRegisterContainer = popupMedicalRegisterVisibility.showPp
    const medicalRegisterShowMedicalRegister = popupMedicalRegisterVisibility.showP
    const medicalRegisterHideMedicalRegister = popupMedicalRegisterVisibility.hideP

    const popupPersonalInfoVisibility = CtrlPopupVisibility()
    const personalInfoBlurBackgroundRef = popupPersonalInfoVisibility.blurBackgroundRef
    const medicalPersonalInfoPopupMedicalRegisterContainer = popupPersonalInfoVisibility.showPp
    const personalInfoShowMedicalRegister = popupPersonalInfoVisibility.showP
    const personalInfoHideMedicalRegister = popupPersonalInfoVisibility.hideP

    const [dataSource, setDataSource] = useState<DataType[]>([])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Chẩn Đoán',
            width: 30,
            dataIndex: 'chan_doan',
            key: 'chan_doan',
            fixed: 'left'
        },
        {
            title: 'Triệu Chứng',
            width: 30,
            dataIndex: 'trieu_chung',
            key: 'trieu_chung'
        },
        {
            title: 'Lời Dặn',
            width: 30,
            dataIndex: 'loi_dan',
            key: 'loi_dan'
        },
        {
            title: 'Bác Sĩ',
            width: 30,
            dataIndex: 'basi_name',
            key: 'basi_name'
        },
        {
            title: 'Email Bác Sĩ',
            width: 30,
            dataIndex: 'basi_email',
            key: 'basi_email'
        },
        {
            title: 'Ngày Tạo',
            width: 30,
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: 'Tái Khám',
            width: 30,
            dataIndex: 'tai_kham',
            key: 'tai_kham'
        },
        {
            title: 'Xem đơn thuốc',
            key: 'operation',
            fixed: 'right',
            width: 20,
            render: (value, record, index) => {
                console.log(`${record.id} ${index}`)
                return (
                    <>
                        <a
                            onClick={() => {
                                console.log(record.thuoc)

                                const columns = [
                                    {
                                        title: 'Tên',
                                        dataIndex: 'name',
                                        key: 'name'
                                    },
                                    {
                                        title: 'Số Lượng',
                                        dataIndex: 'so_luong',
                                        key: 'so_luong'
                                    },
                                    {
                                        title: 'Đơn Vị',
                                        dataIndex: 'don_vi',
                                        key: 'don_vi'
                                    }
                                ]
                                Modal.info({
                                    title: 'Đơn Thuốc',
                                    content: (
                                        <Table columns={columns} dataSource={record.thuoc.map(e => {
                                            return {
                                                key: uuidv4(),
                                                name: e.node.thuoc?.ten,
                                                don_vi: e.node.thuoc?.don_vi,
                                                so_luong: e.node.so_luong
                                            }
                                        })}/>
                                    ),
                                    onOk() {
                                    }
                                })
                            }}
                        >
                            xem
                        </a>
                    </>
                )
            }
        }
    ]

    useEffect(() => {
        void getAuthUser().then(user => {
            if (user === null) {
                return
            }
            new GraphQLClient()
                .Send(QueryListPatientDetails(user.id))
                .then((response) => {
                    const resp = response as ListPatientDetailsResponse
                    console.log('resp')
                    console.log(resp)
                    const data: DataType[] = resp.data.benh_anCollection.edges.map(x => {
                        const dataType: DataType = {
                            id: x.node.id,
                            key: x.node.id,

                            chan_doan: x.node.chan_doan,
                            tai_kham: x.node.tai_kham,
                            loi_dan: x.node.loi_dan,
                            created_at: x.node.created_at,
                            trieu_chung: x.node.trieu_chung,

                            basi_email: x.node.bac_sy.profiles?.email ?? '',
                            basi_name: `${x.node.bac_sy.profiles?.first_name ?? ''} ${x.node.bac_sy.profiles?.last_name ?? ''}`,
                            basi_id: x.node.bac_sy.profiles?.id ?? '',

                            thuoc: x.node.benh_an_thuocCollection.edges
                        }
                        return dataType
                    })
                    setDataSource(data)
                }).catch((error) => {
                console.log(error)
            })
        })
    }, [])

    return (
        <div className="relative bg-monochrome-white w-full h-[1024px]"><PatientVisitContainer
            productIds="/lefticon9.svg"
            productDimensions="/lefticon9.svg"
            onclickRegister={medicalRegisterShowMedicalRegister}
            onclickProfile={personalInfoShowMedicalRegister}
        />
            <img
                className="absolute top-[0px] left-[1000px] w-[845px] h-[1024px]"
                alt=""
                src="/rectangle-15.svg"
            />
            <div
                id={'blur-background'}
                ref={medicalRegisterBlurBackgroundRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed'
                }}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                onClick={medicalRegisterHideMedicalRegister}
            />
            {medicalRegisterShowMedicalRegisterContainer && (
                <MedicalRegisterPopup
                    formID={uuidv4()}
                    onCloseClick={medicalRegisterHideMedicalRegister}
                />
            )}

            <div
                id={'blur-background'}
                ref={personalInfoBlurBackgroundRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed'
                }}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                onClick={personalInfoHideMedicalRegister}
            />
            {medicalPersonalInfoPopupMedicalRegisterContainer && (
                <PersonalInfoPopup
                    isPatient={true}
                    onCloseClick={personalInfoHideMedicalRegister}
                    columns={columns}
                    dataSource={dataSource}
                />
            )}
        </div>
    )
}

export default MedicalRegister
