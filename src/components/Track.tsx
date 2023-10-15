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

  onClick: () => void,
}

export default function Track({
  albumArt,
  artistNames,
  duration,
  name,

  onClick,
}: Props) {
  const timeInfo = millisecondsToMinutesSeconds(duration);

  return (
    <div className="track" onClick={onClick} tabIndex={0}>
      <img className="album-art" src={albumArt} />

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