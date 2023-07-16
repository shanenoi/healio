export const ToTimeFormat = (time: Date) => {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().slice(11, 16)
}

export const ToDateTimeFormat = (time: Date) => {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}
