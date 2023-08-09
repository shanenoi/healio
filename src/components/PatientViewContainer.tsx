import React, {type FunctionComponent, useMemo} from 'react'
import type CSS from 'csstype'
import {type Property} from 'csstype'
import {type BenhAn} from '../utils/supabaseTypes'

interface PatientViewType {
    ID: string
    Name?: string
    OrderNumber: number
    BenhAn: BenhAn
    ActionsCallback: (id: string) => void

    /** Style props */
    propColor?: Property.Color
}

const PatientViewContainer: FunctionComponent<PatientViewType> = ({
                                                                      ID,
                                                                      Name,
                                                                      OrderNumber,
                                                                      ActionsCallback,
                                                                      BenhAn,
                                                                      propColor
                                                                  }) => {
    const KhamBenhContainerStyle: CSS.Properties = useMemo(() => {
        return {
            color: propColor
        }
    }, [propColor])
    const actionsClick = () => {
        ActionsCallback(ID)
    }

    return (
        <div
            className="rounded-lg bg-monochrome-white box-border w-[1498px] flex flex-row p-6 items-center justify-start text-left text-sm text-grey-grey-900-p font-body-body-2 border-[1px] border-solid border-grey-grey-40-t">
            <div className="w-20 flex flex-col items-start justify-center">
                <div className="relative leading-[150%]">{OrderNumber}</div>
            </div>
            {
                Name !== undefined
                    ? (
                        <div className="w-20 flex flex-col items-start justify-center">
                            <div
                                className="relative leading-[150%] font-medium"
                                style={KhamBenhContainerStyle}
                            >
                                {Name}
                            </div>
                        </div>
                    )
                    : null
            }
            <div
                className="self-stretch flex-1 flex flex-row items-center justify-start gap-[16px] text-green-green-900">
                <div className="flex flex-col items-start justify-start">
                    <div
                        className="relative leading-[150%] font-medium"
                        style={KhamBenhContainerStyle}
                    >
                        {BenhAn?.chan_doan}
                    </div>
                </div>
            </div>
            <div className="w-[200px] flex flex-col items-start justify-center text-center">
                <div className="flex flex-row items-center justify-start gap-[1px]">
                    <div className="relative leading-[150%]">{new Date(BenhAn?.created_at ?? '').getDate()}</div>
                    <div className="relative leading-[150%]">/</div>
                    <div className="relative leading-[150%]">{new Date(BenhAn?.created_at ?? '').getMonth() + 1}</div>
                    <div className="relative leading-[150%]">/</div>
                    <div className="relative leading-[150%]">{new Date(BenhAn?.created_at ?? '').getFullYear()}</div>
                </div>
            </div>
            <div className="w-[100px] flex flex-col items-start justify-center">
                <img className="relative w-8 h-8" alt="" src="/info-regular.svg" onClick={actionsClick}/>
            </div>
        </div>
    )
}

export default PatientViewContainer
