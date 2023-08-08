import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {supabaseClient} from '../utils/supabaseClient'
import {type FunctionComponent, useEffect, useState} from 'react'
import {type Profiles, ProfilesTable} from '../utils/supabaseTypes'
import {type User} from '@supabase/supabase-js'

const LogIn: FunctionComponent = () => {
    const confirmationText = 'Đã gửi'
    const emailInputPlaceholder = 'Nhập địa chỉ Email'
    const emailLabel = 'Địa chỉ Email'
    const loadingButtonLabel = 'Đang gửi...'
    const passwordInputPlaceholder = 'Nhập mật khẩu'
    const passwordLabel = 'Mật khẩu'

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (user === null) {
            return
        }

        // const navigate = useNavigate()
        void supabaseClient
            .from(ProfilesTable)
            .select('*')
            .eq('id', user.id)
            .single()
            .then(resp => {
                if (resp.error !== null) {
                    console.log('resp-get.Profiles')
                    console.log(resp.error)
                    return
                }
                const data: Profiles = resp.data
                if (data.user_type === 'bn') {
                    document.location.href = '/medical-register'
                } else {
                    document.location.href = '/timesheet-doctor'
                }
            })
    }, [user])

    useEffect(() => {
        const {data: authListener} = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session === null) {
                return
            }

            if (session.user !== null) {
                setUser(session.user)
            } else {
                setUser(null)
            }

            console.log('user')
            console.log(user)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

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
                className="absolute top-[23%] left-[152px] flex flex-col items-start justify-start gap-[16px] text-13xl text-grey-grey-900-p">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <div className="relative leading-[150%] font-semibold inline-block w-[400px] h-9 shrink-0">
                        Chào mừng!
                    </div>
                </div>

                <Auth
                    supabaseClient={supabaseClient}
                    appearance={{theme: ThemeSupa}}
                    providers={[]}
                    localization={{
                        variables: {
                            sign_in: {
                                email_label: emailLabel,
                                password_label: passwordLabel,
                                email_input_placeholder: emailInputPlaceholder,
                                password_input_placeholder: passwordInputPlaceholder,
                                button_label: 'Đăng Nhập',
                                link_text: 'Quay trở lại đăng Nhập'
                            },
                            sign_up: {
                                email_label: emailLabel,
                                password_label: passwordLabel,
                                email_input_placeholder: emailInputPlaceholder,
                                password_input_placeholder: passwordInputPlaceholder,
                                button_label: 'Đăng Ký',
                                link_text: 'Quay trở lại đăng ký'
                            },
                            forgotten_password: {
                                email_label: emailLabel,
                                email_input_placeholder: emailInputPlaceholder,
                                loading_button_label: loadingButtonLabel,
                                confirmation_text: confirmationText,
                                button_label: 'Gửi hướng dẫn đặt lại mật khẩu',
                                link_text: 'Quên mật khẩu'
                            }
                        }
                    }}
                />

                {/* <LoginContainer */}
                {/*    loginClick={(k) => { */}
                {/*        console.log(`k.email ${k.email}`) */}
                {/*        console.log(`k.password ${k.password}`) */}
                {/*    }} */}
                {/* /> */}
            </div>
            <div
                className="absolute bottom-[40px] left-[calc(50%_-_421px)] flex flex-col items-center justify-start gap-[8px] text-base text-grey-grey-300-s font-mobile-body-subtitle-2">
                <div className="relative leading-[24px] font-semibold">
                    Liên hệ hỗ trợ
                </div>
                <div className="relative text-lg leading-[27px] capitalize font-semibold text-red-red-500">
                    0214365879
                </div>
            </div>
        </div>
    )
}

export default LogIn
