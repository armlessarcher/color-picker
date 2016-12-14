import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

import React from 'react';

var Preview = (props) => {

  var onFilterClick = (e) => {
    props.handleStateChange(e);
  };

  return (
    <div id="container">
      <main id="center" class="column">
        <article>
          <h1>Heading</h1>
        </article>
      </main>
      <nav id="left" class="column">
        <h3>Left heading</h3>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
          <li><a href="#">Link 4</a></li>
          <li><a href="#">Link 5</a></li>
        </ul>
        <h3>Left heading</h3>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
          <li><a href="#">Link 4</a></li>
          <li><a href="#">Link 5</a></li>
        </ul>
      </nav>
      <div id="innermid">
        <h2>What is Lorem Ipsum</h2>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <div id="right" class="column">
        <h3>Why do we use it</h3>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </div>
    <div id="footer-wrapper">
      <footer id="footer"><p>Footer...</p></footer>
    </div>
  </div>
  );
};


module.exports = Preview;