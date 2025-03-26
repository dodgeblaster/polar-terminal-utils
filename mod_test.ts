import { assertEquals } from "https://deno.land/std@0.220.1/assert/mod.ts"
import {
  makeBlueText,
  makeGreenText,
  makeDimText,
  makeRedText,
  setTextWidth,
  addCommand,
  runProgram,
} from "./mod.ts"

Deno.test("makeGreenText adds green ANSI codes", () => {
  const text = "test"
  const result = makeGreenText(text)
  assertEquals(result, "\x1b[32mtest\x1b[37m")
})

Deno.test("makeBlueText adds blue ANSI codes", () => {
  const text = "test"
  const result = makeBlueText(text)
  assertEquals(result, "\x1b[34mtest\x1b[37m")
})

Deno.test("makeRedText adds red ANSI codes", () => {
  const text = "test"
  const result = makeRedText(text)
  assertEquals(result, "\x1b[31mtest\x1b[37m")
})

Deno.test("makeDimText adds dim ANSI codes", () => {
  const text = "test"
  const result = makeDimText(text)
  assertEquals(result, "\x1b[2mtest\x1b[0m")
})

Deno.test("setTextWidth pads text correctly", () => {
  const text = "test"
  const result = setTextWidth(text, 8)
  assertEquals(result, "test    ")
})

Deno.test({
  name: "CLI command registration",
  fn: async () => {
    let commandExecuted = false

    const wait = () => {
      return new Promise(r => {
        r(true)
      })
    }

    addCommand({
      command: "test",
      action: async () => {
        await wait()
        commandExecuted = true
      },
    })

    // Mock Deno.args
    const originalArgs = Deno.args
    Deno.args.push('test')

    try {
      await runProgram()
      assertEquals(commandExecuted, true)
    } finally {
      // Restore original args
      // @ts-ignore: Overriding readonly property
      Deno.args = originalArgs
    }
  },
  sanitizeOps: false,
  sanitizeResources: false,
})