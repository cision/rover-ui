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
  iconsMap,
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
  Callout,
  Input,
  InputTime,
  Typography,
  Modal,
  // IMPORT_INJECTOR
} from '@cision/rover-ui';

import Section from './Section';

const App = () => {
  const [isSideTrayOpen, setIsSideTrayOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ONE');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEasyPillChecked, setIsEasyPillChecked] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputTimeValue, setInputTimeValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTooltip = function () {
    setTooltipOpen((prev) => !prev);
  };

  const TooltipContent = (
    <React.Fragment>
      <h3>I have extra content</h3>
      <p>It can take any form you want!</p>
    </React.Fragment>
  );

  return (
    <div className="p-8 bg-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Section title="Badge">
        <Badge variant="info">Badge</Badge>
      </Section>
      <Section title="Bar">
        <Bar>
          <Bar.Fill width="50%" />
        </Bar>
      </Section>
      <Section title="Button">
        <Button>Button</Button>
      </Section>
      <Section title="Media">
        <Media>
          <Media.Item mr="md">
            <small>
              <em>Media.Item</em>
            </small>
            <img
              src="https://source.unsplash.com/random/64x64"
              alt="Unsplash daily"
            />
          </Media.Item>
          <Media.Body>Media.Body</Media.Body>
        </Media>
      </Section>

      <Section title="Paper">
        <Paper>Paper</Paper>
      </Section>

      <Section title="Grid">
        <Grid columns={4} gutter="md">
          <Paper>Grid entry 1</Paper>
          <Paper>Grid entry 2</Paper>
          <Paper>Grid entry 3</Paper>
          <Paper>Grid entry 4</Paper>
        </Grid>
      </Section>

      <Section title="Responsive">
        <h3 className="text-xl mb-3">Responsive.Grid</h3>

        <div className="border p-5 resize-y overflow-x-hidden mb-4">
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
              <div className="p-4 text-xl bg-red-300">Grid entry 1</div>
              <div className="p-4 text-xl bg-red-300">Grid entry 2</div>
              <div className="p-4 text-xl bg-red-300">Grid entry 3</div>
              <div className="p-4 text-xl bg-red-300">Grid entry 4</div>
            </Responsive.Grid>
          </Responsive.Container>
        </div>

        <hr />

        <h3 className="text-xl mb-3">Responsive.Hidden</h3>

        <div className="border p-5 resize-y overflow-x-hidden mb-4">
          <Responsive.Container>
            <Responsive.Hidden breakpoints={['container-xs-down']}>
              I hide on small pages.
            </Responsive.Hidden>
          </Responsive.Container>
        </div>

        <hr />

        <h3 className="text-xl mb-3">Responsive.Hidden</h3>

        <div className="border p-5 resize-y overflow-x-hidden mb-4">
          <Responsive.Container>
            <div>
              <Responsive.Visible breakpoints={['container-xs-down']}>
                I appear on small pages.
              </Responsive.Visible>
            </div>
          </Responsive.Container>
        </div>
      </Section>

      <Section title="SideTray">
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
                <button onClick={() => setIsSideTrayOpen(false)}>button</button>
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
      </Section>

      <Section title="EasyTabMenu">
        <div className="bg-white px-4">
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
      </Section>

      <Section title="Icon">
        <div className="flex flex-row flex-wrap">
          {Object.keys(iconsMap).map((icon) => (
            <div key={icon} className="p-3">
              <Tooltip showOnHover content={icon}>
                <Icon name={icon} />
              </Tooltip>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Pill">
        <Pill onClick={() => {}} checked>
          Pill with addon
          <Pill.Addon onClick={() => {}}>✓</Pill.Addon>
        </Pill>
      </Section>

      <Section title="DeletablePill">
        <DeletablePill onDelete={() => {}} checked>
          DeletablePill
        </DeletablePill>
      </Section>

      <Section title="EasyPill">
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
      </Section>

      <Section title="Dropdown">
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
      </Section>

      <Section title="EasyDropdown">
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
      </Section>

      <Section title="EasyPill">
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
      </Section>

      <Section title="Collapse">
        <Collapse isOpen>Collapse content</Collapse>
      </Section>

      <Section title="ExpansionPanel">
        <ExpansionPanel
          className="w-full shadow rounded overflow-hidden mb-5"
          defaultExpanded={false}
        >
          <ExpansionPanel.Header className="p-3 bg-blue-100 text-blue-900 rounded-t">
            Click me! I'm a Header
          </ExpansionPanel.Header>
          <ExpansionPanel.Body className="p-3">├── Body</ExpansionPanel.Body>
        </ExpansionPanel>

        <ExpansionPanel
          className="w-full shadow rounded overflow-hidden"
          defaultExpanded={false}
        >
          <ExpansionPanel.Header
            expandIcon={<Icon name="chevron-down" />}
            className="p-3 bg-green-100 text-green-900 rounded-t"
          >
            No, click me! I have an Icon
          </ExpansionPanel.Header>
          <ExpansionPanel.Body className="p-3">├── Body</ExpansionPanel.Body>
        </ExpansionPanel>
      </Section>

      <Section title="Accordion">
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
      </Section>

      <Section title="Avatar">
        <Avatar size="medium" imageUrl="https://picsum.photos/60" />
      </Section>

      <Section title="Tooltip">
        <div className="flex items-center">
          <div className="mr-8">
            <Tooltip showOnHover direction="top" content="Hello there!">
              <Button>I show a tooltip when you hover over me</Button>
            </Tooltip>
          </div>

          <Tooltip
            isOpen={tooltipOpen}
            onClose={toggleTooltip}
            direction="top"
            tooltipWidth="300px"
            content={TooltipContent}
          >
            <Button onClick={toggleTooltip}>Button</Button>
          </Tooltip>
        </div>
      </Section>

      <Section title="Callout">
        <Callout>
          Oh, man, this is really a callout now, bro. You&apos;re going to want
          to pay attention to this one, bro.
        </Callout>
      </Section>

      <Section>
        <h1>Input</h1>
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </Section>

      <Section title="InputTime">
        <InputTime
          value={inputTimeValue}
          onChange={(e) => setInputTimeValue(e.target.value)}
        />
        {inputTimeValue}
      </Section>

      <Section title="Typography">
        <Typography />
      </Section>

      <Section title="Modal">
        <div>
          <Button modifiers={['primary']} onClick={() => setIsModalOpen(true)}>
            Show Modal
          </Button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="md"
        >
          <Modal.Header>
            <h4 className="">Modal Header</h4>
          </Modal.Header>
          <Modal.Body>
            <p>Modal Body</p>
            <p>You can put all of your interesting content in the modal body</p>
            <p>
              Click outside the modal or use the escape key to close the modal
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsModalOpen(false)} className="">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Section>

      {/** USAGE_INJECTOR */}
    </div>
  );
};

export default App;
