import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Typography from './Typography';

describe('Typography', () => {
  it('renders', () => {
    render(<Typography data-testid="Typography-Test" />);
    expect(screen.getByTestId('Typography-Test')).toBeInTheDocument();
  });

  it('renders the appropriate tag', () => {
    const { container, rerender } = render(
      <Typography tag="h1">H1 Content</Typography>
    );
    expect(container.querySelector('h1')?.textContent).toBe('H1 Content');

    rerender(<Typography tag="div">Content in a div</Typography>);
    expect(container.querySelector('div')?.textContent).toBe(
      'Content in a div'
    );

    rerender(<Typography>Content in a span</Typography>);
    expect(container.querySelector('span')?.textContent).toBe(
      'Content in a span'
    );
  });

  it('renders css class based on props ', () => {
    render(
      <Typography
        data-testid="Typography-Test"
        tag="h1"
        size="xl3"
        color="primary"
        weight="bold"
      >
        H1 Content
      </Typography>
    );

    expect(screen.getByTestId('Typography-Test')).toHaveClass('size--xl3');
    expect(screen.getByTestId('Typography-Test')).toHaveClass('color--primary');
    expect(screen.getByTestId('Typography-Test')).toHaveClass('weight--bold');
  });
});
