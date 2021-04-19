export function mapBotResponseToBotDto(botResponse: any) {
  if (!Array.isArray(botResponse)) {
    throw new Error("Argument should be an array");
  }
  return botResponse.map((b) => b.calculatedOperation);
}
