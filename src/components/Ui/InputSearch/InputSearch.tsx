import styled from "styled-components"
import { Input } from "../Input/Input"
import { useEffect, useState, useRef } from "react"

type InputSearchProps = {
    value: string
    onChange: (value: string) => void
    searchFunction: SearchFunction
}

export const InputSearch = ({ onChange, searchFunction }: InputSearchProps) => {

    const [results, setResults] = useState<{
        value: string
        label: string
        subtext?: string
    }[]>([])

    const [selectedResult, setSelectedResult] = useState<{
        value: string
        label: string
        subtext?: string
    } | null>(null)

    const [q, setQ] = useState("")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === q) return
        setQ(e.target.value)
    }

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        if (!q.trim()) {
            setResults([])
            return
        }

        abortControllerRef.current = new AbortController()

        timeoutRef.current = setTimeout(async () => {
            try {
                const results = await searchFunction(q)

                if (!abortControllerRef.current?.signal.aborted) {
                    setResults(results)
                }
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Search error:', error)
                }
            }
        }, 500)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [q, searchFunction])

    const handleChange = (result: { value: string, label: string, subtext?: string }) => {
        setSelectedResult(result)
        onChange(result.value)
    }

    return <InputSearchContainer>
        {!selectedResult && <Input type="text" placeholder="Buscar" value={q} onChange={handleInputChange} />}
        {selectedResult && <Input style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'capitalize' }} type="text" placeholder="Buscar" value={selectedResult.label + " ✅"} onChange={() => { setSelectedResult(null) }} />}
        {!selectedResult && <ResultBox>
            {results.map((result) => (
                <ResultItem key={result.value} onClick={() => handleChange(result)}>
                    <div style={{ fontSize: '14px', color: 'var(--text-color)' }}>{result.label}</div>
                    {result.subtext && <div style={{ fontSize: '10px', color: 'var(--text-color-secondary)', marginTop: '4px' }}>{result.subtext}</div>}
                </ResultItem>
            ))}
        </ResultBox>}
    </InputSearchContainer>
}

type SearchFunction = (value: string) => Promise<{
    value: string
    label: string
    subtext?: string
}[]>

const ResultBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  margin-top: 4px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  max-height: 200px;
  overflow-y: auto;
`

const ResultItem = styled.div`
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
  border-bottom: 1px solid #e0e0e0;
  &:hover {
    background-color: #f5f7fa;
  }
`

const InputSearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`

