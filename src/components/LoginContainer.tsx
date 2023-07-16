import {type FunctionComponent, useState} from 'react'
import {type LoginPayloadType} from '../api/request'

interface LoginContainerType {
    loginClick: (loginPayload: LoginPayloadType) => void
}

const LoginContainer: FunctionComponent<LoginContainerType> = ({
                                                                   loginClick
                                                               }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginClick = () => {
        loginClick({email, password})
    }

    return (
        <div
            className="flex flex-col items-start justify-start gap-[24px] text-left text-base text-grey-grey-900-p font-mobile-body-subtitle-2">
            <div className="w-[400px] flex flex-col items-start justify-start gap-[8px]">
                <div className="hidden flex-row items-start justify-start gap-[2px]">
                    <div className="relative leading-[24px] font-semibold">Title</div>
                    <div className="relative text-xl leading-[24px] font-semibold text-red-red-400">
                        *
                    </div>
                </div>
                <div
                    className="self-stretch flex flex-col items-start justify-start gap-[4px] text-grey-grey-300-s font-button-button-2">
                    <div
                        className="rounded-3xs bg-monochrome-white box-border w-[400.8px] h-[48.8px] flex flex-row py-0 px-3 items-center justify-start gap-[8px] border-[0.8px] border-solid border-grey-grey-40-t">
                        <img
                            className="relative w-[22px] h-[22px] hidden"
                            alt=""
                            src="/left-icon1.svg"
                        />
                        <div className="flex-1 relative leading-[150%]">
                            <input
                                type={'email'}
                                className={'input'}
                                placeholder={'Nhập địa chỉ Email'}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        <img
                            className="relative w-[22px] h-[22px] hidden"
                            alt=""
                            src="/left-icon1.svg"
                        />
                    </div>
                    <div
                        className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-sm text-red-red-400">
                        <img className="relative w-5 h-5" alt="" src="/notice-icon1.svg"/>
                        <div className="flex-1 relative leading-[150%]">Allert</div>
                    </div>
                </div>
            </div>
            <div className="w-[400px] flex flex-col items-start justify-start gap-[8px]">
                <div className="hidden flex-row items-start justify-start gap-[2px]">
                    <div className="relative leading-[24px] font-semibold">Title</div>
                    <div className="relative text-xl leading-[24px] font-semibold text-red-red-400">
                        *
                    </div>
                </div>
                <div
                    className="self-stretch flex flex-col items-start justify-start gap-[4px] text-grey-grey-300-s font-button-button-2">
                    <div
                        className="rounded-3xs bg-monochrome-white box-border w-[400.8px] h-[48.8px] flex flex-row py-0 px-3 items-center justify-start gap-[8px] border-[0.8px] border-solid border-grey-grey-40-t">
                        <img
                            className="relative w-[22px] h-[22px] hidden"
                            alt=""
                            src="/left-icon1.svg"
                        />
                        <div className="flex-1 relative leading-[150%]">
                            <input
                                type={'password'}
                                className={'input'}
                                placeholder={'Mật khẩu'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <img
                            className="relative w-[22px] h-[22px] hidden"
                            alt=""
                            src="/left-icon1.svg"
                        />
                    </div>
                    <div
                        className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-sm text-red-red-400">
                        <img className="relative w-5 h-5" alt="" src="/notice-icon1.svg"/>
                        <div className="flex-1 relative leading-[150%]">Allert</div>
                    </div>
                </div>
            </div>
            <div
                className="rounded-xl bg-blue-blue-300 w-[400px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-center text-monochrome-white font-button-button-2  cursor-button"
                onClick={onLoginClick}
            >
                <img className="relative w-7 h-7 hidden" alt="" src="/lefticon10.svg"/>
                <div className="relative leading-[150%] font-semibold">Đăng nhập</div>
                <img className="relative w-7 h-7 hidden" alt="" src="/lefticon10.svg"/>
            </div>
        </div>
    )
}

export default LoginContainer
