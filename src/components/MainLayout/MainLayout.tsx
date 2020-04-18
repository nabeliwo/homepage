import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { font, palette, space } from '../../themes'

type Props = {
  title: string
  categories?: Array<{
    title: string
    path: string
    exact?: boolean
  }>
}

export const MainLayout: FC<Props> = ({ title, categories = [], children }) => {
  const pathname = typeof window !== 'undefined' ? location.pathname : ''

  return (
    <>
      <Title>{title}</Title>

      {categories.length > 0 && (
        <Categories>
          {categories.map((category) => {
            const activeClass =
              (category.exact && pathname === category.path) || (!category.exact && pathname.indexOf(category.path) !== -1)
                ? 'active'
                : ''

            return (
              <li key={category.path}>
                <Item to={category.path} className={activeClass}>
                  {category.title}
                </Item>
              </li>
            )
          })}
        </Categories>
      )}

      <Content>{children}</Content>
    </>
  )
}

const Title = styled.h2`
  margin-bottom: ${space.s}px;
  font-size: 26px;
  line-height: 1;
`
const Categories = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: ${space.s}px;
  padding-left: 10px;

  &::before {
    margin-right: 10px;
    font-size: ${font.l}px;
    content: '＞';
  }

  > li:not(:first-child) {
    margin-left: 10px;
  }
`
const Item = styled(Link)`
  display: block;
  padding: 8px 10px;
  color: ${palette.BLUE};
  font-size: ${font.l}px;
  text-decoration: none;

  &.active,
  &:hover {
    background-color: ${palette.BLUE};
    color: ${palette.BLACK};
  }
`
const Content = styled.div`
  overflow-y: scroll;
  flex: 1;
  padding-bottom: ${space.m}px;
  font-size: ${font.m}px;
  line-height: 1.8;

  h2 {
    margin-bottom: ${space.s}px;
    font-size: ${font.xl}px;
  }

  p {
    margin-bottom: ${space.s}px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`
