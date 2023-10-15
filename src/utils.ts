import { TaglistObject } from "./components/Tag";
import { TrackObject } from "./components/Track";

export const baseUrl = "/";

export interface SearchResult {
  tracks: TrackObject[],
  numTracks: number,

  // artists: any,
  // numArtists: number,

  // albums: any,
  // numAlbums: number,

  playlists: PlaylistObject[],
  numPlaylists: number,

  tags: TaglistObject[],
  numTags: number,

  friends: UserObject[],
  numFriends: number,
}

interface PlaylistObject {
  collaborative: boolean,
  description?: string,
  image: string, // url
  name: string,
  owner: UserObject,
  uuid: string,
}

interface UserObject {
  username: string,
  isFriend: boolean,
  profileUrl: string,
  uuid: string, // Mixify ID
}

export type FilterMode = "Match Any" | "Match All";
export function getFilteredTracks(
  tracks: TrackObject[] | undefined,
  tags: Set<string>,
  mode: FilterMode,

  // @ts-expect-error TypeScript compiler is just smooth-brained, this is guaranteed to return TrackObject[]
): TrackObject[] {
  if (!tracks || tracks.length === 0) return [];
  if (tags.size === 0) return tracks;

  if (mode === "Match Any") {
    return tracks.filter(track => {
      // const index = [...tags].findIndex(tag => track.tags.includes(tag));
      const index = track.tags.findIndex(tag => tags.has(tag));
      return index !== -1;
    });
  }

  if (mode === "Match All") {
    return tracks.filter(track => {
      return [...tags].every(tag => track.tags.includes(tag));
    });
  }
}

export type RestMethods = "GET" | "POST" | "PUT" | "DELETE";
export function getRequestOptions(
  type: RestMethods,
  body: any | undefined,
  token?: string,
) {
  const csrftoken = getCookieValue("csrftoken");
  return {
    method: type,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-CSRFToken": csrftoken!,
      ...(token && { "Authorization": "Token " + token }),
    },
    ...(body !== undefined && {body: JSON.stringify(body)})
  };
}

function getCookieValue(key: string) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(key + "="))
    ?.split("=")[1];
  return value;
}

/**
 * @param song The track's Mixify ID or UUID. 
 * @param offset How far to start the playback in milliseconds.
 * @param token The user's Django authentication token.
 * @param thenCallback Will be triggered after the fetch.
 * @param catchCallback Will be triggered in the event of a failure in the .then chain and given the error object.
 */
export function beginPlayback(
  song: string,
  offset: number,
  token: string,
  thenCallback: () => void,
  catchCallback: (error?: any) => void,
) {
  const requestOptions = getRequestOptions("POST", {
    song: song,
    position: offset,
  }, token);

  fetch(baseUrl + "api/playback/play", requestOptions)
    .then(thenCallback)
    .catch(catchCallback);
}

/**
 * @param token The user's Django authentication token.
 * @param thenCallback Will be triggered after the fetch and passed the parsed response json.
 * @param catchCallback Will be triggered in the event of a failure in the .then chain and given the error object.
 */
export function pausePlayback(
  token: string,
  thenCallback: (json?: any) => void,
  catchCallback: (error?: any) => void,
) {
  const requestOptions = getRequestOptions("PUT", {}, token);

  fetch(baseUrl + "api/playback/pause", requestOptions)
    .then((response) => response.json())
    .then(thenCallback)
    .catch(catchCallback);
}