import type { Level } from "@/types/content";

// Word Fortress (16 levels)
import wf01 from "./worlds/word-fortress/levels/wf-level-01.json";
import wf02 from "./worlds/word-fortress/levels/wf-level-02.json";
import wf03 from "./worlds/word-fortress/levels/wf-level-03.json";
import wf04 from "./worlds/word-fortress/levels/wf-level-04.json";
import wf05 from "./worlds/word-fortress/levels/wf-level-05.json";
import wf06 from "./worlds/word-fortress/levels/wf-level-06.json";
import wf07 from "./worlds/word-fortress/levels/wf-level-07.json";
import wf08 from "./worlds/word-fortress/levels/wf-level-08.json";
import wf09 from "./worlds/word-fortress/levels/wf-level-09.json";
import wf10 from "./worlds/word-fortress/levels/wf-level-10.json";
import wf11 from "./worlds/word-fortress/levels/wf-level-11.json";
import wf12 from "./worlds/word-fortress/levels/wf-level-12.json";
import wf13 from "./worlds/word-fortress/levels/wf-level-13.json";
import wf14 from "./worlds/word-fortress/levels/wf-level-14.json";
import wf15 from "./worlds/word-fortress/levels/wf-level-15.json";
import wf16 from "./worlds/word-fortress/levels/wf-level-16.json";

// Context Courtyard (8 levels)
import cc01 from "./worlds/context-courtyard/levels/cc-level-01.json";
import cc02 from "./worlds/context-courtyard/levels/cc-level-02.json";
import cc03 from "./worlds/context-courtyard/levels/cc-level-03.json";
import cc04 from "./worlds/context-courtyard/levels/cc-level-04.json";
import cc05 from "./worlds/context-courtyard/levels/cc-level-05.json";
import cc06 from "./worlds/context-courtyard/levels/cc-level-06.json";
import cc07 from "./worlds/context-courtyard/levels/cc-level-07.json";
import cc08 from "./worlds/context-courtyard/levels/cc-level-08.json";

// Story Tower (8 levels)
import st01 from "./worlds/story-tower/levels/st-level-01.json";
import st02 from "./worlds/story-tower/levels/st-level-02.json";
import st03 from "./worlds/story-tower/levels/st-level-03.json";
import st04 from "./worlds/story-tower/levels/st-level-04.json";
import st05 from "./worlds/story-tower/levels/st-level-05.json";
import st06 from "./worlds/story-tower/levels/st-level-06.json";
import st07 from "./worlds/story-tower/levels/st-level-07.json";
import st08 from "./worlds/story-tower/levels/st-level-08.json";

// Knowledge Keep (8 levels)
import kk01 from "./worlds/knowledge-keep/levels/kk-level-01.json";
import kk02 from "./worlds/knowledge-keep/levels/kk-level-02.json";
import kk03 from "./worlds/knowledge-keep/levels/kk-level-03.json";
import kk04 from "./worlds/knowledge-keep/levels/kk-level-04.json";
import kk05 from "./worlds/knowledge-keep/levels/kk-level-05.json";
import kk06 from "./worlds/knowledge-keep/levels/kk-level-06.json";
import kk07 from "./worlds/knowledge-keep/levels/kk-level-07.json";
import kk08 from "./worlds/knowledge-keep/levels/kk-level-08.json";

// Champion's Arena (8 levels)
import ca01 from "./worlds/champions-arena/levels/ca-level-01.json";
import ca02 from "./worlds/champions-arena/levels/ca-level-02.json";
import ca03 from "./worlds/champions-arena/levels/ca-level-03.json";
import ca04 from "./worlds/champions-arena/levels/ca-level-04.json";
import ca05 from "./worlds/champions-arena/levels/ca-level-05.json";
import ca06 from "./worlds/champions-arena/levels/ca-level-06.json";
import ca07 from "./worlds/champions-arena/levels/ca-level-07.json";
import ca08 from "./worlds/champions-arena/levels/ca-level-08.json";

const L = (json: unknown) => json as unknown as Level;

export const ALL_LEVELS: Record<string, Level> = {
  "wf-level-01": L(wf01), "wf-level-02": L(wf02), "wf-level-03": L(wf03), "wf-level-04": L(wf04),
  "wf-level-05": L(wf05), "wf-level-06": L(wf06), "wf-level-07": L(wf07), "wf-level-08": L(wf08),
  "wf-level-09": L(wf09), "wf-level-10": L(wf10), "wf-level-11": L(wf11), "wf-level-12": L(wf12),
  "wf-level-13": L(wf13), "wf-level-14": L(wf14), "wf-level-15": L(wf15), "wf-level-16": L(wf16),
  "cc-level-01": L(cc01), "cc-level-02": L(cc02), "cc-level-03": L(cc03), "cc-level-04": L(cc04),
  "cc-level-05": L(cc05), "cc-level-06": L(cc06), "cc-level-07": L(cc07), "cc-level-08": L(cc08),
  "st-level-01": L(st01), "st-level-02": L(st02), "st-level-03": L(st03), "st-level-04": L(st04),
  "st-level-05": L(st05), "st-level-06": L(st06), "st-level-07": L(st07), "st-level-08": L(st08),
  "kk-level-01": L(kk01), "kk-level-02": L(kk02), "kk-level-03": L(kk03), "kk-level-04": L(kk04),
  "kk-level-05": L(kk05), "kk-level-06": L(kk06), "kk-level-07": L(kk07), "kk-level-08": L(kk08),
  "ca-level-01": L(ca01), "ca-level-02": L(ca02), "ca-level-03": L(ca03), "ca-level-04": L(ca04),
  "ca-level-05": L(ca05), "ca-level-06": L(ca06), "ca-level-07": L(ca07), "ca-level-08": L(ca08),
};
