import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ResponsiveLine } from '@nivo/line'

export const DataVis = () => {
    // const location = useLocation()
    // var data = location.state

    // let newData = data.finalTally.map((item: number, index: number) => {
    //     return { id: index, data: item }
    // })
    let [searchParams, setSearchParams] = useSearchParams()

    const params = []

    for (let entry of searchParams.entries()) {
        params.push(entry)
    }

    console.log(searchParams)

    return (
        <>
            <ResponsiveLine
                data={[]}
                margin={{
                    top: 50,
                    right: 110,
                    bottom: 50,
                    left: 60,
                }}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                }}
                xFormat="time:%Y-%m-%d"
                axisLeft={{
                    legend: 'linear scale',
                    legendOffset: 12,
                }}
                axisBottom={{
                    format: '%b %d',
                    tickValues: 'every 2 days',
                    legend: 'time scale',
                    legendOffset: -12,
                }}></ResponsiveLine>
        </>
    )
}
