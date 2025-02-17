import classnames from 'classnames'
// eslint-disable-next-line import/no-namespace
import * as History from 'history'
import React from 'react'
import styled from 'styled-components'
import Box from './Box'
import {COMMON, FLEX, get, SystemCommonProps, SystemFlexProps} from './constants'
import sx, {SxProp} from './sx'
import {ComponentProps} from './utils/types'

const SELECTED_CLASS = 'selected'

const Wrapper = styled.li`
  display: inline-block;
  white-space: nowrap;
  list-style: none;
  &::after {
    padding-right: 0.5em;
    padding-left: 0.5em;
    color: ${get('colors.fg.muted')};
    font-size: ${get('fontSizes.1')};
    content: '/';
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    &::after {
      content: none;
    }
  }
`

const BreadcrumbsBase = styled.nav<SystemFlexProps & SystemCommonProps & SxProp>`
  display: flex;
  justify-content: space-between;
  ${COMMON};
  ${FLEX};
  ${sx};
`

export type BreadcrumbsProps = ComponentProps<typeof BreadcrumbsBase>

function Breadcrumbs({className, children, theme, ...rest}: React.PropsWithChildren<BreadcrumbsProps>) {
  const wrappedChildren = React.Children.map(children, child => <Wrapper theme={theme}>{child}</Wrapper>)
  return (
    <BreadcrumbsBase className={className} aria-label="Breadcrumbs" theme={theme} {...rest}>
      <Box as="ol" my={0} pl={0}>
        {wrappedChildren}
      </Box>
    </BreadcrumbsBase>
  )
}

type StyledBreadcrumbsItemProps = {
  to?: History.LocationDescriptor
  selected?: boolean
} & SystemCommonProps &
  SxProp

const BreadcrumbsItem = styled.a.attrs<StyledBreadcrumbsItemProps>(props => ({
  activeClassName: typeof props.to === 'string' ? 'selected' : '',
  className: classnames(props.selected && SELECTED_CLASS, props.className),
  'aria-current': props.selected ? 'page' : null
}))<StyledBreadcrumbsItemProps>`
  color: ${get('colors.accent.fg')};
  display: inline-block;
  font-size: ${get('fontSizes.1')};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &.selected {
    color: ${get('colors.fg.default')};
    pointer-events: none;
  }
  ${COMMON}
  ${sx};
`

Breadcrumbs.displayName = 'Breadcrumbs'

BreadcrumbsItem.displayName = 'Breadcrumbs.Item'

export type BreadcrumbsItemProps = ComponentProps<typeof BreadcrumbsItem>
export default Object.assign(Breadcrumbs, {Item: BreadcrumbsItem})

/**
 * @deprecated Use the `Breadcrumbs` component instead (i.e. `<Breadcrumb>` → `<Breadcrumbs>`)
 */
export const Breadcrumb = Object.assign(Breadcrumbs, {Item: BreadcrumbsItem})

/**
 * @deprecated Use the `BreadcrumbsProps` type instead
 */
export type BreadcrumbProps = ComponentProps<typeof BreadcrumbsBase>

/**
 * @deprecated Use the `BreadcrumbsItemProps` type instead
 */
export type BreadcrumbItemProps = ComponentProps<typeof BreadcrumbsItem>
