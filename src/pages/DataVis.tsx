import React from 'react'
import { useLocation } from 'react-router-dom'
import { ResponsiveLine } from '@nivo/line'

export const DataVis = () => {
    const location = useLocation()
    var data = location.state

    let newData = data.finalTally.map((item, index) => {
        return { id: index, data: item }
    })
    return (
        <>
            <ResponsiveLine data={newData}></ResponsiveLine>
        </>
    )
}
