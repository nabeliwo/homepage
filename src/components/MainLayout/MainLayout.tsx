import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { categories } from '../../constants/application'
import { font, palette, space } from '../../themes'

import { Head } from '../Head'

type Props = {
  title: string
  description: string
  category: string
  slug: string
  html: string
}

export const MainLayout: FC<Props> = ({ title, description, category, slug, html }) => {
  const categorySlug = slug.split('/')[1]
  const categoryPaths = categories[categorySlug]
  const pathname = typeof window !== 'undefined' ? location.pathname : ''

  return (
    <>
      <Head title={title} description={description} slug={slug} />
      <Title>{category}</Title>

      {categoryPaths && categoryPaths.length > 0 && (
        <Categories>
          {categoryPaths.map((item) => {
            const activeClass =
              (item.exact && pathname === item.path) || (!item.exact && pathname.indexOf(item.path) !== -1) ? 'active' : ''

            return (
              <li key={item.path}>
                <Item to={item.path} className={activeClass}>
                  {item.title}
                </Item>
              </li>
            )
          })}
        </Categories>
      )}

      <Content dangerouslySetInnerHTML={{ __html: html }} />
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
    margin: ${space.m}px 0 ${space.s}px;
    font-size: ${font.xl}px;

    &:first-child {
      margin-top: 0;
    }
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

  ul {
    margin-bottom: ${space.s}px;
    padding-left: 1.5em;

    ul {
      margin-bottom: 0;
    }
  }

  li {
    position: relative;

    &::before {
      position: absolute;
      top: 12px;
      left: -18px;
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: ${palette.BLUE};
      content: '';
    }

    p {
      margin: 0;
    }
  }
`
