import React, { Component } from 'react';
import { Container } from 'reactstrap';

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
            {this.props.children}
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