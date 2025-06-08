import { AbsoluteFill, Sequence } from "remotion";

export interface CompositionProps {
  payload: any; // your IDesign after serialisation
}

export const Composition: React.FC<CompositionProps> = ({ payload }) => {
  // 🔸 Replace this with real rendering logic that interprets `payload`
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontSize: 80 }}>Project: {payload?.name ?? "Untitled"}</h1>
    </AbsoluteFill>
  );
};