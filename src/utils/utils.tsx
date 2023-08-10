import {type NotificationInstance, type NotificationPlacement} from 'antd/es/notification/interface'
import {useRef, useState} from 'react'

export const ToTimeFormat = (time: Date) => {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().slice(11, 16)
}

export const ToDateTimeFormat = (time: Date) => {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export const ToDateFormat = (date: Date) => {
    if (date.toString() === 'Invalid Date') {
        return ''
    }
    const isoString = date.toISOString()
    const year = isoString.slice(0, 4)
    const month = isoString.slice(5, 7)
    const day = isoString.slice(8, 10)
    return (year + '-' + month + '-' + day)
}

export const CtrlPopupVisibility = () => {
    const blurBackgroundRef = useRef(null)
    const [showPp, setShowPp] = useState(false)

    const setVisibilityP = (show: boolean) => {
        if (blurBackgroundRef.current === null) {
            return
        }

        if (show) {
            (blurBackgroundRef.current as HTMLElement).style.visibility = 'visible'
            setShowPp(show)
        } else {
            (blurBackgroundRef.current as HTMLElement).style.visibility = 'hidden'
            setShowPp(show)
        }
    }

    const showP = () => {
        setVisibilityP(true)
    }

    const hideP = () => {
        setVisibilityP(false)
    }
    return {blurBackgroundRef, showPp, showP, hideP}
}

export const SuccessMessage = (api: NotificationInstance, placement?: NotificationPlacement) => {
    return (message: string, description: string) => {
        api.success({
            message,
            description,
            placement: placement !== undefined ? placement : 'topRight'
        })
    }
}

export const ErrorMessage = (api: NotificationInstance, placement?: NotificationPlacement) => {
    return (message: string, description: string) => {
        api.error({
            message,
            description,
            placement: placement !== undefined ? placement : 'topRight'
        })
    }
}
