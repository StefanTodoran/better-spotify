// interface Props {

// }

// export default function TracksList({}: Props) {
//   return(
//     {
//       searchResult ?
//         <section className="search-results-container">
//           {searchResult.tags.length > 0 && <>
//             <SectionBreak iconSrc={TagIcon}>Tags</SectionBreak>
//             <div className="tags-container">
//               <ToggleButton
//                 firstOption="Match Any"
//                 secondOption="Match All"
//                 current={filterMode === "Match Any" ? 0 : 1}
//                 // @ts-expect-error It will be of type FilterMode
//                 onClick={setFilterMode}
//               />

//               {searchResult.tags.map((tag, idx) =>
//                 <Tag
//                   key={idx}
//                   {...tag}
//                   selected={selectedTags.has(tag.uuid)}
//                   onClick={() => { toggleTag(tag.uuid) }}
//                 />
//               )}
//             </div>
//           </>}

//           {searchResult.tracks.length > 0 && <>
//             <SectionBreak iconSrc={TrackIcon}>Tracks</SectionBreak>
//             {filteredTracks.map((track, idx) =>
//               <Track
//                 key={idx}
//                 {...track}
//                 selected={selectedTrack === idx}
//                 currentlyPlaying={playbackState.playing && playbackState.id === track.uuid}
//                 playPauseCallback={() => {
//                   // A track is currently playing and it is this track...
//                   if (playbackState.id === track.uuid && playbackState.playing) {
//                     pausePlayback(
//                       authToken,
//                       (json) => setPlaybackState({ id: track.uuid, playing: false, offset: json.position }),
//                       (error) => console.error(error)
//                     );
//                   }

//                   // A track is not playing...
//                   if (!playbackState.playing) {
//                     let offset = 0;
//                     if (playbackState.id === track.uuid && playbackState.offset < track.duration) {
//                       offset = playbackState.offset;
//                     }

//                     beginPlayback(track.uuid, offset, authToken,
//                       () => setPlaybackState({ id: track.uuid, playing: true, offset }),
//                       (error) => console.error(error),
//                     );
//                   }
//                 }}
//                 onClick={() => {
//                   handleTrackSelection(idx);
//                 }}
//               />
//             )}

//             {filteredTracks.length === 0 ?
//               <p className="hint" style={{ maxWidth: "unset" }}>
//                 No tracks match all tags!
//               </p>
//               :
//               <p className="hint" style={{ maxWidth: "unset" }}>
//                 Found <b>{filteredTracks.length}</b> tracks that match your search.
//               </p>
//             }
//           </>}
//         </section>
//         :
//         <p className="hint">
//           Search for tracks, artists, albums, tags, friends, or playlists.<br />
//           Confused? See the <Link to="/help">help center</Link>.
//         </p>
//     }
//   );
// }