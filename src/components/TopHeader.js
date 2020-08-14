import React, { Component } from "react";
import "../css/TopHeader.css";
import { Link } from "react-router-dom";
import queryString from "query-string";

const { query } = queryString.parse(window.location.search);

class TopHeader extends Component {
  state = {
    query: ""
  };
  searchHandler = e => {
    const query = e.target.value;
    this.setState({
      query
    });
  };
  render() {
    return (
      <div>
        <nav>
          <input type="checkbox" id="check" />
          <label for="check" class="checkbtn">
            <i class="fas fa-bars"></i>
          </label>
          <label class="logo">Music Master</label>

          <ul className="mr-auto">
            <li>
              <form class="form-inline my-2">
                <input
                  className="form-control mr-sm-2"
                  placeholder="Search Artist"
                  onChange={e => this.searchHandler(e)}
                />
                <Link to={`/tracks?query=${this.state.query}`}>
                  <button className="btn btn-light my-2 my-sm-0" type="submit">
                    Search
                  </button>
                </Link>
              </form>
            </li>
            &nbsp;&nbsp;&nbsp;
            <li>
              <a class="" href="/" style={{ textDecoration: "none" }}>
                Home
              </a>
            </li>
            &nbsp;&nbsp;&nbsp;
            <li>
              <a href="http://khushwantkodecha.github.io/" target="_blank" style={{ textDecoration: "none" }}>
                About Developer
              </a>
            </li>
            &nbsp;&nbsp;
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopHeader;
