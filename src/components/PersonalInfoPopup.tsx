import React, {type FunctionComponent, useEffect, useState} from 'react'
import {getAuthUser, supabaseClient} from '../utils/supabaseClient'
import {type BenhNhan, BenhNhanTable, type Profiles, ProfilesTable} from '../utils/supabaseTypes'

interface PersonalInfoContainerType {
    khamBenhID?: string
    StartAt?: Date
    Duration?: number
    loaiKhamE?: string
    noteE?: string
    onCloseClick: () => void
}

const PersonalInfoPopup: FunctionComponent<PersonalInfoContainerType> = ({
                                                                             onCloseClick
                                                                         }) => {
    const [profile, setProfile] = useState<Profiles>(null)
    const [patient, setPatient] = useState<BenhNhan>(null)

    // get user info
    useEffect(() => {
        getAuthUser()
            .then(async user => {
                if (user === null) {
                    return
                }

                const _id = user.id

                const p = await supabaseClient
                    .from(ProfilesTable)
                    .select('*')
                    .eq('id', _id)
                    .single()
                setProfile(p.data as Profiles)

                const b = await supabaseClient
                    .from(BenhNhanTable)
                    .select('*')
                    .eq('id', _id)
                    .single()
                setPatient(b.data as BenhNhan)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const onSaveClick = () => {
        if (profile === null) {
            return
        }

        const now = new Date()

        const newProfile: Profiles = {
            id: profile.id,
            avatar: profile.avatar,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            phone: profile.phone,
            user_type: profile.user_type,

            created_at: profile.created_at,
            updated_at: now.toISOString(),
            deleted_at: profile.deleted_at
        }

        void supabaseClient
            .from(ProfilesTable)
            .upsert(newProfile)
            .then(resp => {
                if (resp.error !== null) {
                    console.log('resp-upsert.Profiles')
                    console.log(resp.error)
                }
            })

        if (patient === null) {
            return
        }

        const newPatient: BenhNhan = {
            id: patient.id,

            bhyt: patient.bhyt,
            user_id: patient.user_id,

            created_at: patient.created_at,
            updated_at: now.toISOString(),
            deleted_at: patient.deleted_at
        }

        void supabaseClient
            .from(BenhNhanTable)
            .upsert(newPatient)
            .then(resp => {
                if (resp.error !== null) {
                    console.log('resp-upsert.BenhNhan')
                    console.log(resp.error)
                }
            })

        onCloseClick()
    }

    return <div
        className="absolute top-[calc(50%_-_400px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
        <div
            className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
            <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
                    <img
                        className="relative w-[100px] h-[100px]"
                        alt=""
                        src={'/mask-group4.svg'}
                    />
                </div>
                <img className="relative w-6 h-6 cursor-button" alt="" src={'/x-regular3.svg'}
                     onClick={onCloseClick}/>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left text-base">
                <div className="relative font-medium">Thông tin bệnh nhân</div>
                <div
                    className="self-stretch flex flex-col items-start justify-start gap-[16px] text-xs text-grey-grey-900-p">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Tên</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="text"
                                            className={'input'}
                                            placeholder={'Văn A'}
                                            value={profile?.first_name ?? ''}
                                            onChange={(e) => {
                                                setProfile({
                                                    id: profile?.id ?? '',

                                                    avatar: profile?.avatar ?? null,
                                                    email: profile?.email ?? null,
                                                    last_name: profile?.last_name ?? null,
                                                    phone: profile?.phone ?? null,
                                                    user_type: profile?.user_type ?? null,

                                                    created_at: profile?.created_at ?? null,
                                                    updated_at: profile?.updated_at ?? null,
                                                    deleted_at: profile?.deleted_at ?? null,

                                                    first_name: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Họ</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="text"
                                            className={'input'}
                                            placeholder={'--'}
                                            value={profile?.last_name ?? ''}
                                            onChange={(e) => {
                                                setProfile({
                                                    id: profile?.id ?? '',

                                                    avatar: profile?.avatar ?? null,
                                                    email: profile?.email ?? null,
                                                    first_name: profile?.first_name ?? null,
                                                    phone: profile?.phone ?? null,
                                                    user_type: profile?.user_type ?? null,

                                                    created_at: profile?.created_at ?? null,
                                                    updated_at: profile?.updated_at ?? null,
                                                    deleted_at: profile?.deleted_at ?? null,

                                                    last_name: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Số điện thoại</div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="number"
                                            className={'input no-arrows'}
                                            placeholder={'--'}
                                            value={profile?.phone ?? ''}
                                            onChange={(e) => {
                                                setProfile({
                                                    id: profile?.id ?? '',

                                                    avatar: profile?.avatar ?? null,
                                                    email: profile?.email ?? null,
                                                    first_name: profile?.first_name ?? null,
                                                    last_name: profile?.last_name ?? null,
                                                    user_type: profile?.user_type ?? null,

                                                    created_at: profile?.created_at ?? null,
                                                    updated_at: profile?.updated_at ?? null,
                                                    deleted_at: profile?.deleted_at ?? null,

                                                    phone: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Gmail</div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="email"
                                            className={'input'}
                                            placeholder={'--'}
                                            value={profile?.email ?? ''}
                                            disabled={true}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Số bảo hiểm y tế</div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="number"
                                            className={'input no-arrows'}
                                            placeholder={'--'}
                                            value={patient?.bhyt ?? ''}
                                            onChange={(e) => {
                                                setPatient({
                                                    id: patient?.id ?? '',

                                                    bhyt: e.target.value,
                                                    user_id: patient?.user_id ?? null,

                                                    created_at: patient?.created_at ?? null,
                                                    updated_at: patient?.created_at ?? null,
                                                    deleted_at: patient?.created_at ?? null
                                                })
                                            }}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="self-stretch hidden flex-col items-start justify-start gap-[4px] text-neutral-grey-600">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                            <div className="relative">Địa chỉ làm việc</div>
                            <div className="relative text-semantic-error-error-05">*</div>
                        </div>
                        <div
                            className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                            <div className="flex-1 relative flex items-center h-4">
                                Nhập địa chỉ làm việc
                            </div>
                            <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                <div
                                    className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                            </div>
                            <img
                                className="relative w-6 h-6 hidden"
                                alt=""
                                src="/caretdown1.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                onClick={onSaveClick}>
                <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                <div className="relative leading-[150%] uppercase font-medium cursor-button">
                    cập nhật hồ sơ
                </div>
                <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
            </div>
        </div>
    </div>
}

export default PersonalInfoPopup
