import { To, KeyCode, Manipulator } from "./types";

/**
 * Custom way to describe a command in a layer
 */
export interface LayerCommand {
  to: To[];
  description?: string;
}

/**
 * Create a Hyper Key sublayer, where every command is prefixed with a key
 * e.g. Hyper + O ("Open") is the "open applications" layer, I can press
 * e.g. Hyper + O + G ("Google Chrome") to open Chrome
 */
export function createHyperSubLayer(
  sublayer_key: KeyCode,
  // The ? is necessary, otherwise we'd have to define something for _every_ key code
  commands: { [key_code in KeyCode]?: LayerCommand }
): Manipulator[] {
  const subLayerVariableName = `hyper_sublayer_${sublayer_key}`;
  return [
    // When Hyper + sublayer_key is pressed, set the variable to true; on key_up, set it to false again
    {
      description: `Toggle Hyper sublayer ${sublayer_key}`,
      type: "basic",
      from: {
        key_code: sublayer_key,
        modifiers: {
          mandatory: [
            "left_command",
            "left_control",
            "left_shift",
            "left_option",
          ],
        },
      },
      to_after_key_up: [
        {
          set_variable: {
            name: subLayerVariableName,
            value: false,
          },
        },
      ],
      to: [
        {
          set_variable: {
            name: subLayerVariableName,
            value: true,
          },
        },
      ],
    },
    // Define the individual commands that are meant to trigger in the sublayer
    ...(Object.keys(commands) as (keyof typeof commands)[]).map(
      (command_key) => ({
        ...commands[command_key],
        type: "basic" as const,
        from: {
          key_code: command_key,
          modifiers: {
            // Mandatory modifiers are *not* added to the "to" event
            mandatory: ["any"],
          },
        },
        // Only trigger this command if the variable is true (i.e., if Hyper + sublayer is held)
        conditions: [
          {
            type: "variable_if",
            name: subLayerVariableName,
            value: true,
          },
        ],
      })
    ),
  ];
}

/**
 * "Open an app" command
 */
export function app(name: string): LayerCommand {
  return {
    to: [
      {
        shell_command: `open -a '${name}.app'`,
      },
    ],
    description: `Open ${name}`,
  };
}
