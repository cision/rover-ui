import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

export default class BarStat extends Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
    showLabel: PropTypes.bool,
  };

  static defaultProps = {
    showLabel: false,
  };

  state = {
    show: false,
  };

  componentDidMount() {
    if (!this.state.show) {
      requestAnimationFrame(() => this.setState({ show: true })); // eslint-disable-line no-undef
    }
  }

  render() {
    const { percent, showLabel } = this.props;
    const { show } = this.state;
    const percentString = `${percent}%`;
    let widthPercent = '0px';
    if (show) {
      if (percent > 0 && percent < 1) {
        widthPercent = '1px';
      } else {
        widthPercent = percentString;
      }
    }

    return (
      <div className={styles.BarStat}>
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${widthPercent}` }} />
        </div>
        {showLabel && (
          <div className={styles.label}>{parseInt(percent, 10)}%</div>
        )}
      </div>
    );
  }
}
