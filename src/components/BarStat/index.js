import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, fontFamily, fontSize, height, width } from 'styled-system';
import withDefaultTheme from '../withDefaultTheme';

export const Label = withDefaultTheme(styled.span(fontFamily, fontSize));
Label.defaultProps = {
  fontFamily: 'body',
  fontSize: 1,
};

export const Bar = withDefaultTheme(
  styled.div(
    {
      transition: 'width 1s ease',
      display: 'flex',
      boxSizing: 'border-box',
    },
    color,
    height,
    width
  )
);

Bar.displayName = 'Bar';
Bar.defaultProps = {
  bg: 'grayLite.4',
  width: '100%',
  height: '10px',
};

const BarStat = props => {
  const { percent } = props;
  const percentString = `${percent}%`;
  let widthPercent = 0;

  if (percent > 0 && percent < 1) {
    widthPercent = '1px';
  } else {
    widthPercent = percentString;
  }

  return (
    <Fragment>
      <Bar>
        <Bar bg="grayLite.1" width={widthPercent} />
      </Bar>
      {props.children}
    </Fragment>
  );
};

BarStat.propTypes = {
  percent: PropTypes.number,
  children: PropTypes.node,
};

BarStat.defaultProps = {
  percent: 0,
  children: null,
};

export default BarStat;
