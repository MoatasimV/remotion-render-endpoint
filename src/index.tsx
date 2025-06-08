import { registerRoot, Composition as RemotionComposition } from "remotion";
import { Composition } from "./Composition";

registerRoot(() => (
  <RemotionComposition
    id="Main"
    component={Composition}
    durationInFrames={300}      // 10 s @ 30 fps
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ payload: {} }}
  />
));