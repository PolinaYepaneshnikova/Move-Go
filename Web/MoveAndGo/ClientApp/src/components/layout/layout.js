import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ErrorBoundary from '../errorBoundary/errorBoundary';

export default class Layout extends Component {
  render() {
    return (
      <>
        <header className="header">
          <Container>
          </Container>
        </header>
        <main className="main">
          <Container>
            <ErrorBoundary>
              {this.props.children}
            </ErrorBoundary>
          </Container>
        </main>
        <footer className="footer">
          <Container>
          </Container>
        </footer>
      </>
    );
  }
}