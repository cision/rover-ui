import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Wrap } from '../../stories/storybook-helpers';

import Modal from '.';
import Readme from './README.md';

import Button from '../Button';
import Typography from '../Typography';
import Input from '../Input';

function SmallModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <div>Small modal</div>
        <Button modifiers={['primary']} onClick={openModal}>
          Show Modal
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} size="sm">
        <Modal.Header>
          <h4 className="">Modal Title</h4>
        </Modal.Header>
        <Modal.Body>
          <p>This is the modal body</p>
          <p>This is the modal body</p>
          <p>This is the modal body</p>
          <p>This is the modal body</p>
          <p>This is the modal body</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} className="">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const MediumModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <div>Medium modal</div>
        <Button modifiers={['primary']} onClick={openModal}>
          Show Modal
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} size="md">
        <Modal.Header level="warning">
          <h4 className="">Modal Title</h4>
        </Modal.Header>
        <Modal.Body>
          <p>This is the modal body</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} className="">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const LargeModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialInputValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const [formInputValues, setFormInputValues] = useState(initialInputValues);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormInputValues({
      ...initialInputValues,
    });
  };

  const handleInputChange = (event) => {
    event.persist();

    setFormInputValues({
      ...formInputValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div>
        <div>large modal example</div>
        <Button modifiers={['primary']} onClick={openModal}>
          Show Modal
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} size="lg">
        <Modal.Header level="info">
          <Typography tag="h4" size="xl" color="black">
            Sign up Form
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-6">
            <div className="flex flex-col mb-4">
              <Typography size="lg">First Name</Typography>
              <Input
                autoComplete="off"
                className="border py-2 px-3 text-grey-darkest"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
                value={formInputValues.firstName}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Typography size="lg">Last Name</Typography>
              <Input
                autoComplete="off"
                className="border py-2 px-3 text-grey-darkest"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                value={formInputValues.lastName}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Typography size="lg">Email</Typography>
              <Input
                autoComplete="off"
                className="border py-2 px-3 text-grey-darkest"
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formInputValues.email}
              />
            </div>
            <div className="flex flex-col mb-6">
              <Typography size="lg">Password</Typography>
              <Input
                autoComplete="off"
                className="border py-2 px-3 text-grey-darkest"
                type="password"
                name="password"
                onChange={handleInputChange}
                value={formInputValues.password}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button className="t-mr" level="tertiary" onClick={closeModal}>
              Cancel
            </Button>
            <Button level="success" onClick={closeModal}>
              Sign Up!
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

storiesOf('Galaxies/Modal', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Modal isOpen onClose={() => {}}>
        <Modal.Header>
          <h4 className="">Modal Title</h4>
        </Modal.Header>
        <Modal.Body>
          <p>This is the modal body</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {}} className="">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => (
      <>
        <Wrap>
          <SmallModalExample />
        </Wrap>
        <Wrap>
          <MediumModalExample />
        </Wrap>
        <Wrap>
          <LargeModalExample />
        </Wrap>
      </>
    ),
    {
      info: {
        inline: false,
        source: false,
      },
    }
  );
