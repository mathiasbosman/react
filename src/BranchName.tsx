import styled from 'styled-components'
import {COMMON, get, SystemCommonProps} from './constants'
import sx, {SxProp} from './sx'
import {ComponentProps} from './utils/types'

const BranchName = styled.a<SystemCommonProps & SxProp>`
  display: inline-block;
  padding: 2px 6px;
  font-size: ${get('fontSizes.0')};
  font-family: ${get('fonts.mono')};
  color: ${get('colors.fg.muted')};
  background-color: ${get('colors.accent.subtle')};
  border-radius: ${get('radii.2')};
  ${COMMON};
  ${sx};
`

export type BranchNameProps = ComponentProps<typeof BranchName>
export default BranchName
