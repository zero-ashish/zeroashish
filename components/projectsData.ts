import type { StaticImageData } from 'next/image'
import iotEProject from '@/assets/iot-e-project.png'
import eventbusterProject from '@/assets/eventbuster.png'
import bwellaiProject from '@/assets/bwellai.png'

export type Project = {
title: string
desc: string
stack: readonly string[]
repo?: string
live?: string
image?: StaticImageData | string
}

export const projects: readonly Project[] = [
  {
title: 'BWell AI',
desc: 'Revolutionizing wellness tracking with AI-powered insights.',
stack: ['TypeScript', 'Next.js','Node.js', 'Express'],
live: 'https://app.bwellai.com/',
image: bwellaiProject
},
{
title: 'Excalidraw',
desc: 'Drawing App with collaborative feature build with Monorepo',
stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js', 'Express', "WebSockets"],
repo: 'https://github.com/zero-ashish/project-turborepo-excalidraw',
},
{
title: 'EventBuster',
desc: 'Event management system a multi-role system (User, Organizer, Admin) with role-based access control.',
stack: ['Next.js', 'TypeScript', 'Node.js'],
// repo: 'https://github.com/zero-ashish/iotentertainmentwebsite',
live: 'https://eventbuster.com',
image: eventbusterProject,
},
{
title: 'IOT-E',
desc: 'An modern landing page for the video editing agency',
stack: ['Next.js', 'TypeScript'],
repo: 'https://github.com/zero-ashish/iotentertainmentwebsite',
live: 'https://iot-e.in',
image: iotEProject,
},
{
title: 'Second Brain',
desc: 'increase your productivity, and lead a more fulfilling life with more ease and less stress.',
stack: ['React', 'Node.js', 'Express',],
repo: 'https://github.com/zero-ashish/second-brain-app',
}
] as const
