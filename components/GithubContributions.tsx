'use client'

import { useEffect, useMemo, useState } from 'react'

type ContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type MonthLabel = {
  weekIndex: number
  label: string
}

type ContributionsResponse = {
  username: string
  summary: string
  total: number
  parsedDays: number
  from: string
  to: string
  monthLabels: MonthLabel[]
  weeks: Array<Array<ContributionDay | null>>
}

const LEVEL_COLORS: Record<ContributionDay['level'], string> = {
  0: '#161b22',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
}

const LEVELS: ContributionDay['level'][] = [0, 1, 2, 3, 4]

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    parsed
  )
}

export default function GithubContributions({ username = "zero-ashish" }: { username: string }) {
  const [data, setData] = useState<ContributionsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      setError(null)
      setData(null)

      try {
        const res = await fetch(`/api/github/contributions?username=${encodeURIComponent(username)}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = (await res.json()) as ContributionsResponse
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load')
      }
    }

    if (username) void run()
    return () => {
      cancelled = true
    }
  }, [username])

  const weeksCount = data?.weeks.length ?? 53

  const monthGridStyle = useMemo(() => {
    return { gridTemplateColumns: `repeat(${weeksCount}, var(--cell))`, columnGap: 'var(--gap)' } as const
  }, [weeksCount])

  const profileHref = username ? `https://github.com/${username}` : 'https://github.com'

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/35">
      <div className="bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_8px,transparent_8px,transparent_16px)] p-4 sm:p-5">
        <div
          className={[
            'rounded-xl border border-white/10 bg-[#0d1117] p-4',
            '[--cell:10px] sm:[--cell:11px] md:[--cell:12px]',
            '[--gap:3px]',
          ].join(' ')}
        >
          <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
            <div className="min-w-max">
              <div className="mb-2 grid text-[12px] font-medium text-white/70" style={monthGridStyle}>
                {data?.monthLabels.map((m) => (
                  <span key={`${m.weekIndex}-${m.label}`} style={{ gridColumnStart: m.weekIndex + 1 }}>
                    {m.label}
                  </span>
                ))}
              </div>

              <div className="grid grid-flow-col auto-cols-[var(--cell)] grid-rows-7 gap-[var(--gap)]">
                {data?.weeks
                  ? data.weeks.flatMap((week, weekIndex) =>
                      week.map((day, dayIndex) => {
                        const level = day?.level ?? 0
                        const count = day?.count ?? 0
                        const date = day?.date ?? `${weekIndex}-${dayIndex}`

                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}-${date}`}
                            className="h-[var(--cell)] w-[var(--cell)] rounded-[2px] ring-1 ring-white/5"
                            style={{ backgroundColor: LEVEL_COLORS[level] }}
                            title={day ? `${count} contributions on ${formatDate(day.date)}` : undefined}
                            aria-label={day ? `${count} contributions on ${day.date}` : undefined}
                            role="img"
                          />
                        )
                      })
                    )
                  : Array.from({ length: weeksCount * 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[var(--cell)] w-[var(--cell)] animate-pulse rounded-[2px] bg-white/5 ring-1 ring-white/5"
                      />
                    ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-white/65">
            <div className="min-w-0">
              {error ? (
                <span className="text-rose-300/80">Failed to load GitHub contributions ({error}).</span>
              ) : data ? (
                <span className="truncate">
                  {data.parsedDays === 0 ? (
                    <>
                      Couldn&apos;t read the contribution graph (parsed 0 days). Open on{' '}
                      <a href={profileHref} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">
                        GitHub
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      {data.summary} on{' '}
                      <a href={profileHref} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">
                        GitHub
                      </a>
                      .
                    </>
                  )}
                </span>
              ) : (
                <span className="truncate">Loading GitHub contributions…</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>Less</span>
              <span className="flex items-center gap-1">
                {LEVELS.map((k) => (
                  <span
                    key={k}
                    className="h-2.5 w-2.5 rounded-[2px] ring-1 ring-white/5"
                    style={{ backgroundColor: LEVEL_COLORS[k] }}
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
