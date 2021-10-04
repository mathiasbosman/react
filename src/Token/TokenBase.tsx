import {KeyboardEvent} from 'react'
import styled from 'styled-components'
import {variant} from 'styled-system'
import {get} from '../constants'

export type TokenSizeKeys = 'sm' | 'md' | 'lg' | 'xl'

export const tokenSizes: Record<TokenSizeKeys, string> = {
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px'
}

export const defaultTokenSize = 'md'

export interface TokenBaseProps
  extends Omit<React.HTMLProps<HTMLSpanElement | HTMLButtonElement | HTMLAnchorElement>, 'size' | 'id'> {
  as?: 'button' | 'a' | 'span'
  onRemove?: () => void
  isSelected?: boolean
  tabIndex?: number
  text: string
  id?: number | string
  size?: TokenSizeKeys
}

export const isTokenInteractive = ({as = 'span', onClick, onFocus, tabIndex = -1}: TokenBaseProps) =>
  Boolean(onFocus || onClick || tabIndex > -1 || ['a', 'button'].includes(as))

const variants = variant<
  {fontSize: number; height: string; gap: number; paddingLeft: any; paddingRight: number},
  TokenSizeKeys
>({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 0,
      gap: 1,
      height: tokenSizes.sm,
      paddingLeft: 1,
      paddingRight: 1
    },
    md: {
      fontSize: 0,
      gap: 1,
      height: tokenSizes.md,
      paddingLeft: 2,
      paddingRight: 2
    },
    lg: {
      fontSize: 0,
      gap: 2,
      height: tokenSizes.lg,
      paddingLeft: 2,
      paddingRight: 2
    },
    xl: {
      fontSize: 1,
      gap: 2,
      height: tokenSizes.xl,
      paddingLeft: 3,
      paddingRight: 3
    }
  }
})

const TokenBase = styled.span.attrs<TokenBaseProps>(({text, onRemove, onKeyDown}) => ({
  onKeyDown: (event: KeyboardEvent<HTMLSpanElement | HTMLButtonElement | HTMLAnchorElement>) => {
    onKeyDown && onKeyDown(event)

    if ((event.key === 'Backspace' || event.key === 'Delete') && onRemove) {
      onRemove()
    }
  },
  'aria-label': onRemove ? `${text}, press backspace or delete to remove` : undefined
}))<TokenBaseProps>`
  align-items: center;
  border-radius: 999px;
  cursor: ${props => (isTokenInteractive(props) ? 'pointer' : 'auto')};
  display: inline-flex;
  font-weight: ${get('fontWeights.bold')};
  text-decoration: none;
  white-space: nowrap;
  ${variants}
`

TokenBase.defaultProps = {
  as: 'span',
  size: defaultTokenSize
}

export default TokenBase
