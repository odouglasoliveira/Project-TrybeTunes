import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      musics: [],
      artistName: '',
      collectionName: '',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.fetchMusic(id);
  }

  async fetchMusic(id) {
    const musics = await getMusics(id);
    const { artistName, collectionName } = await musics[0];
    this.setState({
      musics,
      artistName,
      collectionName,
      favoriteSongs: await getFavoriteSongs(),
    });
  }

  render() {
    const { isLoading, musics, artistName, collectionName, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <section className="artist-section">
                <p
                  className="artist-title"
                  data-testid="artist-name"
                >
                  { artistName }
                </p>
                <p
                  className="album-title"
                  data-testid="album-name"
                >
                  { collectionName }
                </p>
              </section>
              <section className="musics-section">
                { musics.slice(1).map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                    favoriteSongs={ favoriteSongs }
                  />
                )) }
              </section>
            </>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
