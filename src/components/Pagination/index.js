import React, { Component, PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import Button from '../Button';
import styles from './index.style';

export default class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.calculatePagination();
  }

  componentWillReceiveProps(nextProps) {
    this.calculatePagination(nextProps);
  }

  calculatePagination(nextProps) {
    const { itemsPerPage, total } = nextProps || this.props;
    this.numOfPages = Math.ceil(total / itemsPerPage);
  }

  handleChangePage(page) {
    const { onPaginationChange } = this.props;
    onPaginationChange(page);
  }

  clickHandler(i) {
    return () => this.handleChangePage(i);
  }

  renderPages() {
    if (this.numOfPages < 2) return false;
    const { currentPage } = this.props;
    const elems = [];
    let i;
    let j;

    // calculate start/end of pagination numbers if pagination has over 5 pages
    if (currentPage - 2 < 1) {
      i = 1;
      j = 5;
    } else if (currentPage + 2 > this.numOfPages) {
      i = this.numOfPages - 4;
      j = this.numOfPages;
    } else {
      i = currentPage - 2;
      j = currentPage + 2;
    }

    // calculate if pagination has 5 or less pages, reset previous calculations
    if (this.numOfPages <= 5) {
      i = 1;
      j = this.numOfPages;
    }

    for (i; i <= j; i += 1) {
      elems.push(
        <li
          className={css(styles.item, i === currentPage && styles.selected)}
          key={i}
        >
          {i === currentPage ? i :
            <Button
              empty
              type="button"
              onClick={this.clickHandler(i)}
            >{i}</Button>
          }
        </li>
      );
    }

    return elems;
  }

  renderPaginationInfo() {
    const { currentPage, itemsPerPage, total } = this.props;

    if (total === 1) return 'Showing 1 result';
    if (this.numOfPages <= 1) return `Showing all of ${total} results`;

    const currentStart = 1 + ((currentPage - 1) * itemsPerPage);
    let currentEnd = itemsPerPage + ((currentPage - 1) * itemsPerPage);
    currentEnd = currentEnd > total ? total : currentEnd;
    return `Showing ${currentStart}-${currentEnd} of ${total} results`;
  }

  render() {
    const { currentPage, style, total } = this.props;

    return (
      total > 0 &&
        <div className={css(style && style)}>
          <p>{this.renderPaginationInfo()}</p>
          {this.numOfPages > 1 &&
            <ul className={css(styles.pagination)}>
              { currentPage > 3 && this.numOfPages > 5 &&
                <li className={css(styles.item)}>
                  <Button
                    empty
                    type="button"
                    onClick={() => this.handleChangePage(1)}
                  >
                    <i className="fa fa-angle-double-left" />
                  </Button>
                </li>
              }
              { currentPage !== 1 &&
                <li className={css(styles.item)}>
                  <Button
                    empty
                    type="button"
                    onClick={() => this.handleChangePage(currentPage - 1)}
                  >
                    <i className="fa fa-angle-left" />
                  </Button>
                </li>
              }
              {this.renderPages()}
              {currentPage !== this.numOfPages &&
                <li className={css(styles.item)}>
                  <Button
                    empty
                    type="button"
                    onClick={() => this.handleChangePage(currentPage + 1)}
                  >
                    <i className="fa fa-angle-right" />
                  </Button>
                </li>
              }
              {currentPage < this.numOfPages - 2 && this.numOfPages > 5 &&
                <li className={css(styles.item)}>
                  <Button
                    empty
                    type="button"
                    onClick={() => this.handleChangePage(this.numOfPages)}
                  >
                    <i className="fa fa-angle-double-right" />
                  </Button>
                </li>
              }
            </ul>
          }
        </div>
    );
  }
}
