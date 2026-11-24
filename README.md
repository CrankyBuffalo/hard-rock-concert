# Hard Rock Concert

A mod for the Claude Code desktop app that turns the session background into an animated hard rock show.

- A lit stage with truss rigging, swinging spotlights and moving heads, an LED screen with a live equalizer, red curtains and flown PA speakers.
- Marshall-style amp stacks that thump on the beat, monitor wedges, and flame jets with rising sparks.
- A five-piece band: singer, drummer, and four guitarists playing a Flying V, a sunburst Les Paul, a bass and an Explorer.
- A four-row crowd with raised arms, phone lights, lighters, a flag and a crowd surfer.
- A dark theme with a near-black purple palette and a red accent. Message rows sit on solid dark panels so text stays readable over the scene.

The scene is dark-mode only and is drawn in the desktop app. The terminal and editors show no theme.

## Install

At the prompt of a terminal session:

```
/plugin install hard-rock-concert --marketplace CrankyBuffalo/hard-rock-concert
```

From a shell:

```
claude plugin install hard-rock-concert --marketplace CrankyBuffalo/hard-rock-concert
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `CrankyBuffalo/hard-rock-concert`, then Add plugin.

## Layout

- `hooks/scene.js` builds the backdrop as one SVG string.
- `hooks/register.tsx` sets the theme colors and message styling, and draws the backdrop.
- `hooks/make-colors.js` is the theme color helper that ships with the mod tooling. Leave it as is.
