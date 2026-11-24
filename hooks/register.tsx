import type { Register, ThemeMessageRule, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene.js'

// Dark, hot and loud: black-purple surfaces, blood-red accent.
const { theme, problems } = makeColors({
  label: 'Hard rock concert',
  roles: { accent: '#ff3b30', danger: '#ff5a4d', success: '#5fd068', warning: '#ffb020', pro: '#c04dff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0d0710',
        'surface-1': '#150b19',
        'surface-2': '#1d1022',
        'surface-3': '#25152b',
        'text-primary': '#fbeef0',
        'text-secondary': '#dcc7cc',
        'text-muted': '#b79ca4',
      },
    },
  },
  only: 'dark',
})

const SCENE_ID = 'hard-rock'

// A heavier veil over the scene, and near-solid rows under the words, so text stays readable.
const BASE: ThemeSetArgs = {
  colors: theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: SCENE_ID, glass: { blur: 14, tint: '#0d0710', opacity: 0.6 } },
}

const row: ThemeMessageRule = {
  color: '#fbeef0',
  backgroundColor: '#0d0710ec',
  radius: 12,
  paddingX: 16,
  paddingY: 12,
}

const LOOK: ThemeSetArgs = {
  ...BASE,
  style: {
    AssistantMessage: row,
    UserMessage: { ...row, backgroundColor: '#2a0c18f0', borderColor: '#ff3b30', borderWidth: 1 },
    ToolUse: { color: '#fbeef0', backgroundColor: '#0d0710e6', radius: 8, paddingX: 10 },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    // A build that doesn't take `style` throws: fall back to the veil alone.
    const set = await $.theme.set(LOOK).catch(() => $.theme.set(BASE))

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.scene !== SCENE_ID) {
      return next(e)
    }
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="A hard rock concert: a band on stage under swinging spotlights, amp stacks, pyro and a crowd with raised hands" isInteractive />
  })
}
