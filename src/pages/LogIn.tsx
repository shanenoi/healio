import { type FunctionComponent } from 'react'
import WelcomeContainer from '../components/WelcomeContainer'

const LogIn: FunctionComponent = () => {
  return (
        <div
            className="relative bg-monochrome-white w-full h-[996px] overflow-hidden text-left text-lg text-monochrome-white font-button-button-2">
            <div className="absolute top-[0px] left-[704px] bg-blue-blue-600 w-[62%] h-[996px] text-center">
                <div className="absolute top-[224px] left-[calc(50%_-_266px)] w-[532.97px] h-[575px] overflow-hidden">
                    <div
                        className="absolute top-[444px] left-[75px] w-[383.44px] flex flex-col items-center justify-start gap-[10px]">
                        <div className="self-stretch relative font-semibold inline-block h-11 shrink-0">
                            Dễ dàng đăng ký khám chữa bệnh
                        </div>
                        <div className="hidden flex-row items-start justify-start gap-[16px]">
                            <div className="relative rounded-[50%] bg-whitesmoke w-2.5 h-2.5"/>
                            <div className="relative rounded-[50%] bg-mediumaquamarine w-2.5 h-2.5"/>
                            <div className="relative rounded-[50%] bg-mediumaquamarine w-2.5 h-2.5"/>
                        </div>
                    </div>
                    <img
                        className="absolute top-[0px] left-[0px] w-[533px] h-[370px] object-cover"
                        alt=""
                        src="/image@2x.png"
                    />
                </div>
            </div>
            <div
                className="absolute top-[372px] left-[152px] flex flex-col items-start justify-start gap-[16px] text-13xl text-grey-grey-900-p">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <div className="relative leading-[150%] font-semibold inline-block w-[400px] h-9 shrink-0">
                        Chào mừng!
                    </div>
                    <div className="relative text-base leading-[150%] inline-block w-[400px] h-10 shrink-0">
                        Vui lòng nhập thông tin đăng nhập để truy cập vào tài khoản của bạn.
                    </div>
                </div>
                <WelcomeContainer/>
            </div>
            <div
                className="absolute bottom-[40px] left-[calc(50%_-_421px)] flex flex-col items-center justify-start gap-[8px] text-base text-grey-grey-300-s font-mobile-body-subtitle-2">
                <div className="relative leading-[24px] font-semibold">
                    Liên hệ hỗ trợ
                </div>
                <div className="relative text-lg leading-[27px] capitalize font-semibold text-red-red-500">
                    0123456789
                </div>
            </div>
        </div>
  )
}

export default LogIn
