import { useMutation } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'

const suggestions = [
  'Qual produto vendeu mais?',
  'Quantos clientes temos em São Paulo?',
  'Qual categoria faturou mais?',
  'Qual o valor total dos pedidos?',
]

type AskResponse = {
  answer: string
  queries: string[]
}

async function askQuestion(question: string) {
  const response = await fetch('/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível obter uma resposta.')
  }

  return (await response.json()) as AskResponse
}

export default function App() {
  const [question, setQuestion] = useState('')
  const ask = useMutation({ mutationFn: askQuestion })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed || ask.isPending) return
    setQuestion('')
    ask.mutate(trimmed)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10 text-neutral-900">
      <div className="w-full max-w-xl">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="question">
            Pergunta sobre os dados
          </label>
          <input
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Pergunte sobre os dados"
            className="min-w-0 flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-400"
          />
          <button
            type="submit"
            disabled={ask.isPending || question.trim().length === 0}
            className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {ask.isPending ? '...' : 'Perguntar'}
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setQuestion(suggestion)}
              className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-left text-sm text-neutral-700 hover:bg-neutral-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {ask.isPending && (
          <p className="mt-6 text-neutral-600" role="status">
            Consultando os dados…
          </p>
        )}

        {ask.isError && (
          <p className="mt-6 text-neutral-600" role="alert">
            Não foi possível obter uma resposta. Tente de novo.
          </p>
        )}

        {ask.isSuccess && (
          <>
            <p className="mt-6 text-lg leading-relaxed whitespace-pre-wrap">
              {ask.data.answer}
            </p>
            {ask.data.queries.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {ask.data.queries.map((query, index) => (
                  <pre
                    key={index}
                    className="overflow-x-auto rounded-2xl border border-neutral-300 bg-white p-4 font-mono text-sm text-neutral-800"
                  >
                    {query}
                  </pre>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
