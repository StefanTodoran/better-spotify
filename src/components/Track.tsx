import PlayIcon from "../assets/play-icon.svg";
import PauseIcon from "../assets/pause-icon.svg";
import "../styles/Track.css";

export interface TrackObject {
  albumArt: string, // url
  artistNames: string[],
  duration: number, // ms
  playable: boolean,
  name: string,
  tags: string[], // List of tag Mixify IDs
  uuid: string, // Mixify ID
}

interface Props {
  albumArt: string,
  artistNames: string[],
  duration: number,
  name: string,
  currentlyPlaying: boolean,
  playPauseCallback: () => void,
  onClick: () => void,
}

export default function Track({
  albumArt,
  artistNames,
  duration,
  name,
  currentlyPlaying,
  playPauseCallback,
  onClick,
}: Props) {
  const timeInfo = millisecondsToMinutesSeconds(duration);

  return (
    <div className="track" onClick={onClick} tabIndex={0}>
      <div className="art-container">
        <img className="album-art" src={albumArt} />
        <div className="toggle-playback">
          <img
            src={currentlyPlaying ? PauseIcon : PlayIcon}
            onClick={playPauseCallback}
          />
        </div>
      </div>

      <div className="info-container">
        <h3>{name}</h3>
        <div>
          <span className="artist-names">{
            artistNames.map((artist, idx) => {
              if (idx < artistNames.length - 1) return artist + ", ";
              else return artist;
            })
          }</span>
          <span className="time-info">{timeInfo.minutes}:{timeInfo.seconds}</span>
        </div>
      </div>
    </div>
  );
}

function millisecondsToMinutesSeconds(milliseconds: number) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}