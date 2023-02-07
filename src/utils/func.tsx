export function markDiscrepancy(source: string, input: string) {
    let output = ''
    let j = 0
    let errorCount = 0
    for (let i = 0; i < input.length; i++) {
        if (
            j >= source.length ||
            source[j].toLowerCase() !== input[i].toLowerCase()
        ) {
            output += `<b>${input[i]}</b>` // TODO: no XSS
            errorCount++
            continue
        }
        output += input[i]
        j++
    }
    return { output: output, errorCount: errorCount }
}

export type DiscrepancyType = ReturnType<typeof markDiscrepancy>
