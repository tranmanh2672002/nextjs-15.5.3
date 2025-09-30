import type { FC } from 'react'

import * as icons from '#/assets/icons'

import type { IconProps } from './types'

export const Icon = Object.fromEntries(
  Object.entries(icons).map(([name, Component]) => [
    name,
    ({ className, ...props }: IconProps) => {
      return <Component className={className} {...props} />
    },
  ]),
) as Record<keyof typeof icons, FC<IconProps>>
