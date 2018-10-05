// @flow
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Paragraph from '../Paragraph';
import FadeIn from '../FadeIn';
import Spacer from '../Spacer';
import Logo from '../Logo';
import ExternalLink from '../ExternalLink';

import ImportExisting from './ImportExisting';

import type { ProjectType } from '../../types';
import type { Field, Step } from './types';

type Props = {
  currentStep: Step,
  activeField: ?Field,
  projectType: ?ProjectType,
};

class SummaryPane extends PureComponent<Props> {
  renderPaneContents() {
    const { currentStep, activeField, projectType } = this.props;

    // If we're still in the first step, we want to show our intro details.
    if (currentStep === 'projectName') {
      return (
        <IntroWrapper>
          <FadeIn key="intro-t">
            <Logo size="large" />

            <Spacer size={30} />
            <StepTitle>Create new plugin</StepTitle>
            <Paragraph>Let's start by giving your new plugin a name.</Paragraph>

            <Spacer size={130} />
            <ImportExisting />
          </FadeIn>
        </IntroWrapper>
      );
    }

    // After that first step, there's a "default" display for each step,
    // but that can be overridden with active focus.
    const focusField = activeField || currentStep;

    switch (focusField) {
      case 'projectName': {
        return (
          <Fragment>
            <FadeIn key="s1-1">
              <StepTitle>Plugin Name</StepTitle>
              <Paragraph>
                Don't stress too much about your plugin's name! You can always
                change this later.
              </Paragraph>
            </FadeIn>
          </Fragment>
        );
      }

      case 'projectType': {
        let details;

        switch (projectType) {
          default: {
            details = (
              <Paragraph>
                Skpm can create plugins of different types. Click a type to
                learn more about it.
              </Paragraph>
            );
            break;
          }
          case 'empty': {
            details = (
              <Fragment>
                <Paragraph>
                  <strong>Empty</strong>
                </Paragraph>
                <Paragraph>
                  Vanilla React projects use create-react-app, an official
                  command-line tool built by Facebook for bootstrapping React
                  applications.
                </Paragraph>
                <Paragraph>
                  It's a fantastic general-purpose tool, and is the recommended
                  approach if you're looking to become a skilled React
                  developer.
                </Paragraph>
                <Paragraph>
                  <ExternalLink
                    color={COLORS.white}
                    hoverColor={COLORS.white}
                    href="https://github.com/facebook/create-react-app"
                  >
                    <strong>Learn more about create-react-app.</strong>
                  </ExternalLink>
                </Paragraph>
              </Fragment>
            );
            break;
          }
          case 'webview': {
            details = (
              <Fragment>
                <Paragraph>
                  <strong>Webview</strong>
                </Paragraph>
                <Paragraph>
                  Gatsby is a blazing fast static site generator for React.
                </Paragraph>
                <Paragraph>
                  It's great for building blogs and personal websites, and
                  provides amazing performance out-of-the-box. A great choice
                  for quickly getting products built.
                </Paragraph>
                <Paragraph>
                  <ExternalLink
                    color={COLORS.white}
                    hoverColor={COLORS.white}
                    href="https://www.gatsbyjs.org/"
                  >
                    <strong>Learn more about Gatsby.</strong>
                  </ExternalLink>
                </Paragraph>
              </Fragment>
            );
            break;
          }
        }
        return (
          <Fragment>
            <FadeIn key="s2t">
              <StepTitle>Project Type</StepTitle>
              {details}
            </FadeIn>
          </Fragment>
        );
      }

      case 'projectIcon': {
        return (
          <Fragment>
            <FadeIn key="s3t">
              <StepTitle>Plugin Icon</StepTitle>

              <Paragraph>
                Choose an icon, to help you recognize this plugin from a list.
              </Paragraph>
              <Paragraph>
                It will used in the Plugin list and when showing an alert from
                your plugin.
              </Paragraph>
              <Paragraph>It must be a 128x128 png.</Paragraph>
            </FadeIn>
          </Fragment>
        );
      }

      default:
        throw new Error('Unrecognized `focusField`: ' + focusField);
    }
  }

  render() {
    return <Wrapper>{this.renderPaneContents()}</Wrapper>;
  }
}

const Wrapper = styled.div`
  text-shadow: 1px 1px 0px rgba(13, 37, 170, 0.1);
`;

const StepTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
`;

const IntroWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;

export default SummaryPane;
