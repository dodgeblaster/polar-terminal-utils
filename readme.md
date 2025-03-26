# @polar/terminal-utils

A Deno package that provides utility functions for creating beautiful terminal output with colors, spinners, and CLI command handling.

## Features

- Colored text output (green, blue, red, dim)
- Loading spinners with custom text
- Cursor control (show/hide)
- Terminal clearing
- Simple CLI command handling
- Text width formatting

## Installation

```typescript
import * as terminal from "@polar/terminal-utils";
```

## Usage

### Text Formatting

```typescript
import { 
  makeGreenText, 
  makeBlueText, 
  makeRedText, 
  makeDimText, 
  setTextWidth 
} from "@polar/terminal-utils";

// Color formatting
console.log(makeGreenText("Success!")); // Prints in green
console.log(makeBlueText("Info")); // Prints in blue
console.log(makeRedText("Error")); // Prints in red
console.log(makeDimText("Dimmed text")); // Prints dimmed text

// Set text width with padding
console.log(setTextWidth("Short text", 20)); // Pads text to 20 characters
```

### Message Types

```typescript
import { 
  printInfoMessage, 
  printSuccessMessage, 
  printErrorMessage 
} from "@polar/terminal-utils";

printInfoMessage("This is an info message");
printSuccessMessage("Operation completed successfully"); // Green text
printErrorMessage("An error occurred"); // Red text
```

### Loading Spinner

```typescript
import { startLoadingMessage, endLoadingMessage } from "@polar/terminal-utils";

// Start a loading spinner
startLoadingMessage("Loading data...");

// Do some async work
await someAsyncOperation();

// Stop the spinner
endLoadingMessage();
```

### CLI Command Handling

```typescript
import { addCommand, runProgram } from "@polar/terminal-utils";

// Add a command
addCommand({
  command: "hello",
  action: async () => {
    console.log("Hello, world!");
  }
});

// Run the program
await runProgram();
```

### Terminal Control

```typescript
import { clear, hideCursor, showCursor } from "@polar/terminal-utils";

// Clear the terminal
clear();

// Hide the cursor
hideCursor();

// Show the cursor
showCursor();
```

## API Reference

### Text Formatting
- `makeGreenText(text: string): string` - Returns text formatted in green
- `makeBlueText(text: string): string` - Returns text formatted in blue
- `makeRedText(text: string): string` - Returns text formatted in red
- `makeDimText(text: string): string` - Returns dimmed text
- `setTextWidth(text: string, length: number): string` - Pads text to specified length

### Messages
- `printInfoMessage(text: string): void` - Prints regular message
- `printSuccessMessage(text: string): void` - Prints success message in green
- `printErrorMessage(text: string): void` - Prints error message in red

### Loading Spinner
- `startLoadingMessage(text: string): void` - Starts a loading spinner with text
- `endLoadingMessage(): void` - Stops the current loading spinner

### Terminal Control
- `clear(): void` - Clears the terminal
- `hideCursor(): void` - Hides the terminal cursor
- `showCursor(): void` - Shows the terminal cursor

### CLI Commands
- `addCommand(config: CommandConfig): void` - Adds a CLI command
- `runProgram(): Promise<void>` - Runs the CLI program

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request