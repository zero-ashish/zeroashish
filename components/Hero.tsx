'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CONTACT_EMAIL, SOCIALS } from '@/components/contactInfo'
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CodeIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from '@/components/icons'
import GithubContributions from '@/components/GithubContributions'
import {
  SOCIAL_ICONS,
  STACK_ICONS,
} from '@/constant/constant'

const RESUME_URL = new URL('../assets/Ashish_kushwaha_Fullstack_developer.pdf', import.meta.url).toString()

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const ROTATING_BADGES = [
  // 'Web3 Enthusiast',
  // 'Blockchain developer',
  'Fullstack developer',
] as const

const BADGE_ROTATE_INTERVAL_MS = 2200

const PROFILE = {
  name: 'Ashish Kushwaha',
  title: 'Full-Stack Engineer',
  summary: `I'm your go-to Full Stack Developer, ready to bring your dream product to life in the virtual world.`,
  roleLine: 'Software Developer',
  programLine: 'Cohort 3 - @100xDevs',
  location: 'India',
  phone: '+91 8299690703',
  resumeLabel: 'Resume',
  githubUsername: 'zero-ashish',
} as const

function safeUrl(href: string) {
  if (!href || href === '#') return null
  try {
    return new URL(href)
  } catch {
    return null
  }
}

function socialSubtitle(label: string, href: string) {
  const url = safeUrl(href)
  if (!url) return 'Add your link'

  const parts = url.pathname.split('/').filter(Boolean)
  const key = label.toLowerCase()

  if (key === 'x' || key === 'twitter') return parts[0] ? `@${parts[0]}` : url.host
  if (key === 'github') return parts[0] ? parts[0] : url.host
  if (key === 'linkedin') {
    const inIndex = parts.indexOf('in')
    if (inIndex >= 0 && parts[inIndex + 1]) return parts[inIndex + 1]
    return parts[0] || url.host
  }
  if (key === 'leetcode') return parts.at(-1) || url.host

  return url.host
}

