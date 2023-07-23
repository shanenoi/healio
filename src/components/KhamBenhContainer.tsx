import React, {type FunctionComponent, useMemo} from 'react'
import type CSS from 'csstype'
import {type Property} from 'csstype'
import {type Profiles} from '../utils/supabaseTypes'

interface TaiMuiHongContainerType {
    OrderNumber: number
    CreatedAt: Date
    TypeAccess: string
    profile: Profiles
    ActionsCallback: (OrderNumber: number) => void

    /** Style props */
    propColor?: Property.Color
}

const KhamBenhContainer: FunctionComponent<TaiMuiHongContainerType> = ({
                                                                           OrderNumber,
                                                                           CreatedAt,
                                                                           TypeAccess,
                                                                           ActionsCallback,
                                                                           profile,
                                                                           propColor
                                                                       }) => {
    const KhamBenhContainerStyle: CSS.Properties = useMemo(() => {
        return {
            color: propColor
        }
    }, [propColor])
    const actionsClick = () => {
        ActionsCallback(OrderNumber)
    }

    return (
        <div
            className="rounded-lg bg-monochrome-white box-border w-[1498px] flex flex-row p-6 items-center justify-start text-left text-sm text-grey-grey-900-p font-body-body-2 border-[1px] border-solid border-grey-grey-40-t">
            <div className="w-20 flex flex-col items-start justify-center">
                <div className="relative leading-[150%]">{OrderNumber}</div>
            </div>
            <div
                className="self-stretch flex-1 flex flex-row items-center justify-start gap-[16px] text-green-green-900">
                <img className="relative w-12 h-12" alt="" src="/mask-group.svg"/>
                <div className="flex flex-col items-start justify-start">
                    <div
                        className="relative leading-[150%] font-medium"
                        style={KhamBenhContainerStyle}
                    >
                        {profile === null
                            ? ''
                            : (
                                `${profile.first_name ?? ''} ${profile.last_name ?? ''}`
                            )}
                    </div>
                </div>
            </div>
            <div className="w-[308px] flex flex-col items-start justify-center gap-[4px]">
                <div className="relative leading-[150%]">{
                    profile === null ? '' : (profile.phone ?? '')
                }</div>
                <div className="relative text-neutral-grey-800">
                    {profile === null ? '' : (profile.email ?? '')}
                </div>
            </div>
            <div className="w-[200px] flex flex-col items-start justify-center text-center">
                <div className="flex flex-row items-center justify-start gap-[1px]">
                    <div className="relative leading-[150%]">{CreatedAt.getDate()}</div>
                    <div className="relative leading-[150%]">/</div>
                    <div className="relative leading-[150%]">{CreatedAt.getMonth() + 1}</div>
                    <div className="relative leading-[150%]">/</div>
                    <div className="relative leading-[150%]">{CreatedAt.getFullYear()}</div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center text-blue-blue-400">
                <div className="relative leading-[150%] font-medium">{TypeAccess}</div>
            </div>
            <div className="w-[100px] flex flex-col items-start justify-center">
                <img className="relative w-8 h-8" alt="" src="/info-regular.svg" onClick={actionsClick}/>
            </div>
        </div>
    )
}

export default KhamBenhContainer
