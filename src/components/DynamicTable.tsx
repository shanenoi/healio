import React, {type ChangeEvent, useEffect, useState} from 'react'

interface Option {
    text: string
    value: string
}

interface HeaderDef {
    name: string
    inputMethod: 'text' | 'select' | 'number'
    options?: Option[]
    size: string
}

interface DynamicTableProps {
    headerDef: HeaderDef[]
    data: Array<Record<string, any>>
    onChange: (data: Array<Record<string, any>>, rowIndex: number) => void
    disabled?: boolean
}

const DynamicTable: React.FC<DynamicTableProps> = ({
                                                       headerDef,
                                                       data,
                                                       onChange,
                                                       disabled
                                                   }) => {
    const [stateData, setStateData] = useState(data)

    useEffect(() => {
        setStateData(data)
    }, [data])

    useEffect(() => {
    }, [stateData])

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        rowIndex: number,
        headerName: string
    ) => {
        const newData = [...stateData]
        newData[rowIndex][headerName] = event.target.value
        setStateData(newData)
        onChange(newData, rowIndex)
    }

    const handleDeleteRow = (_id: string) => {
        let newData = [...stateData]
        newData = newData.filter((item) => item._id !== _id)
        setStateData(newData)
        onChange(newData, -1)
    }

    const handleAddRow = () => {
        const newData = [...stateData]
        const l = newData.length
        newData.push({_id: `${new Date().getTime()}.${Math.random().toString(36).substring(2, 9)}`})
        setStateData(newData)
        onChange(newData, l)
    }

    const renderInput = (
        header: HeaderDef,
        value: any,
        rowIndex: number
    ) => {
        switch (header.inputMethod) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        className={'input'}
                        onChange={event => {
                            handleInputChange(event, rowIndex, header.name)
                        }}
                        disabled={disabled}
                    />
                )
            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        className={'input'}
                        onChange={event => {
                            handleInputChange(event, rowIndex, header.name)
                        }}
                        disabled={disabled}
                    />
                )
            case 'select':
                return (
                    <select
                        value={value === '' ? '--' : value}
                        className={'select-input input'}
                        onChange={event => {
                            handleInputChange(event, rowIndex, header.name)
                        }}
                        defaultValue={'--'}
                        disabled={disabled}
                    >
                        <option
                            key={'--'}
                            value={'--'}
                            disabled={true}
                            className={'select-input-option'}
                        >
                            --
                        </option>
                        {header.options?.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                                className={'select-input-option'}
                            >
                                {option.text}
                            </option>
                        ))}
                    </select>
                )
            default:
                return null
        }
    }

    return (
        <>
            <button
                onClick={handleAddRow}
                style={{display: (disabled === true) ? 'none' : 'block'}}
            >Thêm
            </button>
            <table
                style={{
                    alignSelf: 'start',
                    // borderCollapse: 'collapse',
                    borderColor: 'black',
                    borderWidth: '1px',
                    width: '100%'
                }}
            >
                <thead>
                <tr
                    style={{border: '1px solid black'}}
                >
                    {headerDef.map(header => (
                        <th
                            key={header.name}
                            style={{width: header.size}}
                        >{header.name}</th>
                    ))}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {stateData.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        style={{border: '1px solid black'}}
                    >
                        {headerDef.map(header => (
                            <td key={header.name}>
                                {renderInput(header, row[header.name], rowIndex)}
                            </td>
                        ))}
                        <td>
                            <button
                                onClick={() => {
                                    console.log(JSON.stringify(row))
                                    handleDeleteRow(row._id)
                                }}
                                style={{display: (disabled === true) ? 'none' : 'block'}}
                            >
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default DynamicTable