function InfoRow({
  icon,
  label,
  value,
  href,
  mono,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
  href?: string
  mono?: boolean
}) {
  const shouldOpenNewTab = Boolean(href && !/^(mailto:|tel:)/i.test(href))

  const content = (
    <span
      className={[
        'min-w-0 flex-1 truncate',
        mono ? 'font-mono tracking-tight' : 'font-medium tracking-tight',
        'text-white/85',
      ].join(' ')}
    >
      {value}
    </span>
  )

  return (
    <div className="flex items-center gap-3 py-1.5 text-[13px] sm:text-sm">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/6 ring-1 ring-white/10">
        <span className="text-white/70">{icon}</span>
      </span>
      <span className="sr-only">{label}:</span>
      {href ? (
        <a
          href={href}
          target={shouldOpenNewTab ? '_blank' : undefined}
          rel={shouldOpenNewTab ? 'noreferrer noopener' : undefined}
          className="min-w-0 flex-1 truncate underline decoration-white/15 underline-offset-4 hover:decoration-white/30"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}

export default function Hero() {
  const [badgeIndex, setBadgeIndex] = useState(0)

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % ROTATING_BADGES.length)
    }, BADGE_ROTATE_INTERVAL_MS)

    return () => window.clearInterval(timerId)
  }, [])

  const activeBadge = ROTATING_BADGES[badgeIndex]

  const socials = useMemo(() => {
    const byLabel = new Map(SOCIALS.map((s) => [s.label.toLowerCase(), s.href] as const))
    return {
      github: byLabel.get('github') || '#',
      linkedin: byLabel.get('linkedin') || '#',
      x: byLabel.get('x') || byLabel.get('twitter') || '#',
      leetcode: byLabel.get('leetcode') || '#',
    }
  }, [])

  const socialCards = useMemo(
    () => [
      {
        label: 'LinkedIn',
        href: socials.linkedin,
        icon: (
          <Image
            src={SOCIAL_ICONS.linkedin}
            alt="LinkedIn"
            width={24}
            height={24}
            sizes="24px"
            className="h-6 w-6 object-contain"
          />
        ),
      },
      {
        label: 'X (formerly Twitter)',
        href: socials.x,
        icon: (
          <Image src={SOCIAL_ICONS.twitter} alt="X" width={24} height={24} sizes="24px" className="h-6 w-6 object-contain" />
        ),
      },
      {
        label: 'GitHub',
        href: socials.github,
        icon: (
          <Image
            src={SOCIAL_ICONS.github}
            alt="GitHub"
            width={24}
            height={24}
            sizes="24px"
            className="h-6 w-6 object-contain"
          />
        ),
      },
      {
        label: 'LeetCode',
        href: socials.leetcode,
        icon: (
          <Image
            src={SOCIAL_ICONS.leetcode}
            alt="LeetCode"
            width={24}
            height={24}
            sizes="24px"
            className="h-6 w-6 object-contain"
          />
        ),
      },
    ],
    [socials.github, socials.leetcode, socials.linkedin, socials.x]
  )

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl pb-14 pt-14 md:pb-20 md:pt-20"
    >
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl dark:text-white">
          {PROFILE.name}
        </h1>
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1 text-sm text-neutral-700 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-white/70">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeBadge}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-block"
              >
                {activeBadge}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-white/45">{PROFILE.summary}</p>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-950/95 to-neutral-900/55 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur md:p-6">
        <div className="grid gap-3 md:grid-cols-2 md:gap-x-12">
          <div className="grid gap-1">
            <InfoRow icon={<BriefcaseIcon className="h-4 w-4" />} label="Role" value={PROFILE.roleLine} mono />
            <InfoRow icon={<CodeIcon className="h-4 w-4" />} label="Track" value={PROFILE.programLine} mono />
            <InfoRow icon={<MapPinIcon className="h-4 w-4" />} label="Location" value={PROFILE.location} mono />
          </div>

          <div className="grid gap-1">
            <InfoRow
              icon={<PhoneIcon className="h-4 w-4" />}
              label="Phone"
              value={PROFILE.phone}
              href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
              mono
            />
            <InfoRow
              icon={<MailIcon className="h-4 w-4" />}
              label="Email"
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
              mono
            />
            <InfoRow
              icon={<GlobeIcon className="h-4 w-4" />}
              label="Resume"
              value={PROFILE.resumeLabel}
              href={RESUME_URL}
              mono
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {socialCards.map((s) => {
          const isLink = s.href !== '#'
          const Wrapper: 'a' | 'div' = isLink ? 'a' : 'div'

          return (
            <Wrapper
              key={s.label}
              {...(isLink
                ? { href: s.href, target: '_blank', rel: 'noreferrer noopener' }
                : { role: 'link', 'aria-disabled': true })}
              className="group flex items-center justify-between gap-4 rounded-3xl border border-neutral-200/80 bg-white px-5 py-4 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/7"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white ring-1 ring-black/10 dark:bg-white/90 dark:ring-white/10">
                  {s.icon}
                </span>
                <span className="min-w-0">
                  <div className="text-sm font-semibold">{s.label}</div>
                  <div className="text-xs text-neutral-600 dark:text-white/50">{socialSubtitle(s.label, s.href)}</div>
                </span>
              </span>

              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-neutral-950/5 text-neutral-700 ring-1 ring-neutral-200/80 transition group-hover:bg-neutral-950/10 dark:bg-black/25 dark:text-white/70 dark:ring-white/10 dark:group-hover:bg-black/35">
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </Wrapper>
          )
        })}
      </div>

      <div className="mt-10 max-w-5xl">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-neutral-950 dark:text-white/85">Stack</h2>
          <div className="h-px flex-1 bg-neutral-200/80 dark:bg-white/10" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {STACK_ICONS.map(({ label, src }) => (
            <span
              key={label}
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white px-3 py-1.5 text-xs text-neutral-700 shadow-sm backdrop-blur transition hover:bg-neutral-50 hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/7 dark:hover:text-white md:text-sm"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white ring-1 ring-black/10 dark:bg-white/90 dark:ring-white/10">
                <Image
                  src={src}
                  alt={label}
                  width={14}
                  height={14}
                  sizes="14px"
                  className="h-3.5 w-3.5 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-5xl">
        <GithubContributions username={PROFILE.githubUsername} />
      </div>
    </motion.section>
  )
}
