import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // hyperkey
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/raycast/apple-reminders/create-reminder"
    ),
    // browse
    b: {
      g: open("https://github.com"),
      r: open("https://reddit.com"),
      t: open("https://www.twitch.tv/directory/following"),
      x: open("https://www.x.com"),
      y: open("https://www.youtube.com"),
    },
    // c = musi*c*
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },
    // d: {},
    // e: {},
    // f: {},
    // g: {},
    // h: {},
    // i: {},
    // j: {},
    // k: {},
    // l: {},
    // m: {},
    // n: {},
    // open
    o: {
      1: app("1Password"),
      a: app("Arc"),
      d: app("Discord"),
      f: app("Finder"),
      n: app("Notion"),
      r: app("Reminders"),
      s: app("Spotify"),
      t: app("iTerm"),
      v: app("Visual Studio Code"),
      w: open("WhatsApp"),
    },

    // raycast
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
    },
    // system
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      // do not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // theme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
    },
    v: {
      r: open("raycast://extensions/thomas/visual-studio-code/index"),
    },

    // window management
    w: {
      d: {
        description: "Window: Hide",
        to: [{ key_code: "h", modifiers: ["right_command"] }],
      },
      hyphen: open(
        "-g raycast://extensions/raycast/window-management/make-smaller"
      ),
      equal_sign: open(
        "-g raycast://extensions/raycast/window-management/make-larger"
      ),

      c: open("-g raycast://extensions/raycast/window-management/center"),
      r: open(
        "-g raycast://extensions/raycast/window-management/reasonable-size"
      ),
      k: open("-g raycast://extensions/raycast/window-management/top-half"),
      j: open("-g raycast://extensions/raycast/window-management/bottom-half"),
      h: open("-g raycast://extensions/raycast/window-management/left-half"),
      l: open("-g raycast://extensions/raycast/window-management/right-half"),
      f: open("-g raycast://extensions/raycast/window-management/maximize"),
    },
    //x: {},
    //y: {},
    //z: {},
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
