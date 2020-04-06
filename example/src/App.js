import React, { useState } from 'react';

import {
  Accordion,
  Avatar,
  Badge,
  Bar,
  Button,
  Media,
  Paper,
  Grid,
  Icon,
  Responsive,
  SideTray,
  EasyTabMenu,
  Pill,
  DeletablePill,
  EasyPill,
  Dropdown,
  EasyDropdown,
  Collapse,
  ExpansionPanel,
  Tooltip,
  // IMPORT_INJECTOR
} from '@cision/rover-ui';

const App = () => {
  const [isSideTrayOpen, setIsSideTrayOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ONE');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEasyPillChecked, setIsEasyPillChecked] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = function() {
    setTooltipOpen(prev => !prev);
  };

  const TooltipContent = (
    <React.Fragment>
      <h3>I have extra content</h3>
      <p>It can take any form you want!</p>
    </React.Fragment>
  );

  return (
    <div>
      <section>
        <h1>Badge</h1>
        <Badge variant="info">Badge</Badge>
      </section>
      <section>
        <h1>Bar</h1>
        <Bar.Bar>
          <Bar.Fill width="50%" />
        </Bar.Bar>
      </section>
      <section>
        <h1>Button</h1>
        <Button>Button</Button>
      </section>
      <section>
        <h1>Media</h1>
        <Media>
          <Media.Item mr="md">
            <small>
              <em>Media.Item</em>
            </small>
            <img
              src="https://source.unsplash.com/64x64/daily"
              alt="Unsplash daily"
            />
          </Media.Item>
          <Media.Body>Media.Body</Media.Body>
        </Media>
      </section>
      <section>
        <h1>Paper</h1>
        <Paper>Paper</Paper>
      </section>
      <section>
        <h1>Grid</h1>
        <Grid columns={4} gutter="md">
          <Paper>Grid entry 1</Paper>
          <Paper>Grid entry 2</Paper>
          <Paper>Grid entry 3</Paper>
          <Paper>Grid entry 4</Paper>
        </Grid>
      </section>
      <section>
        <h1>Responsive</h1>
        <hr />
        <h1>Responsive.Grid</h1>
        <div
          style={{
            border: '1px solid black',
            padding: '20px',
            resize: 'horizontal',
            overflowX: 'hidden',
          }}
        >
          <Responsive.Container>
            <Responsive.Grid
              breakpoints={{
                'container-xs-down': {
                  columns: 1,
                  gutter: '20px',
                },
                'container-sm-up': {
                  columns: 2,
                  gutter: '20px',
                },
              }}
            >
              <Paper>Grid entry 1</Paper>
              <Paper>Grid entry 2</Paper>
              <Paper>Grid entry 3</Paper>
              <Paper>Grid entry 4</Paper>
            </Responsive.Grid>
          </Responsive.Container>
        </div>
        <hr />
        <h1>Responsive.Hidden</h1>
        <div
          style={{
            border: '1px solid black',
            padding: '20px',
            resize: 'horizontal',
            overflowX: 'hidden',
          }}
        >
          <Responsive.Container>
            <div>
              <Responsive.Hidden breakpoints={['container-xs-down']}>
                I hide on small pages.
              </Responsive.Hidden>
            </div>
          </Responsive.Container>
        </div>
        <hr />
        <h1>Responsive.Visible</h1>
        <div
          style={{
            border: '1px solid black',
            padding: '20px',
            resize: 'horizontal',
            overflowX: 'hidden',
          }}
        >
          <Responsive.Container>
            <div>
              <Responsive.Visible breakpoints={['container-xs-down']}>
                I appear on small pages.
              </Responsive.Visible>
            </div>
          </Responsive.Container>
        </div>
      </section>
      <section>
        <h1>SideTray</h1>
        <div>
          <button onClick={() => setIsSideTrayOpen(true)} type="button">
            Open SideTray
          </button>
          <SideTray
            visible={isSideTrayOpen}
            onClose={() => setIsSideTrayOpen(false)}
          >
            <SideTray.Header>Header</SideTray.Header>
            <SideTray.Body>
              <div style={{ padding: '20px' }}>
                <p>Side Tray Content!</p>
                <p>
                  You can close me by clicking outside, clicking this{' '}
                  <button onClick={() => setIsSideTrayOpen(false)}>
                    button
                  </button>
                  , or clicking the &apos;esc&apos; key
                </p>
                <p style={{ padding: '250px 0' }}>More content</p>
                <p style={{ padding: '250px 0' }}>More content</p>
                <p style={{ padding: '250px 0' }}>More content</p>
                <p style={{ padding: '250px 0' }}>More content</p>
              </div>
            </SideTray.Body>
            <SideTray.Footer>Footer</SideTray.Footer>
          </SideTray>
        </div>
      </section>
      <section>
        <h1>EasyTabMenu</h1>
        <div style={{ background: 'white', padding: '0 20px' }}>
          <EasyTabMenu
            tabs={[
              {
                key: 'ONE',
                label: 'First',
                onClick: () => setActiveTab('ONE'),
              },
              {
                key: 'TWO',
                label: 'Second',
                onClick: () => setActiveTab('TWO'),
              },
              {
                key: 'THREE',
                label: 'Three',
                onClick: () => setActiveTab('THREE'),
              },
            ]}
            activeTab={activeTab}
          />
        </div>
      </section>
      <section>
        <h1>Icon</h1>
        <Icon name="times-circle" />
        <Icon name="facebook" />
        <Icon name="googleplus" />
        <Icon name="instagram" />
        <Icon name="linkedin" />
        <Icon name="reddit" />
        <Icon name="twitch" />
        <Icon name="twitter" />
        <Icon name="youtube" />
        <Icon name="facebook" fill="#ffffff" />
        <Icon name="googleplus" fill="#ffffff" />
        <Icon name="instagram" fill="#ffffff" />
        <Icon name="linkedin" fill="#ffffff" />
        <Icon name="reddit" fill="#ffffff" />
        <Icon name="twitch" fill="#ffffff" />
        <Icon name="twitter" fill="#ffffff" />
        <Icon name="youtube" fill="#ffffff" />
      </section>
      <section>
        <h1>Pill</h1>
        <Pill onClick={() => {}} checked>
          Pill with addon
          <Pill.Addon onClick={() => {}}>✓</Pill.Addon>
        </Pill>
      </section>
      <section>
        <h1>DeletablePill</h1>
        <DeletablePill onDelete={() => {}} checked>
          DeletablePill
        </DeletablePill>
      </section>
      <section>
        <h1>EasyPill</h1>
        <EasyPill
          actions={[
            {
              label: '✓',
              onClick: () => {},
            },
            {
              label: '✰',
              onClick: () => {},
            },
          ]}
        >
          EasyPill
        </EasyPill>{' '}
        <EasyPill
          actions={[
            {
              label: '✓',
              onClick: () => {},
            },
            {
              label: '✰',
              onClick: () => {},
            },
          ]}
          checked
        >
          EasyPill checked
        </EasyPill>
      </section>
      <section>
        <h1>Dropdown</h1>
        <Dropdown
          isOpen={isDropdownOpen}
          onToggle={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            Toggle dropdown
          </button>
          <Dropdown.Menu
            position="topRight"
            style={{ minWidth: '100px', padding: '10px' }}
          >
            Menu
          </Dropdown.Menu>
        </Dropdown>
      </section>
      <section>
        <h1>EasyDropdown</h1>
        <EasyDropdown
          menuItems={[
            { label: 'I do nothing!' },
            { label: 'Click me!', onClick: () => {} },
            { label: "I'm in a group", onClick: () => {}, group: 'Group 1' },
            { label: 'Me too', onClick: () => {}, group: 'Group 1' },
            { label: 'Also me', onClick: () => {}, group: 'Group 1' },
          ]}
          defaultIsOpen={false}
        >
          Simple config
        </EasyDropdown>
      </section>
      <section>
        <h1>EasyPill</h1>
        <EasyPill
          actions={[
            {
              label: 'Boom',
              onClick: () => {},
            },
            {
              label: 'Bang',
              onClick: () => {},
            },
          ]}
          checked={isEasyPillChecked}
          onClick={() => setIsEasyPillChecked(!isEasyPillChecked)}
          onDelete={() => {}}
        >
          With actions and onDelete
        </EasyPill>
      </section>
      <section>
        <h1>Collapse</h1>
        <Collapse isOpen>Collapse content</Collapse>
      </section>
      <section>
        <h1>ExpansionPanel</h1>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanel.Header>Click me!</ExpansionPanel.Header>
          <ExpansionPanel.Body>├── Body</ExpansionPanel.Body>
        </ExpansionPanel>
      </section>
      <section>
        <h1>Accordion</h1>
        <Accordion>
          <ExpansionPanel>
            <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
            <ExpansionPanel.Body>Body 1</ExpansionPanel.Body>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanel.Header>Header 2</ExpansionPanel.Header>
            <ExpansionPanel.Body>Body 2</ExpansionPanel.Body>
          </ExpansionPanel>
        </Accordion>
      </section>
      <section>
        <h1>Avatar</h1>
        <Avatar size="medium" imageUrl="https://picsum.photos/60" />
      </section>
      <section style={{ width: '100%', margin: '30px 0' }}>
        <h1>Tooltip</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '50px' }}>
            <Tooltip hover direction="top" text="Hello there!">
              <Button>I show a tooltip when you hover over me</Button>
            </Tooltip>
          </div>
          <Tooltip
            open={tooltipOpen}
            onClose={toggleTooltip}
            direction="right"
            width="300px"
            content={TooltipContent}
          >
            <Button onClick={toggleTooltip}>Button</Button>
          </Tooltip>
        </div>
      </section>
      {/** USAGE_INJECTOR */}
    </div>
  );
};

export default App;
