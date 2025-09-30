import type { VariantProps } from 'class-variance-authority'
import type { SVGProps } from 'react'

import type { iconVariants } from './variants'

type IconProps = Readonly<SVGProps<SVGSVGElement> & VariantProps<typeof iconVariants>>

export type { IconProps }
