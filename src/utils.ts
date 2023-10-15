import { TrackObject } from "./components/Track";

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