/**
 * Log Functions
 *
 * In order to understand the console.log functions in this
 * file, it is recommended to read thru this article:
 * https://notes.burke.libbey.me/ansi-escape-codes/
 * This article explains ANSI codes, and what all the weird strings
 * are in this file.
 */
const ANSI_PREFIX = "\x1b[" // also known as a CSI, or Control Sequence Introducer
const HIDE_CURSOR = ANSI_PREFIX + "?25l"
const SHOW_CURSOR = ANSI_PREFIX + "?25h"
const GREEN_TEXT = ANSI_PREFIX + "32m"
const BLUE_TEXT = ANSI_PREFIX + "34m"
const AQUA_TEXT = ANSI_PREFIX + "36m"
const WHITE_TEXT = ANSI_PREFIX + "37m"
const RED_TEXT = ANSI_PREFIX + "31m"
const DIM_TEXT = ANSI_PREFIX + "2m"
const BRIGHT_TEXT = ANSI_PREFIX + "0m"

export function print(text: string): void {
  console.log(text)
}

export function makeGreenText(text: string): string {
  return `${GREEN_TEXT}${text}${WHITE_TEXT}`
}

export function makeBlueText(text: string): string {
  return `${BLUE_TEXT}${text}${WHITE_TEXT}`
}

export function makeRedText(text: string): string {
  return `${RED_TEXT}${text}${WHITE_TEXT}`
}

export function makeDimText(text: string): string {
  return `${DIM_TEXT}${text}${BRIGHT_TEXT}`
}

export function setTextWidth(text: string, length: number): string {
  return text.padEnd(length, " ")
}

export function printInfoMessage(text: string): void {
  print(text)
}

export function printSuccessMessage(text: string): void {
  print(makeGreenText(text))
}

export function printErrorMessage(text: string): void {
  print(makeRedText(text))
}

export function clear(): void {
  console.clear()
}

export function hideCursor(): void {
  print(HIDE_CURSOR)
}

export function showCursor(): void {
  print(SHOW_CURSOR)
}

let loadingInterval: number | undefined
export function startLoadingMessage(text: string): void {
  if (!Deno.stdout.isTerminal) {
    console.log(text)
    return
  }

  const dots = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
  const spinnerFrames = dots
  let index = 0

  const log = () => {
    let line = spinnerFrames[index]
    if (!line) {
      index = 0
      line = spinnerFrames[index]
    }

    Deno.stdout.writeSync(new TextEncoder().encode("\r"))
    Deno.stdout.writeSync(new TextEncoder().encode(AQUA_TEXT + line + WHITE_TEXT + " " + text))

    index = index >= spinnerFrames.length ? 0 : index + 1
  }

  clearInterval(loadingInterval)
  log()
  loadingInterval = setInterval(log, 100)
}

export function endLoadingMessage(): void {
  clearInterval(loadingInterval)
}

/**
 * CLI Functions
 */
interface CommandConfig {
  command: string
  action: () => Promise<void>
}

function command(fn: () => Promise<void>) {
  return async () => {
    await fn()
  }
}

const program: Record<string, () => Promise<void>> = {}

export function addCommand(config: CommandConfig): void {
  program[config.command] = command(config.action)
}

export async function runProgram(): Promise<void> {
  const args = Deno.args
  if (program[args[0]]) {
    await program[args[0]]()
  } else {
    console.log("Command not found")
  }
}