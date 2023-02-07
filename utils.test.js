import { describe, it, expect } from 'vitest'
import { markDiscrepancy } from 'src/utils'
// import { Home } from 'src/pages'

describe('markDiscrepancy', () => {
    it('wraps letters in <b> tags if they do not match the source', () => {
        const source = 'Hello, World'
        const input = 'Helpplo, Worppld'
        const expected = 'Hel<b>p</b><b>p</b>lo, Wor<b>p</b><b>p</b>ld'
        const result = markDiscrepancy(source, input)
        expect(result.output).toEqual(expected)
    })
})
