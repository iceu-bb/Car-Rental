import React, { useState, useContext } from "react";
import { Store } from "../../Store";
import { Container, Accordion, Icon } from "semantic-ui-react";
import { PersonalDataForm } from "../../components/Forms/PersonalDataForm";
import { ContactDetailForm } from "../../components/Forms/ContactDetailForm";
import { UpdatePasswordForm } from "../../components/Forms/UpdatePasswordForm";

export const AccountSettings: React.FC = () => {
  const { state } = useContext(Store);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Container>
      <Accordion fluid styled>
        {/*1st accordion */}
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Personal Data
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <PersonalDataForm user={state.currentUser} />
        </Accordion.Content>

        {/*2st accordion */}
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Contact Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <ContactDetailForm user={state.currentUser} />
        </Accordion.Content>

        {/*3st accordion */}
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Update Password
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <UpdatePasswordForm userId={state.currentUser._id} />
        </Accordion.Content>

        {/*4st accordion */}
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Delete Account
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>dede</p>
        </Accordion.Content>
      </Accordion>
    </Container>
  );
};
