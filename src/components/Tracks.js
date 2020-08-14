import React, { Component } from "react";
import queryString from "query-string";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";
import Home from "./Home";
import axios from "axios";
import "../css/Tracks.css";
import def_img from "../images/2.jpg";
import Loader from "./Loader";
import Swal from "sweetalert2";
import Back from "../images/3.jpg";

const base_url = "https://spotify-api-wrapper.appspot.com";

class Tracks extends Component {
  state = {
    artist: [],
    query: "",
    tracks: [],
    playing: false,
    audio: null,
    playingPreviewUrl: null,
    loading: false,
  };
  componentDidMount() {
    const { query } = queryString.parse(window.location.search);
    this.setState(
      {
        query,
      },
      () => this.seractArtist()
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = queryString.parse(window.location.search);
    console.log(query);
    console.log(prevState);
    if (this.state.query !== query) {
      this.setState(
        {
          query,
        },
        () => this.seractArtist()
      );
    }
  }

  seractArtist = () => {
    this.setState({ loading: true });
    axios
      .get(`${base_url}/artist/${this.state.query}`)
      .then((res) => {
        if (res.data.artists.total > 0) {
          const artist = res.data.artists.items;
          this.setState({ artist: artist });
          axios
            .get(`${base_url}/artist/${artist[0].id}/top-tracks`)
            .then((res) => {
              this.setState({ tracks: res.data.tracks, loading: false });
            })
            .catch((error) => {
              // alert(error);
              Swal.fire("Oops...", error, "error");
              this.setState({ artist: [], loading: false });
            });
        } else {
          Swal.fire("Worning", "Please Enter Correct Artist Name!", "error");
          this.setState({ artist: [], loading: false });
        }
      })
      .catch((error) => {
        Swal.fire("Oops...", `${error}`, "error");
        this.setState({ artist: [], loading: false });
      });
  };

  playAudio = (previewUrl) => () => {
    const audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({ playing: true, audio, playingPreviewUrl: previewUrl });
    } else {
      this.state.audio.pause();
      if (this.state.playingPreviewUrl === previewUrl) {
        this.setState({ playing: false });
      } else {
        audio.play();
        this.setState({ audio, playingPreviewUrl: previewUrl });
      }
    }
  };

  trackIcon = (track) => {
    if (!track.preview_url) {
      return (
        <span>
          <i class="fas fa-ban"></i>{" "}
        </span>
      );
    }
    if (
      this.state.playing &&
      this.state.playingPreviewUrl === track.preview_url
    ) {
      return (
        <span>
          <i class="fas fa-pause-circle"></i>
        </span>
      );
    }
    return (
      <span>
        <i class="fas fa-play-circle"></i>
      </span>
    );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <TopHeader />
        {this.state.query.length && this.state.loading ? (
          <Loader />
        ) : this.state.artist.length > 0 ? (
          <React.Fragment>
            <div className="main_heading" style={{ marginTop: 100 }}>
              <img
                className="profile__image"
                src={
                  this.state.artist[0].images.length
                    ? this.state.artist[0].images[0].url
                    : def_img
                }
                alt="artist-profile"
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 20,
                  width: 100,
                  height: 100,
                }}
              />
              <h3 style={{ fontSize: 20 }}>
                <i>
                  <b>{this.state.artist[0].name}</b>
                </i>
              </h3>
              <p>
                <i>Followers</i> : <b>{this.state.artist[0].followers.total}</b>
              </p>
              <p style={{ marginTop: -15 }}>
                <i>{this.state.artist[0].genres.join(", ")}</i>
              </p>
            </div>
            <div className="main_heading" style={{ zIndex: 0 }}>
              {this.state.tracks.length &&
                this.state.tracks.map((track, i) => {
                  const { id, name, album, preview_url } = this.state.tracks[i];
                  return (
                    <div
                      key={id}
                      className="track"
                      style={{ borderRadius: 50 }}
                      onClick={this.playAudio(preview_url)}
                    >
                      <img
                        src={album.images[0].url}
                        alt="track-image"
                        className="track-image"
                        style={{ borderRadius: 10 }}
                        width="50"
                        height="50"
                      />
                      <p className="track-text"> {name} </p>
                      <p className="track-icon">{this.trackIcon(track)}</p>
                    </div>
                  );
                })}
            </div>
          </React.Fragment>
        ) : null}
        <br />
        <br />
        {/* <BottomHeader /> */}
      </div>
    );
  }
}

export default Tracks;
