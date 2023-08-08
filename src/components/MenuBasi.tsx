import React from 'react'

interface MenuBasiType {
    onClickUpdateProfile: () => void
}

const MenuBasi: React.FC<MenuBasiType> = ({
                                              onClickUpdateProfile
                                          }) => {
    return (
        <div className="self-stretch flex flex-col items-start justify-center">
            <div
                className="w-[200px] h-[50px] flex flex-col py-6 px-4 box-border items-start justify-center cursor-button"
                onClick={onClickUpdateProfile}
            >
                <div className="w-[108px] flex flex-row items-center justify-start gap-[16px]">
                    <img className="relative w-6 h-6" alt="" src="/userlist-regular1.svg"/>
                    <div className="relative leading-[150%]">Thông tin</div>
                </div>
            </div>
            <div
                className="w-[200px] h-[50px] flex flex-col py-6 px-4 box-border items-start justify-center cursor-button"
                onClick={() => {
                    localStorage.clear()
                    window.location.href = '/log-in'
                }}
            >
                <div className="w-[108px] flex flex-row items-center justify-start gap-[16px]">
                    <img className="relative w-6 h-6" alt="" src="/signout-regular.svg"/>
                    <div className="relative leading-[150%]">Đăng xuất</div>
                </div>
            </div>
        </div>
    )
}

export default MenuBasi
